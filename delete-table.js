import { sql } from "./db.js";

sql
 `
 DROP table IF EXISTS videos;
`.then(() => {
    console.log('Table deleted successfully');
});