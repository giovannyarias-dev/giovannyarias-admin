import { Dayjs } from "dayjs";
import { ICompany } from "./company";
import { IProject } from "./project";

export interface IJob {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  projects?: IProject[];
  company: ICompany;
  description?: string;
}

export interface IJobFlex {
  id?: string;
  name?: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
  projects?: String[];
  company: string;
  description?: string;
}

