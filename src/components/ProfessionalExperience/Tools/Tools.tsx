import React, { useCallback, useEffect, useState } from 'react'
import { Button, Drawer } from 'antd'

import { useDrawer } from '../../../hooks/useDrawer'
import { ITool, IToolFlex } from '../../../model/tool'
import { HeaderActions } from '../../shared/StyledComponents/StyledComponents.styled'
import NewTool from './NewTool/NewTool'
import Tool from './Tool/Tool'
import { getTools } from '../../../api/cvApi'
import { ToolsStyled } from './Tools.styled'
import { typesToolsOptions } from '../../../constants/selectOptions'

const Tools: React.FC = () => {
  const [tools, setTools] = useState<ITool[]>([])
  const [toolSelected, setToolSelected] = useState<ITool | null>(null)

  const getData = useCallback(async () => {
    const toolsResponse = await getTools()
    setTools(toolsResponse.data);
  }, [])

  const { isOpenDrawer, showDrawer, closeDrawer } = useDrawer(getData)

  useEffect(() => {
    getData()
  }, [])

  const editTool = (tool: ITool) => {
    setToolSelected(tool);
    showDrawer();
  }

  const closeAndClean = (refresh: boolean) => {
    setToolSelected(null);
    closeDrawer(refresh);
  }

  const newTool = () => {
    setToolSelected(null);
    showDrawer();
  }

  return (
    <ToolsStyled>
      <HeaderActions>
        <Button onClick={newTool}>
          New tool
        </Button>
      </HeaderActions>
      {
        typesToolsOptions.map((type) =>(
          <div className='grid-type' key={type.value}>
            <h3>
              { type.label }
            </h3>
            <div className='grid-tools'>
              {
                tools.length>0 &&
                tools.filter(tool => tool.type === type.value).map((tool: ITool) => <Tool tool={ tool } key={tool.id} edit={editTool}/>)
              }
            </div>
          </div>
        ))
      }
      <Drawer title={toolSelected? 'Edit tool': 'New tool'} onClose={() => closeAndClean(true)} open={isOpenDrawer} bodyStyle={{ padding: 0 }} >
        <NewTool closeDrawer={() => closeAndClean(true)} toolSelected={toolSelected}></NewTool>
      </Drawer>
    </ToolsStyled>
  )
}

export default Tools