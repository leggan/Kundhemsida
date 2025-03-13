import express from 'express'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import session from 'express-session'
import passport from 'passport'
import userSchema from './schema/userSchema.js'
import configurePassport from './strategies/local-strategy.js'
import User  from './schema/userSchema.js'
import connectMongoDBSession  from 'connect-mongodb-session'
const MongoDBStore = connectMongoDBSession(session)

configurePassport()

const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/Kundhemsida',
    collection: 'sessions'
})


const app = express()

app.use(express.json())
app.set('view-engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({extended: false})) 
app.use(
    session({
        secret: 'anson the dev',
        saveUninitialized: false,
        resave: false,
        store: store,
        cookie: {
            maxAge: 60000 * 60
        }
    })
)


app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    console.log(`PATH: ${req.path}`)
    console.log(`METHOD: ${req.method}`)
    console.log(`REQ SESSION: ${JSON.stringify(req.session)}`)
    console.log(`AUTHENTICATED: ${req.isAuthenticated()}`)
    console.log(`REQ USER: ${req.user}`)
    console.log(`_______________________________`)
    next()
})


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
    res.render('index.ejs', {username: req.user.username})
})

app.get('/profile', (req, res) => {
    res.render('profile.ejs', {user: req.user})
})

app.delete('/profile', (req, res) => {

})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local',{
    successRedirect: '/', 
    failureRedirect: '/login',
}), (req, res) => {

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
        return res.redirect('/', {newUser})
    } catch (error){
        return res.json({message: e})
    }
})



app.listen(3000, async () => {
    console.log("Server is running on port: 3000")
    await connectDB()
})
