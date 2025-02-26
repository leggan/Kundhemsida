import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs")
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/auth', (req, res) => {
    res.render('account')
})

app.listen(3000, () => {
    console.log("Website running.")
})