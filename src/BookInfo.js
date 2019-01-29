import React, { Fragment } from 'react';
import ButtonModel from './ButtonModel'

const BookInfo = (props) => {
    
    const {authors, id} = props.data
    const {clickUpdate} = props
    return (
        <Fragment>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${props.data.imageLinks ? props.data.imageLinks.thumbnail : 'https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/help.png' }")`}}></div>
                    <div className="book-shelf-changer">
                        <ButtonModel clickUpdate={clickUpdate} id={id}/>
                    </div>
                    </div>
                    <div className="book-title">{props.data.title}</div>
                    {authors ? authors.map((author) => 
                    <div key={author} className="book-authors">
                        {author}
                    </div>
                        ): 
                        <div></div>}
                </div>
            
        </Fragment>
    );
};

export default BookInfo;