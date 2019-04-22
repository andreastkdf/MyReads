import React, { Component } from "react"
// TODO: yarn add prop-types for checking props types

class ListBooks extends Component {
  render() {
    const { books, shelf } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(books => (
              <li key={books.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        background: '#211e1e5c'
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select>
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
                  <div className="book-title">{books.title}</div>
                  <div className="book-authors">{books.author}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListBooks