<template>
  <div v-if="appstatus !== 'signed'" :class="screensignClass">
    <div class="container-narrow">
      <div class="welcomebot" area-label="Welcome App Label">
        <div class="img-wrap" area-label="Robot Harvester icon"><img alt="image of turtle bot 4" src="/turtlebot-4.png" /></div>
        <blob class="welcomeblob" area-hidden="true" />
      </div>

      <template v-if="appstatus === 'init'">
        <app-button theme="light" block @click="connect()">Connect</app-button>
      </template>

      <blob class="waitingblob" :area-label="appstatus === 'connecting' ? 'Waiting for the connection to IPFS' : 'Waiting for you to sign in'"  v-if="appstatus !== 'signed' && appstatus !== 'init'"/>

      <div class="signin">
        <template v-if="appstatus === 'connecting'">
          <h2 class="animate-pulse">Connecting</h2>
          <div class="ipfschoose">
            <p>Switch the IPFS gateway if the connection time is excessive</p>
            <form>
              <select v-model="gateway" class="block">
                <option value="https://ipfs.url.today/ipfs/">https://ipfs.url.today/ipfs/</option>
                <option value="https://cf-ipfs.com/ipfs/">https://cf-ipfs.com/ipfs/</option>
                <option value="https://ipfs.io/ipfs/">https://ipfs.io/ipfs/</option>
                <option value="https://gateway.pinata.cloud/ipfs/">https://gateway.pinata.cloud/ipfs/</option>
              </select>
            </form>
          </div>
        </template>

        <template v-if="appstatus === 'connected'">
          <h2 class="color-green">Connected</h2>
          <div class="usersign">
            <h2>Authorize</h2>
            <template v-if="users.length > 0">
              <p v-if="users.length > 2">Select an authorised user and enter the mnemonic phrase as a password</p>
              <p v-else>Enter the mnemonic phrase as a password for the user</p>
              <form @submit.prevent="signin">
                <select v-model="user" :disabled="users.length < 2" class="block">
                  <option
                    v-for="(option,index) in users"
                    :key="index"
                    :value="option"
                  >
                    {{shortenAddress(option)}}
                  </option>
                </select>
                <section class="inputpassword">
                  <input :type="typepassword" v-model="userpassword" placeholder="Enter here the mnemonic (12 words)" class="block" />

                    <svg v-if="typepassword === 'password'" @click="togpassword()" class="inputpassword-eye" aria-controls="password" aria-expanded="false" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 8.1 8.7" style="enable-background:new 0 0 8.1 8.7;" xml:space="preserve">
                      <g>
                        <path d="M2.1,6.6c0.1-0.2,0-0.4-0.2-0.5C1.2,5.6,0.8,5.1,0.8,4.6c0-0.5,0.3-0.9,0.9-1.3c0,0,0.1,0,0.1-0.1c0,0,0,0,0,0
                          c0.6-0.3,1.4-0.5,2.2-0.5c0,0,0,0,0,0c0,0,0,0,0,0c0.5,0,0.9,0.1,1.3,0.2c0.2,0.1,0.4-0.1,0.5-0.3C6,2.3,5.8,2.1,5.6,2.1
                          C5.2,2,4.9,1.9,4.5,1.9V0.4C4.5,0.2,4.3,0,4.1,0S3.7,0.2,3.7,0.4v1.5C3,1.9,2.3,2.1,1.8,2.3L1.2,1.1C1.1,1,0.9,0.9,0.7,1
                          C0.5,1.1,0.4,1.3,0.5,1.5l0.6,1.2C0.5,3.2,0,3.8,0,4.6c0,0.9,0.7,1.7,1.6,2.2C1.8,6.8,2,6.7,2.1,6.6z"/>
                        <path d="M4.1,4c0.1,0,0.2,0,0.3,0.1C4.5,4.2,4.8,4.2,4.9,4C5,3.8,4.9,3.6,4.8,3.4C4.6,3.3,4.3,3.2,4.1,3.2h0C3.6,3.2,3.1,3.5,2.9,4
                          C2.7,4.4,2.7,4.9,3,5.3c0.1,0.2,0.4,0.2,0.5,0.1c0.2-0.1,0.2-0.4,0.1-0.5c-0.1-0.2-0.1-0.4,0-0.6C3.7,4.1,3.9,4,4.1,4z"/>
                        <path d="M8.1,4.5l-0.4,0h0L8.1,4.5c0-0.7-0.4-1.3-0.9-1.7L8,2.1c0.1-0.2,0.1-0.4,0-0.6c-0.2-0.1-0.4-0.1-0.6,0L6.4,2.7c0,0,0,0,0,0
                          L4.7,4.5l0,0L5,4.8l0,0L4.7,4.5L4.1,5.2l0,0L2.8,6.5L1.5,8c-0.1,0.2-0.1,0.4,0,0.6c0.2,0.1,0.4,0.1,0.6,0l1.2-1.3
                          c0.3,0,0.5,0.1,0.8,0.1v0c0,0,0,0,0,0c0,0,0,0,0,0v0c1.1,0,2.1-0.3,2.8-0.7C7.6,6.1,8.1,5.4,8.1,4.5C8.1,4.6,8.1,4.5,8.1,4.5z
                          M6.5,5.9C5.9,6.2,5,6.5,4.1,6.5h0c0,0-0.1,0-0.1,0l0.7-0.8l0,0L4.4,5.4l0,0l0.3,0.3l0.6-0.6l0,0l1.5-1.6c0.3,0.3,0.6,0.7,0.6,1.1
                          C7.3,5,7.1,5.5,6.5,5.9z"/>
                      </g>
                    </svg>

                    <svg v-if="typepassword === 'text'" @click="togpassword()" class="inputpassword-eye" aria-controls="password" aria-expanded="true" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 20 17.4" style="enable-background:new 0 0 20 17.4;" xml:space="preserve">
                      <g>
                        <path d="M19.1,8.2c-0.4-0.7-1.1-1.2-1.8-1.8l1.4-2.8c0.2-0.5,0.1-1.1-0.4-1.3c-0.5-0.2-1.1-0.1-1.3,0.4l-1.4,2.8
                          c-1.4-0.6-3-1-4.7-1.1V1c0-0.5-0.4-1-1-1S9,0.4,9,1v3.5C7.4,4.6,5.8,4.9,4.4,5.5L3,2.7C2.7,2.3,2.1,2.1,1.7,2.3
                          C1.2,2.6,1,3.1,1.2,3.6l1.4,2.8C1.9,7,1.3,7.6,0.9,8.2C0.3,9.1,0,10,0,10.9c0,0.9,0.3,1.9,0.9,2.7c0.5,0.8,1.3,1.5,2.2,2
                          c1.9,1.1,4.3,1.8,6.9,1.8s5-0.6,6.9-1.8c0.9-0.6,1.7-1.3,2.2-2c0.6-0.8,0.9-1.8,0.9-2.7C20,10,19.7,9.1,19.1,8.2z M15.9,14
                          c-1.6,1-3.6,1.5-5.9,1.5c-2.2,0-4.3-0.5-5.9-1.5c-1.4-0.9-2.2-2-2.2-3.1c0-2.5,3.7-4.6,8.1-4.6c0,0,0,0,0,0s0,0,0,0
                          c4.4,0,8.1,2.1,8.1,4.6C18.1,12,17.3,13.1,15.9,14z"/>
                        <path d="M12.3,8.7c-0.6-0.6-1.4-0.9-2.3-0.9c-1.3,0-2.5,0.8-3,2c-0.5,1.2-0.2,2.6,0.7,3.5c0.6,0.6,1.4,0.9,2.3,0.9
                          c0.4,0,0.9-0.1,1.3-0.3c1.2-0.5,2-1.7,1.9-3C13.2,10.1,12.9,9.3,12.3,8.7z M10.5,12.2c-0.5,0.2-1,0.1-1.4-0.3
                          c-0.4-0.4-0.5-0.9-0.3-1.4C9,10,9.5,9.7,10,9.7c0,0,0,0,0,0c0,0,0,0,0,0c0.3,0,0.6,0.1,0.9,0.4c0.2,0.2,0.4,0.6,0.4,0.9
                          c0,0,0,0,0,0C11.3,11.5,11,11.9,10.5,12.2z"/>
                      </g>
                      </svg>


                </section>
                <app-button block :disabled="!checkmnemonic">
                  <template v-if="!processing">Sign in</template>
                  <template v-else>signing...</template>
                </app-button>
              </form>
              <p v-if="signerror" class="signerror">{{signerror}}</p>
            </template>
            <template v-else>Retrieving users for autorization</template>
          </div>
        </template>
      </div>
    </div>
  </div>

  <template v-else>
    <Header @chooseNetwork="upgradeNetwork" :state="state" :chosenNetwork="chosenNetwork" :coordinates="allCoordinates"/>
    <Map @getPointID="getPointID" :pointID="pointID" :coordinates="allCoordinates" :state="state" :chosenNetwork="chosenNetwork" />
    <Footer :state="state"  @changeState="upgradeState"/>
    <PointInfo v-if="pointID" @close="closePointInfo" :pointID="pointID" :coordinates="allCoordinates" :currTop="currPointTop" :currLeft="currPointLeft"/>
  </template>

