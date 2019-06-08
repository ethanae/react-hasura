import { client } from './apollo';
import gql from 'graphql-tag';
import { countTeams, countPlayers, queryTeamIDs, countHeroes, countTeamHeroes, queryPlayerAccountIds } from './query';
import { IDota2TeamAggregateResponse, IDota2PlayerAggregateResponse, ITeamIDQueryResponse, IDota2HeroAggregateResponse, IDota2TeamHeroAggregateResponse, IDota2InsertTeamHeroResponse } from '../types';

const apiBaseUrl = 'https://api.opendota.com/api';
let startingTimeout = 30000;
let timeoutMultiplier = -1;

export const insertTeamsMutation = gql`
  mutation insert_dota2_team($objects: [dota2_team_insert_input!]!) {
    insert_dota2_team(objects: $objects) {
      returning {
        team_name
      }
    }
  }
`;

export const insertPlayersMutation = gql`
  mutation insert_dota2_player($objects: [dota2_player_insert_input!]!) {
    insert_dota2_player(objects: $objects) {
      returning {
        player_name
      }
    }
  }
`;

export const insertHeroesMutation = gql`
  mutation insert_dota2_hero($objects: [dota2_hero_insert_input!]!) {
    insert_dota2_hero(objects: $objects) {
      returning {
        hero_name
      }
    }
  }
`;

