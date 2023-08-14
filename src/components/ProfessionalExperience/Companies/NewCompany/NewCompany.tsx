import { Button, Input, Popover, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BlockPicker } from 'react-color';

import { postCompany, updateCompany } from '../../../../api/cvApi';
import { useUploadFile } from '../../../../hooks/useUploadFile'
import { ICompany, ICompanyFlex } from '../../../../model/company';
import InputFile from '../../../shared/InputFile/InputFile';
import { NewCompanyStyled } from './NewCompany.styled';
import ColorPicker from '../../../shared/ColorPicker/ColorPicker';

type Props = {
  closeDrawer: Function;
  companySelected: ICompany | null;
}

const NewCompany: React.FC<Props> = ({ closeDrawer, companySelected }) => {

  const { file, selectFile, uploadToS3 } = useUploadFile('cv/companies');
  const { handleSubmit, reset, control, setValue, formState: { errors } } = useForm()
  const [ color, setColor] = useState<string | undefined>('#1776ff');

  const onSubmit = async (company: ICompanyFlex) => {

    if(file)
      company.urlImage = await uploadToS3();

    company.color = color;
        
    if(companySelected) {
      updateCompany(companySelected.id, company).then(() => {
        reset()
        closeDrawer(true)
        toast.success('Company updated successfully')
      })
    } else {
      postCompany(company).then(() => {
        reset()
        closeDrawer(true)
        toast.success('Company created successfully')
      })
    }
  } 

  useEffect(() => {
    if(companySelected) {
      setValue('name', companySelected.name);
      setValue('color', companySelected?.color);
      setColor(companySelected?.color);
    } else {
      reset();
    }
  }, [companySelected])
  
  const changeColor = (color: any) => {
    setColor(color.hex);
  }

  return (
    <NewCompanyStyled color={color}>
      {
        companySelected?.urlImage &&
        <div className='image-container exist'>
          <img src={companySelected?.urlImage} />
          <div className="upload-file">
            <InputFile selectFile={selectFile} icon="change" size="s"/>
          </div>
        </div>
      }
      {
        (!companySelected || !companySelected?.urlImage) &&
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
          <label>Color</label>
          <ColorPicker onChange={(color: any) => changeColor(color)} color={color} />
        </div>
        <Button type="primary" htmlType="submit" >
          Save
        </Button>
      </form>
    </NewCompanyStyled>
    
  )
}

export default NewCompany