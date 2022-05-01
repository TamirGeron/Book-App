import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/book-list.jsx"
import { BookFilter } from "../cmps/book-filter.jsx"
import { AddBook } from "../cmps/add-book.jsx"
import { eventBusService } from "../services/event-bus-service.js"

const { Link } = ReactRouterDOM

export class BookApp extends React.Component {
    state = {
        books: [],
        filterBy: null,
        selectedBook: null,
        isAddBook: false
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => this.setState({ books }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadBooks()
        })
    }

    toggleAddBook = () => {
        this.setState({ isAddBook: !this.state.isAddBook })
    }

    onAddBook = (book) => {
        bookService.addBook(book)
            .then(() => {
                this.loadBooks
                eventBusService.emit('user-msg', {
                    type: 'success',
                    txt: `${book.volumeInfo.title}, Added successfully`,
                    bookId: book.id
                })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger',
                    txt: 'Could not add book'
                })
            })
        this.toggleAddBook()
    }

    render() {
        const { books, isAddBook } = this.state
        return <section className="book-app">
            <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
            <button onClick={this.toggleAddBook}>Add Book</button>
            <BookList books={books} />
            {isAddBook && <AddBook toggleAddBook={this.toggleAddBook} onAddBook={this.onAddBook} />}
        </section>
    }
}