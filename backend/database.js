import fastifyPlugin from 'fastify-plugin';
import fastifyPostgres from '@fastify/postgres';

async function dbConnector(app) {
    try {
        await app.register(fastifyPostgres, {
            connectionString: "postgresql://postgres:LMSPassword@localhost:5432/lms",
        });
    } catch (error) {
        app.log.error('Error connecting to PostgreSQL:', error);
        throw error;
    }
    app.decorate('queryDb', async (query, values) => {
        const client = await app.pg.connect();
        try {
            const { rows } = await client.query(query, values);
            return rows;
        }
        catch (error) {
            app.log.error(`Database query error: ${error}`);
            throw error;
        } finally {
            client.release()
        }
    })
}

export default fastifyPlugin(dbConnector);
