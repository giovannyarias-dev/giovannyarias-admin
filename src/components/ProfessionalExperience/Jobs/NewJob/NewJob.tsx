import React, { useCallback, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Input, DatePicker, Col, Row, Button, Select } from 'antd';

import { NewJobStyled } from './NewJob.styled'
import { toast } from 'react-hot-toast';
import { getCompanies, getProjects, postJob, updateJob } from '../../../../api/cvApi';
import { IJob, IJobFlex } from '../../../../model/job';
import { DATE_FORMAT } from '../../../../constants/constants';
import { ISelectOption } from '../../../../model/form';
import dayjs from 'dayjs';

const { TextArea } = Input;

type Props = {
  closeDrawer: Function;
  jobSelected: IJob | null;
}

const NewJob: React.FC<Props> = ({ closeDrawer, jobSelected }) => {

  const { handleSubmit, control, reset, formState: { errors }, setValue } = useForm()
  const [projectsOptions, setProjectsOptions] = useState<ISelectOption[]>();
  const [companyOptions, setCompanyOptions] = useState<ISelectOption[]>();

  const getData = useCallback(async () => {
    const projectsResponse = await getProjects()
    setProjectsOptions(
      projectsResponse.data.map(({ id, name }) => ({ value: id, label: name }))
    )

    const companiesResponse = await getCompanies()
    setCompanyOptions(
      companiesResponse.data.map(({ id, name }) => ({ value: id, label: name }))
    )

  }, [])

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (job: any) => {
    if(jobSelected) {
      updateJob(jobSelected.id, job).then(() => {
        reset()
        closeDrawer(true)
        toast.success('Job updated successfully')
      })
    } else {
      postJob(job).then(() => {
        reset()
        closeDrawer(true)
        toast.success('Job created successfully')
      })
    }
  }

  useEffect(() => {
    if(jobSelected) {
      setValue('name', jobSelected.name);
      setValue('startDate', dayjs(jobSelected.startDate));
      setValue('endDate', dayjs(jobSelected.endDate));
      setValue('projects', jobSelected.projects?.map(({ id }) => id));
      setValue('company', jobSelected.company?.id);
    } else {
      reset();
    }
  }, [jobSelected])

  return (
    <NewJobStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value, name, ref }
            }) => (
              <Input
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
                status={errors.name? 'error': ''}
              />
            )}
          />    
        </div>
        <Row>
          <Col span={12}>
            <label>Start date</label>
            <div>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref }
                }) => (
                  <DatePicker
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    format={DATE_FORMAT}
                    status={errors.startDate? 'error': ''}
                  />
                )}
              />
            </div>
          </Col>
          <Col span={12}>
            <label>End date</label>
            <div>
              <Controller
                name="endDate"
                control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref }
                }) => (
                  <DatePicker
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    format={DATE_FORMAT}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <div>
          <label>Company</label>
          <Controller
            name="company"
            control={control}
            render={({
              field: { onChange, onBlur, value, ref }
            }) => (
              <Select 
                allowClear
                options={ companyOptions }
                style={{ width: '100%' }}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />    
        </div>
        <div>
          <label>Description</label>
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value, name, ref }
            }) => (
              <TextArea
                rows={4} 
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
                status={errors.name? 'error': ''}
              />
            )}
          />    
        </div>
        <div>
          <label>Projects</label>
          <Controller
            name="projects"
            control={control}
            render={({
              field: { onChange, onBlur, value, ref }
            }) => (
              <Select 
                mode="multiple"
                allowClear
                options={ projectsOptions }
                style={{ width: '100%' }}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />    
        </div>
        <Button type="primary" htmlType="submit" >
          Save
        </Button>
      </form>
    </NewJobStyled>
  )
}

export default NewJob