import * as React from 'react';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-boost';
import { ApolloConsumer } from "react-apollo";

const query = gql`
  {
    dota2_team {
      team_name,
      tag,
      wins,
      losses,
      logo_url
    }
  }
`;

export default class extends React.Component {
  constructor(props: any) { super(props); }
  onInitialiseApp = (client: ApolloClient<any>) => {
    client.query({ query }).then((result: any) => console.log(result), (err: any) => console.log({ err }));
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
            <div>
              <button onClick={_ => this.onInitialiseApp(client)}>Initialise App</button>
            </div>
          )
        }
      </ApolloConsumer>
    );
  }
}