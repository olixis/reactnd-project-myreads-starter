import React, { Component } from "react"
import { Link } from "react-router-dom"
import BookShelf from "./BookShelf"

class Home extends Component {




  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            books={this.props.books}
            changeShelf={this.props.changeShelf}
            title="Currently Reading"
            shelf="currentlyreading"
          />
          <BookShelf
            books={this.props.books}
            changeShelf={this.props.changeShelf}
            title="Want to Read"
            shelf="wanttoread"
          />
          <BookShelf
            books={this.props.books}
            changeShelf={this.props.changeShelf}
            title="Read"
            shelf="read"
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Home
