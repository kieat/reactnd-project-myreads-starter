import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBooksBar from './SearchBooksBar'
import SearchBooksResult from './SearchBooksResult'

class SearchBooks extends Component {
  state = {
    query: '',
    books: [],
    errorMessage: ''
  }

  showResults = (query, books, errorMessage) => {
    this.setState((state) => ({
      query: query,
      books: books,
      errorMessage: errorMessage
    }))
  }

  handleEnter = (event) => {

      if (event.charCode === 13){
        console.log(event.target.value)
        event.persist()
        BooksAPI.search(event.target.value).then((books) => {
            console.log(books)

            if (typeof(books) === 'undefined'){
              this.showResults(event.target.value, [], 'failed to connect')
            }else if (typeof(books.items) !== 'undefined' && books.items.length === 0){
              this.showResults(event.target.value, [], books.error)
            }else{
              this.showResults(
                  event.target.value,
                  books.map(book => (this.props.convertBook4Show(book))),
                  ''
              )
            }
          })
}
  }

  render(){
    return (
      <div className="search-books">
        <SearchBooksBar history={ this.props.history } onEnter={this.handleEnter} query={this.state.query}/>
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
