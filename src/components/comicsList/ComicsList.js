import React, { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/Error";
import useMarvelService from "../../services/MarvelService";
import "./comicsList.scss";
import ComicsItem from "../comicsItem/comicsItem";

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [comicsListEnd, setComicsListEnd] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [limit] = useState(8);
    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(limit, offset, true);
    }, []);

    const onRequest = (limit, offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(limit, offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = (newComicsList) => {
        let endList = false;
        if (newComicsList.length < 8) {
            endList = true;
        }

        setComicsList((charList) => {
            return [...charList, ...newComicsList];
        });
        setNewItemLoading(false);
        setOffset((offset) => {
            return offset + 1;
        });
        setComicsListEnd(endList);
    };

    const View = () => {
        return comicsList.map((comic, i) => {
            return <ComicsItem key={i} comic={{ ...comic }} />;
        });
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spiner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {spiner}
                {View()}
            </ul>
            <button
                className="button button__main button__long"
                onClick={() => {
                    onRequest(8, offset);
                }}
                disabled={newItemLoading}
                style={{ display: comicsListEnd ? "none" : "block" }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
