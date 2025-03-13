import passport from 'passport'
import { Strategy} from 'passport-local'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import userSchema from '../schema/userSchema.js'
import User from '../server.js'
 
const configurePassport = async () => {
    passport.use(
        new Strategy(async(username, password, done) => {
            if(!username  || !password) {
                return done()
            } else {
                const findUser = await User.findOne({username: username}) 
                console.log(`FindUser PSW: ${findUser}`)
                if(findUser) {
                    try {
                        const match = await bcrypt.compare(password, findUser.password)
                        if(match) {
                            return done(null, true)
                        } else {
                            return done('Wrong password', false)
                        }
                    } catch(error) {
                        return done(error, false)
                    }
                } else {
                    console.log('User doesnt exists!')
                    return done(null, false)
                }
            }
        })
    )
    passport.serializeUser((findUser, done) => {
        console.log(findUser)
        done(null, findUser.id)
    })
    passport.serializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)
        }
        catch(error) {
            console.log(error)
        }
    })
}

export default configurePassport