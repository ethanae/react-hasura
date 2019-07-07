import { GraphQLClient } from 'graphql-request';

export default class DotaGqlRepository {
  private readonly client: GraphQLClient;
  constructor() {
    this.client = new GraphQLClient('http://localhost:1337/v1alpha1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'jkasvbdhbjaasdkahbsd'
      }
    });
  }

  async set<T, U = any>(mutation: string, variables: U): Promise<T> {
    try {
      const result = await this.client.request<T>(mutation, variables);
      return result;
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }

  async get<T, U = any>(query: string, variables?: U): Promise<T> {
    try {
      const result = await this.client.request<T>(query, variables);
      return result;
    } catch (err) {
      console.log({ err });
      throw err; 
    }
  }
}


