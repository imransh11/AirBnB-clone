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
        console.log(spotsArr, 'test--------')
    return (
        <>
            {!spotsArr.length ? <div>
                <NavLink to={'/spots/new'}>
                    <button>Create a New Spot</button>
                </NavLink>
            </div> :
            <div>

                <div>
                    {spotsArr.map(spot => (
                        <>
                        <div key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`}>

                            <div>
                                <img src={spot.previewImage} />
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
                        </NavLink>

                            <div>
                                <button onClick={
                                    () => history.push(`/spots/${spot.id}/edit`)
                                }>Update</button>
                                <Modal spotId ={spot.id}/>
                            </div>
                        </div>
                        </>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default CurrentSopts
