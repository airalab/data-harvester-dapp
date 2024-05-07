<template>
  <div class="data-summary">
    <div class="data-summary__header" :class="{'isOpen': isOpen}" @click="isOpen = !isOpen">
      <span v-if="state === 'wifi'" class="icon" v-html="Wifi"></span>
      <span v-else class="icon" v-html="Collected"></span>
      <span>{{text}}</span>
    </div>
    <slot v-if="isOpen"/>
  </div>
</template>

<script setup>

  import Wifi from '../../assets/icons/wifi.svg?raw'
  import Collected from '../../assets/icons/collected.svg?raw'

  import {ref} from 'vue'

  const isOpen = ref(false)

  const props = defineProps({
  text: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  },
  state: {
    type: String
  }
})

</script>

<style>
  .data-summary {
    position: fixed;
    top: 10px;
    right: 20px;
    border: 1px solid #000;
    padding: 8px 10px;
    color: #28283d;
    font-size: 12px;
    line-height: 14px;
    font-weight: 900;
    background-color: #fff;
    z-index: 10;
  }

  .data-summary__header {
    min-width: 190px;
    padding-right: 40px;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_10_2596)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.8242 0.233322C11.9368 0.35904 11.9996 0.525819 11.9996 0.69922C11.9996 0.87262 11.9368 1.0394 11.8242 1.16512L6.86592 6.6143C6.75662 6.73628 6.62507 6.8334 6.47928 6.89977C6.33348 6.96614 6.17648 7.00037 6.01782 7.00037C5.85916 7.00037 5.70216 6.96614 5.55636 6.89977C5.41056 6.8334 5.27902 6.73628 5.16972 6.6143L0.174717 1.12566C0.0631189 1.00108 0.000397 0.836125 -0.000717317 0.664284C-0.00183163 0.492443 0.0587451 0.326591 0.168717 0.20039C0.222984 0.137788 0.288805 0.0876846 0.362094 0.0531926C0.435382 0.0187006 0.514574 0.000555992 0.594751 -0.000115395C0.674929 -0.000786781 0.754381 0.0160294 0.828174 0.0492897C0.901967 0.0825505 0.968525 0.131545 1.02372 0.193231L5.59362 5.21669C5.64827 5.27772 5.71406 5.32633 5.78699 5.35954C5.85991 5.39276 5.93845 5.40989 6.01782 5.40989C6.09718 5.40989 6.17572 5.39276 6.24865 5.35954C6.32157 5.32633 6.38736 5.27772 6.44202 5.21669L10.9762 0.233322C11.0309 0.172359 11.0966 0.123816 11.1695 0.0906463C11.2424 0.0574765 11.3209 0.0403719 11.4002 0.0403719C11.4795 0.0403719 11.558 0.0574765 11.6309 0.0906463C11.7038 0.123816 11.7695 0.172359 11.8242 0.233322Z' fill='black'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_10_2596'%3E%3Crect width='12' height='7' fill='white' transform='matrix(1 0 0 -1 0 7)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    background-position: right 10px top 50%;
    background-size: 12px 7px;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  .data-summary__header.isOpen{
    margin-bottom: 1rem;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_10_1426)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.8242 6.76668C11.9368 6.64096 11.9996 6.47418 11.9996 6.30078C11.9996 6.12738 11.9368 5.9606 11.8242 5.83488L6.86592 0.385701C6.75662 0.263723 6.62507 0.166597 6.47928 0.100228C6.33348 0.0338589 6.17648 -0.000366211 6.01782 -0.000366211C5.85916 -0.000366211 5.70216 0.0338589 5.55636 0.100228C5.41056 0.166597 5.27902 0.263723 5.16972 0.385701L0.174717 5.87434C0.0631189 5.99892 0.000397 6.16387 -0.000717317 6.33572C-0.00183163 6.50756 0.0587451 6.67341 0.168717 6.79961C0.222984 6.86221 0.288805 6.91232 0.362094 6.94681C0.435382 6.9813 0.514574 6.99944 0.594751 7.00012C0.674929 7.00079 0.754381 6.98397 0.828174 6.95071C0.901967 6.91745 0.968525 6.86845 1.02372 6.80677L5.59362 1.78331C5.64827 1.72228 5.71406 1.67367 5.78699 1.64046C5.85991 1.60724 5.93845 1.59011 6.01782 1.59011C6.09718 1.59011 6.17572 1.60724 6.24865 1.64046C6.32157 1.67367 6.38736 1.72228 6.44202 1.78331L10.9762 6.76668C11.0309 6.82764 11.0966 6.87618 11.1695 6.90935C11.2424 6.94252 11.3209 6.95963 11.4002 6.95963C11.4795 6.95963 11.558 6.94252 11.6309 6.90935C11.7038 6.87618 11.7695 6.82764 11.8242 6.76668Z' fill='black'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_10_1426'%3E%3Crect width='12' height='7' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  }

  .data-summary .icon {
    margin-right: 10px;
  }
</style>