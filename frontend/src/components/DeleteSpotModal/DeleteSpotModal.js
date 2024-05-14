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
                <div id="modal-content" className="delete-modal">
                    <h2 className="del-Title">Confirm Delete</h2>
                    <p>Are you sure want to remove this spot
                        from the listings?
                    </p>
                    <button onClick={handleDelete} className="delReview-btn">
                        Delete
                    </button>
                    <button onClick={toggleModal} className="cancleRev-btn">
                        Cancel
                    </button>

                </div>

            </div>
            )}

        </>
    )
}
