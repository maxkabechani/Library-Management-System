-- Up Migration
CREATE TABLE school (
    school_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


-- Down Migration
DROP TABLE IF EXISTS school;