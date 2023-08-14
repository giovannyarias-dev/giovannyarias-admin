import { PictureOutlined, SyncOutlined } from '@ant-design/icons';
import React from 'react';
import { InputFileStyled } from './InputFile.styled';

interface Props {
  selectFile: Function,
  icon: string,
  size: string
}

const InputFile: React.FC<Props> = ({ icon, selectFile , size}) => {

  const hiddenFileInput = React.useRef(null)
  
  const handleClick = (event: any) => {
    hiddenFileInput?.current?.click()
  };

  const handleChange = (event: any) => {
    selectFile(event);
  };

  const getClassNames = () => {
    let className = 'button';
    if (size)
      className += ` ${size}`
    return className;
  }

  return (
    <InputFileStyled>
      <div onClick={handleClick} className={getClassNames()}>
        {icon === 'picture'? <PictureOutlined />: <SyncOutlined />}
      </div>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </InputFileStyled>
  );
}
export default InputFile