import styled from 'styled-components';

export const ToolStyled = styled.div`
  width: calc(100% - 32px);
  min-width: 160px;
  border-radius: 16px;
  background-color: #7b818c;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #1776ff;

    .logo {
      opacity: 1;
    }
  }

  .title {
    font-size: 16px;
    color: #FFF;
    text-align: center;
  }

  .logo {
    width: 60px;
    opacity: 0.5;
  }

  .favorite {
    right: 16px;
    position: absolute;
    cursor: pointer;
    font-size: 20px;
  }

  .favorite: hover {
    color: #FFFFFF;
  }

  .inactive {
    color: #646872;
  }

  .active {
    color: #FFFFFF;
  }
`;