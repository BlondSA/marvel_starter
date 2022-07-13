import React from "react";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ComicsPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description" content="Comics Page" />
                <title>Marvel Comics</title>
            </Helmet>
            <AppBanner />
            <ComicsList />
        </HelmetProvider>
    );
};

export default ComicsPage;
