import React from 'react';
import BookInfo from '../BookInfo';

const ShelfModel = (props) => {
    const {shelf, shelfID, datas, clickUpdate} = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {
                    datas.length > 0 ? datas.map((data) => <BookInfo key={data.id} data={data} clickUpdate={clickUpdate}/>) :
                    <h2>There's anything here...</h2>
                }
                </ol>
            </div>
            <a href={`#${shelfID}`} id={shelfID} ></a>
        </div>
    );
};

export default ShelfModel;