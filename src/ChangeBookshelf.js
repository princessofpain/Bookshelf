import React, { Component } from 'react';

class ChangeBookshelf extends Component {
  state = {
    oldBookshelf: this.props.book.shelf,
  }

  changeBookshelfWithAPI = (event) => {
    this.props.changeBookshelf(this.props.book, event.target.value);
    this.setState({
      currentShelf:event.target.value
    })
  }

  render() {
    return(
      <div className="book-shelf-changer">
        <select
          value={this.state.oldBookshelf}
          onChange={this.changeBookshelfWithAPI}
        >
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ChangeBookshelf;