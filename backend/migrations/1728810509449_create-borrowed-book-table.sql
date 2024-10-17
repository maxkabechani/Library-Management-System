-- Up Migration
CREATE TABLE borrowed_book (
    borrow_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES book(book_id) ON DELETE CASCADE,
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    librarian_id INT REFERENCES librarian(librarian_id) ON DELETE CASCADE,
    borrow_date TIMESTAMP DEFAULT NOW(),
    due_date TIMESTAMP,
    return_date TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'borrowed',
    CONSTRAINT check_status CHECK (status IN ('borrowed', 'returned', 'overdue'))
);

-- Down Migration
DROP TABLE IF EXISTS borrow_book;