import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {

  updateQuery = (query) => {
    this.props.updateQuery(query.trim());
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id} className='list-item'>
                <Book
                  book={book}
                  changeBookshelf={this.props.changeBookshelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;