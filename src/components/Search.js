import React, { Component } from "react"
import { Link } from "react-router-dom"
import * as BooksAPI from "../api/BooksAPI"
import { DebounceInput } from "react-debounce-input"
import Book from "./Book"

class Search extends Component {
  state = {
    query: "",
    searchBooks: [],
    empty: true
  }
  searchBooks(query) {
    BooksAPI.search(query).then(books => {
      if (Array.isArray(books)) {
        const currentBooks = this.props.books
        books.forEach(book => {
          let match = currentBooks.find(
            currentBook => currentBook.id === book.id
          )
          if (match) {
            book.shelf = match.shelf
          }
          if (!book.shelf) {
            book.shelf = "none"
          }
        })
        this.setState({ searchBooks: books, empty: false, query: query })
      } else {
        this.setState({ empty: true })
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              value={this.state.query}
              onChange={event => this.searchBooks(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {!this.state.empty && (
            <div className="list-books-content">
              <ol className="books-grid">
                {this.state.searchBooks.map(book => {
                  return (
                    <Book
                      shelf={book.shelf}
                      changeShelf={this.props.changeShelf}
                      key={book.id}
                      id={book.id}
                      title={book.title ? book.title : ""}
                      author={book.authors ? book.authors.join(", ") : ""}
                      image={
                        book.imageLinks ? book.imageLinks.smallThumbnail : ""
                      }
                    />
                  )
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Search
