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

    getAllCharacters = async () => {
        const _urlCharacters = `${this._apiBase}characters?${this.apiLimit(
            9
        )}&${this.apiOffsets(210)}&${this._apiKey}`;
        return this.getResources(_urlCharacters);
    };

    getCharacter = async (id) => {
        const _urlCharacters = `${this._apiBase}characters/${id}?${this._apiKey}`;
        return this.getResources(_urlCharacters);
    };
}

export default MarvelService;
