export interface ITool {
  id: number;
  name: string;
  urlImage?: string;
  rate?: number;
  type?: string;
  favorite?: boolean;
}

export interface IToolFlex {
  id?: number;
  name?: string;
  urlImage?: string;
  rate?: number;
  type?: string;
  favorite?: boolean;
}