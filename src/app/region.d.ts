export interface Region {
  code: string;
  nom: string;
}

export interface Department {
  code: string;
  nom: string;
  codeRegion: string;
}

export interface City {
  code: string;
  nom: string;
  codeRegion: string;
  codeDepartement: string;
  population: number;
  codesPostaux: string[];
  codeEpci: string;
  siren: string;
}
