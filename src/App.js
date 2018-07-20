import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf';
import Search from './Search';
import './App.css';

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
        <Route exact path='/' render={() => (
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
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>

        <Route path='/search' render={({ history }) => (
          <Search
            books={this.state.result}
            updateQuery={this.updateQuery}
            changeBookshelf={this.changeBookshelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
