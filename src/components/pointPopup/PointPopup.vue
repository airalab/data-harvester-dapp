<template>
  <div class="point-info" :style="{top: currTop ? `${currTop}px` : '200px', left: currLeft ? `${currLeft - 200}px` : '200px'}">
    <div class="point-info__header">
        <div class="point-info__header-wrapper">
        <span class="point-info__circle"></span>
        <h3>Selected spot</h3>
      </div>
      <button class="point-info__close-btn" @click="emit('close')"></button>
    </div>
    <div class="point-info__content">
      <ul class="data-summary__collected-list" v-if="point && point.temperature">
        <li class="data-summary__collected-item">  <span>Temperature</span>{{point && point.temperature}}°</li>
        <li class="data-summary__collected-item"> <span>Humidity</span>{{point && point.humidity}} %</li>
        <li class="data-summary__collected-item"> <span>Luminosity</span>{{point && point.luminosity}} lm</li>
        <li class="data-summary__collected-item"><span>CO<sub>2</sub></span>{{point && point.co2}} ppm</li>
      </ul>
      <div v-else class="point-info__wifi">
        <div class="point-info__signal point-info__wifi-wrapper">
          <span class="point-info__signal-value">{{point && point.signal }}</span> 
          <span>Signal</span>
        </div>
        <div class="point-info__data point-info__wifi-wrapper">
          <span class="point-info__wifi-name">{{  point && point.name }}</span>
          <span>{{  point && point.mac }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {onMounted, ref, defineEmits, watch} from 'vue'

  const emit = defineEmits('close')
  const props = defineProps({
    pointID: Number,
    coordinates: Array,
    currTop: Number,
    currLeft: Number
  })

  const point = ref(null);

  watch(() => props.pointID, () => {
    getPointData()
  });

  const getPointData = () => {
    props.coordinates.filter(d => {
      if(d.id === props.pointID) {
        if(d.info) {
          point.value = d.info;
        } else {
          point.value = d;
        }
      }
    })
  }

  onMounted(() => {
    getPointData()
  })

</script>

<style scoped>
  .point-info {
    position: fixed;
    top: 200px;
    min-width: 200px;
    border: 1px solid #000;
    padding: 8px 10px;
    color: #28283d;
    font-size: 12px;
    line-height: 14px;
    font-weight: 900;
    background-color: #fff;
    z-index: 15;
  }

  .point-info__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .point-info__header-wrapper {
    display: flex;
    align-items: center;
  }

  .point-info__circle {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 10px;
    background-color: #ff008c;
    border-radius: 100%;
  }

  .point-info__close-btn {
    padding: 0;
    background-color: transparent;
    border: 1px solid transparent;
    width: 15px;
    height: 15px;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_10_952)'%3E%3Cpath d='M0.190006 8.88563C0.129341 8.94629 0.0812189 9.01831 0.0483872 9.09758C0.0155555 9.17684 -0.00134277 9.26179 -0.00134277 9.34758C-0.00134277 9.43338 0.0155555 9.51833 0.0483872 9.59759C0.0812189 9.67686 0.129341 9.74888 0.190006 9.80954C0.312524 9.93206 0.478695 10.0009 0.651962 10.0009C0.737756 10.0009 0.822709 9.98399 0.901971 9.95116C0.981234 9.91833 1.05325 9.8702 1.11392 9.80954L0.190006 8.88563ZM5.46174 5.46171C5.58426 5.3392 5.65309 5.17303 5.65309 4.99976C5.65309 4.82649 5.58426 4.66032 5.46174 4.5378C5.33923 4.41528 5.17306 4.34645 4.99979 4.34645C4.82652 4.34645 4.66035 4.41528 4.53783 4.5378L5.46174 5.46171ZM4.53783 4.5378C4.41531 4.66032 4.34648 4.82649 4.34648 4.99976C4.34648 5.17303 4.41531 5.3392 4.53783 5.46171C4.66035 5.58423 4.82652 5.65306 4.99979 5.65306C5.17306 5.65306 5.33923 5.58423 5.46174 5.46171L4.53783 4.5378ZM9.80957 1.11389C9.87024 1.05322 9.91836 0.981203 9.95119 0.901941C9.98402 0.822678 10.0009 0.737725 10.0009 0.651932C10.0009 0.566139 9.98402 0.481185 9.95119 0.401923C9.91836 0.32266 9.87024 0.25064 9.80957 0.189975C9.74891 0.12931 9.67689 0.0811883 9.59762 0.0483567C9.51836 0.015525 9.43341 -0.00137329 9.34761 -0.00137329C9.26182 -0.00137329 9.17687 0.015525 9.09761 0.0483567C9.01834 0.0811883 8.94632 0.12931 8.88566 0.189975L9.80957 1.11389ZM5.46174 4.5378C5.40108 4.47714 5.32906 4.42901 5.2498 4.39618C5.17054 4.36335 5.08558 4.34645 4.99979 4.34645C4.91399 4.34645 4.82904 4.36335 4.74978 4.39618C4.67052 4.42901 4.5985 4.47714 4.53783 4.5378C4.47717 4.59847 4.42904 4.67049 4.39621 4.74975C4.36338 4.82901 4.34648 4.91396 4.34648 4.99976C4.34648 5.08555 4.36338 5.1705 4.39621 5.24977C4.42904 5.32903 4.47717 5.40105 4.53783 5.46171L5.46174 4.5378ZM8.88566 9.80954C8.94632 9.8702 9.01834 9.91833 9.09761 9.95116C9.17687 9.98399 9.26182 10.0009 9.34761 10.0009C9.43341 10.0009 9.51836 9.98399 9.59762 9.95116C9.67689 9.91833 9.74891 9.8702 9.80957 9.80954C9.87024 9.74888 9.91836 9.67686 9.95119 9.59759C9.98402 9.51833 10.0009 9.43338 10.0009 9.34758C10.0009 9.26179 9.98402 9.17684 9.95119 9.09758C9.91836 9.01831 9.87024 8.94629 9.80957 8.88563L8.88566 9.80954ZM4.53783 5.46171C4.66035 5.58423 4.82652 5.65306 4.99979 5.65306C5.17306 5.65306 5.33923 5.58423 5.46174 5.46171C5.58426 5.3392 5.65309 5.17303 5.65309 4.99976C5.65309 4.82649 5.58426 4.66032 5.46174 4.5378L4.53783 5.46171ZM1.11392 0.189975C0.9914 0.0674568 0.82523 -0.00137329 0.651962 -0.00137329C0.478695 -0.00137329 0.312524 0.0674568 0.190006 0.189975C0.0674873 0.312494 -0.00134277 0.478664 -0.00134277 0.651932C-0.00134277 0.825199 0.0674873 0.99137 0.190006 1.11389L1.11392 0.189975ZM1.11392 9.80954L5.46174 5.46171L4.53783 4.5378L0.190006 8.88563L1.11392 9.80954ZM5.46174 5.46171L9.80957 1.11389L8.88566 0.189975L4.53783 4.5378L5.46174 5.46171ZM4.53783 5.46171L8.88566 9.80954L9.80957 8.88563L5.46174 4.5378L4.53783 5.46171ZM5.46174 4.5378L1.11392 0.189975L0.190006 1.11389L4.53783 5.46171L5.46174 4.5378Z' fill='black'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_10_952'%3E%3Crect width='10' height='10' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    background-position: top center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    cursor: pointer;
  }

  .point-info__wifi {
    display: flex;
    align-items: center;
    gap: 20px
  }

  .point-info__wifi-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 12px;
    font-weight: 900;
    color: #606161;
  }

  .point-info__signal-value {
    font-size: 22px;
  }

  .point-info__wifi-name {
    font-size: 14px
  }

  @media screen and (max-width: 680px) {
    .point-info {
      position: absolute;
      top: 250px !important;
      left: 150px !important;
      transform: scale(0.8);
    }
  }


</style>
