import React, { useState } from 'react'
import { Typography, Tabs } from 'antd';
import type { TabsProps } from 'antd';

import { ProfessionalExperienceStyled } from './ProfessionalExperience.styled'
import Jobs from './Jobs/Jobs';
import Projects from './Projects/Projects';
import Companies from './Companies/Companies';
import Tools from './Tools/Tools';

const { Title } = Typography;

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Jobs',
    children: <Jobs />,
  },
  {
    key: '2',
    label: 'Projects',
    children: <Projects />,
  },
  {
    key: '3',
    label: 'Companies',
    children: <Companies />,
  },
  {
    key: '4',
    label: 'Tools',
    children: <Tools />,
  },
];

const ProfessionalExperience = () => {
  return (
    <ProfessionalExperienceStyled>
      <Title level={2}>
        Professional experience
      </Title>
      <Tabs defaultActiveKey="1" items={items} />
    </ProfessionalExperienceStyled>
  )
}

export default ProfessionalExperience