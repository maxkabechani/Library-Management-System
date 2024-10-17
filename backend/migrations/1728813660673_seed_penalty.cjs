const {faker} = require('@faker-js/faker');

exports.up = async (pgm) => {
    const { rows: students } = await pgm.db.query('SELECT student_id FROM student');

    const penalties = Array.from({ length: 20 }).map(() => {
        return {
            student_id: faker.helpers.arrayElement(students).student_id,
            amount: parseFloat((Math.random() * 100).toFixed(2)),
            issued_at: new Date().toISOString(), 
            paid_at: Math.random() > 0.5 ? new Date().toISOString() : null
        };
    });

    penalties.forEach((penalty) => {
        pgm.sql(`
            INSERT INTO penalties (student_id, amount, issued_at, paid_at)
            VALUES (${penalty.student_id}, ${penalty.amount}, '${penalty.issued_at}', ${penalty.paid_at ? `'${penalty.paid_at}'` : null});
        `);
    });
};

exports.down = async (pgm) => {
    pgm.sql('DELETE FROM penalties');
};
