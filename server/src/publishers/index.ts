import { publish } from '../../../message-broker/lib/publish-message';

export function publishTeamHeroes(teamId: number) {
  return (delay?: number) => {
    publish('dota2', 'team.heroes.insert', JSON.stringify({
      teamId
    }), delay);
  }
}

export function publishPlayerRecentMatches(accountId: string) {
  return (delay?: number) => {
    publish('dota2', 'player.matches.insert', JSON.stringify({
      accountId
    }), delay);
  }
}