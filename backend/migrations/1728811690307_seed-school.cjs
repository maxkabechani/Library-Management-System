const { faker } = require('@faker-js/faker');
const schools = [
  'Natural Sciences',
  'Humanities',
  'Engineering',
  'Business',
  'Social Sciences',
  'Education',
  'Law',
  'Medicine',
];
exports.up = async (pgm) => {
  for (const school of schools) {
    await pgm.sql(`
      INSERT INTO school (name)
      VALUES ('${school}');
    `);
  }
};

exports.down = async (pgm) => {
  await pgm.sql(`
    DELETE FROM school;
  `);
};
