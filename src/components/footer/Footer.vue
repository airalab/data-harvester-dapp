<template>
  <div class="state-btns">
    <button class="state__btn" @click="onClick('wifi')" :class="{'activated': state === 'wifi'}">
      <div class="icon" v-html="Wifi"></div>
    </button>
    <button class="state__btn" @click="onClick('collected')" :class="{'activated': state === 'collected'}">
      <div class="icon" v-html="Collected"></div>
    </button>
  </div>
</template>

<script setup>
  import {defineEmits} from 'vue'

  import Wifi from '../../assets/icons/wifi.svg?raw'
  import Collected from '../../assets/icons/collected.svg?raw'

  const emit = defineEmits(["changeState"]);

  const props = defineProps({
    state: String,
  })

  const onClick = (state) => {
      emit("changeState", state);
  };

</script>

<style scoped>

.state-btns {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10;
}

.state__btn {
  width: 30px;
  height: 28px;
  padding: 5px 6px;
  background-color: #fff;
  border: 1px solid #000;
  cursor: pointer;
  opacity: 0.5;
}

.state__btn:first-of-type {
  margin-right: 10px;
}

.state__btn.activated {
  opacity: 1;
}

</style>