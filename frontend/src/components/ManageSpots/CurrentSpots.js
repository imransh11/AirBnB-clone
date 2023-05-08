import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CurrentUserSpots } from "../../store/spots"
import { NavLink, Route } from "react-router-dom"
import Updated from "../UpdateSpot"
import Modal from "../DeleteSpotModal/DeleteSpotModal"




const CurrentSopts = () => {
    const dispatch = useDispatch()

    const spotsArr = useSelector(state => state.spots.Spots)
    console.log(spotsArr, 'currentSpots------')



    useEffect(() => {
        console.log('in useEFFECT_-------')
        dispatch(CurrentUserSpots())
    }, [dispatch])

    if(!spotsArr){
        return(
            <p>loading...</p>
            )
        }

let handleClick = async () => {
    // <Route to={`/spots/:id/edit`}>
    //     <Updated />
    // </Route>
}

    return (
        <>
            <div>
                {spotsArr.map(spot => (
                    <div key={spot.id}>
                        <div>
                            {spot.previewImage}
                        </div>
                        <div>
                            {spot.id}
                            {spot.city}
                            {spot.state}
                            <div>
                                <b>{spot.avgRating}</b>
                            </div>
                            <b>${spot.price}</b>night
                        </div>
                        <button onClick={handleClick}>Update</button>
                        <Modal spotId ={spot.id}/>
                    </div>


                ))}
            </div>
        </>
    )
}

export default CurrentSopts
