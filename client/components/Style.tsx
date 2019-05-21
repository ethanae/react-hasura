import styled, { keyframes } from 'styled-components';

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spin = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
`;
export const glow = keyframes`
  from {
    box-shadow: 0 0 10px -10px red;
  }
  to {
    box-shadow: 0 0 10px 10px red;
  }
`;

export const Glow = styled.div`
  animation: ${glow} 1s infinite alternate;
`;

export const RowHover = styled.tr`
  cursor: pointer;
  &:hover {
    color: #00ff89
  };
`;

export const PlayerWrapper = styled.div`
  color: #00ff89;
  background-color: #282828;
`;