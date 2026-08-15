import type { AutocompleateSearch } from '../types/AutocompleateSearch' 
import { AutocompleateSearchValidation } from '../utils/valueObjects/AutocompleateSearchValidation'
import { HttpClient } from './HttpClient'
import type { Movie }  from '../types/Movie'
import type { HomeFeed } from '../types/HomeFeed'
import { getMovieByIdValidation } from '../utils/valueObjects/getMovieByIdValidation'
import { HomeFeedValidation } from '../utils/valueObjects/HomeFeedValidation'
import { adaptMovie } from '../adapters/movieAdapter'

export class MovieClient {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient){
        this.httpClient = httpClient; 
    }

    async autoCompleateSearch(searchString: string, limit: number ): Promise<AutocompleateSearch[]> {
        const data = await this.httpClient.get('movie/autocomplete', {
            q: searchString,
            limit: limit.toString(),
        });
        return AutocompleateSearchValidation(data);
    }

    async getMovieById(id: string): Promise<Movie> {
        const data = await this.httpClient.get(`content/${id}`);
        const validated = getMovieByIdValidation(data);
        return adaptMovie(validated);
    }

    async getHomeFeed(): Promise<HomeFeed> {
        const data = await this.httpClient.get(`home`);
        return HomeFeedValidation(data);
    }   
}