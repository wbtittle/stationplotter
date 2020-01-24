import Vue from 'vue'
import Vuex from 'vuex'

import states from './states.js'
import countries from './countries.js'
import stations from './stations.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    states: states,
    countries: countries,
    stations: stations
  },
  state: {
    chart_settings: { width: 800, height: 600, start_year: 1850, end_year: (new Date()).getFullYear()+1, units: "C", elem:["TMAX"], low:"-80", high:"50" },
    country:{"code":"UK", "name":"United Kingdom"},
    station:{ "id":"","country":"","lat":"0","lng":"0","alt":"","state":"","name":"","gsn":"","hcn":"","wmo":"" ,inventory:["TMAX"]},
    state:{"code":"", "name":""},
    loading: false,
    station_elem: ''
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
    SET_STATION_ELEM( state, elem ){
      state.station_elem = elem
    }
  },
  actions: {
    setLoading( {commit}, value ){
      commit("SET_LOADING", value)
    },
    setCountry( { commit }, country ){
      commit('SET_COUNTRY', country)
    },
    setStation( { commit, state }, station_id ){
      const station = state.stations.stations.filter( station => station.id == station_id ).pop()
      commit('SET_STATION', station);
    },
    setState( { commit }, value ){
      commit('SET_STATE', value);
    },
    setSiteFile( { commit }, value ){
      commit('SET_SITE_FILE', value);
    },
    setChartValues( { commit }, chart){
      commit('SET_CHART_VALUES', chart)
    },
    setStationElem({ commit }, elems ){
      commit("SET_STATION_ELEM", elems);
    }

  }
})
