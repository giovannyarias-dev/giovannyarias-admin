import { Dayjs } from "dayjs";
import { ICompany } from "./company";
import { ITool } from "./tool";

export interface IProject {
  id: string;
  name: string;
  description?: string;
  tools?: ITool[];
  roles?: string[];
  customers?: ICompany[];
  startDate: Date;
  endDate?: Date;
}

export interface IProjectFlex {
  id?: string;
  name?: string;
  description?: string;
  tools?: number[];
  roles?: string[];
  customers?: number[];
  startDate?: Dayjs;
  endDate?: Dayjs;
}