import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { spotDetail, updateSpot } from "../../store/spots"
import { useHistory } from "react-router-dom"






const UpdateSpot = ({spot}) => {

    // console.log(spot, 'in UPDatespot---')
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
    const [imageURL1, SetImageURL1] = useState('')



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



            // console.log(url,'imageurl-------------------')
            const errors = {};
            if(!country.length) errors['country'] = 'Country is required'
            if(!streetAdress.length) errors['address'] = 'Address is required'
            if(!city.length) errors['city'] = 'City is required'
            if(!state.length) errors['state'] = 'State is required'
            if(description.length < 30) errors['description'] = 'Description needs a minimum of 30 Characters'
            if(!title.length) errors['title'] = 'Name is required'
            if(!price) errors['price'] = 'Price is required'



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

        // console.log(spot, 'UPDATEDSpot----------')
        if(spot){
            history.push(`/spots/${spot.id}`)
        }

        setValidationErrors({})

    }

    return (
        <>
            <div className="createSpotMainContainer">
                <h1>Update Spot</h1>
                <section>
                    <form onSubmit={handleSubmit}>
                        <div className="createNewSpotMain">
                            <div className="creatSpotAdress">
                                <h2>Update Location</h2>
                                <div>
                                    <label>
                                        Country: &nbsp;
                                        <input
                                            className="createSpotAdressInput"
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
                                </div>
                                <div>
                                    <label>
                                        Street: &nbsp;
                                        <input
                                            className="createSpotAdressInput"
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
                                </div>
                                <div >
                                    <label>
                                        City: &nbsp;
                                        <input type="text"
                                            className="createSpotAdressInput"
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
                                </div>
                                <div>
                                    <label>
                                        State: &nbsp;
                                        <input
                                            className="createSpotAdressInput"
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
                                </div>
                                <div>
                                    <label>
                                        Latitude: &nbsp;
                                            <input
                                            className="createSpotAdressInput"
                                            type="number"
                                            placeholder="Latitude"
                                            value={latitude}
                                            onChange={(e) => setLatitude(e.target.value)}
                                            />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Longitude: &nbsp;
                                        <input
                                            className="createSpotAdressInput"
                                            type="number"
                                            placeholder="Longitude"
                                            value={longitude}
                                            onChange={(e) => setLongitude(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="createSpotDescription">
                                <label>
                                    <div className="createSpotDesHead">
                                        <h4>Update Place Description</h4>
                                    </div>
                                    <p>
                                    Mention the best features of your space, any special amentities like
                                    fast wifi or parking, and what you love about the neighborhood.
                                    </p>
                                    <div className="createSpotDesHead">
                                        <textarea
                                            className="createSpotDesText"
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
                                    </div>
                                </label>
                            </div>
                            <div className="createSpotDescription">
                                <div className="createSpotDesHead">
                                    <h4>Update your spot title</h4>
                                    <p>Catch guests' attention with a spot title that highlights what makes
                                        your place special.</p>
                                </div>
                                <div className="createSpotDesHead">
                                    <input
                                        className="createSpotAdressInput"
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
                            </div>
                            <div className="createSpotDescription">
                                <label>
                                    <div className="createSpotDesHead">
                                        <h4>Update base price for your spot</h4>
                                        <p>
                                        Competitive pricing can help your listing stand out and rank higher
                                        in search results.
                                        </p>
                                    </div>
                                    <div className="createSpotDesHead">
                                        <input
                                            className="createSpotAdressInput"
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
                                    </div>
                                </label>
                            </div>
                            {/* <div>
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
                            </div> */}
                            <div>
                                <button className="createSpotBtn" type="submit">Update Spot</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default UpdateSpot;
