const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {Spot, Review, SpotImage, User, ReviewImage, Booking} = require('../../db/models')

const router = express.Router()
const {Op, sequelize, fn, literal} = require("sequelize");



//Delete a Review Image
router.delete('/:imageId',
restoreUser,
async (req, res) => {
    const imageId = parseInt(req.params.imageId);
    const user = req.user.dataValues.id;
    console.log(imageId, user, 'imageId---------------------')

    const revImg = await ReviewImage.findOne({
        where: {id: imageId},
        include: [Review]
    })

    //Error response: Couldn't find a Review Image with the specified id
    if(!revImg){
        return res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    //Require proper authorization: Review must belong to the current user
    const userId = revImg.dataValues.Review.dataValues.userId;
    console.log(userId, 'revImg---------------')

    if(user !== userId){
        return res.status(404).json({
            "message": "User for this Review must be logged in",
            "statusCode": 404
        })
    }

    await ReviewImage.destroy({
        where: {id: imageId}
    })

    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
