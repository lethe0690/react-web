import React from 'react';


const createItem = function (item) {

    let clickHandler = function (id) {
        console.log(id);
    };

    return (
        <div>
            <li key={item.id}> {item.text}</li>

            <button onClick={(e)=>{clickHandler(item.id)}}> click me</button>

        </div>);
};

const ReviewList = ({list}) => (

    <div>
        <ul>
            {list.map(createItem)}
        </ul>
    </div>

);

export default ReviewList;


