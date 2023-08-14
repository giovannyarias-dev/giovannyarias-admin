import { Button, Input, Select } from 'antd';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { postTool, updateTool } from '../../../../api/cvApi';
import { typesToolsOptions } from '../../../../constants/selectOptions';
import { useUploadFile } from '../../../../hooks/useUploadFile'
import { ITool, IToolFlex } from '../../../../model/tool';
import InputFile from '../../../shared/InputFile/InputFile';
import { NewToolStyled } from './NewTool.styled';

type Props = {
  closeDrawer: Function;
  toolSelected: ITool | null;
}

const NewTool: React.FC<Props> = ({ closeDrawer, toolSelected }) => {

  const { file, selectFile, uploadToS3 } = useUploadFile('cv/tools');
  const { handleSubmit, reset, control, setValue, formState: { errors } } = useForm()

  const onSubmit = async (tool: IToolFlex) => {

    if(file)
      tool.urlImage = await uploadToS3();
    
    if(toolSelected) {
      updateTool(toolSelected.id, tool).then(() => {
        reset()
        closeDrawer(true)
        toast.success('Tool updated successfully')
      })
    } else {
      postTool(tool).then(() => {
        reset()
        closeDrawer(true)
        toast.success('Tool created successfully')
      })
    }
  } 

  useEffect(() => {
    if(toolSelected) {
      setValue('name', toolSelected.name);
      setValue('type', toolSelected.type);
    } else {
      reset();
    }
  }, [toolSelected])
  

  return (
    <NewToolStyled>
      {
        toolSelected?.urlImage &&
        <div className='image-container exist'>
          <img src={toolSelected?.urlImage} />
          <div className="upload-file">
            <InputFile selectFile={selectFile} icon="change" size="s"/>
          </div>
        </div>
      }
      {
        (!toolSelected || !toolSelected?.urlImage) &&
        <div className='image-container new'>
          <InputFile selectFile={selectFile} icon="picture" size="m"/>
          <div>
            { file?.name ? file?.name : 'Select image...' }
          </div>
        </div>
      }
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
        <div>
          <label>Type</label>
          <Controller
            name="type"
            control={control}
            render={({
              field: { onChange, onBlur, value, name, ref }
            }) => (
              <Select 
                allowClear
                options={ typesToolsOptions }
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
    </NewToolStyled>
    
  )
}

export default NewTool