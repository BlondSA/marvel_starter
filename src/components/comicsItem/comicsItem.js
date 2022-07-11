import React from "react";
import { Link } from "react-router-dom";
import "./comicsItem.scss";

const ComicsItem = ({ comic }) => {
    const { thumbnail, price, title, id } = comic;

    return (
        <li className="comics__item">
            <Link to={`/comics/${id}`}>
                <img src={thumbnail} alt={title} className="comics__item-img" />
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}</div>
            </Link>
        </li>
    );
};

export default ComicsItem;
