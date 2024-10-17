const { faker } = require('@faker-js/faker');

exports.up = async (pgm) => {
    const { rows: librarians } = await pgm.db.query('SELECT librarian_id FROM librarian');

    const actions = Array.from({ length: 20 }).map(() => {
        const actionType = faker.helpers.arrayElement([
            'add_book',
            'remove_book',
            'update_book',
            'borrow_book',
            'return_book',
            'reserve_book'
        ]);
        return {
            librarian_id: faker.helpers.arrayElement(librarians).librarian_id,
            action_type: actionType,
            details: faker.lorem.sentence(10),
            created_at: new Date().toISOString()
        };
    });

    actions.forEach((action) => {
        pgm.sql(`INSERT INTO librarian_action (librarian_id, action_type, details, created_at) VALUES (${action.librarian_id}, '${action.action_type}', '${action.details}', '${action.created_at}');`);
    });
};

exports.down = async (pgm) => {
    pgm.sql('DELETE FROM librarian_action');
};
