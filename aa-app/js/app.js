Vue.use('')

var app = new Vue({
  el: '#app',
  data: {
    apiRoot: 'https://aa-api.exitcodezero.io',
    unitTypes: ['land', 'air', 'sea'],
    unitInfo: null,
    amphibiousAssaultNavalUnits: [],
    landBattleUnits: [],
    navalBattleUnits: [],
    battle: {
      attacker: {},
      defender: {},
      amphibiousAssault: false
    },
    result: null
  },
  mounted: function () {
    this.GetUnitInfo();
    this.EmptyBattle();
  },
  methods: {
    GetUnitInfo: function () {
      var url = this.apiRoot + '/unit-info';
      this.$http.get(url).then(res => {
        this.unitInfo = res.body;
        this.RefreshLandBattleUnits();
        this.RefreshNavalBattleUnits();
        this.RefreshAmphibiousAssaultNavalUnits();
      }, err => {
        console.log(err);
      })
    },
    RefreshAmphibiousAssaultNavalUnits: function () {
      this.amphibiousAssaultNavalUnits = [];
    },
    RefreshLandBattleUnits: function () {
      this.landBattleUnits = [];
      for (var i = 0; i < this.unitInfo.land.length; i++) {
        this.landBattleUnits.push(this.unitInfo.land[i]);
      }
      for (var i = 0; i < this.unitInfo.air.length; i++) {
        this.landBattleUnits.push(this.unitInfo.air[i]);
      }
    },
    RefreshNavalBattleUnits: function () {
      this.navalBattleUnits = [];
      for (var i = 0; i < this.unitInfo.air.length; i++) {
        this.navalBattleUnits.push(this.unitInfo.air[i]);
      }
      for (var i = 0; i < this.unitInfo.sea.length; i++) {
        this.navalBattleUnits.push(this.unitInfo.sea[i]);
      }
    },
    EmptyBattle: function () {
      if (this.unitInfo) {
        for (let t of this.unitTypes) {
          for (let unit of this.unitInfo[t]) {
            this.battle.attacker[unit.name] = 0;
            this.battle.defender[unit.name] = 0;
          }
        }
      }
      this.amphibiousAssault = false;
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
    },
    toggleAmphibiousAssault: function () {
      this.battle.amphibiousAssault = !this.battle.amphibiousAssault;
    }
  }
});
