-- Up Migration
CREATE TABLE penalties (
    penalty_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,  -- fine amount
    issued_at TIMESTAMP DEFAULT NOW(),
    paid_at TIMESTAMP
);

CREATE OR REPLACE FUNCTION calculate_penalty() 
RETURNS TRIGGER AS $$
DECLARE
    overdue_days INT;
    penalty_amount DECIMAL(10, 2);
BEGIN
    IF NEW.return_date > NEW.due_date THEN
        overdue_days := EXTRACT(DAY FROM (NEW.return_date - NEW.due_date));
        penalty_amount := overdue_days * 1.00;  -- $1 per day as penalty
        INSERT INTO penalties (student_id, amount)
        VALUES (NEW.student_id, penalty_amount);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_penalty_on_late_return
AFTER UPDATE OF return_date ON borrowed_book
FOR EACH ROW
WHEN (NEW.status = 'returned')
EXECUTE FUNCTION calculate_penalty();

-- Down Migration
DROP TABLE IF EXISTS penalty;