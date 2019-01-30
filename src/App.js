import React, { Component, Fragment } from 'react'
import './App.css'
import axios from 'axios';
import ShowSearchPage from './ShowSeachPage';
import {api, headers} from './API';
import { Container, Button, Alert, Fade } from 'reactstrap';
import ShelfModel from './Shelf/ShelfModel';
import animateScrollTo from 'animated-scroll-to';

class App extends Component {
  state = {
    showSearchPage: false,
    books: [],
    read: [],
    currentlyReading: [],
    wantToRead: [],
    focus: '',
    alertting: false
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

  componentDidMount = () => {
    this.dataRefresh();
  }

  dataRefresh = () => {
    axios.get(`${api}/books`, { headers })
      .then(res => {
        this.setState({
          books: res.data.books
        },() => this.divByShelf())
      })
  }

  divByShelf = () => {
    const {books} = this.state 
    this.setState({
      read: books.filter((data) => data.shelf.match("read")),
      currentlyReading: books.filter((data) => data.shelf.match("currentlyReading")),
      wantToRead: books.filter((data) => data.shelf.match("wantToRead"))
    })
  }

  update = (book, shelf) => {
    // const book = {id: "nggnmAEACAAJ"}
    // const shelf = "currentlyReading"
    axios.put(`${api}/books/${book.id}`, JSON.stringify({ shelf }), {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }})
    .then(res => console.log(res))
    .then(() => this.dataRefresh())
  }

  onClickHandle = (e) => {
    const shelf = e.target.name
    const bookid = {id: e.target.value}
    console.log("shelf: " + shelf + " id: " + e.target.value)
    this.update(bookid, shelf)
    this.setState({
      focus: shelf
    },() => {
      this.setState({alertting: true},
        () => setTimeout(()=>this.setState({alertting: false}), 3000))
    })
  }

  componentDidUpdate = () => {
    const {focus} = this.state
    if(!this.state.showSearchPage && !focus.match('none') && focus.length !== 0 ) {
      const target = document.getElementById(this.state.focus).getBoundingClientRect();
      const body = document.body.getBoundingClientRect();
      const where = target.top - body.bottom
      console.log(where)
      animateScrollTo(where, {speed: 1000, minDuration: 2000, maxDuration: 2000});
    }
  }

  toggle = () => {
    this.setState({alertting: false})
  }


  render() {
    return (
      <Fragment>
        <div className="alert-div">
          <Fade><Alert color="info" isOpen={this.state.alertting} toggle={this.toggle}>Success! - Your Book Has Been Moved</Alert></Fade>
        </div>
        <Container className="app">
          {this.state.showSearchPage ? (
            <div>
              <ShowSearchPage onClick={this.searchPageHandler} clickUpdate={this.onClickHandle}/>
            </div>
          ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h2>Welcome To The Shelf</h2>
              </div>
              <div className="list-books-content">  
                  <ShelfModel shelfID="currentlyReading" shelf={"Currently Reading"} datas={this.state.currentlyReading} clickUpdate={this.onClickHandle}/>
                  <ShelfModel shelfID="wantToRead" shelf={"Want To Read"} datas={this.state.wantToRead} clickUpdate={this.onClickHandle}/>
                  <ShelfModel shelfID="read" shelf={"Read"} datas={this.state.read} clickUpdate={this.onClickHandle}/>
              </div>
              <div className="open-search">
                <Button color="link" onClick={() => this.setState({ showSearchPage: true })}>Add a book</Button>
              </div>
            </div>
          )}
        </Container>
      </Fragment>
    )
  }
}

export default App;