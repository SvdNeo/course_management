import * as authService from '../services/authServices.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const result = await authService.signup(name, email, password, role);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};
