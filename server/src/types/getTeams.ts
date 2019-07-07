/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTeams
// ====================================================

export interface getTeams_dota2_team {
  __typename: "dota2_team";
  team_id: number;
}

export interface getTeams {
  /**
   * fetch data from the table: "dota2.team"
   */
  dota2_team: getTeams_dota2_team[];
}
