import React, { Component } from "react"
import * as BooksAPI from "./BooksAPI"
import ListBooks from "./ListBooks"

class SearchBooks extends Component {
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
    const { myReads } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.setState({ showSearchPage: false })}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks books={foundBooks} myReads={myReads} />
        </div>
      </div>
    )
  }
}

export default SearchBooks
