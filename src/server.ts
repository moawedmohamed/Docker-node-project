import express from "express"
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello in the Home Page dev</h1><br><p>Welcome again!</p>');
})
const PORT: number = 5000
app.listen(PORT, () => {
    console.log(`the server is running in port ${PORT}`);

}) 