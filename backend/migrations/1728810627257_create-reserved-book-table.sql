-- Up Migration
CREATE TABLE reserved_book (
    reservation_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES book(book_id) ON DELETE CASCADE,
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    reserved_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    CONSTRAINT check_reservation_status CHECK (status IN ('active', 'fulfilled', 'cancelled'))
);

-- Down Migration
DROP TABLE IF EXISTS reserved_book;