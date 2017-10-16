import React, { Component } from 'react'
import Book from './Book'

class SearchBooksResult extends Component{

  render(){
    return(
      <div className="search-books-results">
        <ol className="books-grid">
            {
              this.props.books.map((book) => {
                return(
                    <li key={book.id}>
                      <Book
                          book={book}
                          onSelectChanged={this.props.onSelectChanged}
                      />
                    </li>
                )
              })
            }

        </ol>
      </div>
    )
  }
}

export default SearchBooksResult
