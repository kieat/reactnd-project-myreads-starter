import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class BookList extends Component{
  render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.shelfs.map(shelf => {
              return(
                <BookShelf
                    key={shelf.key}
                    title={shelf.title}
                    books={this.props.books.filter((b) => b.shelf === shelf.key).map(book => (this.props.convertBook4Show(book)))}
                    onSelectChanged={this.props.onSelectChanged}
                />
              )
            })}
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>

    )
  }
}

export default BookList
