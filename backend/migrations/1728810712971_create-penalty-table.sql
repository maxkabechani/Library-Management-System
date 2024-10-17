-- Up Migration
CREATE TABLE penalties (
    penalty_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,  -- fine amount
    issued_at TIMESTAMP DEFAULT NOW(),
    paid_at TIMESTAMP
);

-- Down Migration
DROP TABLE IF EXISTS penalty;