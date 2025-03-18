import passport from 'passport'
import { Strategy} from 'passport-local'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import UserModel from '../schema/userSchema.js'
const {userSchema, User} = UserModel
 
const configurePassport = async () => {
    passport.use(
        new Strategy({usernameField: 'email'}, async function(email, password, done) {
            if(!email  || !password) {
                return done('1', false)
            } else {
                const findUser = await User.findOne({email: email}) 
                console.log(`FindUser PSW: ${findUser}`)
                if(findUser) {
                    try {
                        const match = await bcrypt.compare(password, findUser.password)
                        if(match) {
                            return done(null, findUser)
                        } else {
                            return done('3', false)
                        }
                    } catch(error) {
                        return done(`4 ${error}`, false)
                    }
                } else {
                    console.log('5')
                    return done('5', false)
                }
            }
        })
    )
    passport.serializeUser((findUser, done) => {
        console.log(`SERIALIZE USER: ${findUser.id}`)
        done(null, findUser.id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            console.log(`DESERIALIZE USER: ${id}`);
            const user = await User.findById(id); 
            if (!user) return done(null, false);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

export default configurePassport