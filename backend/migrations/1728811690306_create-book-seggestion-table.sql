-- Up Migration
CREATE TABLE book_suggestion (
    id SERIAL PRIMARY KEY,
    suggested_title VARCHAR(255),
    suggested_author VARCHAR(255),
    suggested_genre VARCHAR(100),
    suggested_by INT REFERENCES student(student_id) ON DELETE CASCADE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Down Migration
DROP TABLE IF EXISTS book_suggestion;