import type { HomeFeed } from '../types/HomeFeed'
import type { Movie } from '../types/Movie'
import type { AutocompleateSearch } from '../types/AutocompleateSearch'
import { MovieClient } from '../api/MovieClient'
import { HttpClient } from '../api/HttpClient'
import { dino_client } from '../api/apiClient'

export class ShowService {

    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient(dino_client);
    }

    async buildPage(): Promise<HomeFeed> {
        const client = new MovieClient(this.httpClient);
        return client.getHomeFeed();
    }

    async getMovieById(id: string): Promise<Movie> {
        const client = new MovieClient(this.httpClient)
        const respuesta = client.getMovieById(id);
        return respuesta;
    }

    async autocompleateMovieName(name: string): Promise<AutocompleateSearch[]> {
        const client = new MovieClient(this.httpClient);
        const respuesta = client.autoCompleateSearch(name, 10);
        return respuesta;
        
    }
}