import React, { Component } from "react"
import * as BooksAPI from "./BooksAPI"
import BookShelf from "./BookShelf"
import SearchBooks from "./SearchBooks"
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
    read: []
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

  //  Helper function to return the shelf option required.
  //  This function is specially needed for the search page
  //  in order to set the initial options for the books not
  //  in our library.
  updateBookShelf = (newStatus, book) => {
    let currentShelf = book.shelf
    book.shelf = newStatus
    this.setState(currentState => ({
      [newStatus]: currentState[newStatus].concat([book]),
      [currentShelf]: currentState[currentShelf].filter(c => {
        return c.id !== book.id
      })
    }))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            myReads={this.state}
            onUpdateBookShelf={this.updateBookShelf}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>&#10074;&#10073;&#10072; MyReads &#10074;&#10073;&#10072;</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={this.state.currentlyReading}
                  myReads={this.state}
                  shelfTitle="Currently Reading"
                  onUpdateBookShelf={this.updateBookShelf}
                />
                <BookShelf
                  books={this.state.wantToRead}
                  myReads={this.state}
                  shelfTitle="Want to Read"
                  onUpdateBookShelf={this.updateBookShelf}
                />
                <BookShelf
                  books={this.state.read}
                  myReads={this.state}
                  shelfTitle="Read"
                  onUpdateBookShelf={this.updateBookShelf}
                />
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
