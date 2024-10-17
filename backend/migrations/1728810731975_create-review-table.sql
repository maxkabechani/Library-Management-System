-- Up Migration
CREATE TABLE book_review (
    review_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
    book_id INT REFERENCES book(book_id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Down Migration
DROP TABLE IF EXISTS book_review;