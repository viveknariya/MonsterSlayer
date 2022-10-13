function randomHealth(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
      winner: null,
      logs: [],
    };
  },
  computed: {
    healthBarMonster() {
      if (this.monsterHealth < 0) {
        return { width: 0 + "%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    healthBarPlayer() {
      if (this.playerHealth < 0) {
        return { width: 0 + "%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUse() {
      if (this.round % 3 !== 0) {
        return true;
      }
      return false;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    newGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.round = 0;
      this.winner = null;
      this.logs = [];
    },
    monsterAtteck() {
      const atk = randomHealth(15, 8);
      this.playerHealth = this.playerHealth - atk;
      this.addLog("monster", "atteck", atk);
    },
    playerAtteck() {
      this.round++;
      const atk = randomHealth(12, 5);
      this.monsterHealth = this.monsterHealth - atk;
      this.monsterAtteck();
      this.addLog("player", "atteck", atk);
    },
    specialAtteck() {
      this.round++;
      const atk = randomHealth(10, 20);
      this.monsterHealth = this.monsterHealth - atk;
      this.monsterAtteck();
      this.addLog("player", "atteck", atk);
    },
    Heal() {
      this.round++;
      const heal = randomHealth(10, 15);
      this.playerHealth = this.playerHealth + heal;
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
      this.monsterAtteck();
      this.addLog("player", "heal", heal);
    },
    surr() {
      this.winner = "monster";
    },
    addLog(who, what, value) {
      this.logs.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
app.mount("#game");
