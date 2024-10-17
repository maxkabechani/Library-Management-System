const { faker } = require('@faker-js/faker');

const programs = [
    'Bachelor of Nursing',
    'Bachelor of Engineering',
    'Bachelor of Arts',
    'Bachelor of Business Administration',
    'Bachelor of Science',
    'Master of Education',
    'Master of Social Work',
    'Doctor of Medicine',
];

exports.up = async (pgm) => {
    const currentYear = new Date().getFullYear();
    const { rows: schools } = await pgm.db.query('SELECT school_id FROM school');
    const students = Array.from({ length: 200 }).map(() => {
        const startYear = faker.number.int({ min: currentYear - 7, max: currentYear });
        const student_id = `${startYear}${faker.number.int({ min: 100000, max: 999999 })}`;

        return {
            student_id,
            first_name: faker.person.firstName().replace(/'/g, "''"),
            last_name: faker.person.lastName().replace(/'/g, "''"),
            email: faker.internet.email(),
            password: faker.internet.password(10),
            school: faker.helpers.arrayElement(schools).school_id,
            program: faker.helpers.arrayElement(programs),
            year_of_study: faker.number.int({ min: 1, max: 8 }),
        };
    });
    console.log(students)

    students.forEach((student) => {
        pgm.sql(`
      INSERT INTO student (student_id, first_name, last_name, email, password, school, program, year_of_study)
      VALUES ('${student.student_id}', '${student.first_name}', '${student.last_name}', '${student.email}', '${student.password}', '${student.school}', '${student.program}', ${student.year_of_study});
    `);
    });
};

exports.down = async (pgm) => {
    pgm.sql('DELETE FROM student');
};
