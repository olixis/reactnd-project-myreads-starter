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
                  this.props.books.forEach(book => {
                    if(!book.shelf){
                    book.shelf = "none"
                    }
                  })
                }
                {
                  this.props.books
                  .filter(book => book.shelf.toLowerCase() === this.props.shelf)
                  .map((book) => 
                  <Book shelf={book.shelf} changeShelf={this.props.changeShelf} key={book.id} id={book.id} title={book.title ? book.title : ""} author={book.authors ? book.authors.join(", "): ""} image={book.imageLinks ? book.imageLinks.smallThumbnail : ""}/>)
                }
            </ol>
          </div>
        </div>
        );
    }

}

export default BookShelf;