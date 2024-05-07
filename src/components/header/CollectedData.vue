<template>
  <div class="data-summary__collected">
    <ul class="data-summary__collected-list">
      <li class="data-summary__collected-item">  <span>Temperature</span>{{allTemperatures}}°</li>
      <li class="data-summary__collected-item"> <span>Humidity</span>{{allHumidity}}%</li>
      <li class="data-summary__collected-item"> <span>Luminosity</span>{{allLuminosity }} lm</li>
      <li class="data-summary__collected-item"><span>CO<sub>2</sub></span>{{ allCO2 }} ppm</li>
    </ul>
  </div>
</template>

<script setup>
  import {onMounted, ref} from 'vue'

  const props = defineProps({
    coordinates: Array
  });

  const allTemperatures = ref(null);
  const allHumidity = ref(null);
  const allLuminosity = ref(null);
  const allCO2 = ref(null);

  const getAllValues = (value) => {
    return props.coordinates.reduce((sum, {info}) => sum + info[value], 0)
  }

  onMounted(() => {
    const all = props.coordinates.length;
    allTemperatures.value = parseFloat(getAllValues('temperature') / all).toFixed(1);
    allHumidity.value = parseFloat(getAllValues('humidity') / all).toFixed(1);
    allLuminosity.value = parseFloat(getAllValues('luminosity') / all).toFixed(1);
    allCO2.value = parseFloat(getAllValues('co2') / all).toFixed(1);
  })

</script>

<style >

.data-summary__collected-item {
  color: hsla(180, 1%, 38%, 1);
}

.data-summary__collected-item span {
  min-width: 80px;
  display: inline-block;
  margin-right: 1rem;
}

.data-summary__collected-item:not(:last-child) {
  margin-bottom: 0.6rem;
}
</style>