export async function createTables(app) {
    try {
        await app.register(fastifyPostgres, {
            connectionString: "postgresql://postgres:InbinesDatabase@database:5432/lms",
        })

        const client = await app.pg.connect()
        const students = client.query(CREATE_STUDENTS_TABLE);
    } catch (error) {
        app.log.error('Error connecting to PostgreSQL:', error);
        throw error;
    }
}


const CREATE_STUDENTS_TABLE = "CREATE TABLE book (book_id INT PRIMARY KEY, title VARCHAR(60), author VARCHAR(60), published_Year INT, genre VARCHAR(60), available_copies INT);"