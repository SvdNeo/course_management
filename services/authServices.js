import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../database/userQueries.js';
import { hashPassword, verifyPassword } from '../utils/bcrypt.js';

const JWT_SECRET = process.env.JWT_SECRET;
export const signup = (name, email, password, role) => {
    return new Promise((resolve, reject) => {
        role = role && role.toLowerCase();
        if (role !== 'student' && role !== 'trainer') {
            return reject(new Error('Invalid role'));
        }

        findUserByEmail(email, async (err, users) => {
            if (err) return reject(err);
            if (users.length > 0) return reject(new Error('User already exists'));

            const hashedPassword = await hashPassword(password);
            createUser(name, email, hashedPassword, role, (err, result) => {
                if (err) return reject(err);
                resolve({ message: 'User registered successfully' });
            });
        });
    });
};

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        findUserByEmail(email, async (err, users) => {
            if (err) return reject(err);
            if (users.length === 0) return reject(new Error('User not found'));

            const user = users[0];
            const isMatch = await verifyPassword(password, user.password);
            if (!isMatch) return reject(new Error('Invalid credentials'));

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, role: user.role },
                JWT_SECRET,
                { expiresIn: '1h' } // Token expiration time
            );

            resolve({
                message: 'User logged in successfully',
                token, // Include the token in the response
                role: user.role
            });
        });
    });
};
