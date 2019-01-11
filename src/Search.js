import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import {DebounceInput} from 'react-debounce-input';

class Search extends Component {

  state = {
    query: "",
    books: [],
    empty: true
  }

    async searchBooks(query){
      try {
        let books = await BooksAPI.search(query)
        if(Array.isArray(books)){
          const currentBooks = await BooksAPI.getAll()
          currentBooks.forEach(currentBook => {
            books.forEach(book => {
              if(book.id === currentBook.id){
                book.shelf = currentBook.shelf
              }
            });
          });
          this.setState({books:books,empty:false})
        }else{
          this.setState({empty:true})
        }
      } catch (error) {
        console.log(error)
      }
      this.setState({query:query})
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
          <div className="search-books">
          <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
            
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <DebounceInput minLength={1} debounceTimeout={500}  value={this.state.query} onChange={(event) => this.searchBooks(event.target.value)}  placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
          {
            !this.state.empty &&
              <div className="list-books-content">
              <BookShelf books={this.state.books} changeShelf={this.changeShelf} title="Currently Reading" shelf="currentlyreading"/>
              <BookShelf books={this.state.books} changeShelf={this.changeShelf} title="Want to Read" shelf="wanttoread"/>
              <BookShelf books={this.state.books} changeShelf={this.changeShelf} title="Read" shelf="read"/>
              <BookShelf books={this.state.books} changeShelf={this.changeShelf} title="None" shelf="none"/>
              </div>
          }
          </div>
        </div>
        );
    }
}

export default Search;