const {faker} = require('@faker-js/faker');

exports.up = async (pgm) => {
    const { rows: books } = await pgm.db.query('SELECT book_id FROM book');
    const { rows: students } = await pgm.db.query('SELECT student_id FROM student');

    const reservedBooks = Array.from({ length: 20 }).map(() => {
        return {
            book_id: faker.helpers.arrayElement(books).book_id,
            student_id: faker.helpers.arrayElement(students).student_id,
            reserved_at: new Date().toISOString(), 
            status: 'active' 
        };
    });

    reservedBooks.forEach((reservedBook) => {
        pgm.sql(`
            INSERT INTO reserved_book (book_id, student_id, reserved_at, status)
            VALUES (${reservedBook.book_id}, ${reservedBook.student_id}, '${reservedBook.reserved_at}', '${reservedBook.status}');
        `);
    });
};

exports.down = async (pgm) => {
    pgm.sql('DELETE FROM reserved_book');
};
