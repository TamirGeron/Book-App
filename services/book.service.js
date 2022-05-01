import { storageService } from './storage.service.js'
import { booksData } from './books.data.js'
import { utilService } from './util.service.js'

export const bookService = {
    getById,
    query,
    addReview,
    deleteReview,
    getSearchBooks,
    addBook
}

const BOOKKEY = 'bookDB'

function query(filterBy) {
    let books = storageService.loadFromStorage(BOOKKEY)
    if (!books || books.length === 0) {
        books = booksData.query()
        storageService.saveToStorage(BOOKKEY, books)
    }

    if (filterBy) {
        let { name, minPrice, maxPrice } = filterBy
        if (!minPrice) minPrice = 0
        if (!maxPrice) maxPrice = Infinity
        books = books.filter(book => {
            return (book.title.toLowerCase().includes(name.toLowerCase()) &&
                book.listPrice.amount <= maxPrice &&
                book.listPrice.amount >= minPrice)
        })
    }
    return Promise.resolve(books)
}

function getById(bookId) {
    const books = storageService.loadFromStorage(BOOKKEY)
    const book = books.find(book => bookId === book.id)
    return Promise.resolve(book)
}


function addReview(review, bookId) {
    const books = storageService.loadFromStorage(BOOKKEY)
    const bookIdx = books.findIndex(book => bookId === book.id)
    if (books[bookIdx].reviews) books[bookIdx].reviews.push(review)
    else books[bookIdx].reviews = [review]
    storageService.saveToStorage(BOOKKEY, books)
    return Promise.resolve(books[bookIdx])
}

function deleteReview(revirewIndex, bookId) {
    const books = storageService.loadFromStorage(BOOKKEY)
    const bookIdx = books.findIndex(book => bookId === book.id)
    let reviews = books[bookIdx].reviews
    reviews.splice(revirewIndex, 1)
    books[bookIdx].reviews = reviews
    storageService.saveToStorage(BOOKKEY, books)
    return Promise.resolve(books[bookIdx])
}

function getSearchBooks(search) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${search}`)
        .then(res => res.json())
        .then(res => res.items)
}

function addBook(book) {
    const books = storageService.loadFromStorage(BOOKKEY)
    // console.log('new book', book);
    // console.log('old book', books[0]);
    const newBook = _createBook(book)
    books.push(newBook)
    storageService.saveToStorage(BOOKKEY, books)
    return Promise.resolve(books)
}

function _createBook(book) {
    return {
        authors: book.volumeInfo.authors,
        categories: book.volumeInfo.categories,
        description: book.volumeInfo.description,
        id: book.id,
        language: book.volumeInfo.language,
        pageCount: book.volumeInfo.printType,
        publishedDate: book.volumeInfo.publishedDate,
        subtitle: book.volumeInfo.subtitle,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        title: book.volumeInfo.title,
        listPrice: {
            amount: utilService.getRandomIntInclusive(10, 200),
            currencyCode: 'ILS',
            isOnSale: (Math.random() > 0.5)
        }
    }
}