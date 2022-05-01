import { bookService } from "../services/book.service.js";
import { ResList } from "./res-list.jsx";

export class AddBook extends React.Component {
    state = {
        srchRes: []
    }

    onSearch = (ev) => {
        ev.preventDefault()
        const search = ev.target[0].value
        bookService.getSearchBooks(search)
            .then(srchRes => this.setState({ srchRes }))
    }

    render() {
        const { srchRes } = this.state
        const { toggleAddBook, onAddBook } = this.props
        return <div className="add-book">
            <div className="modal-content">
                <span className="close-button" onClick={toggleAddBook}>X</span>
                <form onSubmit={this.onSearch}>
                    <input placeholder="Search for a book" type="search" />
                    <input type="submit" value="Submit" />
                </form>
                {srchRes && <ResList onAddBook={onAddBook} srchRes={srchRes} />}
            </div>
        </div>
    }
}