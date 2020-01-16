import axios from 'axios'

export default {
  state: {
    countries: []
  },

  getters: {
    countries( state ) {
      return state.countries
    }
  },

  mutations:{
    UPDATE_COUNTRIES: function(state , countries){
      state.countries = countries
    }
  },

  actions: {
    loadData({ commit }){

      axios.get("/data/ghcnd-countries.json").then( ({ data }) => {
        console.log("LOADING -- Countries", data)
        commit('UPDATE_COUNTRIES', data )
      })
    }
  }
}
