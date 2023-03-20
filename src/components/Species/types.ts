export interface SpeciesTypes {
  count: number;
  next: string;
  previous: null;
  results: SimpleSpecies[];
}

export interface SimpleSpecies {
  name: string;
  classification: string;
  designation: Designation;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: null | string;
  language: string;
  people: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}

export enum Designation {
  Reptilian = "reptilian",
  Sentient = "sentient",
}
