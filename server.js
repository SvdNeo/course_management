import express from 'express';
import con from './config/mysql_db_config.js';
import authRoutes from './routes/authRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
