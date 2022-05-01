import { utilService } from "../services/util.service.js"

const { Link } = ReactRouterDOM

export function BookPreview({ book }) {
    return <Link to={`/book/${book.id}`}>
        <div className="book-preview">
            <h3>{book.title}</h3>
            <h3>price: {book.listPrice.amount} {utilService.getCurrancyIcon(book.listPrice.currencyCode)}</h3>
            <img src={book.thumbnail} alt="" />
        </div>
    </Link>
}