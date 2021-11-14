import styled from 'styled-components';

export default function ResultBox(props) {
  const { clampFunc, children } = props;

  return (
    <Flex>
      <Result>{clampFunc}</Result>
      {children}
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 8px;
  border: 1px solid #4b4d68;
  border-radius: 5px;
`;

const Result = styled.h1``;
