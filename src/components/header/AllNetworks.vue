<template>
  <div class="data-summary__network">
    <ul class="data-summary__network-list">
      <li class="data-summary__network-item" @click="chooseNetwork('Inex BeOn Staff')">Inex BeOn Staff</li>
      <li class="data-summary__network-item" @click="chooseNetwork('Multispace')">Multispace</li>
      <li class="data-summary__network-item" @click="chooseNetwork('CCTVINT')">CCTVINT</li>
      <li class="data-summary__network-item" @click="chooseNetwork('HUAWEI-5G-KuK2')">HUAWEI-5G-KuK2</li>
    </ul>
  </div>
</template>

<script setup>
  import {defineEmits} from 'vue'

  const emit = defineEmits(["chooseNetwork"]);

  const chooseNetwork = (name) => {
    emit("chooseNetwork", name);
  }

</script>

<style scoped>

.data-summary__network-item {
  padding: 8px 5px;
  padding-top: 2px;
  color: hsla(180, 1%, 38%, 1);
  background-image: url("data:image/svg+xml,%3Csvg width='5' height='9' viewBox='0 0 5 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_10_10770)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.166763 0.132119C0.256562 0.0476665 0.37569 0.00057888 0.499547 0.00057888C0.623405 0.00057888 0.742532 0.0476665 0.832331 0.132119L4.7246 3.85081C4.81173 3.93278 4.88111 4.03144 4.92851 4.14079C4.97592 4.25014 5.00037 4.36789 5.00037 4.48688C5.00037 4.60588 4.97592 4.72363 4.92851 4.83297C4.88111 4.94232 4.81173 5.04098 4.7246 5.12296L0.804149 8.86921C0.71516 8.9529 0.597337 8.99995 0.474593 9.00078C0.35185 9.00162 0.233384 8.95619 0.14324 8.87371C0.0985241 8.83301 0.062736 8.78364 0.0380988 8.72867C0.0134616 8.67371 0.000501633 8.61431 2.19345e-05 8.55418C-0.000457287 8.49405 0.0115538 8.43446 0.0353117 8.37911C0.0590692 8.32377 0.0940652 8.27385 0.138126 8.23246L3.72631 4.80503C3.76991 4.76404 3.80463 4.7147 3.82835 4.66C3.85207 4.60531 3.86431 4.54641 3.86431 4.48688C3.86431 4.42736 3.85207 4.36845 3.82835 4.31376C3.80463 4.25906 3.76991 4.20972 3.72631 4.16873L0.166763 0.768081C0.123218 0.727096 0.0885444 0.677773 0.0648518 0.62311C0.0411592 0.568446 0.0289416 0.509583 0.0289416 0.4501C0.0289416 0.390617 0.0411592 0.331755 0.0648518 0.277091C0.0885444 0.222427 0.123218 0.173104 0.166763 0.132119Z' fill='%23606161'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_10_10770'%3E%3Crect width='9' height='5' fill='white' transform='matrix(0 -1 -1 0 5 9)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.data-summary__network-item:not(:last-child) {
  margin-bottom: 0.6rem;
  border-bottom: 1px solid #cbcbcb;
}
</style>