import * as React from 'react';

export interface IProps {
  tableHeaders: string[];
  render: () => JSX.Element | JSX.Element[];
}

export default (props: IProps) => {
  return (
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          {props.tableHeaders.map(th => <th>{th}</th>)}
        </tr>
      </thead>
      <tbody>
        { props.render() }
      </tbody>
    </table>
  );
}