import React from 'react'
import { Rating } from "../Rating";

function ReviewListView({ reviews }) {

    const reviewRows = () => {
        if (!reviews || !reviews.length) {
            return (
                <tr>
                    <td className="text-center" colSpan="5">This art has not been reviewed yet</td>
                </tr>
            )
        }
        return reviews.map((review, ind) => (
            <tr key={ind}>
                <th scope="row">{ind + 1}</th>
                <td>{review.user.name}</td>
                <td>{review.description}</td>
                <td><Rating readonly rating={review.rating} /></td>
                <td>{review.publishedAt}</td>
            </tr>
        ))
    }
    return (
        <div className="container">
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Description</th>
                            <th>Rating</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviewRows()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { ReviewListView }