import express from "express"
import mongoose from 'mongoose'
const app = express();

const DB_USER = 'root'
const DB_PASSWORD = 'root123'
const DB_PORT = '27017'
const DB_HOST = 'mongo'
const URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
mongoose
    .connect(URL)
    .then(() => console.log('connection has been successfully')).
    catch(() => console.log('connection faild ...'))
app.get('/', (req, res) => {
    res.send('<h1>Hello in the Home Page dev</h1><br><p>Welcome !</p>');
})
const PORT: number = 5000
app.listen(PORT, () => {
    console.log(`the server is running in port ${PORT}`);

}) 