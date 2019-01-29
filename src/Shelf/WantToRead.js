import React from 'react';
import BookInfo from '../BookInfo';

const WantToRead = (props) => {
    const {wantToRead} = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Want To Read</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
            {
                wantToRead ? wantToRead.map((data) => <BookInfo data={data}/>) :
                <h2>There's anything here...</h2>
            }
            </ol>
            </div>
        </div>
    );
};

export default WantToRead;