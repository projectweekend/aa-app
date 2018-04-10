Vue.use('')

var app = new Vue({
  el: '#app',
  data: {
    apiRoot: 'http://127.0.0.1:8000',
    unitTypes: ['land', 'air', 'sea'],
    unitInfo: null,
    battle: {
      attacker: {},
      defender: {}
    },
    result: {}
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
        this.initEmptyBattle();
      }, err => {
        console.log(err);
      })
    },
    initEmptyBattle: function () {
      for (let t of this.unitTypes) {
        for (let unit of this.unitInfo[t]) {
          this.battle.attacker[unit.name] = 0;
          this.battle.defender[unit.name] = 0;
        }
      }
    },
    simulateBattle: function () {
      var url = this.apiRoot;
      console.log(this.battle);
      this.$http.post(url, this.battle).then(res => {
        this.result = res.body;
      }, err => {
        console.log(err);
      });
    }
  }
});
