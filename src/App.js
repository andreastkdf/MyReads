import React, { Component } from "react"
import * as BooksAPI from "./BooksAPI"
import BookShelf from "./BookShelf"
import SearchBooks from "./SearchBooks"
import { Route, Link } from "react-router-dom"
import "./App.css"

class BooksApp extends Component {
  state = {
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

  updateBookShelf = (newStatus, book) => {
    const currentShelf = book.shelf

    if (newStatus !== "none" && currentShelf && currentShelf !== "none") {
      this.setState(currentState => ({
        [newStatus]: currentState[newStatus].concat([book]),
        [currentShelf]: currentState[currentShelf].filter(c => {
          return c.id !== book.id
        })
      }))
    } else if (currentShelf || currentShelf === "none") {
      this.setState(currentState => ({
        [currentShelf]: currentState[currentShelf].filter(c => {
          return c.id !== book.id
        })
      }))
    } else {
      this.setState(currentState => ({
        [newStatus]: currentState[newStatus].concat([book])
      }))
    }
    book.shelf = newStatus
    BooksAPI.update(book, newStatus)
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>
                  &#10074;&#10073;&#10072; MyReads &#10074;&#10073;&#10072;
                </h1>
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
              <Link to="/search" className="open-search">
                <button>Add a book</button>
              </Link>
            </div>
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              myReads={this.state}
              onUpdateBookShelf={this.updateBookShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
