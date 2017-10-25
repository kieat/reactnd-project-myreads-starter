import React from 'react'
import { Router, Route } from 'react-router-dom'
import './App.css'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ books: books })
    })
  }

  updateBook = (selectedBook, newshelf) => {
    BooksAPI.update(selectedBook, newshelf).then((res) => {
      selectedBook.shelf = newshelf

      this.setState((state) => {
        if (this.checkExistance(selectedBook) === false){
          selectedBook.shelf = newshelf
          state.books.push(selectedBook)
          return {
            books: state.books.sort()
          }
        }else{

          return {
            books: state.books.map((book) => {
              if ( book.id === selectedBook.id ){
                book.shelf = newshelf
              }
              return book
            }).sort()
          }
        }
      })
    })
  }

  addBook = (selectedBook, newshelf) => {
    BooksAPI.update(selectedBook, newshelf).then((res) => {
      selectedBook.shelf = newshelf
      this.setState((state) => ({
          books: state.books.concat([ selectedBook ])
        })
      )
    })
  }

  convertBook4Show = (book) => {
    if (typeof(book.authors) === 'undefined'){
      book.authors = []
    }
    if (typeof(book.shelf) === 'undefined'){
      book.shelf = 'none'
    }
    book.author = book.authors.map(author => {return(author)}).join(', ')
    book.imageURL = book.imageLinks.thumbnail
    return book
  }

  checkExistance = (targetBook) => {
    if (this.state.books.filter(book => book.id === targetBook.id).length === 0){
      return false
    }else{
      return true
    }
  }

  render() {
    return (
      <Router history={customHistory}>
        <div className="app">
          <Route exact path="/" render={() => (
              <BookList
                  title="MyReads"
                  shelfs={[
                    {
                      title:"Currently Reading",
                      key:"currentlyReading"
                    },
                    {
                      title:"Want to Read",
                      key:"wantToRead"
                    },
                    {
                      title:"Read",
                      key:"read"
                    }
                  ]}
                  books={this.state.books}
                  convertBook4Show={this.convertBook4Show}
                  onSelectChanged={this.updateBook}
              />
          )}/>
          <Route path="/search" render={() => (
            <SearchBooks
                onSelectChanged={this.addBook}
                convertBook4Show={this.convertBook4Show}
                booksInShelves={this.state.books}
            />
          )}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
