import Fastify from "fastify"
import FastifyCors from '@fastify/cors';
import Cookie from "@fastify/cookie"
import Connect from 'connect-pg-simple';
import Session from '@fastify/session';
import librarianRoutes from "./modules/librarian/librarian.routes.js";
import studentRoutes from "./modules/student/student.routes.js";
import Bcrypt from "fastify-bcrypt"
import fastifyMultipart from "@fastify/multipart";
import dbConnector from "./database.js"
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

import path from 'path'
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = Fastify({ logger: true });
app.register(FastifyCors, {
    origin: ["http://localhost:4000", "http://localhost:4001", "http://192.168.0.138:4000", "http://192.168.0.138:4001"],
    credentials: true
})
app.register(Bcrypt, {
    saltWorkFactor: 10,
});
app.register(Cookie);
app.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads', 'past-papers'),
    prefix: '/past-papers/', // optional: you can use a prefix for easier routing
}); 
app.register(fastifyMultipart)

app.register(dbConnector);
const ConnectSession = Connect(Session);
const sessionStore = new ConnectSession({
    conObject: {
        connectionString: "postgresql://postgres:LMSPassword@localhost:5432/lms",
        ssl: false,
    },
    tableName: 'session',
    createTableIfMissing: true,
});

const sessionOptions = {
    store: sessionStore,
    secret: 'this-is-your-very-long-secret-string',
    cookie: {
        secure: false, // Set to true if using https
        maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
    saveUninitialized: false,
    rolling: true,
};

app.register(Session, sessionOptions);


app.register(librarianRoutes, { prefix: "/api/librarian" })
app.register(studentRoutes, { prefix: "/api/student" })


app.get('/download/:filename', async (req, reply) => {
    const { filename } = req.params;
    const decodedFilename = decodeURIComponent(filename);
    const filePath = join(__dirname, 'uploads', 'past-papers', decodedFilename);

    if (fs.existsSync(filePath)) {
        return reply.sendFile(decodedFilename, join(__dirname, 'uploads', 'past-papers'));
    } else {
        return reply.status(404).send({ error: 'File not found' });
    }
});

try {
    await app.listen({ port: 3000 })
} catch (error) {
    app.log.error(error)
    process.exit(1);
}