import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Middleware to verify JWT and attach user info to req
export const authenticate = (req, res, next) => {
    
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) return res.status(401).json({ message: 'No token provided' });

    // Verify token and extract user info
    promisify(jwt.verify)(token, process.env.JWT_SECRET)
        .then(decoded => {
          
            req.user = decoded; // Attach user info to req
            next();
        })
        .catch(err => res.status(401).json({ message: 'Invalid token' }));
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
   
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });

    }
  
    next();
};
