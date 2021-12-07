class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=5384c4510ace48c6fd92d05377104684";

    apiOffsets = (count) => {
        return `offset=${count}`;
    };

    apiLimit = (limit) => {
        return `limit=${limit}`;
    };

    getResources = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    getAllCharacters = async (apiLimit = 9, apiOffsets = 210) => {
        const _urlCharacters = `${this._apiBase}characters?${this.apiLimit(
            apiLimit
        )}&${this.apiOffsets(apiOffsets)}&${this._apiKey}`;
        const res = await this.getResources(_urlCharacters);
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        const _urlCharacter = `${this._apiBase}characters/${id}?${this._apiKey}`;
        const res = await this.getResources(_urlCharacter);
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };
}

export default MarvelService;
