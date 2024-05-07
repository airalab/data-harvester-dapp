<template>
  <header class="header">
    <div class="icon">
      <img src="/app-icon-512-rounded.png" alt="App icon" />
    </div>
    <div class="data-wrapper">
      <Summary 
        v-if="state==='collected'"
        icon="collected"
        text="Data collected summary" 
        :state="state"
      >
        <CollectedData :coordinates="coordinates" />
      </Summary>
      <Summary 
        v-if="state==='wifi'"
        icon="wifi"
        :text="chosenNetwork ? chosenNetwork : 'All networks'" 
        :state="state"
      >
      <AllNetworks @chooseNetwork="emit('chooseNetwork',$event)"/>
      </Summary>
    </div>
  </header>
</template>

<script setup>
  import {defineEmits} from 'vue'
  import Summary from './Summary.vue'
  import CollectedData from './CollectedData.vue'
  import AllNetworks from './AllNetworks.vue'


  const emit = defineEmits(["chooseNetwork"]);

  const props = defineProps({
    state: String,
    chosenNetwork: String,
    coordinates: Array
  })


</script>

<style scoped>

.icon {
  position: fixed;
  top: 10px;
  left: 10px;
  width: 60px;
  height: 60px;
  z-index: 5;
}

.icon img {
  width: 100%;
}

</style>