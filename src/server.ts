import express, { Request, Response } from "express"
import mongoose from 'mongoose'
import { createClient } from "redis";
const app = express();
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';
const redisClient = createClient();
(async () => {
    const redisClient = createClient({
        url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    });
    redisClient.on('error', (err) => console.log('error connection of redis', err))
    redisClient.on('connect', () => console.log(' connection of redis successfully'))
    await redisClient.connect()
})()
const DB_USER = 'root'
const DB_PASSWORD = 'root123'
const DB_PORT = '27017'
const DB_HOST = 'mongo'
const URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
mongoose
    .connect(URL)
    .then(() => console.log('connection has been successfully')).
    catch(() => console.log('connection faild ...'))
app.get('/', (req:Request, res:Response) => {
    redisClient.set("products",'products..')
    res.send('<h1>Hello in the Home Page dev</h1><br><p>Welcome !</p>');
})
const PORT: number = 5000
app.listen(PORT, () => {
    console.log(`the server is running in port ${PORT}`);

}) 