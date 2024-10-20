const { faker } = require('@faker-js/faker');

const genres = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Horror',
    'Biography',
    'Self-Help',
    'Historical Fiction'
];

const getRandomYear = () => {
    const pastDate = faker.date.past(30);
    const year = pastDate.getFullYear();
    return year;
};
exports.up = async (pgm) => {
    const books = Array.from({ length: 100 }).map(() => ({
        title: faker.lorem.sentence(3),
        author: `${faker.person.firstName().replace(/'/g, "''")} ${faker.person.lastName().replace(/'/g, "''")}`,
        isbn: faker.string.numeric(13),
        published_year: getRandomYear(),
        edition: faker.number.int({ min: 1, max: 15 }),
        genre: faker.helpers.arrayElement(genres),
        description: faker.lorem.paragraph(),
        available_copies: faker.number.int({ min: 0, max: 10 }),
        total_copies: faker.number.int({ min: 1, max: 20 }),
        location: `Shelf ${faker.string.numeric(1)}${faker.string.alpha({ length: 1, casing: 'upper' })}`,
    }));

    books.forEach((book) => {
        pgm.sql(`
            INSERT INTO book (title, author, isbn, edition, published_year, genre, description, available_copies, total_copies, location)
            VALUES ('${book.title}', '${book.author}', '${book.isbn}', '${book.edition}', '${book.published_year}', '${book.genre}', '${book.description}', ${book.available_copies}, ${book.total_copies}, '${book.location}');
        `);
    });
};

exports.down = async (pgm) => {
    pgm.sql('DELETE FROM book');
};
