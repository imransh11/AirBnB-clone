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
        include: [Spot, ReviewImage, User]
    })
    // console.log(rev, 'review------------')

    const revImg = await SpotImage.findAll({})
    // console.log(revImg, 'img-----------------')

    const obj = { "Reviews": []}



    rev.forEach( ele => {
        const key = "previewImage";
        // console.log(ele, 'eleID--------------')
        // console.log(ele.Spot.dataValues.id, 'ele===========') //+ previewImage -crated
        // console.log(ele.ReviewImages, 'ele------------------') //-revId - created
        const img = []

        revImg.forEach(ele2 =>{  //ReviewImage
            // console.log(ele2.dataValues.spotId, 'ele2-----------')
            // console.log(ele2.dataValues.url, 'ele2-----------') //.preview
            if(ele.Spot.dataValues.id = ele2.dataValues.spotId){
                img.push(ele2.dataValues.url)
            }
        })
        // console.log(img, 'spot---------------------')
        ele.Spot.dataValues[key] = img[0]

        ele.ReviewImages.forEach(ele3 => {
            // console.log(ele3, 'ele3---------------------')

            delete ele3.dataValues.reviewId
            delete ele3.dataValues.updatedAt
            delete ele3.dataValues.createdAt
        })

        delete ele.Spot.dataValues.createdAt
        delete ele.Spot.dataValues.updatedAt
        delete ele.User.dataValues.username

        obj.Reviews.push(ele)
    })

    res.status(200).json(obj)
})


//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images',
restoreUser,
async (req, res) => {
    const reviewId = parseInt(req.params.reviewId);
    const {url} = req.body;
    // console.log(reviewId, url, '--------------------------');

    const rev = await Review.findOne({
        where: {id: reviewId}
    })
    // console.log(rev, '--------------------------')

    if(!rev){
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    //Error response: Cannot add any more images because
    //there is a maximum of 10 images per resource

    const img = await ReviewImage.findAll({
        where: {reviewId: reviewId}
    })
    // console.log(img.length, 'img------------------------')

    if(img.length >= 10){
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }

    const review = await ReviewImage.create({
        reviewId, url
    });

    // console.log(review, 'test=-------------------')

    delete review.dataValues.reviewId;
    delete review.dataValues.updatedAt;
    delete review.dataValues.createdAt;

    res.status(200).json(review)
})


//Edit a Review
router.put('/:reviewId',
restoreUser,
async (req, res) => {
    const reviewId = parseInt(req.params.reviewId)
    const userId = req.user.dataValues.id;
    const {review, stars} = req.body;
    // console.log(user, reviewId, '-----------------------');

    const revToUpdate = await Review.findOne({
        where: {id: reviewId}
    })
    // console.log(revToUpdate, 'revToUpdate=====================')


    //Error response: Couldn't find a Review with the specified id
    if(!revToUpdate){
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    //Require proper authorization: Review must belong to the current user
    if(userId !== revToUpdate.dataValues.userId){
        return res.status(404).json({
            "message": "User for review needs to be logged in",
            "statusCode": 404
        })
    }

    const spotId = revToUpdate.dataValues.spotId

    const updatedReview = await Review.update({
        spotId, userId, review, stars
    }, {
        where: {id: reviewId}
    })

    const updated = await Review.findOne({
        where: {id: reviewId}
    })

    res.status(200).json(updated)
})


//Delete a Review
router.delete('/:reviewId',
restoreUser,
async (req, res) => {
    const id = parseInt(req.params.reviewId);
    const user = req.user.dataValues.id;

    // console.log(id, user, '----------------')

    const review = await Review.findOne({
        where: {id: id}
    })
    // console.log(review.dataValues.userId, '----------------')

    //Error response: Couldn't find a Review with the specified id
    //Require proper authorization: Review must belong to the current user
    if(!review || user !== review.dataValues.userId){
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    await Review.destroy({
        where: {id: id}
    })

    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})




module.exports = router;
