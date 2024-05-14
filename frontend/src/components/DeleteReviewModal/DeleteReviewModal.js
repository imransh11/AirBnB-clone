import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteReviewById } from "../../store/reviews";
import './DeleteReviewModal.css'



export default function DeleteReviewModal ({reviewId}) {
    // console.log(reviewId, 'revid----')
    const dispatch = useDispatch()

    const[modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleDelete = () => {
        dispatch(deleteReviewById(reviewId));
        toggleModal()
    }

    return (
        <>
            <button className="deleteReview-btn" onClick={toggleModal}>
                Delete
            </button>

                {modal && (
                    <div id="modal" className="delete-modal">
                        <div id="modal-background" onClick={toggleModal}></div>
                        <div id="modal-content" className="delete-modal">
                            <h3 className="del-Title">Confirm Delete</h3>
                            <p>Are you sure you want to delete this review?</p>
                            <button onClick={handleDelete} className="delReview-btn">
                                Delete
                            </button>
                            <button onClick={toggleModal} className="cancleRev-btn">
                                Keep Review
                            </button>
                        </div>
                    </div>
                )}
        </>
    )
}
