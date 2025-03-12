import express from 'express'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import session from 'express-session'
import passport from 'passport'
import userSchema from './schema/userSchema.js'
import configurePassport from './strategies/local-strategy.js'
configurePassport()


const app = express()
const User = mongoose.model('User', userSchema)

app.use(express.json())
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false})) 
app.use(cookieParser("helloworld"))
app.use(
    session({
        secret: 'anson the dev',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60
        }
    })
)

app.use(passport.initialize())
app.use(passport.session())

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Kundhemsida')
        console.log('MongoDB: Running')
    }
    catch(e) {
        console.log(`MongoDB: ${e}`)
    }
}

app.get('/', (req, res) => {
    res.render('index.ejs', {name : 'Kyle'})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    const username = req.body.username
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({username: username, password: hashedPassword})
        await newUser.save()
        return res.json({message: 'Kontot skapat!'})
        res.redirect('/login')
    } catch (error){
        return res.json({message: e})
    }
})



app.listen(3000, async () => {
    console.log("Server is running on port: 3000")
    await connectDB()
})

export default User