export interface Hero {
    id?:                string;
    superhero?:        string;
    publisher?:        Publisher;
    alter_ego?:        string;
    first_appearance?: string;
    characters?:       string;
    name?:             string;
    email?:            string;
    password?:         string;
    alt_img?:          string;
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
