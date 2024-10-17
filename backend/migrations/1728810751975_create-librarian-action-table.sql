-- Up Migration
CREATE TABLE librarian_action (
    action_id SERIAL PRIMARY KEY,
    librarian_id INT REFERENCES librarian(librarian_id) ON DELETE CASCADE,
    action_type VARCHAR(255), 
    details TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Down Migration
DROP TABLE IF EXISTS librarian_action;