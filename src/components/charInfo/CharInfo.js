import React, { Component } from "react";
import "./charInfo.scss";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/Error";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import { letterCut } from "../../utils/utils";

export class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.updateChar();
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    };

    onCharLoaded = (char) => {
        this.setState({ char, loading: false, error: false });
    };

    onCharLoading = () => {
        this.setState({ loading: true });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? (
            <View char={char} />
        ) : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = char;
    console.log(comics);
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
