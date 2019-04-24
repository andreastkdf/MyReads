import React, { Component } from "react"
import { Link } from 'react-router-dom'
import * as BooksAPI from "./BooksAPI"
import ListBooks from "./ListBooks"
import PropTypes from "prop-types"

class SearchBooks extends Component {
  static propTypes = {
    onUpdateBookShelf: PropTypes.func.isRequired
  }
  
  state = {
    query: "",
    foundBooks: []
  }

  updateQuery = query => {
    this.setState(() => ({
      query: query.trim()
    }))
    this.performSearch(query)
  }

  performSearch = query => {
    // Don't trigger API call on empty search
    query !== "" &&
      BooksAPI.search(query).then(books => {
        if (books.length > 1) {
          this.setState(currentState => ({
            foundBooks: books
          }))
        } else {
          this.setState(currentState => ({
            foundBooks: []
          }))
        }
      })
    query === "" &&
      this.setState(currentState => ({
        foundBooks: []
      }))
  }

  render() {
    const { foundBooks } = this.state
    const { myReads, onUpdateBookShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks books={foundBooks} myReads={myReads} onUpdateBookShelf={onUpdateBookShelf} />
        </div>
      </div>
    )
  }
}

export default SearchBooks