export const insertTeamHeroesMutation = gql`
  mutation insert_dota2_team_hero($objects: [dota2_team_hero_insert_input!]!) {
    insert_dota2_team_hero(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const insertRecentPlayerMatchesMutation = gql`
  mutation insert_dota2_player_recent_match($objects: [dota2_player_recent_match_insert_input!]!) {
    insert_dota2_player_recent_match(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export async function insertTeams() {
  let event = new CustomEvent('notify', { detail: 'Forming teams...' });
  window.dispatchEvent(event);
  const { data: { dota2_team_aggregate: { aggregate: { count } } } } = await client.query<IDota2TeamAggregateResponse>({ query: countTeams });
  if (count > 0) {
    event = new CustomEvent('notify', { detail: 'Teams already formed' });
    window.dispatchEvent(event);
    return;
  }

  const teams = await (await fetch(apiBaseUrl + '/teams')).json();
  const mappedTeams = teams.map((t: any) => {
    const team = { ...t, team_name: t.name };
    delete team.name;
    return team;
  });

  const teamChunks = chunkArr(mappedTeams, 50);
  let promises: Promise<any>[] = [];
  teamChunks.map(arr => {
    const promise = client.mutate({
      mutation: insertTeamsMutation,
      variables: { objects: arr }
    });
    promises.push(promise);
  })
  await Promise.all(promises);
  event = new CustomEvent('notify', { detail: 'Teams successfully formed!' });
  window.dispatchEvent(event);
}

export async function insertPlayers() {
  let event = new CustomEvent('notify', { detail: 'Respawning players...' });
  window.dispatchEvent(event);
  const { data: { dota2_player_aggregate: { aggregate } } } = await client.query<IDota2PlayerAggregateResponse>({ query: countPlayers });
  if (aggregate.count > 0) {
    event = new CustomEvent('notify', { detail: 'Players already respawned' });
    window.dispatchEvent(event);
    return;
  }

  const players = await (await fetch(apiBaseUrl + '/proPlayers')).json();

  const { data: { dota2_team } } = await client.query<ITeamIDQueryResponse>({ query: queryTeamIDs })
  const teamIDs = dota2_team.map(t => t.team_id);
  const preparedPlayers = players.filter((p: any) => p.team_id && teamIDs.includes(p.team_id)).map((p: any) => {
    return {
      account_id: p.account_id,
      steam_id: p.steamid,
      avatar: p.avatar,
      avatar_medium: p.avatarmedium,
      avatar_full: p.avatarfull,
      profile_url: p.profileurl,
      persona_name: p.personaname,
      cheese: p.cheese,
      last_match_time: p.last_match_time,
      player_name: p.name,
      country_code: p.country_code,
      fantasy_role: p.fantasy_role,
      team_id: p.team_id,
      is_locked: p.is_locked,
      is_pro: p.is_pro
    };
  });

  const playerChunked = chunkArr(preparedPlayers, 50);
  let promises: any[] = [];
  playerChunked.map(arr => {
    const promise = client.mutate({
      mutation: insertPlayersMutation,
      variables: {
        objects: arr
      }
    });
    promises.push(promise);
  });

  await Promise.all(promises);
  event = new CustomEvent('notify', { detail: 'Successfully spawned players!' });
  window.dispatchEvent(event);
}

export async function insertHeroes() {
  let event = new CustomEvent('notify', { detail: 'Creating heroes...' });
  window.dispatchEvent(event);
  const { data: { dota2_hero_aggregate: { aggregate } } } = await client.query<IDota2HeroAggregateResponse>({ query: countHeroes });

  if (aggregate.count > 0) {
    event = new CustomEvent('notify', { detail: 'Heroes already created' });
    window.dispatchEvent(event);
    return;
  }

  const response = await (await fetch(apiBaseUrl + '/heroes')).json();

  const heroes = response.map((h: any) => {
    return {
      hero_id: h.id,
      hero_name: h.name,
      localized_name: h.localized_name,
      primary_attr: h.primary_attr,
      attack_type: h.attack_type,
      /**
       * Send Postgres text[] values through as strings
       * https://github.com/hasura/graphql-engine/issues/1170
       */
      roles: `{${h.roles.join(',')}}`,
      legs: h.legs
    };
  });
  await client.mutate({ mutation: insertHeroesMutation, variables: { objects: heroes } });
  event = new CustomEvent('notify', { detail: 'Successfully created heroes!' });
  window.dispatchEvent(event);
}

export async function insertTeamHeroes() {
  let event = new CustomEvent('notify', { detail: 'Populating each team\'s played heroes...' });
  window.dispatchEvent(event);
  const { data: { dota2_team_hero_aggregate: { aggregate } } } = await client.query<IDota2TeamHeroAggregateResponse>({ query: countTeamHeroes });

  if (aggregate.count > 0) {
    event = new CustomEvent('notify', { detail: 'Eeach team\'s heroes already populated...' });
    window.dispatchEvent(event);
    return;
  }

  const { data: { dota2_team } } = await client.query<ITeamIDQueryResponse>({ query: queryTeamIDs })
  const teamIDs = dota2_team.map(t => t.team_id);

  const teamIdChunks = chunkArr(teamIDs, 25);

  event = new CustomEvent('notify', { detail: 'Juking API rate limiting...' });
  window.dispatchEvent(event);

  teamIdChunks.map((IdArr, index) => {
    timeoutMultiplier++;
    console.log({ timeoutMultiplier })

    const nextTimeout = startingTimeout * timeoutMultiplier;
    // needed to get around 60-api-calls per minute rate limit
    setTimeout(() => {
      IdArr.map(teamId => {
        fetch(`${apiBaseUrl}/teams/${teamId}/heroes`).then(res => res.json())
          .then(result => {
            const teamHeroes = result.map((teamHero: any) => {
              return {
                team_id: teamId,
                hero_id: teamHero.hero_id,
                games_played: teamHero.games_played,
                wins: teamHero.wins
              };
            });

            client
              .mutate<IDota2InsertTeamHeroResponse>({ mutation: insertTeamHeroesMutation, variables: { objects: teamHeroes } })
              .then(response => {
                const { data } = response;
                const added = (data && data.insert_dota2_team_hero.returning.length || 0);
                event = new CustomEvent('onInsertTeamHeroesProgress', { detail: added.toString() });
                window.dispatchEvent(event);
              });
          });
      });
    }, nextTimeout);
  });
}

export async function insertRecentPlayerMatches() {
  const playersUrl = apiBaseUrl + '/players';

  const { data: { dota2_player: playerAccountIds } } = await
    client.query<{ dota2_player: { account_id: number }[] }>({
      query: queryPlayerAccountIds
    });

  chunkArr(playerAccountIds, 25).map((accIDs, index) => {
    timeoutMultiplier++;
    const nextTimeout = startingTimeout * timeoutMultiplier;
    console.log(`Queued ${accIDs.length} recent matches insert to be processed in ${nextTimeout / 1000} seconds`);

    setTimeout(() => {
      accIDs.map(player => {
        fetch(`${playersUrl}/${player.account_id}/recentmatches`).then(res => res.json())
          .then((recentMatches: any) => {
            const matches = recentMatches.map((rm: any) => {
              return {
                match_id: rm.match_id,
                player_slot: rm.player_slot,
                radiant_win: rm.radiant_win,
                duration: rm.duration,
                hero_id: rm.hero_id,
                account_id: player.account_id,
                start_time: rm.start_time,
                kills: rm.kills,
                deaths: rm.deaths,
                assists: rm.assists,
                xp_per_min: rm.xp_per_min,
                gold_per_min: rm.gold_per_min,
                hero_damage: rm.hero_damage,
                tower_damage: rm.tower_damage,
                hero_healing: rm.hero_healing,
                last_hits: rm.last_hits
              };
            });
            client.mutate<{ insert_dota2_player_recent_match: number[] }>({
              mutation: insertRecentPlayerMatchesMutation,
              variables: { objects: matches }
            }).then(id => {
              console.log('recent matches inserted',
                id.data!.insert_dota2_player_recent_match.length);
            });
          });
      })
    }, nextTimeout);
  });
}

function chunkArr<T>(arr: T[], size: number) {
  let chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}