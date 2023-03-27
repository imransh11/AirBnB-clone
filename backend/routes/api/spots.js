const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {Spot, Review, SpotImage, User, ReviewImage, Booking} = require('../../db/models')

const router = express.Router()
const {Op, sequelize, fn, literal} = require("sequelize");
const booking = require('../../db/models/booking');

router.get('/', async (req, res) => {
    // console.log('in the route', Spot)
    let obj = { "Spots": []}
    let {page, size} = req.query;

    if(!page) page = 1;
    if(!size) size = 20;

    page = parseInt(page);
    size = parseInt(size);
    // console.log(page, size, '-----------------')
    const pagination = {};
    if(page >=1 && size >=1){
        pagination.limit = size;
        pagination.offset = size * (page-1)
    }
    console.log(pagination, '-------------------')

    
    const spot = await Spot.findAll({
        include: [SpotImage, Review],

        ...pagination
    })

    // const rev = await Review.count({
    //     // where: {
    //     //     spotId: {
    //     //         [Op.eq]: 1
    //     //     }
    //     // }
    //     // console.log(rev, 'rev---------------------')
    // })

    // const avg = await Review.findAll({
    //     attributes:{
    //         include: [
    //             [
    //                 sequelize.fn("AVG", sequelize.col("stars")),
    //                 "avgAll"
    //             ]
    //         ]
    //     }
    // });

    // console.log(avg, 'avg----------------------')

    spot.forEach(ele => {
        let key = "previewImage"
        let key1 = "avgRating"
        // console.log('spotttttttttt', ele.dataValues.SpotImages)
        // console.log('stars--------', ele.dataValues.Reviews)
        // review
        // console.log('spotttttttttt', ele.Reviews)

        //image url for each
        let rev = ele.dataValues.SpotImages
        let sta = ele.dataValues.Reviews
        rev.forEach(ele1 => {
            // ele.dataValues[key] = "image url"
            ele.dataValues[key] = ele1.dataValues.url
            // console.log(ele1.dataValues.url, 'eleeeeeeeee---------')
        })

        // const size = sta.count()
        // console.log(size, 'size-----------------')


        sta.forEach(ele2 => {
            // console.log(ele2.toJSON(), 'ele2----------------')
            // const size = ele2.count()
        })

        //delet SpotImages/Reviews
        // console.log(ele.dataValues, 'test----------------')

        delete ele.dataValues.SpotImages
        delete ele.dataValues.Reviews
        // console.log(ele, 'Afterrr----------')

        //push to obj.spot array
        obj.Spots.push(ele)
    })

    // console.log('finallllllllllllll', obj)


    const image = await SpotImage.findAll({
        attributes: ['url']
    })

    // console.log(image, 'url--------------')
    // let jspot = spot.foreach( arr => {
    //     arr.toJSON()
    // })

    // let jspot = spot.toJSON()
    // let first = spot[0]
    // console.log('testtttttt', first.dataValues.Reviews)

    // rev.forEach(element => {
    //     console.log(element.dataValues.stars, '--------------')
    // });

    // console.log(rev, 'RAtingggg')
    // console.log(jspot, '--------------------json')
    // image.forEach(ele => {
    //     console.log(ele.toJSON(), "-------")
    // })

    return res.json(obj)
}
)


