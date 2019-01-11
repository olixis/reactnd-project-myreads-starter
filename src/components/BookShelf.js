import React from "react"
import Book from "./Book"

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books
            .filter(book => book.shelf.toLowerCase() === props.shelf)
            .map(book => (
              <Book
                shelf={book.shelf}
                changeShelf={props.changeShelf}
                key={book.id}
                id={book.id}
                title={book.title ? book.title : ""}
                author={book.authors ? book.authors.join(", ") : ""}
                image={book.imageLinks ? book.imageLinks.smallThumbnail : ""}
              />
            ))}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf
