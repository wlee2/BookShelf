import React from 'react';
import BookInfo from '../BookInfo';

const Read = (props) => {
    const {read} = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
            {
                read ? read.map((data) => <BookInfo data={data}/>) :
                <h2>There's anything here...</h2>
            }
            </ol>
            </div>
        </div>
    );
};

export default Read;