import React from "react"
import { useState } from "react";
import "./DeleteModal.css"
import { useDispatch } from "react-redux";
import { CurrentUserSpots, DeleteSpotId } from "../../store/spots";


export default function Modal ({spotId}) {
    // console.log(spotId, 'Modal Delete spotId------')
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    const handleDelete = () => {
        dispatch(DeleteSpotId(spotId));
        toggleModal();
    }

    return (
        <>
            <button onClick={toggleModal}
            className="">
                Delete
            </button>

            {modal && (
                <div id="modal">
                <div id="modal-background" onClick={toggleModal}></div>
                <div id="modal-content">
                    <h2>Confirm Delete</h2>
                    <p>Are you sure want to remove this spot
                        from the listings?
                    </p>
                    <button onClick={handleDelete} style={{backgroundColor: 'red'}}>
                        Yes (Delete Spot)
                    </button>
                    <button onClick={toggleModal} style={{backgroundColor: 'darkgrey'}}>
                        No (Keep Spot)
                    </button>

                </div>

            </div>
            )}

        </>
    )
}
