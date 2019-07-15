/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { dota2_team_hero_insert_input } from "./graphql-server-types";

// ====================================================
// GraphQL mutation operation: insert_dota2_team_hero
// ====================================================

export interface insert_dota2_team_hero_insert_dota2_team_hero_returning {
  __typename: "dota2_team_hero";
  id: number;
}

export interface insert_dota2_team_hero_insert_dota2_team_hero {
  __typename: "dota2_team_hero_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: insert_dota2_team_hero_insert_dota2_team_hero_returning[];
}

export interface insert_dota2_team_hero {
  /**
   * insert data into the table: "dota2.team_hero"
   */
  insert_dota2_team_hero: insert_dota2_team_hero_insert_dota2_team_hero | null;
}

export interface insert_dota2_team_heroVariables {
  objects: dota2_team_hero_insert_input[];
}
