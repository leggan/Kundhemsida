import express  from "express";

const menuRoutes = express.Router()

menuRoutes.get('/meny', (req, res) => {
    res.render('menu.ejs', {user: req.user})
})

export default menuRoutes

