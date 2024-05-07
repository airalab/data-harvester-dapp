<template>
    <PinchScrollZoom
    class="mobile-zoom"
    ref="zoomer"
    within
    centered
    key-actions
    :width="width"
    :height="height"
    :min-scale="1"
    :max-scale="6"
    @scaling="e => onEvent('scaling', e)"
    :content-width="widthContent"
    :content-height="heightContent"
  >
    <div class="wrapper" ref="el">
      <div  class="map" @click="onShow">
          <span class="point" 
            :class="{'isActive': pointID === coordinate.id}"
            v-for="(coordinate, index) in coordinates" 
            :key="index" 
            :style="{top: coordinate.y ? `${1152 - convertValues(coordinate.y)}px` : '', left: coordinate.x ? `${1192 - convertValues(coordinate.x)}px` : '', opacity: coordinate.signal && `${coordinate.signal}%`}" 
            @click="getPoint($event, coordinate.id)"
          />
        <img src="../assets/owlcat_map_3_edit.png" alt="office map" />
      </div>
    </div>
  </PinchScrollZoom>
  <div class="wrapper desktop" ref="el">
    <div  class="map" @click="onShow">
        <span class="point" 
          :class="{'isActive': pointID === coordinate.id}"
          v-for="(coordinate, index) in coordinates" 
          :key="index" 
          :style="{top: coordinate.y ? `${1152 - convertValues(coordinate.y)}px` : '', left: coordinate.x ? `${1192 - convertValues(coordinate.x)}px` : '', opacity: coordinate.signal && `${coordinate.signal}%`}" 
          @click="getPoint($event, coordinate.id)"
        />
      <img src="../assets/owlcat_map_3_edit.png" alt="office map" />
    </div>
  </div>
</template>


<script setup>
  
  import {defineEmits, ref} from 'vue'
  import PinchScrollZoom from '@coddicat/vue-pinch-scroll-zoom';

  const emit = defineEmits(["getPointID"]);

  const props = defineProps({
    pointID: Number,
    coordinates: Array,
    chosenNetwork: String,
    state: String
  })

  const el = ref(null);
  const zoomer = ref(null);
  const state = ref(null);
  
  const width = ref(850); 
  const height = ref(700);
  const widthContent = ref(1300);
  const heightContent = ref(800)

  const getPoint = (event, id) => {
    emit('getPointID', id, event.clientY, event.clientX)
  }

  const convertValues = (value) => {
    return value / 0.01;
  }

  function onEvent(name, e) {
    state.eventName = name;
    state.eventData = e;
    state.scale = e.scale;
    state.originX = e.originX;
    state.originY = e.originY;
    state.translateX = e.translateX;
    state.translateY = e.translateY;
}

function reset() {
  zoomer.value?.setData({
    scale: 1,
    originX: 150,
    originY: 200,
    translateX: -100,
    translateY: -50
  });
}
</script>

<style scoped>
  .mobile-zoom {
    display: none;
  }

  .wrapper {
    position: absolute;
    top: 0;
    right: 0;
    transform: rotate(90deg) translateY(5%) translateX(-95%) scale(calc(1/1.5));
  }

  .notouch {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    touch-action: none;
  }

  .map {
    position: relative;
    margin: 0 auto;
    left: 0;
    top: 0;
  }

  .point {
    position: absolute;
    display: block;
    width: 8px;
    height: 8px;
    background-color: hsla(205, 98%, 48%, 1);
    border-radius: 100%;
    cursor: pointer;
  }

  .point.isActive {
    background-color: #ff008c;
  }

  @media screen and (max-width: 1680px) {
    .wrapper {
      transform: rotate(90deg) translateY(-4%) translateX(-100%) scale(calc(1 / 2.5));
    }
  }

  @media screen and (max-width: 998px) {
    .wrapper {
      transform: rotate(90deg) translateY(-10%) translateX(-103%) scale(calc(1 / 3.5));
    }
  }


  @media screen and (max-width: 680px) {
    .wrapper {
      transform: scale(calc(1 / 4.5)) translateX(58%) translateY(-175%);
    }

    .point {
      width: 15px;
      height: 15px;  
    }

    .desktop {
      display: none;
    }

    .mobile-zoom {
      display: block;
    }
  }


</style>
