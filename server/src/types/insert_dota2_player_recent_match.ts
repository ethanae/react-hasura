/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { dota2_player_recent_match_insert_input } from "./graphql-server-types";

// ====================================================
// GraphQL mutation operation: insert_dota2_player_recent_match
// ====================================================

export interface insert_dota2_player_recent_match_insert_dota2_player_recent_match_returning {
  __typename: "dota2_player_recent_match";
  id: number;
}

export interface insert_dota2_player_recent_match_insert_dota2_player_recent_match {
  __typename: "dota2_player_recent_match_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: insert_dota2_player_recent_match_insert_dota2_player_recent_match_returning[];
}

export interface insert_dota2_player_recent_match {
  /**
   * insert data into the table: "dota2.player_recent_match"
   */
  insert_dota2_player_recent_match: insert_dota2_player_recent_match_insert_dota2_player_recent_match | null;
}

export interface insert_dota2_player_recent_matchVariables {
  objects: dota2_player_recent_match_insert_input[];
}
