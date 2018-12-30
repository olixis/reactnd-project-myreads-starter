import React, { Component } from 'react';
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class BookShelf extends Component {
  state = {
    books: [],
  }

  componentWillMount(){
    BooksAPI.getAll().then((books) => this.setState({books: books}))
  }
    render() {
        return (
          <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {
                  this.state.books
                  .filter((book) => book.shelf.toLowerCase() === this.props.shelf)
                  .map((book) => 
                  <Book key={book.id} title={book.title} author={book.authors.join(", ")} image={book.imageLinks.smallThumbnail}/>)
                }
            </ol>
          </div>
        </div>
        );
    }
}

export default BookShelf;