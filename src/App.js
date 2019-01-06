import React from 'react'
import  BookShelf from './BookShelf'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  }

  componentWillMount(){
    BooksAPI.getAll().then((books) => this.setState({books: books}))
  }
  
  changeShelf = (event,id) => {
    console.log(event)
    console.log(id)
    const newBooks = this.state.books.map( (book) => {
      if(book.id === id){
        book.shelf = event;
      }
      return book
    })
    console.log(newBooks)
    this.setState({books: newBooks})
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/add" render={() => ( 
            <div className="search-books">
              <div className="search-books-bar">
                <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author"/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>)}>
        </Route>
        <Route exact path="/" render={() => (
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
                <Link to="/add">Add a book</Link>
              </div>
            </div>)}>
        </Route>
      </div>)}
}

export default BooksApp
