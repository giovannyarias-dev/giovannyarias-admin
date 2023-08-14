import styled from 'styled-components';

export const ToolsStyled = styled.div`
  .grid-tools {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(auto-fill);
  }

  .grid-type {
    display: grid;
    grid-template-columns: 200px auto;
    margin-bottom: 16px;
  }
`;