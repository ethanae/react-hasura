/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { dota2_hero_insert_input } from "./graphql-server-types";

// ====================================================
// GraphQL mutation operation: insert_dota2_hero
// ====================================================

export interface insert_dota2_hero_insert_dota2_hero_returning {
  __typename: "dota2_hero";
  hero_name: string;
}

export interface insert_dota2_hero_insert_dota2_hero {
  __typename: "dota2_hero_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: insert_dota2_hero_insert_dota2_hero_returning[];
}

export interface insert_dota2_hero {
  /**
   * insert data into the table: "dota2.hero"
   */
  insert_dota2_hero: insert_dota2_hero_insert_dota2_hero | null;
}

export interface insert_dota2_heroVariables {
  objects: dota2_hero_insert_input[];
}
