import { addBook, addBorrowedBook, createLibrarian, Dashboard, editBook, findStudent, getBook, getBooks, getBorrowedBooks, getLibrarian, getPastPapers, getReservedBooks, loginLibrarian, returnBook } from "./librarian.controller.js";



export default async function librarianRoutes(app) {
    app.addHook('preValidation', async (request, reply) => {
        if (request.routerPath === '/api/librarian/login') {
            const session = request.session;

            // Check if store is in session
            if (!session.librarian) {
                reply.code(401).send({ message: 'You are not logged in.' });
                return;
            }

            const { id } = session.librarian;
            const query = 'SELECT * FROM librarian WHERE id = $1';

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

    });

    app.get('/', getLibrarian);
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
        }
    }, loginLibrarian);

    app.post('/logout', async (req, reply) => {
        await req.session.destroy()
    })

    app.post('/', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                    role: {
                        type: 'string'
                    }
                },
            }
        }
    }, createLibrarian);

    app.get('/books', getBooks);

    app.get('/borrowed-books', getBorrowedBooks);

    app.get('/reserved-books', getReservedBooks);
    app.post('/book', {
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
        }
    }, addBook);

    app.get('/past-papers', getPastPapers);

    app.post('/find-student', findStudent);
    app.get('/book/:id', getBook);
    app.post('/edit-book/:id', editBook);
    app.post('/return-book/:id', returnBook);


    app.post('/lend-book', addBorrowedBook);

}