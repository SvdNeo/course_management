import connection from '../config/mysql_db_config.js';

export const createCourseQuery = (name, instructor_id, description, price, callback) => {
    const query = 'INSERT INTO Courses (name, instructor_id, description, price) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, instructor_id, description, price], callback);
};

export const getAllCoursesQuery = (callback) => {
    const query = 'SELECT * FROM Courses';
    connection.query(query, callback);
};

export const getCourseByIdQuery = (id, callback) => {
    const query = 'SELECT * FROM Courses WHERE id = ?';
    connection.query(query, [id], callback);
    };