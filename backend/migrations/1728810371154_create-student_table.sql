-- Up Migration
CREATE TABLE student (
    student_id INT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,  
    school INT REFERENCES school(school_id) ON DELETE CASCADE,     
    program VARCHAR(100),
    year_of_study INT CHECK (year_of_study BETWEEN 1 AND 8),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


-- Down Migration
DROP TABLE IF EXISTS student;