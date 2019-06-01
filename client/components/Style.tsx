import styled, { keyframes } from 'styled-components';

export const RowHover = styled.tr`
  cursor: pointer;
  &:hover {
    color: #00ff89
  };
`;
export const PlayerWrapper = styled.div`
  color: #00ff89;
  background-color: #282828;
  border-color: #00ff89;
  cursor: pointer;
  -webkit-transition: opacity .3s ease-in-out;
  -moz-transition: opacity .3s ease-in-out;
  -ms-transition: opacity .3s ease-in-out;
  -o-transition: opacity .3s ease-in-out;
  transition: opacity .3s ease-in-out;
  &:hover {
    opacity: 0.5;
  };
`;

export const Nav = styled.nav`
  a {
    &.n-link { 
      color: #00ff89;
      text-decoration: none !important;
      &:hover {
        color: #00ff89;
        &:before {
          margin-right: 5px;
          content: '\003e';
        }
        &:active {
          margin-right: 5px;
          content: '\003e' !important;
        }
      }
    }
  }
`;