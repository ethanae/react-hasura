import { GraphQLClient } from 'graphql-request';

export default class DotaService {
  private readonly client: GraphQLClient;
  constructor() {
    this.client = new GraphQLClient('http://localhost:1337/v1alpha1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'jkasvbdhbjaasdkahbsd'
      }
    });
  }
  async set(mutation: string, variables: any) {
    try {
      const result = await this.client.request(mutation, variables);
      return result;
    } catch (err) {
      console.error({ err });
      throw err; 
    }
  }

  async get(query: string, variables: any) {
    try {
      const result = await this.client.request(query, variables);
      return result;
    } catch (err) {
      console.error({ err });
      throw err; 
    }
  }
}


