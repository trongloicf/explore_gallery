export interface GalleryItem {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string[];
    author: string;
    url: string;
    likes: number;
    views: number;
    createdAt: string;
}

export interface GalleryItemCreate {
    title: string;
    description: string;
    category: string;
    tags: string[];
    author: string;
    url: string;
    likes: number;
    views: number;
    createdAt: string;
}

export interface GalleryResponse {
    gallerys: GalleryItem[];
}