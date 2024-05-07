<template>
  <div class="container">
    <Header @chooseNetwork="upgradeNetwork" :state="state" :chosenNetwork="chosenNetwork" :coordinates="allCoordinates"/>
    <Map @getPointID="getPointID" :pointID="pointID" :coordinates="allCoordinates" :state="state" :chosenNetwork="chosenNetwork" />
    <Footer :state="state"  @changeState="upgradeState"/>
    <PointInfo v-if="pointID" @close="closePointInfo" :pointID="pointID" :coordinates="allCoordinates" :currTop="currPointTop" :currLeft="currPointLeft"/>
  </div>
</template>

<script setup>
import Header from './components/header/Header.vue'
import Map from './components/Map.vue'
import Footer from './components/footer/Footer.vue'
import PointInfo from './components/pointPopup/PointPopup.vue'

import {onMounted, ref, computed, watch} from 'vue'

// data
import data from './data/data.json';
import wifi from './data/wifi_list.json';


const state = ref('collected');
const chosenNetwork = ref(null);
const pointID = ref(0)
const coordinates = ref([]);
const wifiCoordinates = ref([]);
const wifiData = ref([]);

const currPointTop = ref(0);
const currPointLeft = ref(0);

watch(chosenNetwork, () => {
  getSpecificWifiCoordinates()
})

const allCoordinates = computed(() => {

  if(chosenNetwork.value && wifiCoordinates.value.length) {
    return wifiCoordinates.value
  }

  return coordinates.value;
})

const upgradeState = (st) => {
  state.value = st;
  chosenNetwork.value = null;
}

const upgradeNetwork = (name) => {
  chosenNetwork.value = name;
}

const getPointID = (id, top, left) => {
  pointID.value = id;
  currPointTop.value = top;
  currPointLeft.value = left;
}

const closePointInfo = () => {
  pointID.value = 0;
}

const getAllCoordinates = (array, target) => {
  array.map(coordinate => {
    let x = -coordinate.pose.robot_position.x;
    let y = coordinate.pose.robot_position.y;
    let id = coordinate.timestamp;
    let info = coordinate.esp_air_sensors;

    target.value.push({x, y, id, info})
  })
}

const getWifiData = () => {
  wifi.map(w => {
    const keys = Object.keys(w);
    const keysWifi = keys.filter(k => k !== 'pose' && k !== 'timestamp');
    keysWifi.map(k => {
      const obj = {};

      obj.name = w[k].ssid
      obj.signal = w[k].signal
      obj.mac = k;
      obj.id = w.timestamp;
      obj.x = -w.pose.robot_position.x;
      obj.y = w.pose.robot_position.y;

      if(obj.name) {
        wifiData.value.push(obj);
      }
    })
  })
}

const getSpecificWifiCoordinates = () => {
  let newArr = [];
  if(chosenNetwork.value) {
    newArr = wifiData.value.filter(d => d.name === chosenNetwork.value);
    wifiCoordinates.value = Object.values(newArr.reduce((acc, cur) => {
    const key = `${cur.id}_${cur.name}`;
    if (!acc[key]) {
      acc[key] = cur;
    }
    if (acc[key].signal < cur.signal) {
      acc[key].signal = cur.signal
    }
    return acc;
}, {}));
  }
}


onMounted(() => {
  getAllCoordinates(data, coordinates);

  getWifiData()
  getSpecificWifiCoordinates();
})

</script>

<style scoped></style>

