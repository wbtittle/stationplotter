<template lang="html">
  <div>
    <h4>Countries</h4>
    <select name="country" v-model="value" v-on:change="setCountry">
      <option v-for="country in countries" :value="country.code" :key="country.code">{{ country.name }}</option>
    </select>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: "Countries",
  data(){
    return {
      countries: countries,
      value: ""
    }
  },
  computed: {
      ...mapState(['countries','country'])
  },
  methods:{
    setCountry(){
        console.log(process.env.VUE_APP_GOOGLE_API_KEY)
        this.$store.dispatch("setCountry", this.countries.filter( country => country.code == this.value).pop() )
    }
  }
}
</script>