</template>

<script setup>
import { u8aToString } from "@polkadot/util";
import { encodeAddress } from "@polkadot/util-crypto";
import { jsonrepair } from "jsonrepair";
import AppButton from "./components/AppButton.vue";
import Blob from "./components/Blob.vue";
import Map from "./components/Map.vue";
import Footer from "./components/footer/Footer.vue";
import Header from "./components/header/Header.vue";
import PointInfo from "./components/pointPopup/PointPopup.vue";
import { useDevices } from "./hooks/useDevices";
import { createPair, encryptor } from "./utils/encryptor";
import { decryptMsg, getData } from "./utils/tools";

import { computed, inject, ref, watch } from 'vue';

// data
// import data from './data/data.json'
// import wifi from './data/wifi_list.json'
import { unzipSync } from 'fflate';

const owner = "4Giz54KpExS9kUiiHSCmwhWroYwNmDRSzyup8pq4yEHSumGz";
const controller = "4HWhXbRWNQdaeBbjJ2maSBZqGLa6SuANn9LWUgp3JDgdgVxN";
const RobonomicsProvider = inject("RobonomicsProvider");
const devices = useDevices(owner);
const jsonData = ref();
const gateway = ref("https://ipfs.url.today/ipfs/");

watch(devices.devices, v => {
  users.value = v;
  if (v.length > 0) {
    user.value = v[0];
  }
});

