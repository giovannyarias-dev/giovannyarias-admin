import React, { useCallback, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, DatePicker, Button, Row, Col } from 'antd';

import { NewProjectStyled } from './NewProject.styled'
import { cvStore } from '../../../../store/store';
import { getCompanies, getTools, postProject, updateProject } from '../../../../api/cvApi';
import { ISelectOption } from '../../../../model/form';
import { DATE_FORMAT } from '../../../../constants/constants';
import { toast } from 'react-hot-toast';
import { IProject } from '../../../../model/project';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

type Props = {
  closeDrawer: Function;
  projectSelected: IProject | null;
}

const NewProject: React.FC<Props> = ({ closeDrawer, projectSelected }) => {

  const { handleSubmit, control, reset, formState: { errors }, setValue  } = useForm();
  const rolesOptions = cvStore((state) => state.rolesOptions)

  const [toolsOptions, setToolsOptions] = useState<ISelectOption[]>();
  const [customersOptions, setCustomersOptions] = useState<ISelectOption[]>();

  const getData = useCallback(async () => {
    const toolsResponse = await getTools()
    setToolsOptions(
      toolsResponse.data.map(({ id, name }) => ({ value: id, label: name }))
    );
    
    const companiesResponse = await getCompanies()
    setCustomersOptions(
      companiesResponse.data.map(({ id, name }) => ({ value: id, label: name }))
    )
  }, [])

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (project: any) => {
    if(projectSelected) {
      updateProject(projectSelected.id, project).then(() => {
        reset()
        closeDrawer(true)
        toast.success('project updated successfully')
      })
    } else {
      postProject(project).then(() => {
        reset()
        closeDrawer(true)
        toast.success('Project created successfully')
      })
    }
  }

  useEffect(() => {
    if(projectSelected) {
      setValue('name', projectSelected.name);
      setValue('description', projectSelected.description);
      setValue('tools', projectSelected.tools?.map(({ id }) => id));
      setValue('roles', projectSelected.roles);
      setValue('customers', projectSelected.customers?.map(({ id }) => id));
      setValue('name', projectSelected.name);
      setValue('startDate', dayjs(projectSelected.startDate));
      setValue('endDate', dayjs(projectSelected.endDate));
    } else {
      reset();
    }
  }, [projectSelected])
  
  return (
    <NewProjectStyled>
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
                status={errors.description? 'error': ''}
              />
            )}
          />    
        </div>
        <div>
          <label>Roles</label>
          <Controller
            name="roles"
            control={control}
            render={({
              field: { onChange, onBlur, value, ref }
            }) => (
              <Select 
                mode="multiple"
                allowClear
                options={ rolesOptions }
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
          <label>Tools</label>
          <Controller
            name="tools"
            control={control}
            render={({
              field: { onChange, onBlur, value, ref }
            }) => (
              <Select 
                mode="multiple"
                allowClear
                options={ toolsOptions }
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
          <label>Clients</label>
          <Controller
            name="customers"
            control={control}
            render={({
              field: { onChange, onBlur, value, ref }
            }) => (
              <Select 
                mode="multiple"
                allowClear
                options={ customersOptions }
                style={{ width: '100%' }}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />    
        </div>
        <Button htmlType="submit" type="primary">Save</Button>
      </form>
    </NewProjectStyled>
  )
}

export default NewProject