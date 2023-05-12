import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CurrentUserSpots } from "../../store/spots"
import { NavLink, Route, useHistory } from "react-router-dom"
import Updated from "../UpdateSpot"
import Modal from "../DeleteSpotModal/DeleteSpotModal"




const CurrentSopts = () => {
    const dispatch = useDispatch()

    const spotsArr = useSelector(state => Object.values(state.spots))
    // console.log(spotsArr, 'currentSpots------')
    const history = useHistory()



    useEffect(() => {
        // console.log('in useEFFECT_-------')
        dispatch(CurrentUserSpots())
    }, [dispatch])

    if(!spotsArr){
        return(
            <p>loading...</p>
            )
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
                        <button onClick={
                            () => history.push(`/spots/${spot.id}/edit`)
                        }>Update</button>
                        <Modal spotId ={spot.id}/>
                    </div>


                ))}
            </div>
        </>
    )
}

export default CurrentSopts
