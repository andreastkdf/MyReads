import React, { Component } from "react"
import ListBooks from "./ListBooks"
import PropTypes from "prop-types"

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    myReads: PropTypes.object.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    whichShelf: PropTypes.func.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }
  render() {
    const { books, myReads , shelfTitle, onUpdateBookShelf, whichShelf} = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid" />
          <ListBooks books={books} myReads={myReads} whichShelf={whichShelf} onUpdateBookShelf={onUpdateBookShelf}/>
        </div>
      </div>
    )
  }
}

export default BookShelf
