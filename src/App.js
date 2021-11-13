import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as CopySvg } from './forge-icon.svg';

// #region styles
const AppDiv = styled.div`
  font-family: 'Open Sans', sans-serif;
  color: #ffffff;
  background-color: #000;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const Input = styled.input.attrs({ type: 'number' })`
  width: 50px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  font-size: clamp(0.75rem, 0.5714rem + 0.8929vw, 1rem);

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Unit = styled.span`
  font-size: clamp(0.75rem, 0.5714rem + 0.8929vw, 1rem);
  margin-left: 8px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: min(90%, 500px);
  margin: 0 auto;
`;

const LabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputAndUnit = styled.div``;

const ResultBox = styled.div`
  display: flex;
  width: min(90%, 500px);
  justify-content: center;
  padding: 8px;
  margin: 16px auto 0;
  border: 1px solid #4b4d68;
  border-radius: 5px;
`;

const Result = styled.h1`
  font-size: 1rem;
`;

const CopyBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  margin-left: 8px;

  svg {
    width: 32px;
    height: 32px;
  }
`;
// #endregion

const copyTxt = (txt) => {
  const t = document.createElement('textarea');
  t.value = txt;
  document.body.appendChild(t);
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
  alert(`${txt}

  Copied to clipboard!`);
};

export default function App() {
  const [pixelsPerRem, setPixelsPerRem] = useState(16);

  const [minWidthPx, setMinWidthPx] = useState(320);
  const [maxWidthPx, setMaxWidthPx] = useState(768);
  const [minFontSize, setMinFontSize] = useState(1);
  const [maxFontSize, setMaxFontSize] = useState(3.5);

  const minWidth = minWidthPx / pixelsPerRem;
  const maxWidth = maxWidthPx / pixelsPerRem;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const clampFunc = `clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(
    4
  )}vw, ${maxFontSize}rem);`;

  return (
    <AppDiv>
      <Container>
        <LabelGroup>
          <Label htmlFor="minWidthPx">Minimum viewport width =</Label>
          <Label htmlFor="maxWidthPx">Maximum viewport width =</Label>
          <Label htmlFor="minFontSize">Minimum font size =</Label>
          <Label htmlFor="maxFontSize">Maximum font size =</Label>
          <Label htmlFor="pixelsPerRem">1 rem =</Label>
        </LabelGroup>

        <InputGroup>
          <InputAndUnit>
            <Input id="minWidthPx" value={minWidthPx} onChange={(e) => setMinWidthPx(Number(e.target.value))} />
            <Unit>px</Unit>
          </InputAndUnit>

          <InputAndUnit>
            <Input id="maxWidthPx" value={maxWidthPx} onChange={(e) => setMaxWidthPx(Number(e.target.value))} />
            <Unit>px</Unit>
          </InputAndUnit>

          <InputAndUnit>
            <Input id="minFontSize" value={minFontSize} onChange={(e) => setMinFontSize(Number(e.target.value))} />
            <Unit>rem</Unit>
          </InputAndUnit>

          <InputAndUnit>
            <Input id="maxFontSize" value={maxFontSize} onChange={(e) => setMaxFontSize(Number(e.target.value))} />
            <Unit>rem</Unit>
          </InputAndUnit>

          <InputAndUnit>
            <Input id="pixelsPerRem" value={pixelsPerRem} onChange={(e) => setPixelsPerRem(Number(e.target.value))} />
            <Unit>px</Unit>
          </InputAndUnit>
        </InputGroup>
      </Container>

      <ResultBox>
        <Result>{clampFunc}</Result>
        <CopyBtn title="Copy to clipboard" onClick={() => copyTxt(clampFunc)}>
          <CopySvg stroke="#fff" />
        </CopyBtn>
      </ResultBox>
    </AppDiv>
  );
}
