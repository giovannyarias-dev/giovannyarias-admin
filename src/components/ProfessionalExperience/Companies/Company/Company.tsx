import React from 'react'

import { updateTool } from '../../../../api/cvApi';
import { ICompany } from '../../../../model/company';
import { CompanyStyled } from './Company.styled';

type Props = {
  company: ICompany;
  edit: Function;
}

const Company: React.FC<Props> = ({ company, edit }) => {

  const changeRate = (rate: number) => {
    updateTool(company.id, { rate })
  }

  return (
    <CompanyStyled onClick={() => edit(company)} color={company.color}>
      {
        company.urlImage ? 
          <img src={company.urlImage} className='logo'/> :
          <div className='title'>{company.name}</div>
      }
    </CompanyStyled>
  )
}

export default Company