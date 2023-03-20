const express = require('express')
const {Spot, Review, SpotImage} = require('../../db/models')
const router = express.Router()
const {Op, sequelize, fn, literal} = require("sequelize")

router.get('/', async (req, res) => {
    // console.log('in the route', Spot)
    let obj = { "Spots": []}

    const spot = await Spot.findAll({
        include: [SpotImage, Review]
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

module.exports = router
