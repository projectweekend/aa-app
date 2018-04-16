Vue.use('')

var app = new Vue({
  el: '#app',
  data: {
    apiRoot: 'https://aa-api.exitcodezero.io',
    unitTypes: ['land', 'air', 'sea'],
    unitInfo: null,
    battle: {
      attacker: {},
      defender: {}
    },
    result: null
  },
  mounted: function () {
    this.getUnitInfo();
  },
  methods: {
    getUnitInfo: function () {
      var url = this.apiRoot + '/unit-info'
      // console.log(Vue);
      this.$http.get(url).then(res => {
        this.unitInfo = res.body;
        this.emptyBattle();
      }, err => {
        console.log(err);
      })
    },
    emptyBattle: function () {
      for (let t of this.unitTypes) {
        for (let unit of this.unitInfo[t]) {
          this.battle.attacker[unit.name] = 0;
          this.battle.defender[unit.name] = 0;
        }
      }
    },
    emptyResult: function () {
      this.result = null;
    },
    simulateBattle: function () {
      this.emptyResult();
      var url = this.apiRoot;
      this.$http.post(url, this.battle).then(res => {
        this.result = res.body;
      }, err => {
        console.log(err);
      });
    }
  }
});
