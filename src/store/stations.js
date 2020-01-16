import axios from 'axios'
export default {
  state: {
    stations: []
  },
  getters: {
    stations( state ) {
      return state.stations
    }
  },
  mutations:{
    UPDATE_STATIONS: function( state, stations ){
      state.stations = stations
    }

  },

  actions: {
    loadData({ commit }){
      axios.get("/data/ghcnd-stations.json").then( ({ data }) => {
        commit('UPDATE_STATIONS', data )
      })
    }
  }
}
