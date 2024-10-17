const {faker} = require('@faker-js/faker');

exports.up = async (pgm) => {
    const { rows: students } = await pgm.db.query('SELECT student_id FROM student');
    const { rows: books } = await pgm.db.query('SELECT book_id FROM book');

    const reviews = Array.from({ length: 30 }).map(() => {
        return {
            student_id: faker.helpers.arrayElement(students).student_id,
            book_id: faker.helpers.arrayElement(books).book_id,
            rating: faker.number.int({ min: 1, max: 5 }),
            review_text: faker.lorem.sentence(10), 
            created_at: new Date().toISOString() 
        };
    });

    reviews.forEach((review) => {
        pgm.sql(`
            INSERT INTO book_review (student_id, book_id, rating, review_text, created_at)
            VALUES (${review.student_id}, ${review.book_id}, ${review.rating}, '${review.review_text}', '${review.created_at}');
        `);
    });
};

exports.down = async (pgm) => {
    pgm.sql('DELETE FROM book_review');
};
