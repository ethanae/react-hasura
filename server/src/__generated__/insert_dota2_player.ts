/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { dota2_player_insert_input } from "./../types/graphql-server-types";

// ====================================================
// GraphQL mutation operation: insert_dota2_player
// ====================================================

export interface insert_dota2_player_insert_dota2_player_returning {
  __typename: "dota2_player";
  player_name: string;
}

export interface insert_dota2_player_insert_dota2_player {
  __typename: "dota2_player_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: insert_dota2_player_insert_dota2_player_returning[];
}

export interface insert_dota2_player {
  /**
   * insert data into the table: "dota2.player"
   */
  insert_dota2_player: insert_dota2_player_insert_dota2_player | null;
}

export interface insert_dota2_playerVariables {
  objects: dota2_player_insert_input[];
}
