import React, { useCallback, useEffect, useState } from 'react'
import { Button, Collapse, Drawer } from 'antd';

import { getJobs } from '../../../api/cvApi';
import { IJob } from '../../../model/job';
import { JobsStyled } from './Jobs.styled'
import Job from './Job/Job';
import NewJob from './NewJob/NewJob';
import { useDrawer } from '../../../hooks/useDrawer';
import { HeaderActions } from '../../shared/StyledComponents/StyledComponents.styled';

const { Panel } = Collapse;

const Jobs: React.FC = () => {

  const [jobs, setJobs] = useState<IJob[]>([])
  const [jobSelected, setJobSelected] = useState<IJob | null>(null)

  const getData = useCallback(async () => {
    const jobsResponse = await getJobs()
    setJobs(jobsResponse.data);
  }, [])

  const { isOpenDrawer, showDrawer, closeDrawer } = useDrawer(getData)

  useEffect(() => {
    getData()
  }, [])

  const editJob = (job: IJob) => {
    setJobSelected(job);
    showDrawer();
  }

  const closeAndClean = (refresh: boolean) => {
    setJobSelected(null);
    closeDrawer(refresh);
  }

  const newJob = () => {
    setJobSelected(null);
    showDrawer();
  }

  return (
    <JobsStyled>
      <HeaderActions>
        <Button onClick={showDrawer}>
          New job
        </Button>
      </HeaderActions>
      {
        jobs.length>0 &&
        <Collapse accordion>
          { jobs.map((job: IJob) => 
            <Panel header={ job.company? `${job.company.name} - ${job.name}`: job.name} key={`panel${ job.id }`}>
              <Job job={ job } edit={ editJob } />
            </Panel>
          )}
        </Collapse>
      }
      <Drawer title={jobSelected? 'Edit job': 'New job'} onClose={() => closeAndClean(false)} open={isOpenDrawer}>
        <NewJob closeDrawer={() => closeAndClean(true)} jobSelected={jobSelected}  />
      </Drawer>
    </JobsStyled>
  )
}

export default Jobs