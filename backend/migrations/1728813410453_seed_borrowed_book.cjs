// xxxx_seed_borrowed_books.js
const {faker} = require('@faker-js/faker');

exports.up = async (pgm) => {
    const { rows: books } = await pgm.db.query('SELECT book_id FROM book');
    const { rows: students } = await pgm.db.query('SELECT student_id FROM student');
    const { rows: librarians } = await pgm.db.query('SELECT librarian_id FROM librarian');

    const borrowedBooks = Array.from({ length: 20 }).map(() => {
        const borrowDate = faker.date.past(1); 
        const dueDate = new Date(borrowDate);
        dueDate.setDate(dueDate.getDate() + faker.number.int({ min: 7, max: 30 }));

        return {
            book_id: faker.helpers.arrayElement(books).book_id,
            student_id: faker.helpers.arrayElement(students).student_id,
            librarian_id: faker.helpers.arrayElement(librarians).librarian_id,
            borrow_date: borrowDate.toISOString(),
            due_date: dueDate.toISOString(),
            return_date: null,
            status: 'borrowed'
        };
    });

    borrowedBooks.forEach((borrowedBook) => {
        pgm.sql(`
            INSERT INTO borrowed_book (book_id, student_id, librarian_id, borrow_date, due_date, return_date, status)
            VALUES (${borrowedBook.book_id}, ${borrowedBook.student_id}, ${borrowedBook.librarian_id}, '${borrowedBook.borrow_date}', '${borrowedBook.due_date}', NULL, '${borrowedBook.status}');
        `);
    });
};

exports.down = async (pgm) => {
    pgm.sql('DELETE FROM borrowed_book');
};
