import React from "react";
import { Link } from "react-router-dom";
import "./singleComicLayout.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SingleComicLayout = ({ data }) => {
    const { description, language, pageCount, price, thumbnail, title } = data;

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description" content={`${title} comics book`} />
                <title>{title}</title>
            </Helmet>
            <div className="single-comic">
                <img
                    src={thumbnail}
                    className="single-comic__img"
                    alt={title}
                />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">
                    Back to all
                </Link>
            </div>
        </HelmetProvider>
    );
};

export default SingleComicLayout;
