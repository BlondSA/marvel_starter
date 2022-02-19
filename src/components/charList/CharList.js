import PropTypes from "prop-types";
import React, { Component } from "react";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/Error";
import CharItem from "../charItem/CharItem";
import Spinner from "../spinner/Spinner";
class CharList extends Component {
    state = {
        charList: [],
        charListEnded: false,
        error: false,
        loading: true,
        newItemLoading: false,
        offset: 210,
        onCharActive: false,
    };

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.onRequest();
    };

    onRequest = (limit, offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(limit, offset)
            .then(this.onCharListLoaded)
            .catch(this.onErrorMessage);
    };

    onCharListLoading = () => {
        this.setState({ newItemLoading: true });
    };

    onCharListLoaded = (newCharList) => {
        let endList = false;
        if (newCharList.length < 9) {
            endList = true;
        }
        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            error: false,
            newItemLoading: false,
            offset: offset + 9,
            charListEnd: endList,
        }));
    };

    onErrorMessage = () => {
        this.setState({ error: true, loading: false });
    };

    render() {
        const {
            charList,
            error,
            loading,
            offset,
            newItemLoading,
            charListEnd,
        } = this.state;

        const View = () => {
            return charList.map((char) => {
                const active = this.props.selectedChar === char.id;
                console.log(this.props.charId);

                return (
                    <CharItem
                        key={char.id}
                        active={active}
                        onCharClick={() => {
                            this.props.onCharSelected(char.id);
                        }}
                        char={{ ...char }}
                    />
                );
            });
        };
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? View() : null;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button
                    className="button button__main button__long"
                    onClick={() => this.onRequest(9, offset)}
                    disabled={newItemLoading}
                    style={{ display: charListEnd ? "none" : "block" }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
