import React, { Component } from "react"
import * as BooksAPI from "./BooksAPI"
import BookShelf from "./BookShelf"
import "./App.css"

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,

    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(currentState => ({
        currentlyReading: books.filter(b => {
          return b.shelf === "currentlyReading"
        }),
        wantToRead: books.filter(b => {
          return b.shelf === "wantToRead"
        }),
        read: books.filter(b => {
          return b.shelf === "read"
        })
      }))
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>&#10074;&#10073;&#10072; MyReads &#10074;&#10073;&#10072;</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={this.state.currentlyReading}
                  shelf="Currently Reading"
                />
                <BookShelf books={this.state.wantToRead} shelf="Want to Read" />
                <BookShelf books={this.state.read} shelf="Read" />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
