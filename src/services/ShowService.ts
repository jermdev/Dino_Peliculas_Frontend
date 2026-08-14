import type { HomeFeed } from '../types/HomeFeed'
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
}