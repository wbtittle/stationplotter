import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chart_settings: { width: 800, height: 600, start_year: 1850, end_year: (new Date()).getFullYear()+1, units: "C", elem:["TMAX"], low:"-80", high:"50" },
    country:{"code":"UK", "name":"United Kingdom"},
    station:{ "id":"","country":"","lat":"","lng":"","alt":"","state":"","name":"","gsn":"","hcn":"","wmo":"" ,inventory:["TMAX"]},
    state:{"code":"", "name":""},
    loading: false,
    station_elem: []
  },
  getters: {
    station( state ){
      return state.station
    },
    chart_settings( state ){
      return state.chart_settings
    }
  },
  mutations: {
    SET_LOADING( state, value ){
      state.loading = value
    },
    SET_COUNTRY( state, value ) {
      state.country = value
    },
    SET_STATION( state, value ){
      state.station = value
    },
    SET_STATE( state, value ){
      state.state = value
    },
    SET_SITE_FILE( state, value ){
      state.siteFile = value
    },
    SET_CHART_VALUES( state, chart ){
      state.chart_settings = chart
    },
    SET_STATION_ELEM( state, elems ){
      state.station_elem = elems
    }
  },
  actions: {
    setLoading( {commit}, value ){
      commit("SET_LOADING", value)
    },
    setCountry( { commit }, country ){
      console.log("Setting Country", country)
      commit('SET_COUNTRY', country);
    },
    setStation( { commit }, station ){
      console.log("Setting Station", station)
      commit('SET_STATION', station);
    },
    setState( { commit }, value ){
      console.log("Setting State", value)
      commit('SET_STATE', value);
    },
    setSiteFile( { commit }, value ){
      commit('SET_SITE_FILE', value);
    },
    setChartValues( { commit }, chart){
      console.log("COMMIT CHART VALUES ", chart)
      commit('SET_CHART_VALUES', chart)
    },
    setStationElem({ commit }, elems ){
      commit("SET_STATION_ELEM", elems);
    }

  },
  modules: {

  }
})
