import { useDispatch, useSelector} from "react-redux"
import { getAllSpots } from "../../store/spots";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Spots = () => {
    const dispatch = useDispatch();
    const spotList = useSelector((state) => Object.values(state.spots))
    console.log(spotList, 'spotList---')


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <>
        <h1>Spots</h1>
        <div>
            {spotList.map((spot) => (
                <div key={spot.id}>
                    <p>{spot.id}</p>
                    <NavLink key={spot.id} to={`/spots/${spot.id}`}>{spot.previewImage}</NavLink>
                    <div>{spot.city}</div>
                    <div>{spot.state}</div>
                    <div>{spot.price} night</div>
                    <div>{spot.avgRating}</div>
                </div>

            ))}
        </div>
        </>
    )
}

export default Spots;
