import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


class Home extends Component {

  state = {
    books: [],
  }
  
  componentDidMount(){
    this.fetchBooks();
  }
  
  async fetchBooks(){
    const books = await BooksAPI.getAll()
    this.setState({books: books})
  }

    changeShelf = (shelf,id) => {
      const newBooks = this.state.books.map( (book) => {
        if(book.id === id){
          BooksAPI.update(book,shelf)
          book.shelf = shelf;
        }
        return book
      })
      this.setState({books: newBooks})
      this.props.changeShelf(shelf,id)
    }  

    render() {
        return (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <BookShelf books={this.state.books} changeShelf={this.changeShelf} title="Currently Reading" shelf="currentlyreading"/>
                  <BookShelf books={this.state.books} changeShelf={this.changeShelf} title="Want to Read" shelf="wanttoread"/>
                  <BookShelf books={this.state.books} changeShelf={this.changeShelf} title="Read" shelf="read"/>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
        )
    }
}

export default Home;