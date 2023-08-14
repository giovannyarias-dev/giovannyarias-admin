import styled from 'styled-components';

export const NewCompanyStyled = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding 16px;
  }

  .image-container {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #FFFFFF;
    position: relative;

    &.exist{
      background-color: ${props => props.color};
    }

    &.new{
      background-color: #7b818c;
    }

    .upload-file {
      position: absolute;
      right: 16px;
      top: 12px;
    }

    img {
      width: 180px
    }
  }
`;