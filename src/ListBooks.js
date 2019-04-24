import React, { Component } from "react"
import PropTypes from "prop-types"

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    myReads: PropTypes.object.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  //  Helper function to return the shelf option required.
  //  This function is specially needed for the search page
  //  in order to set the initial options for the books not
  //  in our library.
  whichShelf = (myReads, bookID) => {
    let allBooks = [
      ...myReads.currentlyReading,
      ...myReads.wantToRead,
      ...myReads.read
    ]
    let matching = allBooks.find(m => m.id === bookID)

    return matching ? matching.shelf : "none"
  }

  render() {
    const { books, myReads, onUpdateBookShelf } = this.props
    return (
      <ol className="books-grid">
        {/* Check that books is not empty before rendering inside <ol> 
        books can be an empty array when this component is called by SearchBooks*/}
        {books &&
          books.map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 170,
                      background:
                        book.imageLinks &&
                        `url(${
                          book.imageLinks.smallThumbnail
                        }) no-repeat center top`,
                      backgroundSize: "cover"
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      onChange={event =>
                        onUpdateBookShelf(event.target.value, book)
                      }
                      value={this.whichShelf(myReads, book.id)}
                    >
                      <option value="move" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {/* some authors are undefined and we need to check 
                  before using join on each value of the book.authors
                  array*/}
                  {book.authors && book.authors.join("\n")}
                </div>
              </div>
            </li>
          ))}
      </ol>
    )
  }
}

export default ListBooks
