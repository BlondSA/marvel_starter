import React, { useState } from "react";
import AppBanner from "../appBanner/AppBanner";
import AppHeader from "../appHeader/AppHeader";
import ComicsList from "../comicsList/ComicsList";
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";
// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

// import decoration from "../../resources/img/vision.png";

const App = () => {
    // const [selectedChar, setSelectedChar] = useState(null);

    // const onCharSelected = (id) => {
    //     setSelectedChar(id);
    // };

    return (
        <div className="app">
            <AppHeader />
            <main>
                <AppBanner />
                <ComicsList />
                {/* <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList
                            onCharSelected={onCharSelected}
                            selectedChar={selectedChar}
                        />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" /> */}
            </main>
        </div>
    );
};

export default App;
