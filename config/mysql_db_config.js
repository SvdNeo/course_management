import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database");
});

export default con;
