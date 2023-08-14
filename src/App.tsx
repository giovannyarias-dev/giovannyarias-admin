import { Toaster } from 'react-hot-toast'
import ProfessionalExperience from './components/ProfessionalExperience/ProfessionalExperience'
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION,
  signatureVersion: 'v4',
});

function App() {
  return (
    <>
      <Toaster />
      <ProfessionalExperience />
    </>
  )
}

export default App
