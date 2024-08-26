import { createCourseQuery,getAllCoursesQuery,getCourseByIdQuery,editCourseQuery } from '../database/courseQueries.js';

export const createCourseService = (name, instructor_id, description, price) => {
    return new Promise((resolve, reject) => {
        createCourseQuery(name, instructor_id, description, price, (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, name, instructor_id, description, price });
        });
    });
};

export const getAllCoursesService = () => {
    return new Promise((resolve, reject) => {
        getAllCoursesQuery((err, results) => {
            if (err) return reject(err.message);
            if(!results) return reject(new Error('Course not found'));
            resolve(results[0]);
        });
    });
};



export const editCourseService = (id, name, instructor_id, description, price) => {
    return new Promise((resolve, reject) => {
        editCourseQuery(id, name, instructor_id, description, price, (err, results) => {
            if (err) return reject(err);

            if (results.affectedRows === 0) {
                resolve(undefined); 
            } else {
                resolve({ id, name, instructor_id, description, price });
            }
        });
    });
};


export const getCourseByIdService = (id) => {
    return new Promise((resolve, reject) => {
        getCourseByIdQuery(id,(err,results)=>{
            if(err) return reject(err);
            resolve(results);
        })
    })
        
}