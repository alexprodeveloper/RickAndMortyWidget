import {ApiCharacters, Character, Episode} from "../interfaces/interfaces";

export default new class RickAndMortyService {

    public async getAllCharacters(): Promise<Character[]> {
        let characters: Character[] = [];
        let charactersOnPage: ApiCharacters = await this.getData('https://rickandmortyapi.com/api/character');
        characters = characters.concat(charactersOnPage.results);
        if (charactersOnPage.info.next) {
            while (true) {
                charactersOnPage = await this.getData(charactersOnPage.info.next);
                characters = characters.concat(charactersOnPage.results);
                if (!charactersOnPage.info.next) {
                    break;
                }
            }
        }
        return characters;
    }

    public async getEpisodes(urls: string[]): Promise<Episode[]> {
        const episodes = [];
        for (const url of urls) {
            const episode: Episode = await this.getData(url);
            episodes.push(episode);
        }
        return episodes;
    }

    public async getData(url: string): Promise<any> {
        const response = await fetch(url);
        return response.json();
    }
}