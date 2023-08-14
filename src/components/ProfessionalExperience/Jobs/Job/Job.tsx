import React, { useEffect, useState } from 'react'

import { IJob } from '../../../../model/job';
import { JobStyled } from './Job.styled'

type Props = {
  job: IJob;
  edit: Function;
}

const Job: React.FC<Props> = ({ job, edit }) => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects([]);
  }, []);

  return (
    <JobStyled>
      <div onClick={() => edit(job)}>Edit</div>
      <div>
        Start Date: { job.startDate.toLocaleString() }
      </div>
      { 
        job.endDate && 
        <div>
          End Date: { job.endDate?.toLocaleString() }
        </div> 
      }
    </JobStyled>
  )
}

export default Job