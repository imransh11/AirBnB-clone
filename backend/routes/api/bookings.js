const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {Spot, Review, SpotImage, User, ReviewImage, Booking} = require('../../db/models')

const router = express.Router()
const {Op, sequelize, fn, literal} = require("sequelize");



//Get all of the Current User's Bookings
router.get('/current',
restoreUser,
async (req, res) => {
    const userId = req.user.dataValues.id
    console.log(userId, 'user---------------------')

    const bookings = await Booking.findAll({
        where: {userId: userId},          //change id==========================
        include: [Spot]
    })

    const spotimg = await SpotImage.findAll({

    })
    // console.log(spotimg.dataValues, 'test----------')
    console.log(bookings, 'bookings------------------------')
    const obj = {"Bookings": []};
    // const key = "Spot";
    const key1 = "previewImage";
    let spot;

    bookings.forEach(ele => {
        let final = ele.dataValues
        spot = ele.dataValues.Spot.dataValues
        // console.log(spot, 'spot----------------')
        spotimg.forEach(ele1 =>{
            // console.log(ele1.dataValues.spotId, 'ele1----------------')
            // console.log(ele1.dataValues.url, 'ele1IMG----------------')
            const img = ele1.dataValues.url
            // console.log(img, 'img--------------')
            if(spot = ele1.dataValues.spotId){
                final.Spot.dataValues[key1] = img;
            }
        })

        delete final.Spot.dataValues.createdAt;
        delete final.Spot.dataValues.updatedAt;
        delete final.Spot.dataValues.description;

        // console.log(final, 'ele-------------------------')
        obj.Bookings.push(final)
    });

    // console.log(obj, 'obj---------------')

    res.status(200).json(obj)

})


//Edit a Booking
router.put('/:bookingId',
restoreUser,
async (req, res) => {
    const id = parseInt(req.params.bookingId);
    const {startDate, endDate} = req.body;
    const start = new Date (startDate).getTime();  //not sure
    const end = new Date (endDate).getTime();  // not sure
    const user = req.user.dataValues.id
    // console.log(id, start, end, 'test-------------------------')
    // console.log(user, 'user-----------------')

    const booking = await Booking.findOne({
        where: {id: id}
    })
    // console.log(booking.dataValues.userId, spotId, 'booking-----------------')

    //Error response: Couldn't find a Booking with the specified id
    if(!booking){
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    const spotId = booking.dataValues.spotId

    //Require proper authorization: Booking must belong to the current user
    if(user !== booking.dataValues.userId){
        return res.status(404).json({
                "message": "Booking couldn't be found",
                "statusCode": 404
        })
    }

    //Error response: Body validation errors
    if(start > end){
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
            "endDate": "endDate cannot come before startDate"
            }
        })
    }

    //Error response: Can't edit a booking that's past the end date
    const today = new Date()
    const todayInMil = today.getTime()
    // console.log(todayInMil, 'today------------------------')

    if(todayInMil > end){
        return res.status(403).json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }

    //Error response: Booking conflict
    const bookinglist = await Booking.findAll()

    for(let i = 0; i < bookinglist.length; i++){
        // console.log(bookinglist[i].dataValues.startDate)
        let startlist = new Date (bookinglist[i].dataValues.startDate).getTime();
        let endlist = new Date (bookinglist[i].dataValues.endDate).getTime();
        // console.log(startlist, endlist)

        if(spotId === bookinglist[i].dataValues.spotId){
            if(startlist === start|| endlist === end){
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

    await Booking.update({
        spotId, user, startDate, endDate
    },{
        where: {id: id}
    })

    const updated = await Booking.findOne({
        where: {id: id}
    })

    res.status(200).json(updated)
})


//Delete a Booking
router.delete('/:bookingId',
restoreUser,
async (req, res) => {
    const user = req.user.dataValues.id;
    const id = parseInt(req.params.bookingId);
    // console.log(user, id, 'user----------')

    const booking = await Booking.findOne({
        where: {id: id},
        include: [Spot]
    })
    // console.log(booking.dataValues.userId,
    //     booking.Spot.dataValues.ownerId, 'booking---------------')

    //Error response: Couldn't find a Booking with the specified id
    if(!booking){
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
    })
    }

    //Require proper authorization: Booking must belong to the current user
    //or the Spot must belong to the current user
    const userId = booking.dataValues.userId;
    const ownerId = booking.Spot.dataValues.ownerId;
    const startTimeinMil = booking.dataValues.startDate.getTime()
    const endTimeinMil = booking.dataValues.endDate.getTime()
    // console.log(userId, ownerId, 'user/owner-----------------')

    if(user !== userId && user !== ownerId){
        return res.status(403).json({
            "message": "Require proper authorization from Spot Owner or User that booked",
            "statusCode": 403
    })
    }

    //Error response: Bookings that have been started can't be deleted
    const today = new Date;
    const todayInMil = today.getTime()
    // console.log(startTimeinMil, endTimeinMil, todayInMil, 'start---------------------')

    if(startTimeinMil < todayInMil){
        return res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    }

    await Booking.destroy({
        where: {id: id}
    })

    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})

module.exports = router;
