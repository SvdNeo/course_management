import connection from "../config/mysql_db_config.js";

export const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM Users WHERE email = ?';
    connection.query(query, [email], callback);
};

export const createUser = (name, email, password, role, callback) => {
    const query = 'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, password, role], callback);
};
