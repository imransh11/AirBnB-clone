import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { spotDetail, updateSpot } from "../../store/spots"
import { useHistory } from "react-router-dom"






const UpdateSpot = ({spot}) => {

    // console.log(spot.SpotImages, 'in UPDatespot---')
    const [country, setCountry] = useState(spot.country)
    const [streetAdress, setStreeAdress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [latitude, setLatitude] = useState(spot.latitude)
    const [longitude, setLongitude] = useState(spot.longitude)
    const [description, setDescription] = useState(spot.description)
    const [title, setTitle] = useState(spot.name)
    const [price, setPrice] = useState(spot.price)
    const [url, setUrl] = useState(spot.SpotImages[0].url)
    const [imageURL1, SetImageURL1] = useState(spot.SpotImages[1].url)

    // if(!spot.SpotImages[2]){
    //     return;
    // }else {

    // }

    const [imageURL2, SetImageURL2] = useState(spot.imageURL2)
    const [imageURL3, SetImageURL3] = useState(spot.imageURL3)
    const [imageURL4, SetImageURL4] = useState(spot.imageURL4)

    //validations
    const[validationErrors, setValidationErrors] = useState({})

    const dispatch = useDispatch()
    const history = useHistory()
    const spotId = spot.id
    // console.log(spotId, 'spotId---------required')



    const handleSubmit = async (e) => {
        e.preventDefault();

            // const checkImg = (url) => {
            //     const ext = ['.png','.jpg','.jpeg']
            //     for(let i = 0; i < ext.length; i++){
            //         if(url.includes(ext[i])){
            //             return true
            //         }
            //     }return false
            // }

            // console.log(url,'imageurl-------------------')
            const errors = {};
            if(!country.length) errors['country'] = 'Country is required'
            if(!streetAdress.length) errors['address'] = 'Address is required'
            if(!city.length) errors['city'] = 'City is required'
            if(!state.length) errors['state'] = 'State is required'
            if(description.length < 30) errors['description'] = 'Description needs a minimum of 30 Characters'
            if(!title.length) errors['title'] = 'Name is required'
            if(!price) errors['price'] = 'Price is required'
            // if(url && !checkImg(url)) {
            //     errors['image'] = 'Preview Image is required.'
            // }
            // if(imageURL1.length && !checkImg(imageURL1)) errors['image1'] = 'Image URL must end in .png, .jpg, or .jpeg'
            // if(imageURL2.length && !checkImg(imageURL2)) errors['image2'] = 'Image URL must end in .png, .jpg, or .jpeg'
            // if(imageURL3.length && !checkImg(imageURL3)) errors['image3'] = 'Image URL must end in .png, .jpg, or .jpeg'
            // if(imageURL4.length && !checkImg(imageURL4)) errors['image4'] = 'Image URL must end in .png, .jpg, or .jpeg'


        // setHasSubmitted(true);
        if(Object.values(errors).length) {
            setValidationErrors(errors)
            return alert('cannot submit')
        }

        const payload = {
            spotId,
            country,
            address: streetAdress,
            city,
            state,
            latitude,
            longitude,
            description,
            name: title,
            price,
            img: [url, imageURL1, imageURL2, imageURL3, imageURL4],
        }


        //
        spot = await dispatch(updateSpot(payload))
        await dispatch(spotDetail(spot.id))

        console.log(spot, 'UPDATEDSpot----------')
        if(spot){
            history.push(`/spots/${spot.id}`)
        }

        setValidationErrors({})

    }

    return (
        <>
            <h1>Update Spot</h1>
            <section>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>Where's your place located?</h2>
                        <label>
                            Country
                            <input
                                placeholder="Country"
                                required
                                value={country}
                                type="text"
                                onChange={(e) => setCountry(e.target.value)}/>
                                {
                                    validationErrors.city && (
                                        <div>{validationErrors.country}</div>
                                    )
                                }
                        </label>
                        <label>
                            Street Adress
                            <input
                                placeholder="Address"
                                required
                                type="text"
                                value={streetAdress}
                                onChange={(e) => setStreeAdress(e.target.value)}
                            />
                            {
                                validationErrors.address && (
                                    <div>{validationErrors.address}</div>
                                )
                            }
                        </label>
                        <label>
                            City
                            <input type="text"
                                placeholder="city"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {
                                validationErrors.city && (
                                    <div>{validationErrors.city}</div>
                                )
                            }
                        </label>
                        <label>
                            State
                            <input
                                type="text"
                                placeholder="STATE"
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                />
                                {
                                    validationErrors.state && (
                                        <div>{validationErrors.state}</div>
                                    )
                                }
                        </label>
                        <label>
                            Latitude
                                <input
                                type="number"
                                placeholder="Latitude"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                />
                        </label>
                        <label>
                            Longitude
                             <input
                                type="number"
                                placeholder="Longitude"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                             />
                        </label>
                    </div>
                    <div>
                        <label>
                            <h4>Describe your place to guests</h4>
                            <p>
                            Mention the best features of your space, any special amentities like
                            fast wif or parking, and what you love about the neighborhood.
                            </p>
                            <textarea
                                type="text"
                                placeholder="Please write at least 30 characters"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {
                                validationErrors.description && (
                                    <div>{validationErrors.description}</div>
                                )
                            }
                        </label>
                    </div>
                    <div>
                        <h4>Create a title for your spot</h4>
                        <p>Catch guests' attention with a spot title that highlights what makes
                            your place special.</p>
                        <input
                            type="text"
                            placeholder="Name of your Spot"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {
                            validationErrors.title && (
                                <div>{validationErrors.title}</div>
                            )
                        }
                    </div>
                    <div>
                        <label>
                            <h4>Set a base price for your spot</h4>
                            <p>
                            Competitive pricing can help your listing stand out and rank higher
                            in search results.
                            </p>
                            <input
                                type="number"
                                placeholder="Price per night (USD)"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            {
                                validationErrors.price && (
                                    <div>{validationErrors.price}</div>
                                )
                            }
                        </label>
                    </div>
                    <div>
                        <label>
                            <h4>Liven up your spot with photos</h4>
                            <p>Submit a link to at least one photo to publish
                                your spot.
                            </p>
                            <input
                                type="text"
                                placeholder="Preview Image URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            {
                                validationErrors.image && (
                                    <div>{validationErrors.image}</div>
                                )
                            }
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={imageURL1}
                                onChange={(e) => SetImageURL1(e.target.value)}
                            />
                            {
                                validationErrors.image1 && (
                                    <div>{validationErrors.image1}</div>
                                )
                            }
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={imageURL2}
                                onChange={(e) => SetImageURL2(e.target.value)}
                            />
                            {
                                validationErrors.image2 && (
                                    <div>{validationErrors.image2}</div>
                                )
                            }
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={imageURL3}
                                onChange={(e) => SetImageURL3(e.target.value)}
                            />
                            {
                                validationErrors.image3 && (
                                    <div>{validationErrors.image3}</div>
                                )
                            }
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={imageURL4}
                                onChange={(e) => SetImageURL4(e.target.value)}
                            />
                            {
                                validationErrors.image4 && (
                                    <div>{validationErrors.image4}</div>
                                )
                            }
                        </label>
                    </div>
                    <div>
                        <button type="submit">Update Spot</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default UpdateSpot;
