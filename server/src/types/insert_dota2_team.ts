/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { dota2_team_insert_input } from "./graphql-server-types";

// ====================================================
// GraphQL mutation operation: insert_dota2_team
// ====================================================

export interface insert_dota2_team_insert_dota2_team_returning {
  __typename: "dota2_team";
  team_name: string;
}

export interface insert_dota2_team_insert_dota2_team {
  __typename: "dota2_team_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: insert_dota2_team_insert_dota2_team_returning[];
}

export interface insert_dota2_team {
  /**
   * insert data into the table: "dota2.team"
   */
  insert_dota2_team: insert_dota2_team_insert_dota2_team | null;
}

export interface insert_dota2_teamVariables {
  objects: dota2_team_insert_input[];
}
