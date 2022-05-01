import { utilService } from "../services/util.service.js"
import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/long-txt.jsx"
import { ReviewAdd } from "../cmps/review-add.jsx"
import { ReviewList } from "../cmps/review-list.jsx"

const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {
    state = {
        isLongTxtShown: false,
        book: null,
        rating: 0
    }

    componentDidMount() {
        this.loadBook()
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getById(bookId)
            .then(book => {
                if (!book) return this.props.history.push('/')
                this.setState({ book })
            })
    }

    toggleMode = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    onGoBack = () => {
        this.props.history.push('/book')
    }

    onSent = () => {
        this.loadBook()
    }

    render() {
        const { book } = this.state
        if (!book) return <div>Loading...</div>

        let priceClass = ''
        if (book.listPrice.amount > 150) priceClass = 'red'
        else if (book.listPrice.amount < 20) priceClass = 'green'

        return <section className="book-details">
            <section className="main-details">
                <button></button>
                <button></button>
                <button onClick={this.onGoBack}>Back</button>
                <h1>{book.title}</h1>
                <h3>{book.subtitle}</h3>
                <h3>authors: {book.authors.join(', ')}</h3>
                <h3>{book.publishedDate}
                    {(new Date().getFullYear() - book.publishedDate > 10) && <span> Veteran Book</span>}
                    {(new Date().getFullYear() - book.publishedDate < 1) && <span> New!</span>}
                </h3>
                <h3>Page Count: {book.pageCount}
                    {(book.pageCount > 500) && <span> Long reading</span>}
                    {(book.pageCount > 200) && (book.pageCount < 500) && <span> Decent Reading</span>}
                    {(book.pageCount < 200) && <span> Light Reading</span>}
                </h3>
                <h3>Categories: {book.categories.join(', ')}</h3>
                <h3>Language: {book.language}</h3>
                <LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown} />
                <a onClick={this.toggleMode}>
                    {(this.state.isLongTxtShown) && <span>Read less</span>}
                    {(!this.state.isLongTxtShown) && <span>Read more</span>}
                </a>
                <div className="img-container">
                    <img src={book.thumbnail} />
                </div>
                <h3 className={priceClass}>{book.listPrice.amount}
                    {utilService.getCurrancyIcon(book.listPrice.currencyCode)}</h3>
                {book.listPrice.isOnSale && <div><button className="buy">BUY NOW</button></div>}
            </section>
            <section className="reviews">
                <ReviewAdd onSent={this.onSent} bookId={book.id} />
                <ReviewList loadBook={this.loadBook} reviews={book.reviews} bookId={book.id} />
            </section>
        </section >
    }
}