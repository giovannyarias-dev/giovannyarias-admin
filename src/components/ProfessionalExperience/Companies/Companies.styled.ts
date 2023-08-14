import styled from 'styled-components';

export const CompaniesStyled = styled.div`
  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(auto-fill);
  }
`;