/* + NOT SIGNED SCREEN */
const appstatus = ref('init') // init, connecting, connected, signed
const screensignClass = computed( () => {
  return {
    [`screen-sign`]: true,
    [`screen-sign-${appstatus.value}`]: appstatus.value !== 'signed'
  }
})
const connect = () => {
  appstatus.value = "connecting";

  watch(gateway, async value => {
    try {
      jsonData.value = await getData(
        RobonomicsProvider.instance.value,
        controller,
        value
      );
      if (jsonData.value) {
        appstatus.value = "connected";
      }
    } catch (error) {
      console.log(error);
    }
  });
  const isOnce = RobonomicsProvider.isReady.value;
  watch(
    RobonomicsProvider.isReady,
    async (isReady, _, stopWatch) => {
      if (isReady) {
        if (!isOnce) {
          stopWatch();
        }
        devices.loadDevices();
        try {
          jsonData.value = await getData(
            RobonomicsProvider.instance.value,
            controller,
            gateway.value
          );
          if (jsonData.value) {
            appstatus.value = "connected";
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    { immediate: true, once: isOnce }
  );
};
/* - NOT SIGNED SCREEN */

/* + WORKING WITH USERS */
const user = ref()
const users = ref([]) // ['5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE'] // это нужно получать из подписки
const userpassword = ref(null)
const typepassword = ref('password')
const signerror = ref(null)
const processing = ref(false)
const data = ref(null)
const wifi = ref(null)

const shortenAddress = address => {
    const addressArray = address.split('')
    const result = addressArray.slice(0, 6) + "..." + addressArray.slice(-6)
    return result.replace(/,/g, '')
}

const checkmnemonic = computed( () => {
  // проверка на пустоту и кол-во слов
  return userpassword.value && userpassword.value.trim().split(/\s+/).length === 12
})

const togpassword = () => {
  (typepassword.value === 'password') ? typepassword.value = 'text' : typepassword.value = 'password'
}

const signin = async () => {
  processing.value = true;

  const pair = createPair(userpassword.value);
  if (encodeAddress(pair.publicKey) !== encodeAddress(user.value)) {
    signerror.value = "Bad seed or type not ed25519";
    processing.value = false;
    return;
  }

  appstatus.value = "signed";
  processing.value = false;

  const account = encryptor(pair);
  const archive = decryptMsg(jsonData.value, account, controller);
  const unzipped = unzipSync(archive);
  try {
    data.value = JSON.parse(jsonrepair(u8aToString(unzipped["data.json"])));
    wifi.value = JSON.parse(
      jsonrepair(u8aToString(unzipped["wifi_list.json"]))
    );
    getAllCoordinates(data.value, coordinates);
    getWifiData();
    getSpecificWifiCoordinates();
  } catch (error) {
    console.log(error);
  }
};
/* - WORKING WITH USERS */

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
  wifi.value.map(w => {
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

</script>

<style>
  .welcomeblob .st0 { fill: var(--app-color-light); }
  .waitingblob .st0 { fill: var(--app-color-blue); }
</style>

<style scoped>
  /* + not signed screen - all */
  .screen-sign {
    align-items: flex-start;
    display: flex;
    height: 100vh;
    position: relative;
    width: 100vw;
  }
  .welcomeblob {
    position: relative;
    transform: scale(10);
    transition: 1s all linear;
    z-index: 0;
  }
  .screen-sign:not(.screen-sign-init) {
    /* background-color: var(--app-color-light); */
    padding-top: 2rem;
  }
  .welcomebot .img-wrap {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: relative;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .welcomebot .img-wrap img {
    display: block;
    max-width: 25%;
    transition: .2s all linear;
  }

  .screen-sign:not(.screen-sign-init) .welcomeblob {
    position: absolute;
  }

  h2 {
    font-family: var(--app-fontfamily);
    font-size: calc(var(--app-fontsize) * 1.2);
    font-variation-settings: 'wght' 800, 'slnt' -10, 'wdth' 135, 'opsz' 39;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
  }

  .color-green { color: var(--app-color-green)}
  /* - not signed screen - all */

  /* + not signed screen - init */
  .screen-sign-init {
    align-items: center;
    background-color: var(--app-color-dark);
    color: var(--app-color-light);
  }

  .screen-sign-init .welcomebot {
    margin-bottom: 4rem;
    position: relative;
  }
  .screen-sign-init .welcomebot .img-wrap {
    position: absolute;
  }
  .screen-sign-init .welcomebot .img-wrap img {
    max-width: 40%;
  }
  .screen-sign-init .welcomebot .welcomeblob {
    transform: scale(1);
  }
  /* - not signed screen - init */


  /* + not signed screen - connecting, connected */
  .waitingblob {
    animation: fadeIn .4s linear .6s forwards;
    opacity: 0;
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 3rem;
    z-index: 2;
  }

  .signin {
    margin-top: 2rem;
    position: relative;
    text-align: center;
    z-index: 2;
  }
  /* - not signed screen - connecting, connected */


  /* + not signed screen - connecting */
  .ipfschoose {
    animation-delay: 30s;
    animation-duration: .6s;
    animation-fill-mode: forwards;
    animation-name: fadeIn, translateUp;
    animation-timing-function: ease-in-out;
    opacity: 0;
    transform: translateY(.5rem);
  }
  /* - not signed screen - connecting */

  /* + not signed screen - connected */
  .usersign {
    opacity: 0;
    margin-top: 3rem;
    animation: fadeIn .4s linear .5s forwards;
  }

  .signerror {
    font-weight: bold;
    color: var(--app-color-red)
  }
  /* - not signed screen - connected */


</style>
