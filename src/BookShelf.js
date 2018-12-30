import React, { Component } from 'react';
import Book from './Book'

class BookShelf extends Component {

    render() {
        return (
          <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {
                  this.props.books
                  .filter((book) => book.shelf.toLowerCase() === this.props.shelf)
                  .map((book) => 
                  <Book changeShelf={this.props.changeShelf} key={book.id} id={book.id} title={book.title} author={book.authors.join(", ")} image={book.imageLinks.smallThumbnail}/>)
                }
            </ol>
          </div>
        </div>
        );
    }

}

export default BookShelf;