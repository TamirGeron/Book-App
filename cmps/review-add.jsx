import { bookService } from "../services/book.service.js"

export class ReviewAdd extends React.Component {
    state = {
        hover: 0,
        rating: 0
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    setHover(hover) {
        this.setState({ hover })
    }

    setRating(rating) {
        console.log(rating);
        this.setState({ rating })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { rating } = this.state
        console.log(rating);
        const target = ev.target
        const review = {
            name: target[0].value,
            rate: this.state.rating,
            readAt: target[1].value,
            freeTxt: target[2].value
        }
        bookService.addReview(review, this.props.bookId)
            .then(this.props.onSent())
    }

    renderStars() {
        const { rating } = this.state
        return <section className="star-rating">
            {
                [...Array(5)].map((star, index) => {
                    index += 1;
                    return <label
                        key={index}
                        className={(this.state.hover >= index) ? "on" : "off"}
                        onClick={() => this.setRating(index)}
                        onMouseEnter={() => this.setHover(index)}
                        onMouseLeave={() => this.setHover(rating)}
                    > <span className="star">&#9733;</span></label>
                })
            }
        </section>
    }

    render() {
        return <section className="review-add">
            <h1>Add Review</h1>
            <form className="review-add" onSubmit={this.onSubmit}>
                <div>Full Name: <input required type="text" placeholder="Full Name" name="name" defaultValue='Books Reader' onChange={this.handleChange} ref={this.inputRef} /></div>
                {this.renderStars()}
                <div>Read at: <input required type="date" defaultValue={new Date()} /></div>
                <div>More: <textarea></textarea></div>
                <input type="submit" value="Submit" />
            </form>
        </section>
    }
}