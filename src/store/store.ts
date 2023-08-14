import { create } from 'zustand'

export const cvStore = create(() => ({
  workExperienceOptions: [
    { value: '0', label: 'Porvenir' },
    { value: '1', label: 'Habi' },
    { value: '2', label: 'GFT' },
    { value: '3', label: 'ATH' },
    { value: '4', label: 'Unitec' },
    { value: '5', label: 'Certicamara' },
    { value: '6', label: 'Servinte' }
  ],
  rolesOptions: [
    { value: 'Developer', label: 'Developer' },
    { value: 'Project leader', label: 'Project leader' },
    { value: 'Technical leader', label: 'Technical leader' },
    { value: 'Designer', label: 'Designer' },
    { value: 'Ux', label: 'Ux' },
    { value: 'Scrum master', label: 'Scrum master' },
    { value: 'Teacher', label: 'Teacher' }
  ],
  typesToolsOptions: [
    { value: 'Language', label: 'Language' },
    { value: 'Frontend framework', label: 'Frontend framework' },
    { value: 'Frontend library', label: 'Frontend library' },
    { value: 'Backend framework', label: 'Backend framework' },
    { value: 'Backend library', label: 'Backend library' },
    { value: 'Application', label: 'Application' },
    { value: 'Cloud', label: 'Cloud' }
  ]
}));