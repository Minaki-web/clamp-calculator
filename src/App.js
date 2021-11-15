import React, { useState } from 'react';
import styled from 'styled-components/macro';
import toast, { Toaster } from 'react-hot-toast';

import InputControll from './components/InputControll';
import ResultBox from './components/ResultBox';
import CopyBtn from './components/CopyBtn';

// #region styles
const AppDiv = styled.div`
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  width: min(90%, 500px);
  margin: 0 auto;
`;

const copyTxt = (txt) => {
  const agent = window.navigator.userAgent;
  // iosかどうかの判定
  if (agent.indexOf('iPhone') !== -1 || agent.indexOf('iPad') !== -1 || agent.indexOf('iPod') !== -1) {
    const t = document.createElement('textarea');
    t.value = txt;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
  } else {
    navigator.clipboard.writeText(txt);
  }

  toast.success(`Copied: ${txt}`);
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
        <InputControll
          label="Minimum viewport width"
          info={{
            id: 'minWidthPx',
            value: minWidthPx,
            unit: 'px',
            onChange: (e) => setMinWidthPx(Number(e.target.value))
          }}
        />

        <InputControll
          label="Maximum viewport width"
          info={{
            id: 'maxWidthPx',
            value: maxWidthPx,
            unit: 'px',
            onChange: (e) => setMaxWidthPx(Number(e.target.value))
          }}
        />

        <InputControll
          label="Minimum font size"
          info={{
            id: 'minFontSize',
            value: minFontSize,
            unit: 'rem',
            onChange: (e) => setMinFontSize(Number(e.target.value))
          }}
        />

        <InputControll
          label="Maximum font size"
          info={{
            id: 'maxFontSize',
            value: maxFontSize,
            unit: 'rem',
            onChange: (e) => setMaxFontSize(Number(e.target.value))
          }}
        />

        <InputControll
          label="1 rem"
          info={{
            id: 'pixelsPerRem',
            value: pixelsPerRem,
            unit: 'rem',
            onChange: (e) => setPixelsPerRem(Number(e.target.value))
          }}
        />

        <ResultBox clampFunc={clampFunc}>
          <CopyBtn title="Copy to clipboard" onClick={() => copyTxt(clampFunc)} />
          <Toaster />
        </ResultBox>
      </Container>
    </AppDiv>
  );
}
