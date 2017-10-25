import React from 'react'
import Book from './Book'

const SearchBooksResult = (props) => (
  <div className="search-books-results">
    <ol className="books-grid">
        {
          props.books.map((book) => {
            return(
                <li key={book.id}>
                  <Book
                      book={book}
                      onSelectChanged={props.onSelectChanged}
                  />
                </li>
            )
          })
        }

    </ol>
  </div>
)

export default SearchBooksResult
