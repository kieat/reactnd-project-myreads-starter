import React, { Component } from 'react'

class Book extends Component{
  state = {
    shelfOption: "none"
  }
  updateOption = (option) => {
    this.setState({
      shelfOption: option
    })
  }

  render() {
    return(
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
                  style={{
                    width: 128,
                    height: 188,
                    backgroundImage: 'url(' + this.props.book.imageURL + ')'
                  }}
            >
            </div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf} onChange={(event) => this.props.onSelectChanged(this.props.book, event.target.value)}>
                <option value="moveTo" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.author}</div>
        </div>
    )
  }
}

export default Book
