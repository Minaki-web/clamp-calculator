import styled from 'styled-components'

export default function InputControll(props) {
  const { label, info } = props

  return (
    <Flex>
      <Label htmlFor={info.id}>{label}</Label>
      <Separator>=</Separator>

      <InputContainer>
        <Input id={info.id} value={info.value} onChange={info.onChange} />
        <Unit>{info.unit}</Unit>
      </InputContainer>
    </Flex>
  )
}

const Flex = styled.div`
  &:not(:first-child) {
    margin-top: 2rem;
  }

  @media (min-width: 500px) {
    display: flex;
    align-items: center;
  }
`

const Label = styled.label`
  text-align: end;
`

const Separator = styled.span`
  padding: 0 0.2rem;

  @media (min-width: 500px) {
    padding: 0 1rem;
  }
`

const InputContainer = styled.div`
  margin-top: 0.5rem;

  @media (min-width: 500px) {
    margin-top: 0;
  }
`

const Input = styled.input.attrs({ type: 'number' })`
  width: 7rem;
  border: 1px solid #4b4d68;
  line-height: 1.5;
  transition: 0.3s ease;
  padding-left: 0.75%;

  &:focus {
    box-shadow: 0 0 10px #aaaaaa;
    border: 1px solid #a1a1a1;
  }
`

const Unit = styled.span`
  padding: 0 1rem;
`
