import React, { useState, useEffect } from "react";
import "./charInfo.scss";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/Error";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import { letterCut } from "../../utils/utils";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    const { charId } = props;

    useEffect(() => {
        updateChar();
    }, [charId]);

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId).then(onCharLoaded);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = char;
    const slicedDescription = letterCut(description);
    let imgStyle = { objectFit: "cover" };
    if (
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
        imgStyle = { objectFit: "fill" };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{slicedDescription}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0
                    ? null
                    : "There is no comics with this character."}
                {comics.map((item, index) => {
                    if (index > 9) {
                        // eslint-disable-next-line array-callback-return
                        return;
                    }
                    return (
                        <li key={index} className="char__comics-item">
                            <a href={item.resourceURI}>{item.name}</a>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CharInfo;
