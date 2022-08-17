// const knex = require('knex')({
//   client: 'sqlite3', // or 'better-sqlite3'
//   connection: {
//     filename: "./mydb.sqlite"
//   }
// });

// import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
// const file = join(__dirname, 'db.json');
// const adapter = new JSONFile(file);

type Data = {
  repos: {
    [key: string]: {
      etag: string;
      hooks: any;
    };
  };
};

const adapter = new JSONFile<Data>('db.json');
export const db = new Low(adapter);

await db.read();
db.data ||= { repos: {} };

// console.log('data', db.data);

// db.data.repos['traefik'] = { etag: '', hooks: [] };

// await db.write();
