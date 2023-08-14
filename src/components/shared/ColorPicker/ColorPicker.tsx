import React, { useEffect, useState } from 'react'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'
import { ColorPickerStyled } from './ColorPicker.styled';

interface Props {
  onChange: Function;
  color: string;
}

const ColorPicker: React.FC<Props> = ({ onChange, color }) => {

  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [colorSelected, setColorSelected] = useState({ hex: '#FFFFFF'})

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  };

  const handleChange = (color: any) => {
    setColorSelected(color)
    onChange(color)
  };

  useEffect(() => {
    setColorSelected({ hex: color})
    console.log(color);
  }, [color])
  

  return (
    <ColorPickerStyled color={colorSelected.hex}>
      <div className='color-selected' onClick={handleClick}>
        <div className='color' />
      </div>
      { 
        displayColorPicker &&
        <div className='popover'>
          <ChromePicker color={ colorSelected.hex } onChange={ handleChange } disableAlpha={true} />
        </div> 
      }
    </ColorPickerStyled>
  )
}

export default ColorPicker