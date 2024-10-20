const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

exports.up = async (pgm) => {
    const uploadsPath = path.join(__dirname, '../uploads/past-papers');
    const files = fs.readdirSync(uploadsPath).filter(file => file.endsWith('.pdf'));

    const { rows: librarians } = await pgm.db.query('SELECT librarian_id FROM librarian');

    const pastPapers = files.map(file => {
        return {
            title: file.replace('.pdf', ''),
            school_id: 1,
            filePath: file,
            librarianId: faker.helpers.arrayElement(librarians).librarian_id,
        };
    });
    pastPapers.forEach((pastPaper) => {
        console.log(pastPaper.title)
        pgm.sql(`INSERT INTO past_paper(title, file_path, school_id, uploader_id) VALUES('${pastPaper.title}', '${pastPaper.filePath}', ${pastPaper.school_id}, ${pastPaper.librarianId});`)
    });
};

exports.down = async (pgm) => {
    await pgm.sql('DELETE FROM past_paper');
};
