import styled from 'styled-components';

export const ColorPickerStyled = styled.div`
  position: relative;

  .color-selected {
    display: flex;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    padding: 4px;

    .color {
      height: 24px;
      display: flex;
      border-radius: 6px;
      background-color: ${props => props.color};
      width: 100%;
    }
  }

  .popover {
    top: 40px;
    position: absolute;
    z-index: 2;
  }

  input {
    background-color: #fff !important;
  }
`;