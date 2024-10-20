import fs from 'fs';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function getLibrarian(req, reply) {
    if (req.session.librarian) {
        try {
            const user = await req.server.queryDb("SELECT first_name, last_name FROM librarian WHERE librarian_id = $1", [req.session.librarian.id]);
            console.log(user[0])

            if (user.length > 0) {
                return reply.send({
                    isAuthenticated: true,
                    first_name: user[0].first_name,
                    last_name: user[0].last_name
                });
            } else {
                req.session.librarian = null;
                return reply.send({ isAuthenticated: false });
            }
        } catch (error) {
            console.log(error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    } else {
        return reply.send({ isAuthenticated: false });
    }
}

export async function loginLibrarian(req, reply) {
    try {
        const { email, password } = req.body;
        console.log(email)
        console.log(password)
        const librarian = await req.server.queryDb("SELECT librarian_id, password FROM librarian where email = $1", [email]);
        console.log(librarian);
        if (librarian.length == 0) {
            return reply.status(401).send("Invalid Email or Password");
        }
        if (librarian[0].password !== password) {
            return reply.status(401).send("Invalid Email or Password");
        }

        const id = librarian[0].librarian_id;
        req.session.librarian = { id };
        return { success: true }
    } catch (error) {
        console.log(error)
        return reply.status(501).send("Internal Server Error");
    }

}


export async function createLibrarian(req, reply) {
    try {
        const { name, email, password, role } = req.body;
        const librarian = librarians.filter((librarian) => librarian.email == email);
        if (librarian.length > 0) {
            throw new Error("Librarian with this email already registered");
        }
        librarians = { ...librarian, id: librarians.length, name: name, email: email, password: password, role: role };

        return reply.status(201);
    } catch (error) {
        console.log(error)
        return reply.status(501).send("Internal Server Error");
    }


}


export async function Dashboard(req, reply) {
    try {
        // Query for total books
        const totalBooksResult = await req.server.queryDb('SELECT COUNT(*) AS total_books FROM book;');
        const totalBooks = totalBooksResult[0].total_books;
        const borrowedBooksResult = await req.server.queryDb('SELECT COUNT(*) AS total_borrowed_books FROM borrowed_book WHERE status = \'borrowed\';');
        const borrowedBooks = borrowedBooksResult[0].total_borrowed_books;
        const reservedBooksResult = await req.server.queryDb('SELECT COUNT(*) AS total_reserved_books FROM reserved_book WHERE status = \'active\';');
        const reservedBooks = reservedBooksResult[0].total_reserved_books;

        const overdueBooksResult = await req.server.queryDb(`
            SELECT COUNT(*) AS total_overdue_books 
            FROM borrowed_book 
            WHERE status = 'borrowed' AND due_date < NOW();
        `);
        const overdueBooks = overdueBooksResult[0].total_overdue_books;

        return reply.send({
            totalBooks,
            borrowedBooks,
            reservedBooks,
            overdueBooks
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: 'An error occurred while fetching dashboard data.' });
    }
}

export async function getBook(req, reply) {
    const { id } = req.params;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!")
    const book = await req.server.queryDb("SELECT * FROM book WHERE book_id = $1", [id])
    console.log(book[0]);
    return book[0]
}

export async function findStudent(req, reply) {
    try {
        const { student_id } = req.body
        console.log(student_id)
        const student = await req.server.queryDb("SELECT student_id, first_name, last_name FROM student WHERE student_id = $1", [student_id]);
        if (student.length == 0)
            return reply.status(404).send("Student with that ID does not exist")
        console.log(student)
        return student[0]
    } catch (error) {
        console.log(error)
        return error
    }
}



export async function getBooks(req, reply) {
    try {
        const books = await req.server.queryDb("SELECT book_id, title, isbn, author, location, genre, available_copies, edition FROM book");
        const book = books[0]
        return books
    } catch (error) {
        console.log(error)
        return reply.status(501).send("Internal Server Error");
    }

}

export async function getBorrowedBooks(req, reply) {
    try {
        const query = "SELECT b.borrow_id, s.student_id, s.first_name, s.last_name,l.first_name AS librarian_first_name, l.last_name AS librarian_last_name, title, status, edition, due_date, author FROM student s JOIN borrowed_book b ON b.student_id = s.student_id JOIN book ON book.book_id = b.book_id JOIN librarian l ON b.librarian_id = l.librarian_id; "
        const books = await req.server.queryDb(query)
        return books;
    } catch (error) {
        console.log(error)
        return reply.status(501).send("Internal Server Error");
    }

}

export async function addBorrowedBook(req, reply) {
    try {
        console.log(req.body)
        const { book_id, student_id, due_date } = req.body;
        const { id } = req.session.librarian;
        const book = await req.server.queryDb("INSERT INTO borrowed_book (book_id, student_id, librarian_id, due_date, status) VALUES ($1, $2, $3, $4, 'borrowed')", [book_id, student_id, id, due_date,]);
        return { success: true }
    } catch (error) {
        console.log(error)
        return error
    }

}
export async function returnBook(req, reply) {
    try {
        console.log(req.body)
        const { id } = req.params;
        const book = await req.server.queryDb("UPDATE borrowed_book SET status = 'returned' WHERE borrow_id = $1", [id]);
        return { success: true }
    } catch (error) {
        console.log(error)
        return error
    }

}

export async function getReservedBooks(req, reply) {
    try {
        const query = "SELECT student.student_id, student.first_name, student.last_name, book.title, book.author, published_year, book.edition FROM student JOIN reserved_book ON reserved_book. student_id = student.student_id JOIN book ON book.book_id = reserved_book.book_id;"
        const books = await req.server.queryDb(query)
        return books;

    } catch (error) {
        console.log(error)
        return reply.status(501).send("Internal Server Error");
    }
}

export async function reservedToBorrowed(req, reply) {
    try {
        const { id } = req.params
        const reserved_book = await req.server.queryDb("SELECT * FROM reserved_book WHERE reserved_id =  $1", [id]);
        const info = reserved_book[0]
        const borrow_book = req.server.queryDb("INSERT INTO borrowed_book (book_id, student_id, librarian_id, due_date, status) VALUES ($1, $2, $3, $4, 'borrowed'", [info])
    } catch (error) {

    }
}

export async function deleteBook(req, reply) {
    try {
        const { id } = req.params;
        const deleteBook = await req.server.queryDb("DELETE FROM book WHERE book_id = $1", [id]);
        return { success: true }
    } catch (error) {
        return error
    }
}




export async function addBook(req, reply) {
    try {
        const { title, author, isbn, publishedYear, genre, edition, description, availableCopies, totalCopies, location } = req.body;
        console.log(req.body)
        const query = "INSERT INTO book (title, author, isbn, published_year, edition, genre, description, available_copies, total_copies, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
        const book = await req.server.queryDb(query, [title, author, isbn, publishedYear, edition, genre, description, availableCopies, totalCopies, location])
        return reply.status(201).send({ success: true })
    } catch (error) {
        console.log(error)
        return reply.status(503).send("Internal Server Error");
    }

}
export async function editBook(req, reply) {
    try {
        const { title, author, isbn, publishedYear, genre, edition, description, availableCopies, totalCopies, location } = req.body;
        const { id } = req.params;
        console.log(req.body)
        const query = "UPDATE book SET title = $1, author = $2, isbn = $3, published_year = $4, edition = $5, genre = $6, description = $7, available_copies = $8, total_copies = $9, location = $10 WHERE book_id = $11; "
        const book = await req.server.queryDb(query, [title, author, isbn, publishedYear, edition, genre, description, availableCopies, totalCopies, location, id])
        return reply.status(201).send({ success: true })
    } catch (error) {
        console.log(error)
        return reply.status(503).send("Internal Server Error");
    }

}

export async function getPastPapers(req, reply) {
    try {
        const pastPapers = await req.server.queryDb("SELECT id, title, file_path, name AS school FROM past_paper JOIN school ON school.school_id = past_paper.school_id;")
        return pastPapers;
    } catch (error) {

    }
}

export async function addPastPaper(req, reply) {
    try {
        const { title } = req.body;

        // Ensure the uploads directory exists
        const uploadDir = join(__dirname, 'uploads');
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir);
        }

        // Handle file upload
        const data = await req.file();

        // File details
        const fileName = data.filename;
        const fileStream = data.file;
        const filePath = join(uploadDir, fileName);

        // Save file to disk
        const writeStream = fs.createWriteStream(filePath);
        fileStream.pipe(writeStream);

        // Await file writing
        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        // Insert file metadata and path into the database
        const paper = await req.server.queryDb(
            "INSERT INTO past_paper (title, file) VALUES ($1, $2) RETURNING *",
            [title, filePath]
        );

        reply.send({ success: true, message: 'Past paper uploaded successfully!', paper });
    } catch (error) {
        console.error(error);
        reply.status(500).send({ success: false, message: 'Error uploading the file.' });
    }
}