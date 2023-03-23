const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {Spot, Review, SpotImage, User, ReviewImage} = require('../../db/models')

const router = express.Router()
const {Op, sequelize, fn, literal} = require("sequelize")

//Get all Reviews of the Current User
router.get('/current',
restoreUser,
async (req, res) => {

    const user = req.user.dataValues.id
    // console.log(user, 'test---------------')

    const rev = await Review.findAll({
        where: {userId: user},
        include: [Spot, ReviewImage]
    })
    console.log(rev, 'review------------')


})

//Create a Review for a Spot based on the Spot's id


module.exports = router;
