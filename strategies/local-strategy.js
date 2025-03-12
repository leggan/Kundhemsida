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
                return done(error, false)
            } else {
                const findUser = await User.findOne({username: username}) 
                console.log(`FindUser PSW: ${findUser.password}`)
                if(findUser) {
                    try {
                        const match = await bcrypt.compare(password, findUser.password)
                        if(match) {
                            return done(null, true)
                        } else {
                            return done(true)
                        }
                    } catch(error) {
                        return done(error, false)
                    }
                } 
            }
        })
    )
}

export default configurePassport