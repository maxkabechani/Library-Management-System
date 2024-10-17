const { faker } = require('@faker-js/faker');

exports.up = async (pgm) => {
  const librarians = Array.from({ length: 50 }).map(() => ({
    first_name: faker.person.firstName().replace(/'/g, "''"),
    last_name: faker.person.lastName().replace(/'/g, "''"),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));

  for (const librarian of librarians) {
    await pgm.sql(`
      INSERT INTO librarian (first_name, last_name, email, password)
      VALUES ('${librarian.first_name}', '${librarian.last_name}', '${librarian.email}', '${librarian.password}');
    `);
  }
};

exports.down = async (pgm) => {
  await pgm.sql(`
    DELETE FROM librarian WHERE email LIKE '%@example.com';
  `);
};
