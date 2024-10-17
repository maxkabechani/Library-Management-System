-- Up Migration
CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    published_year INT,
    edition INT,
    genre VARCHAR(100),
    description TEXT,
    available_copies INT NOT NULL DEFAULT 0,
    total_copies INT NOT NULL DEFAULT 1,
    location VARCHAR(255)
);

-- Down Migration
DROP TABLE IF EXISTS books;