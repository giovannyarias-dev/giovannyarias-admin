import styled from 'styled-components';

export const CompanyStyled = styled.div`
  width: calc(100% - 32px);
  min-width: 160px;
  min-height: 100px;
  border-radius: 16px;
  background-color: #7b818c;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${props => props.color};

    .logo {
      opacity: 1;
    }
  }

  .logo {
    width: 130px;
    opacity: 0.5;
  }

  .title {
    font-size: 16px;
    color: #FFF;
    text-align: center;
  }

`;