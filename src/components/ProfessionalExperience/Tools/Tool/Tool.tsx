import { HeartFilled } from '@ant-design/icons';
import { Rate } from 'antd';
import React, { useState } from 'react'
import { updateTool } from '../../../../api/cvApi';

import { ITool } from '../../../../model/tool';
import { ToolStyled } from './Tool.styled';

type Props = {
  tool: ITool;
  edit: Function;
}

const Tool: React.FC<Props> = ({ tool, edit }) => {

  const [favorite, setFavorite] = useState(tool.favorite)

  const changeRate = (rate: number) => {
    console.log()
    updateTool(tool.id, { rate })
  }

  const changeFavorite = (e: any) => {
    stopPropagation(e);
    setFavorite(!favorite);
    updateTool(tool.id, { favorite: !favorite })
  }

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  }

  return (
    <ToolStyled onClick={() => edit(tool)}>
      <img src={tool.urlImage} className='logo'/>
      <div className='title'>
        {tool.name}
      </div>
      <div onClick={stopPropagation}>
        <Rate onChange={(e) => changeRate(e)} defaultValue={tool.rate}/>
      </div>
      <div className={favorite? 'favorite active': 'favorite inactive'} onClick={changeFavorite}>
        <HeartFilled />
      </div>
    </ToolStyled>
  )
}

export default Tool