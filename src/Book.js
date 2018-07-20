import React, { Component } from 'react';
import ChangeBookshelf from './ChangeBookshelf';

class Book extends Component {

  render() {
    return(
      <div className="book">
        <div className="book-top" style={{ backgroundImage: `url("${this.props.book.imageLinks.thumbnail}"`}}>
          <div className="book-cover">
            <ChangeBookshelf/>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    )
  }
}

export default Book;