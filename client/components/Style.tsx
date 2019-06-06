import styled from 'styled-components';

export const RowHover = styled.tr`
  cursor: pointer;
  &:hover {
    color: #00ff89
  };
`;
export const CardWrapper = styled.div<{ clickable: boolean; }>`
  color: #00ff89;
  background-color: #282828;
  border-color: #00ff89;
  -webkit-transition: opacity .3s ease-in-out;
  -moz-transition: opacity .3s ease-in-out;
  -ms-transition: opacity .3s ease-in-out;
  -o-transition: opacity .3s ease-in-out;
  transition: opacity .3s ease-in-out;
  cursor: ${props => props.clickable ? 'pointer' : 'default' };
  &:hover {
    opacity: ${props => props.clickable ? '0.5' : '1'};
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

export const Pagination = styled.ul`
  li {
    &.page-item {
      a, button {
        -webkit-transition: opacity .2s ease-in-out;
        -moz-transition: opacity .2s ease-in-out;
        -ms-transition: opacity .2s ease-in-out;
        -o-transition: opacity .2s ease-in-out;
        transition: opacity .2s ease-in-out;

        border-color: #00ff89;
        &:hover {
          opacity: 0.6;
        }
        &.page-link {
          background: #282828;
          color: #00ff89 !important;
        }
      }
    }
  }
`;

// <ul className="pagination">
//         {
//           !props.label ? null :
//             <li className="page-item" title='pages'>
//               <a className="page-link">{props.label}</a>
//             </li>
//         }
//         <li className="page-item">
//           <button
//             className="page-link"
//             onClick={props.onPageBackward}>
//             Previous
//           </button>
//         </li>
//         <li className="page-item">
//           <button
//             className="page-link"
//             onClick={props.onPageForward}>
//             Next
//           </button>
//         </li>
//       </ul>