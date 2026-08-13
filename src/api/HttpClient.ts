export class HttpClient {
    private baseURL: string;
    constructor(baseUrl: string) {
        this.baseURL = baseUrl;
    }

    async get<T>(path: string, params?: Record<string, string>): Promise<unknown> {
        const url = new URL(path, this.baseURL);
        if (params) {
            Object.entries(params).forEach(([key, value]) => 
                url.searchParams.set(key, value)
            );
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return response.json();
    }
}