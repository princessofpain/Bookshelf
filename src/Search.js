import React, { Component } from 'react';
import Book from './Book';

class Search extends Component {

  updateQuery = (query) => {
    this.props.updateQuery(query.trim());
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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