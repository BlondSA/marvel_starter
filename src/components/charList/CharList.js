import React, { Component } from "react";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../error/Error";
import CharItem from "../charItem/CharItem";
import Spinner from "../spinner/Spinner";
class CharList extends Component {
    state = {
        allChars: [],
        error: false,
        loading: true,
        charLoads: 9,
    };

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.updateChars();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.charLoads !== prevState.charLoads) {
            this.updateChars();
        }
    };

    onCharsLoaded = (allChars) => {
        this.setState({ allChars, loading: false, error: false });
    };

    onCharsLoading = () => {
        this.setState({ loading: true, error: false });
    };

    onErrorMessage = () => {
        this.setState({ error: true, loading: false });
    };

    updateChars = () => {
        this.onCharsLoading();
        this.marvelService
            .getAllCharacters(this.state.charLoads, 210)
            .then(this.onCharsLoaded)
            .catch(this.onErrorMessage);
    };

    onLoadCharMore = () => {
        this.setState(({ charLoads }) => {
            return { charLoads: charLoads + 9 };
        });
    };

    render() {
        const { allChars, error, loading } = this.state;

        const contentView = () => {
            return allChars.map((char) => {
                return (
                    <CharItem
                        key={char.id}
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
        const content = !(loading || error) ? contentView() : null;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner" onClick={this.onLoadCharMore}>
                        load more
                    </div>
                </button>
            </div>
        );
    }
}

export default CharList;
