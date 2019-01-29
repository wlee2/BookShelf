import React, { Fragment } from 'react';

const BookInfo = (props) => {
    
    const {authors} = props.data
    return (
        <Fragment>
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${props.data.imageLinks ? props.data.imageLinks.thumbnail : 'https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/help.png' }")`}}></div>
                    <div className="book-shelf-changer">
                        <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{props.data.title}</div>
                    {authors ? authors.map((author) => 
                    <div className="book-authors">
                        {author}
                    </div>
                        ): 
                        <div></div>}
                </div>
            </li>
        </Fragment>
    );
};

export default BookInfo;