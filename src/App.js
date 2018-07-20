import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf';
import Search from './Search';
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    result: []
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

  changeBookshelf = (activeBook, newBookshelf) => {
    BooksAPI.update(activeBook, newBookshelf).then(() => {
      activeBook.shelf = newBookshelf;

      this.setState(state => ({
        books: state.books.filter(book => book.id !== activeBook.id).concat([activeBook])
      }));
    });
  }

  updateQuery = (query) => {
    if(query) {
      BooksAPI.search(query).then((books) => {
        if(books.length > 0) {
          books.forEach((book, index) => {
            let searchResult = this.state.books.find((bookOfSearch) => bookOfSearch.id === book.id);
            book.shelf = searchResult ? searchResult.shelf : 'none';
            books[index] = book;
          });

          this.setState({
            result: books
          });
        }
      });
    } else {
      this.setState({
        result: []
      });
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            books={this.state.result}
            updateQuery={this.updateQuery}
            changeBookshelf={this.changeBookshelf}
          />
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
                  changeBookshelf={this.changeBookshelf}
                />
                <Bookshelf
                  title='Want to Read'
                  books={this.getBookshelfBooks('wantToRead')}
                  changeBookshelf={this.changeBookshelf}
                />
                <Bookshelf
                  title='Read'
                  books={this.getBookshelfBooks('read')}
                  changeBookshelf={this.changeBookshelf}
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