//spots owned by current user
router.get('/current',
restoreUser,
async (req, res) => {
    let obj = {"Spots": []}
    // console.log(req.user.dataValues.id, '-------------')
    let owner = req.user.dataValues.id
    // console.log(owner, '----------------------')

    const userSpot = await Spot.findAll({
        where: {ownerId : owner},
        include: [SpotImage, Review]
    })
    // console.log(userSpot.dataValues, 'user----------------')


    // let spot = userSpot.dataValues
    // console.log(userSpot, 'spot--------------')
    userSpot.forEach( ele => {          //spot
        // console.log(ele.dataValues, 'ele----------------------')
        const imageArr = []
        let key = "previewImage"

        //get imgurl

        let spotImg = ele.dataValues.SpotImages
        // console.log(spotImg, 'spotImg-------------------------')
        // console.log(spotImg[0].dataValues.url, 'images-------------------');
        // imageArr.push(spotImg[0].dataValues.url)


        spotImg.forEach(ele1 => {       //image(s) for each spot
                // console.log(ele1.dataValues.url, 'ele-------------------')
                imageArr.push(ele1.dataValues.url)


                // spot[key] = imgUrl
                // console.log(ele, 'ele---------------')

            })
            // console.log(imageArr, 'arr---------------------------')
            let imgUrl = imageArr[0]
            // console.log(imgUrl, 'url-------------------')

            //add to spot obj
            ele.dataValues[key] = imgUrl

            //delet SpotImages
            delete ele.dataValues.SpotImages

            console.log(ele.dataValues, "after-----------------------")
            obj.Spots.push(ele.dataValues)
        })



    //delet SpotImages
    // delete.

    // console.log(spot.SpotImages, '----------------spot')



    // console.log(obj, 'obj-------')

    res.status(200).json(obj)
})


