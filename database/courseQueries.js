import connection from '../config/mysql_db_config.js';

export const createCourseQuery = (name, instructor_id, description, price, callback) => {
    const query = 'INSERT INTO Courses (name, instructor_id, description, price) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, instructor_id, description, price], callback);
};