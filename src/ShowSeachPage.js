import React, { Component } from 'react';
import axios from 'axios'
import {api, headers} from './API';
import BookInfo from './BookInfo';
import {Button} from 'reactstrap'

class ShowSeachPage extends Component {
  state = {
    searchData: [],
    search: ''
  }

  search = (query) => {
    axios.post(`${api}/search`, JSON.stringify({ query }), {
      headers: {
      ...headers,
      'Content-Type': 'application/json'
    }})
    .then(res => this.setState({
      searchData: res.data.books
    }))
  }

  handleChange = (e) => {
    if(e.target.value.length > 0) {
      this.setState({
        search: e.target.value
      }, () => this.search(this.state.search))
    }
    else {
      this.setState({
        search: '',
        searchData: []
      })
    }
    
  }
  
    render(props) {
      const {searchData} = this.state
      const nothingColor = {
        color: 'darkgray'
      }
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Button color="link" className="close-search" onClick={this.props.onClick}></Button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.search} onChange={this.handleChange}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  searchData.length ? searchData.map((data) => <BookInfo key={data.id} data={data} clickUpdate={this.props.clickUpdate}/>) : 
                  <h2 style={nothingColor}>There's anything here...</h2>
                }
              </ol>
            </div>
          </div>
        );
    }
}

export default ShowSeachPage;