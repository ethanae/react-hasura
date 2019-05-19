import * as React from 'react';

export interface IProps {
  label?: string;
  onPageForward: () => void;
  onPageBackward: () => void;
}

export default (props: IProps) => {
  return (
    <nav className="d-flex flex-row-reverse">
      <ul className="pagination">
        {
          !props.label ? null :
            <li className="page-item" title='pages'>
              <a className="page-link">{props.label}</a>
            </li>
        }
        <li className="page-item">
          <button
            className="page-link"
            onClick={props.onPageBackward}>
            Previous
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={props.onPageForward}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}