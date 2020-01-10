<template lang="html">
  <div class="">
    <h4>States</h4>
    <select name="states" v-on:change="setState" v-model="value">
      <option v-for="state in statesInCountry" :value="state.code" :key="state.code" >{{ state.name }}</option>
    </select>
  </div>
</template>

<script>
import states from '@/assets/ghcnd-states.json'
import { mapState } from "vuex"
export default {
  name: "States",
  data(){
    return {
      states: states,
      value: ""
    }
  },
  computed: {
    statesInCountry(){
      if (this.country.code == "US" || this.country.code == "CA")
        return this.states.filter(state => state.country == this.country.code )
      else
        return []
    },
    ...mapState(['country', 'state'])
  },
  methods: {
    setState( event ) {
      this.$store.dispatch("setState", this.states.filter( state => state.code == this.value).pop() )
    }
  }
}
</script>

<style lang="css" scoped>
</style>
