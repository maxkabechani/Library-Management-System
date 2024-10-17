import { Dashboard, getBooks, getBorrowedBooks, getPastPapers, getReservedBooks, getStudent, loginStudent } from "./student.controller.js";
import path from 'path';
import fs from 'fs';


const authPreValidation = async function (req, reply) {
    // Check if store is in session
    if (!session.librarian) {
        reply.code(401).send({ message: 'You are not logged in.' });
        return;
    }

    const { id } = session.librarian;
    const query = 'SELECT * FROM student WHERE student_id = $1';

    try {
        // Query the database for the store
        const store = await app.queryDb(query, [id]);
        if (store.length === 0) {
            reply.code(401).send({ error: "You are not logged in." });
            return;
        }
        // Allow the request to proceed if everything is valid
    } catch (error) {
        app.log.error(error);
        reply.code(500).send({ error: "Internal Server Error" });
    }
}


export default async function studentRoutes(app) {

    app.get('/download/:filename', async (req, reply) => {
        const { filename } = req.params;
        const decodedFilename = decodeURIComponent(filename);
        const filePath = path.join(__dirname, 'files', decodedFilename); // Assume files are in the "files" directory

        if (fs.existsSync(filePath)) {
            return reply.sendFile(filename, 'files'); // Sends file from the "files" folder
        } else {
            reply.status(404).send({ error: 'File not found' });
        }
    });
    app.get('/', getStudent);
    app.get('/dashboard', Dashboard)
    app.post("/login", {
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                }
            }
        },
    }, loginStudent);

    app.post('/logout', { preValidation: [authPreValidation] }, async (req, reply) => {
        await req.session.destroy()
    })

    app.get('/books', getBooks);

    app.get('/borrowed-books', getBorrowedBooks);
    app.get('/reserved-books', getReservedBooks);
    app.get('/past-papers', getPastPapers);



}

