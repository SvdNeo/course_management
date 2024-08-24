import express from 'express';
import con from './config/mysql_db_config.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
