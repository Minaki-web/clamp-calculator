import styled from 'styled-components';

import { ReactComponent as CopySvg } from '../forge-icon.svg';

export default function CopyBtn(props) {
  const { title, onClick } = props;

  return (
    <Button title={title} onClick={onClick}>
      <CopySvg stroke="#fff" />
    </Button>
  );
}

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  margin-left: 8px;

  svg {
    width: 3rem;
    height: 3rem;
    vertical-align: middle;
  }
`;
