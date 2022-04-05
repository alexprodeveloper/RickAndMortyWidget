export interface Character {
    created: Date;
    episode: string[];
    gender: string;
    id: number;
    image: string;
    location?: Place;
    name: string;
    origin?: Place;
    species: string;
    status: string;
    type: string;
    url: string;
}

export interface Place {
    created: Date;
    dimension: string;
    id: number;
    name: string;
    residents?: string[];
    type: string;
    url: string;
}

export interface ApiCharacters {
    info: {
        count: number,
        next: string | null,
        pages: number,
        prev: string | null,
    };
    results: Character[];
}

export interface Episode {
    air_date: Date;
    characters?: Character[];
    created: Date;
    episode: string;
    id: number;
    name: string;
    url: string;
}

export interface Filter {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
}

export type filterFields = 'name' | 'status' | 'species' | 'type' | 'gender';