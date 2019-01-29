import React, { Component, Fragment } from 'react'
import './App.css'
import axios from 'axios';
import ShowSearchPage from './ShowSeachPage';
import {api, headers} from './API';
import { Container, Button, Alert } from 'reactstrap';
import ShelfModel from './Shelf/ShelfModel';

class App extends Component {
  state = {
    showSearchPage: false,
    books: [],
    read: [],
    currentlyReading: [],
    wantToRead: [],
    foucs: '',
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
      this.setState({alertting: true})
      // if(!shelf.match('none')){
      //   console.log(document.getElementById(this.state.focus))
      //   document.getElementById(this.state.focus).focus()
      // }
    })
  }

  alertting = () => {
    if(this.state.alertting === true){
      return <Alert color="success">Success!</Alert>
    }
  }

  render() {
    return (
      <Fragment>
        <div className="alert-div">
          {this.alertting()}
        </div>
        <Container className="app">
          {this.state.showSearchPage ? (
            <div>
              <ShowSearchPage onClick={this.searchPageHandler} clickUpdate={this.onClickHandle}/>
            </div>
          ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>Welcome To The Shelf</h1>
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