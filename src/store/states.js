import axios from 'axios'

export default {
  state: {
    states: []
  },
  getters: {
    states( state ) {
      return state.states
    }
  },
  mutations:{
    UPDATE_STATES: function( state , states ){
      state.states = states
    }

  },

  actions: {
    loadData({ commit }){
      axios.get("/data/ghcnd-states.json").then( ({ data }) => {
        commit('UPDATE_STATES', data )
      })
    }
  }
}
