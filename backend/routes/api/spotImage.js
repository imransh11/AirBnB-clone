const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {Spot, Review, SpotImage, User, ReviewImage, Booking} = require('../../db/models')

const router = express.Router()
const {Op, sequelize, fn, literal} = require("sequelize");


//Delete a Spot Image
router.delete('/:imageId',
restoreUser,
async (req, res) => {
    const imageId = parseInt(req.params.imageId);
    const user = req.user.dataValues.id;
    console.log(imageId, user, 'imageId=-------------------------')

    const spotImg = await SpotImage.findOne({
        where: {id: imageId},
        include: [Spot]
    })

    //Error response: Couldn't find a Spot Image with the specified id
    if(!spotImg){
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }

    //Require proper authorization: Spot must belong to the current user
    console.log(spotImg.dataValues.Spot.ownerId, 'spotImg------------------------------')
    if(user !== spotImg.dataValues.Spot.ownerId){
        return res.status(404).json({
            "message": "User must be the owner of the spot",
            "statusCode": 404
        })
    }

    await SpotImage.destroy({
        where: {id: imageId}
    })

    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router
