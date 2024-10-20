export async function loginStudent(req, reply) {
    try {
        const { studentID, password } = req.body;
        console.log(studentID)
        console.log(password)
        const student = await req.server.queryDb("SELECT student_id, password FROM student WHERE     student_id = $1", [studentID]);
        console.log(student);
        if (student.length == 0) {
            return reply.status(401).send("Invalid Email or Password");
        }
        if (student[0].password !== password) {
            return reply.status(401).send("Invalid Email or Password");
        }

        const id = student[0].student_id;
        req.session.student = { id };
        return { success: true }
    } catch (error) {
        console.log(error)
        return reply.status(501).send("Internal Server Error");
    }
}

export async function getStudent(req, reply) {
    if (req.session.student) {
        try {
            const user = await req.server.queryDb("SELECT first_name, last_name FROM student WHERE student_id = $1", [req.session.student.id]);
            console.log(user[0])

            if (user.length > 0) {
                return reply.send({
                    isAuthenticated: true,
                    first_name: user[0].first_name,
                    last_name: user[0].last_name
                });
            } else {
                req.session.student = null;
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

export async function Dashboard(req, reply) {
    try {
        const totalBooksResult = await req.server.queryDb('SELECT COUNT(*) AS total_books FROM book;');
        const totalBooks = totalBooksResult[0].total_books;
        const borrowedBooksResult = await req.server.queryDb(
            'SELECT COUNT(*) AS total_borrowed_books FROM borrowed_book WHERE student_id = $1',
            [req.session.student.id] // Ensure you are using the correct session property
        );
        const borrowedBooks = borrowedBooksResult[0].total_borrowed_books;

        // Query for total reserved books
        const reservedBooksResult = await req.server.queryDb(
            'SELECT COUNT(*) AS total_reserved_books FROM reserved_book WHERE student_id = $1',
            [req.session.student.id]
        );
        const reservedBooks = reservedBooksResult[0].total_reserved_books;

        // Query for total overdue books
        const overdueBooksResult = await req.server.queryDb(`
            SELECT COUNT(*) AS total_overdue_books 
            FROM borrowed_book 
            WHERE student_id = $1 AND status = 'borrowed' AND due_date < NOW()`,
            [req.session.student.id]
        );
        const overdueBooks = overdueBooksResult[0].total_overdue_books;

        // Return the data
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
        const books = await req.server.queryDb("SELECT title, status, edition, borrow_date, due_date, author FROM student s JOIN borrowed_book b ON b.student_id = s.student_id JOIN book ON book.book_id = b.book_id WHERE s.student_id = $1", [req.session.student.id]);
        return books;
    } catch (error) {

    }
}
export async function getReservedBooks(req, reply) {
    try {
        const books = await req.server.queryDb("SELECT title, status, edition, reserved_at, author FROM student s JOIN reserved_book r ON r.student_id = s.student_id JOIN book ON book.book_id = r.book_id WHERE s.student_id = $1", [req.session.student.id]);
        return books;
    } catch (error) {

    }
}

export async function getPastPapers(req, reply) {
    try {
        const pastPapers = await req.server.queryDb("SELECT id, title, file_path, name AS school FROM past_paper JOIN school ON school.school_id = past_paper.school_id;")
        return pastPapers;
    } catch (error) {

    }
}


export async function reserveBook(req, reply) {
    try {
        const { id } = req.params;
        const reserveBook = await req.server.queryDb("INSERT INTO reserved_book (book_id, student_id) VALUES ($1, $2)", [id, req.session.student.id]);
        return { success: true }
    } catch (error) {
        return error
    }
}
