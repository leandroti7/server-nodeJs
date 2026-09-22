import { sql } from "./db.js";

sql
 `
    CREATE TABLE IF NOT EXISTS videos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        duration INTEGER NOT NULL,
        url TEXT NOT NULL
    );
`.then(() => {
    console.log('Table created successfully');
});