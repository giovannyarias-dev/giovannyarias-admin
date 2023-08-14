import React from 'react'
import { IProject } from '../../../../model/project';

type Props = {
  project: IProject;
  edit: Function;
}

const Project: React.FC<Props> = ({ project, edit }) => {
  return (
    <div>
      <div onClick={() => edit(project)}>Edit</div>
      { project.description }
    </div>
  )
}

export default Project