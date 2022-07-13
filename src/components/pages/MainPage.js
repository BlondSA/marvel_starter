import React, { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import decoration from "../../resources/img/vision.png";
import CharSearchForm from "../charSearchForm/CharSearchForm";

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    };
    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description" content="Marvel information portal" />
                <title>Marvel information</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        onCharSelected={onCharSelected}
                        selectedChar={selectedChar}
                    />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </HelmetProvider>
    );
};

export default MainPage;
