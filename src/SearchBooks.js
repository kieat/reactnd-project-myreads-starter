import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBooksBar from './SearchBooksBar'
import SearchBooksResult from './SearchBooksResult'
import { debounce } from 'lodash'

class SearchBooks extends Component {
  state = {
    query: '',
    books: [],
    errorMessage: ''
  }

  showResults = (query, books, errorMessage) => {
    console.log(books)
    this.setState((state) => ({
      query: query,
      books: books.map(book => {
        const matchedBooks = this.props.booksInShelves.filter(bookInShelf => (bookInShelf.id === book.id))
        console.log(matchedBooks.length)
        if ( matchedBooks.length > 0 ){
          return matchedBooks[0]
        }else{
          return book
        }
      }),
      errorMessage: errorMessage
    }))
  }

  searchBooks = (query) => {
    console.log("searching")
    BooksAPI.search(query).then((books) => {
        console.log(books)

        if (typeof(books) === 'undefined'){
          this.showResults(query, [], 'failed to connect')
        }else if (typeof(books.items) !== 'undefined' && books.items.length === 0){
          this.showResults(query, [], books.error)
        }else{
          this.showResults(
              query,
              books.map(book => (this.props.convertBook4Show(book))),
              ''
          )
        }
    })
  }

  handleChange = (event) => {
    event.persist()
    console.log(event.target.value)
    this.doSearchWith(event.target.value)
  }

  doSearchWith = debounce(this.searchBooks, 500)

  render(){
    return (
      <div className="search-books">
        <SearchBooksBar handleChange={this.handleChange} query={this.state.query}/>
        <SearchBooksResult
            books={this.state.books}
            errorMessage={this.state.errorMessage}
            onSelectChanged={this.props.onSelectChanged}
              />
      </div>
    )
  }
}

export default SearchBooks
