import React, { Component } from 'react';
import ChangeBookshelf from './ChangeBookshelf';

class Book extends Component {

  render() {
    return(
      <div className="book">
        <div className="book-top" style={{ backgroundImage: '' }}>
          <div className="book-cover"/>
          <ChangeBookshelf/>
        </div>
        <div className="book-title">Book Title</div>
        <div className="book-authors">Author</div>
      </div>
    )
  }
}

export default Book;