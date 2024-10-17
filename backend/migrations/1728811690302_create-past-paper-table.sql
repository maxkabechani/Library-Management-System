-- Up Migration
CREATE TABLE past_paper (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    school_id INT REFERENCES school(school_id) ON DELETE CASCADE,
    uploader_id INT REFERENCES librarian(librarian_id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Down Migration
DROP TABLE IF EXISTS past_paper;