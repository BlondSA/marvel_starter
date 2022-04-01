import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./charList.scss";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/Error";
import CharItem from "../charItem/CharItem";
import Spinner from "../spinner/Spinner";

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [charListEnd, setCharListEnd] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [limit] = useState(9);
    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(limit, offset, true);
    }, []);

    const onRequest = (limit, offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(limit, offset).then(onCharListLoaded);
    };

    const onCharListLoaded = (newCharList) => {
        let endList = false;
        if (newCharList.length < 9) {
            endList = true;
        }

        setCharList((charList) => {
            return [...charList, ...newCharList];
        });
        setNewItemLoading(false);
        setOffset((offset) => {
            return offset + 1;
        });
        setCharListEnd(endList);
    };

    const View = () => {
        return charList.map((char, i) => {
            const active = props.selectedChar === char.id;

            return (
                <CharItem
                    // key={char.id} // Не уникальные id с сервера
                    key={i}
                    active={active}
                    onCharClick={() => {
                        props.onCharSelected(char.id);
                    }}
                    char={{ ...char }}
                />
            );
        });
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {View()}
            </ul>
            <button
                className="button button__main button__long"
                onClick={() => onRequest(9, offset)}
                disabled={newItemLoading}
                style={{ display: charListEnd ? "none" : "block" }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
