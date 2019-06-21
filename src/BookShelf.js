import React from "react"
import ListBooks from "./ListBooks"
import PropTypes from "prop-types"

const BookShelf = ({ books, myReads, shelfTitle, onUpdateBookShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid" />
        <ListBooks
          books={books}
          myReads={myReads}
          onUpdateBookShelf={onUpdateBookShelf}
        />
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  myReads: PropTypes.object.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired
}

export default BookShelf
