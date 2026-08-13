export interface Category  {
    id: number;
    name: string;
}

export interface Movie {
    id: string;
    title: string;
    description: string;
    urlHorizontalPoster: string;
    urlVerticalPoster: string;
    urlMedia: string;
    subtitle: string;
    categories: Category[];
}