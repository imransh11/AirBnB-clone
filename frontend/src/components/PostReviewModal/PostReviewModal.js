import React from "react";
import { useState } from "react"
import "./PostReviewModal.css"
import CreateReviewForm from "./CreateReviewForm";




export default function PostReviewModal () {

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    };

    return (
        <>
            <button onClick={toggleModal}>
                Post Your Review
            </button>

            {modal && (
                <div id="modal">
                <div id="modal-background" onClick={toggleModal}></div>
                <div id="modal-content">
                    <CreateReviewForm />
                </div>
            </div>
            )}

        </>
    )
}
