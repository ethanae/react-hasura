import { subscribe } from "./subscribe-topic";
import { publish } from "./publish-message";

(async () => {
  subscribe('dota2', 'insert.team', (msg) => {
    console.log('MESSAGE RECEIVED AT ', new Date().toISOString());
  }, true);

  publish('dota2', 'insert.team', JSON.stringify({
    message: 'a friendly message'
  }), 11000);
})();