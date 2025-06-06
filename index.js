import express from 'express'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import session from 'express-session'
import passport from 'passport'
import configurePassport from './src/strategies/local-strategy.js'
import UserModel  from './src/schema/userSchema.js'
import connectMongoDBSession  from 'connect-mongodb-session'
import menuRoute from './src/routes/menuRoutes.js'
import orderRoute from './src/routes/orderRoutes.js'
import cors from 'cors'
import productsRoute from './src/routes/productsRoute.js'
import profileRoute from './src/routes/profileRoute.js'
import 'dotenv/config'

const {userSchema, User} = UserModel
const MongoDBStore = connectMongoDBSession(session)

const DB_CONNECTION = process.env.MONGODB_URI
const PORT = process.env.PORT || 3000;


configurePassport()

const store = new MongoDBStore({
    uri: DB_CONNECTION,
    collection: 'sessions'
})

const cartStore = new MongoDBStore({
    uri: DB_CONNECTION,
    collection: 'carts'
})


const app = express()
app.use(express.json())
app.use(cors())
app.set('view-engine', 'ejs')
app.set('views', './src/views')
app.use(express.static('./src/public'))
app.use(express.urlencoded({extended: false})) 

app.use(
    session({
        secret: 'secret',
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
    if(!req.session.products) {
        req.session.products = []
    }
    next()
})



async function connectDB() {
    try {
        console.log('MongoDB URI:', DB_CONNECTION) // tillfällig debug
        await mongoose.connect(DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
            sslValidate: false // Om certifikatet inte är CA-signerat (vanligt hos Render eller Atlas)
        })
        console.log('MongoDB: Running')
    }
    catch(e) {
        console.log(`MongoDB: ${e}`)
    }
}
console.log(process.env.MONGODB_URI)
app.use(menuRoute)
app.use(orderRoute)
app.use(productsRoute)
app.use(profileRoute)

app.get('/', (req, res) => {
    res.render('index.ejs', {user: req.user})
})



app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local',{
    successRedirect: '/', 
    failureRedirect: '/login',
}), (req, res) => {

})



app.get('/logout', (req, res) => {
    
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Kunde inte logga ut" });
        }
        res.clearCookie('secret'); // Radera sessionscookie
        res.json({ message: "Utloggad" });
    });
});



app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`)
    await connectDB()
})
