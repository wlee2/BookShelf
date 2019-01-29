import axios from 'axios';

const api = "https://reactnd-books-api.udacity.com"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// export const get = (bookId) =>
//   fetch(`${api}/books/${bookId}`, { headers })
//     .then(res => res.json())
//     .then(data => data.book)
export const get = (bookID) => {
  let data = []
  axios.get(`${api}/books/${bookID}`, {headers})
  .then(res => data = res.data)
  
  console.log(data)

  return data
}

export const getAll = () => {
  var datas = []
  axios.get(`${api}/books`, { headers })
    .then(res => {
      //datas = res.data.books
      res.data.books.map(data => datas.push(data))
    })

    return datas
}


// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

export const update = (book, shelf) => {
  axios.put(`${api}/books/${book.id}`, JSON.stringify({ shelf }), {
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  }})
  .then(res => console.log(res))
}

// export const search = (query) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query })
//   }).then(res => res.json())
//     .then(data => data.books)

export const search = (query) => {
  let data = []
  axios.post(`${api}/search`, JSON.stringify({ query }), {
    headers: {
    ...headers,
    'Content-Type': 'application/json'
  }})
  .then(res => data.push(res.data.books))
  return data
}
