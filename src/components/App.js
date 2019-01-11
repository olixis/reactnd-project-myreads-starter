import React from "react"
import "../styles/App.css"
import * as BooksAPI from "../api/BooksAPI"
import { Route } from "react-router-dom"
import Search from "./Search"
import Home from "./Home"

class BooksApp extends React.Component {

  constructor(){
    super()
    this.fetchBooks()
  }
  state = {
    books: []
  }



  fetchBooks() {
    BooksAPI.getAll().then(books =>this.setState({ books: books }))
  }

  changeShelf = async (shelf, id) => {
    console.log("state do app")
    console.log(this.state.books)    
    const newBooks = this.state.books
    const existingBook = newBooks.find(book => book.id === id)
    if(!existingBook){
      const book = await BooksAPI.get(id)
      book.shelf = shelf
      BooksAPI.update(book, shelf)
      newBooks.push(book)
    }else{
      newBooks.forEach(book => {
        if(book.id === id){
        BooksAPI.update(book, shelf)
        book.shelf = shelf
        }
      })
    }
    this.setState({ books: newBooks })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <Search books={this.state.books} changeShelf={this.changeShelf} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <Home books={this.state.books} changeShelf={this.changeShelf} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