//spot from spot id
router.get('/:spotId', async (req, res) => {
    let inputId = req.params.spotId

    // let final =
    const spot = await Spot.findOne({
        where: {id : inputId},
        include: [SpotImage, Review, User]
    })

    //error
    // console.log(spot, '------------------')
    if(spot === null){
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    //numReviews
    // const num = await Review.count() //counting no. of reviews

    let key = "numReviews"
    let key1 = "avgStarRating"
    let key3 = "Owner"
    let test = spot  //.toJSON()
    // console.log(test.Reviews, 'spot--------------1111111')
    // console.log(test.dataValues, 'adddddddddddddddddddddd')
    let numRev = 0
    let avgStar = 0
    let reviewArr = test.Reviews   //counting no. of reviews for a specific spot
    reviewArr.forEach( ele => {
        // console.log(ele.stars, 'eleeeeeeeeeeeeeeeeeeeeeee')
        // if(isNaN(avgStar)) {parseInt(avgStar)}
        // if(isNaN(ele.stars)) {parseInt(ele.stars)}
        avgStar += ele.stars
        numRev++
    })

    test.dataValues[key1] = avgStar/numRev // adding to obj and calculate avg

    test.dataValues[key] = numRev // adding to obj
    // console.log(numRev, avgStar, "rowssssssssssssssssssssssss")

    //delete Review
    delete test.dataValues.Reviews;

    //SpotImages only show id, url, preview
    const spotImg = test.dataValues.SpotImages
    // console.log(spotImg, 'test----------------------')
    spotImg.forEach( ele =>{
        // console.log(ele.dataValues.createdAt, 'test-----------')
        delete ele.dataValues.createdAt
        delete ele.dataValues.updatedAt
    })
    // console.log(test.dataValues.User.dataValues.firstName,
    //     test.dataValues.User.dataValues.lastName, 'testArrrrrrrrrrrrrr')

    const ownerId = test.dataValues.User.dataValues.id
    const ownerFirst = test.dataValues.User.dataValues.firstName
    const ownerLast = test.dataValues.User.dataValues.lastName

    //owner obj
    const Owner = {};
    Owner.id = ownerId;
    Owner.firstName = ownerFirst;
    Owner.lastName = ownerLast;
    // console.log(Owner, 'obj----------------------------')

    //adding owner to result
    test.dataValues.Owner = Owner;

    //delete User
    delete test.dataValues.User
    // console.log(test.dataValues, 'obj---------')

    res.status(200).json(spot)
})

//Creat a Spot
router.post('/',
 restoreUser,
 async(req, res) => {

        const {address, city, state, country, lat, lng, name, description, price} = req.body;
        // console.log(req.user.dataValues.id)
        console.log(req.body, '-----------------')

        //error
        // if()
        const ownerId = req.user.dataValues.id
        // console.log(ownerId)

        // console.log(ownerId, address, city, state, country, lat, lng, name, description, price,
        //     'test--------------------------')

            const newSpot = await Spot.create({
                ownerId, address, city, state, country, lat, lng, name, description, price
            })
            // console.log(newSpot, '-------------------')

        res.status(201).json(newSpot)
})

router.post('/:spotId/images',
    restoreUser,
    async (req, res) => {
        // console.log(req.body, '-------')
        // console.log(req.user, 'userrrrrrrrrr')

        //check if spot belongs to current owner
        let currentUserId = req.user.dataValues.id;
        const spotId = parseInt(req.params.spotId)
        console.log(currentUserId, 'current user---------------')
        console.log(spotId, 'current spot---------------')

        const currSpot = await Spot.findOne({
            where: {id: spotId}
        })

        console.log(currSpot, 'currSpot--------------------')
        // console.log(currSpot.dataValues.ownerId, '-----------------------')
        // console.log(currSpot.dataValues.id, '-----------------------')

        //error spotId
        if(!currSpot){
            return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }
        //error not owner
        if(currentUserId !== currSpot.dataValues.ownerId){
            return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        //image
        const {url, preview} = req.body
        // console.log(url, preview, 'test-----------')

        //add img
        const newImg = await SpotImage.create({
            spotId, url, preview
        })
        // console.log(newImg, 'Img--------------------')

        //res

        delete newImg.dataValues.spotId;
        delete newImg.dataValues.updatedAt;
        delete newImg.dataValues.createdAt;
        // console.log(newImg.dataValues, 'val--------')
        res.status(200).json(newImg)
    })

    router.put('/:spotId',
        restoreUser,
        async (req, res) => {
            const spotId = parseInt(req.params.spotId) //spot

            const {address, city, state, country, lat, lng, name,
                description, price}
            = req.body;

            const ownerId = req.user.id
            // console.log(ownerId, spotId,
            //     'userId------------')
            // console.log(currSpotId, address, city, state, country, lat, lng, name,
            //     description, price, 'test--------')

            //spot
            const currSpot = await Spot.findOne({
                where: {id: spotId }
            })
            // console.log(spot.dataValues.ownerId, 'spot-----------------')

            //error spotId
        if(!currSpot){
            return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

            //error not owner
        if(ownerId !== currSpot.dataValues.ownerId){
            return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        const updatedSpot = await Spot.update({
            ownerId, address, city, state, country, lat, lng, name,
            description, price
        }, {
            where: {id: spotId}
        })
        // console.log(updatedSpot, 'update-------------------')


        res.status(200).json(currSpot)
    })

    router.delete('/:spotId',
    restoreUser,
    async (req, res) => {
        const spotId = req.params.spotId; //
        console.log(spotId)

        const currSpot = await Spot.findOne({
            where: {id: spotId}
        })
        // console.log(currSpot, 'currSpot-----')

        if(!currSpot){
            return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        await Spot.destroy({
            where: {id :spotId}
        })

        res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    })


    //Create a Review for a Spot based on the Spot's id
    router.post('/:spotId/reviews',
    restoreUser,
    async (req, res) => {
        const spotId = parseInt(req.params.spotId) //
        const {review, stars} = req.body
        const userId = req.user.dataValues.id
        // console.log(spotId, review, stars, userId, 'test----------------------')

        const spot = await Spot.findOne({
            where: {id: spotId}
        })

        //Error response: Couldn't find a Spot with the specified id
        if(!spot){
            return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        //Error response: Review from the current user already exists for the Spot
        const currReviews = await Review.findAll({
            where: {spotId: spotId}
        })
        // console.log(currReviews, 'test---------------------')
        currReviews.forEach( ele => {
            const user = ele.dataValues.userId;
            // console.log(user, 'test---------------------')
            if(userId === user){
                return res.status(404).json({
                    "message": "User already has a review for this spot",
                    "statusCode": 403
                })
            }
        })

        const rev = await Review.create({
            spotId, userId, review, stars
        })

        res.status(201).json(rev)

    })


    //Get all Reviews by a Spot's id
    router.get('/:spotId/reviews',
    async (req, res) => {
        const obj = { "Reviews": []}
        const spotId = req.params.spotId;
        // console.log(spotId, 'test-----------------')

        const rev = await Review.findAll({      //rev (Array)
            where: {spotId: spotId},
            include: [User, ReviewImage]
        })
        // console.log(rev, 'rev-----------------------------')

        rev.forEach(ele => {
            // console.log(ele.dataValues.User.dataValues.username, 'ele---------------------')
            // console.log(ele.dataValues.ReviewImages, 'ele---------------------')

            //
            let revImg = ele.dataValues.ReviewImages
            // console.log(revImg, 'revImg---------------------')
            revImg.forEach( ele1 => {
                console.log(ele1.dataValues.updatedAt, 'ele1--------------')
                delete ele1.dataValues.reviewId  //delete reviewId
                delete ele1.dataValues.createdAt  //delete createdAt
                delete ele1.dataValues.updatedAt  //delete updatedAt

            })

            //delete username form user
            delete ele.dataValues.User.dataValues.username

            obj.Reviews.push(ele.dataValues)
        })

        //Error response: Couldn't find a Spot with the specified id
        if(!rev.length){
            return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        res.status(200).json(obj)
    })


    //Get all Bookings for a Spot based on the Spot's id
    router.get('/:spotId/bookings',
    restoreUser,
    async (req, res) => {
        const spotId = parseInt(req.params.spotId);
        const userId = req.user.dataValues.id;
        // console.log(userId, 'spotId--------------------------')
        const obj = {"Bookings": []}

        const booking = await Booking.findOne({
            where: {spotId: spotId},
            // include: [User]
        })
        // console.log(booking.dataValues.userId, 'booking-----------------------')

        //Error response: Couldn't find a Spot with the specified id
        if(!booking){
            return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }


        const user = await User.findOne({
            where: {id: userId}
        })
        // console.log(user, 'user-------------------')
        // obj.Bookings.push(user)
        const objUser = {"User": {user}}

        if(userId !== booking.dataValues.userId){
            delete booking.dataValues.id;
            delete booking.dataValues.userId;
            delete booking.dataValues.createdAt;
            delete booking.dataValues.updatedAt;

            obj.Bookings.push(booking)

            res.status(200).json(obj)

        } else {
            obj.Bookings.push(objUser);
            obj.Bookings.push(booking);

            res.status(200).json(obj)
        }


    })


    //Create a Booking from a Spot based on the Spot's id
    router.post('/:spotId/bookings',
    restoreUser,
    async (req, res) => {
        const {startDate, endDate} = req.body;
        const spotId = parseInt(req.params.spotId);
        const userId = req.user.dataValues.id;
        const date = new Date (startDate)
        const date1 = new Date (endDate)
        const startDateMilli = date.getTime(startDate)
        const endDateMilli = date1.getTime(endDate)
        // console.log(startDate, endDate, spotId, userId, 'dates----------------')
        // console.log(startDateMilli, endDateMilli, 'spotId------------------------')

        const spot = await Spot.findOne({
            where: {id: spotId},
            // include: [Booking]
        })
        // console.log(spot.dataValues.ownerId, 'spot-------------------------')
        // console.log(spot.dataValues.Bookings, 'booking---------------------')
        const booking = await Booking.findAll();
        // console.log(booking)

        //Require proper authorization: Spot must NOT belong to the current user
        if(userId === spot.dataValues.ownerId){
            return res.status(404).json({
                "message": "User can't be the owner",
                "statusCode": 404
            })
        }

        //Error response: Couldn't find a Spot with the specified id
        if(!spot){
            return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }

        //Error response: Booking conflict
        for (let i=0; i< booking.length; i++){
            // console.log(booking[i].dataValues.startDate, 'ele--------------------')
            // console.log(booking[i].dataValues.spotId, 'ele--------------------')
            let start = new Date (booking[i].dataValues.startDate).getTime();
            let end = new Date (booking[i].dataValues.endDate).getTime();
            // console.log(start, end, 'start -----------------------')

            if(spotId === booking[i].dataValues.spotId){

                if(start === startDateMilli || end === endDateMilli){
                    return res.status(403).json({
                        "message": "Sorry, this spot is already booked for the specified dates",
                        "statusCode": 403,
                        "errors": {
                        "startDate": "Start date conflicts with an existing booking",
                        "endDate": "End date conflicts with an existing booking"
                     }
                    })
                }

            }
        }

        const bookSpot = await Booking.create({
            spotId, userId, startDate, endDate
        })

        res.status(200).json(bookSpot)
    })


module.exports = router;
