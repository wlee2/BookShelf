import React from 'react';
import BookInfo from '../BookInfo';

const CurrentlyReading = (props) => {
    const {currentlyReading} = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
            {
                currentlyReading ? currentlyReading.map((data) => <BookInfo data={data}/>) :
                <h2>There's anything here...</h2>
            }
            </ol>
            </div>
        </div>
    );
};

export default CurrentlyReading;