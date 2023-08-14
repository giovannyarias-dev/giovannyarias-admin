import { Button, Collapse, Drawer } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

import { getProjects } from '../../../api/cvApi'
import { useDrawer } from '../../../hooks/useDrawer'
import { IProject } from '../../../model/project'
import { HeaderActions } from '../../shared/StyledComponents/StyledComponents.styled'
import NewProject from './NewProject/NewProject'
import { ProjectsStyled } from './Project.styled'
import Project from './Project/Project'

const { Panel } = Collapse;

const Projects = () => {

  const [projects, setProjects] = useState<IProject[]>([])
  const [projectSelected, setProjectSelected] = useState<IProject | null>(null)

  const getData = useCallback(async () => {
    const projectsResponse = await getProjects()
    setProjects(projectsResponse.data);
  }, [])

  const { isOpenDrawer, showDrawer, closeDrawer } = useDrawer(getData)

  useEffect(() => {
    getData()
  }, [])

  const editProject = (project: IProject) => {
    setProjectSelected(project);
    showDrawer();
  }

  const closeAndClean = (refresh: boolean) => {
    setProjectSelected(null);
    closeDrawer(refresh);
  }

  const newProject = () => {
    setProjectSelected(null);
    showDrawer();
  }

  return (
    <ProjectsStyled>
      <HeaderActions>
        <Button onClick={newProject}>
          New project
        </Button>
      </HeaderActions>
      {
        projects.length>0 &&
        <Collapse accordion>
          { projects.map((project: IProject) => 
            <Panel header={project.name} key={`panel${ project.id }`}>
              <Project edit={ editProject } project={ project } />
            </Panel>
          )}
        </Collapse>
      }
      <Drawer title={projectSelected? 'Edit project': 'New project'} onClose={() => closeAndClean(false)} open={isOpenDrawer}>
        <NewProject closeDrawer={() => closeAndClean(true)} projectSelected={projectSelected} />
      </Drawer>
    </ProjectsStyled>
  )
}

export default Projects