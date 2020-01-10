<template>
  <div class="container-fluid">
    <div class="row">
      
      <ControlPanel />
      <ChartItem msg="Welcome to Your Vue.js App"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ChartItem from '@/components/ChartItem.vue'
import ControlPanel from '@/components/ControlPanel.vue'

export default {
  name: 'home',
  components: {
    ChartItem,
    ControlPanel
  }
}
</script>
