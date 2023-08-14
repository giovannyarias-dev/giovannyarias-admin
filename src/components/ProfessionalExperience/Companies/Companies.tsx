import React, { useCallback, useEffect, useState } from 'react'
import { Button, Drawer } from 'antd'

import { useDrawer } from '../../../hooks/useDrawer'
import { HeaderActions } from '../../shared/StyledComponents/StyledComponents.styled'
import { CompaniesStyled } from './Companies.styled'
import { ICompany } from '../../../model/company'
import NewCompany from './NewCompany/NewCompany'
import Company from './Company/Company'
import { getCompanies } from '../../../api/cvApi'

const Companies = () => {
  const [companies, setCompanies] = useState<ICompany[]>([])
  const [companySelected, setCompanySelected] = useState<ICompany | null>(null)

  const getData = useCallback(async () => {
    const companiesResponse = await getCompanies()
    setCompanies(companiesResponse.data);
  }, [])

  const { isOpenDrawer, showDrawer, closeDrawer } = useDrawer(getData)

  useEffect(() => {
    getData()
  }, [])

  const editCompany = (company: ICompany) => {
    setCompanySelected(company);
    showDrawer();
  }

  const closeAndClean = (refresh: boolean) => {
    setCompanySelected(null);
    closeDrawer(refresh);
  }

  const newCompany = () => {
    setCompanySelected(null);
    showDrawer();
  }

  return (
    <CompaniesStyled>
      <HeaderActions>
        <Button onClick={newCompany}>
          New company
        </Button>
      </HeaderActions>
      <div className='grid'>
        {
          companies.length>0 &&
          companies.map((company: ICompany) => <Company company={ company } key={company.id} edit={editCompany}/>)
        }
      </div>
      <Drawer title={companySelected? 'Edit company': 'New company'} onClose={() => closeAndClean(true)} open={isOpenDrawer} bodyStyle={{ padding: 0 }} >
        <NewCompany closeDrawer={() => closeAndClean(true)} companySelected={ companySelected }></NewCompany>
      </Drawer>
    </CompaniesStyled>
  )
}

export default Companies