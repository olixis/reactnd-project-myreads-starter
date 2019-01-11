import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import Search from './Search';
import Home from './Home';


class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
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
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => ( 
          <Search books={this.state.books} changeShelf={this.changeShelf} ></Search>
      )}>
        </Route>
        <Route exact path="/" render={() => (
          <Home books={this.state.books} changeShelf={this.changeShelf} ></Home>
        )}>
        </Route>
      </div>)}
}

export default BooksApp
