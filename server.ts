import express from "express"
import mongoose from 'mongoose'
import path from "path";
import adminRoutes from './routes/admin'
import { createClient } from 'redis'

const app = express();

// إعدادات العرض
app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), 'views'));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/admin', adminRoutes);

const REDIS_HOST = 'redis';
const REDIS_PORT = 6379
const redisClient = createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connected to redis... '));

// MongoDB
const DB_USER = 'root'
const DB_PASSWORD = 'root123'
const DB_PORT = '27017'
const DB_HOST = 'mongo'
const URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`

async function main() {
    try {
        await redisClient.connect();
        console.log("✅ Redis connected");

        await mongoose.connect(URL);
        console.log("✅ MongoDB connected");

        // Routes
        app.get('/products', async (req, res) => {
            await redisClient.set('products', 'products...');
            res.send('<h1>Hello in the Home Page dev</h1><br><p>Welcome !</p>');
        });

        app.get('/data', async (req, res) => {
            const product = await redisClient.get('products');
            res.send(`<h1>Hello in the Home Page dev</h1><h2>${product}</h2>`);
        });

        app.get('/', (req, res) => {
            res.render('home');
        });

        const PORT: number = 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error during startup", error);
    }
}

main();
