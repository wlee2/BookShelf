import React, { Component } from 'react'
import './App.css'
import axios from 'axios';
import ShowSearchPage from './ShowSeachPage';
import {api, headers} from './API';
import CurrentlyReading from './Shelf/CurrentlyReading';
import WantToRead from './Shelf/WantToRead';
import Read from './Shelf/Read';

class App extends Component {
  state = {
    showSearchPage: false,
    books: [],
    read: [],
    currentlyReading: [],
    wantToRead: [] 
  }

  searchPageHandler = () => {
    if(this.state.showSearchPage === false) {
      this.setState({
        showSearchPage: true
      })
    }
    else {
      this.setState({
        showSearchPage: false
      })
    }
  }

  dataRefresh = () => {
    axios.get(`${api}/books`, { headers })
      .then(res => {
        this.setState({
          books: res.data.books
        },() => this.divByShelf())
      })
  }

  componentDidMount = () => {
    this.dataRefresh();
  }

  divByShelf = () => {
    const {books} = this.state 
    this.setState({
      read: books.filter((data) => data.shelf.match("read")),
      currentlyReading: books.filter((data) => data.shelf.match("currentlyReading")),
      wantToRead: books.filter((data) => data.shelf.match("wantToRead"))
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div>
            <ShowSearchPage onClick={this.searchPageHandler}/>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading currentlyReading={this.state.currentlyReading}/>
                <WantToRead wantToRead={this.state.wantToRead}/>
                <Read read={this.state.read}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App;