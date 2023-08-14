import axios from 'axios';
import { IJob, IJobFlex } from '../model/job';
import http from "../http-common";
import { DATE_FORMAT_ISO } from '../constants/constants';
import { ITool, IToolFlex } from '../model/tool';
import { ICompany, ICompanyFlex } from '../model/company';
import { IProject, IProjectFlex } from '../model/project';

export const getJobs = () => {
  return http.get<Array<IJob>>("/jobs");
}

export const postJob = (job: IJobFlex) => {
  const jobAdapt = {
    startDate: job.startDate?.format(DATE_FORMAT_ISO),
    endDate: job.endDate?.format(DATE_FORMAT_ISO),
    ...job
  }
  return http.post('/jobs', jobAdapt);
}

export const getTools = () => {
  return http.get<Array<ITool>>("/tools");
}

export const postTool = (tool: IToolFlex) => {
  return http.post('/tools', tool);
}

export const updateTool = (idTool: number, tool: IToolFlex) => {
  return http.patch(`/tools/${idTool}`, tool);
}

export const getCompanies = () => {
  return http.get<Array<ICompany>>("/companies");
}

export const postCompany = (company: ICompanyFlex) => {
  return http.post('/companies', company);
}

export const updateCompany = (idCompany: number, company: ICompanyFlex) => {
  return http.patch(`/companies/${idCompany}`, company);
}

export const postProject = (project: IProjectFlex) => {
  const projectAdapt = {
    startDate: project.startDate?.format(DATE_FORMAT_ISO),
    endDate: project.endDate?.format(DATE_FORMAT_ISO),
    ...project
  }
  return http.post('/projects', projectAdapt);
}

export const getProjects = () => {
  return http.get<Array<IProject>>("/projects");
}

export const updateProject = (idProject: string, project: IProjectFlex) => {
  return http.patch(`/projects/${idProject}`, project);
}

export const updateJob = (idJob: string, job: IJobFlex) => {
  return http.patch(`/jobs/${idJob}`, job);
}
