import React, { Component } from "react"
import ListBooks from "./ListBooks"
import PropTypes from "prop-types"

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired
  }
  render() {
    const { books, shelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid" />
          <ListBooks books={books} />
        </div>
      </div>
    )
  }
}

export default BookShelf
