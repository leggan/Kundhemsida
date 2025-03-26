import express from 'express'

const profileRoute = express.Router()

// 2024-03-26
profileRoute.get('/profile', (req, res) => {
    const createdAt = new Date(req.user.createdAt);
    const formattedDate = createdAt.toLocaleDateString('sv-SE', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });

    return res.render('profile.ejs', {user: req.user, formattedDate, })
})

profileRoute.delete('/profile', (req, res) => {

})


export default profileRoute