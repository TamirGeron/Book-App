import { bookService } from "../services/book.service.js"

export class ReviewList extends React.Component {

    deleteReview(reviewIndex) {
        const { loadBook, bookId } = this.props
        bookService.deleteReview(reviewIndex, bookId)
            .then(loadBook())

    }
    render() {
        const reviews = this.props.reviews
        return <section className="reviews-list">
            <h1>Reviews</h1>
            {
                (reviews) && <ol>
                    {reviews.map((review, index) => {
                        return <div key={index} className="review">
                            <ul >
                                <li>Name: {review.name}</li>
                                <li>Rate: {review.rate}</li>
                                <li>Read At: {review.readAt}</li>
                                {review.freeTxt && <li>{review.freeTxt}</li>}
                            </ul>
                            <button onClick={() => this.deleteReview(index)}>X</button>
                        </div>
                    })}
                </ol>
            }
        </section >

    }
}