var app = new Vue({
  el: '#app',
  data: {
    apiRoot: 'https://aa-api.exitcodezero.io',
    landBattle: null,
    landBattleResult: null,
    result: null
  },
  mounted: function () {
    this.GetLandBattleTemplate();
  },
  computed: {
    attackerWinPercentage: function () {
      var p = (this.landBattleResult.wins.attacker / this.landBattleResult.wins.total_played) * 100;
      return Math.round(p * 100) / 100;
    },
    defenderWinPercentage: function () {
      var p = (this.landBattleResult.wins.defender / this.landBattleResult.wins.total_played) * 100;
      return Math.round(p * 100) / 100;
    },
    drawPercentage: function () {
      var p = (this.landBattleResult.wins.draw / this.landBattleResult.wins.total_played) * 100;
      return Math.round(p * 100) / 100;
    }
  },
  methods: {
    GetLandBattleTemplate: function () {
      var url = this.apiRoot + '/land-battle';
      this.$http.get(url).then(res => {
        this.landBattle = res.body;
      }, err => {
        console.log(err);
      })
    },
    SimulateLandBattle: function () {
      var url = this.apiRoot + '/land-battle';
      this.$http.post(url, this.landBattle).then(res => {
        this.landBattleResult = res.body;
        console.log(this.landBattleResult);
      }, err => {
        console.log(err);
      });
    }
  }
});
