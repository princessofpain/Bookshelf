import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf';
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    BooksAPI.getAll().then((fetchedBooks) => {
      this.setState({
        books: fetchedBooks
      })
      console.log(this.state.books);
    })
    .catch(function(error) {
      this.setState({
        books: ['Data can´t be loaded']
      })
    })
  }

  getBookshelfBooks(bookshelf) {
    return this.state.books.filter((b) => b.shelf === bookshelf);
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title='Currently Reading'
                  books={this.getBookshelfBooks('currentlyReading')}
                />
                <Bookshelf
                  title='Want to Read'
                  books={this.getBookshelfBooks('wantToRead')}
                />
                <Bookshelf
                  title='Read'
                  books={this.getBookshelfBooks('read')}
                />
              </div>
            </div>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
