Vue.use('')

var app = new Vue({
  el: '#app',
  data: {
    apiRoot: 'http://127.0.0.1:8000',
    unitInfo: null
  },
  mounted: function () {
    this.getUnitInfo();
  },
  methods: {
    humanizeURL: function (url) {
      return url
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '')
    },
    getUnitInfo: function () {
      var url = this.apiRoot + '/unit-info'
      // console.log(Vue);
      this.$http.get(url).then(res => {
        this.unitInfo = res.body;
      }, res => {
        console.log(res);
      })
    }
  }
});
