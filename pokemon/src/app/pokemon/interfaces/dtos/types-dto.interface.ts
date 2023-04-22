export interface TypesDto {
  count: number;
  next: number;
  previous: number;
  results: type[];
}

export interface type {
  name: string;
  url: string;
}
