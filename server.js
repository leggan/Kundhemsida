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
const {userSchema, User} = UserModel
const MongoDBStore = connectMongoDBSession(session)

configurePassport()

const store = new MongoDBStore({
    uri: 'mongodb+srv://lovegu2007:b81TfgWxbQFWU6NW@kundhemsida.crc7f6n.mongodb.net/Kundhemsida',
    collection: 'sessions'
})

const cartStore = new MongoDBStore({
    uri: 'mongodb+srv://lovegu2007:b81TfgWxbQFWU6NW@kundhemsida.crc7f6n.mongodb.net/Kundhemsida',
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


app.use((req, res, next) => {
    console.log(`PATH: ${req.path}`)
    console.log(`METHOD: ${req.method}`)
    console.log(`REQ SESSION: ${JSON.stringify(req.session)}`)
    console.log(`AUTHENTICATED: ${req.isAuthenticated()}`)
    console.log(`REQ USER: ${req.user ? req.user: 'Nothing'}`)
    console.log(req.session.productId || 'Odefinerad')
    console.log(`_______________________________`)
    next()
})


async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://lovegu2007:b81TfgWxbQFWU6NW@kundhemsida.crc7f6n.mongodb.net/Kundhemsida')
        console.log('MongoDB: Running')
    }
    catch(e) {
        console.log(`MongoDB: ${e}`)
    }
}

app.use(menuRoute)
app.use(orderRoute)
app.use(productsRoute)

app.get('/', (req, res) => {
    res.render('index.ejs', {user: req.user})
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
    const email = req.body.email
    console.log(`EMAILADDRESS: ${email}`)
    try {
        const findEmailUser = await User.findOne({email: email})
        const usernameUser = await User.findOne({username: username })
        if(usernameUser && findEmailUser) {
            return res.json({message: 'Användarnament och emailaddressen är upptagen.'})
        }
        if(findEmailUser){
            return res.json({message: 'Emailaddressen är redan registrerad'})
        }
        if(usernameUser) {
            return res.json({message: 'Användarnamnet är upptaget'})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({username: username, email: email, password: hashedPassword})
        return res.redirect(301, '/login');
    } catch (error) {
        return res.status(500).send({ message: error.message || "Internal Server Error" });
    }
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



app.listen(3000, async () => {
    console.log("Server is running on port: 3000")
    await connectDB()
})
