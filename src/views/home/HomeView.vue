<template>
  <section id="hero-animation">
    <div id="landingHero" class="section-py landing-hero position-relative">
      <div class="container">
        <div class="hero-text-box text-center">
          <h1 class="text-primary display-6 fw-bold">Subconverter 订阅转换</h1>
          <!-- <h2 class="hero-sub-title h6 mb-4 pb-1">Subconverter 订阅转换支持 Clash QuantumultX Surge 等主流软件</h2> -->
        </div>
        <div class="hero-animation-img">
          <SubTable />
        </div>
      </div>
    </div>
    <div class="landing-hero-blank"></div>
  </section>
</template>

<script>
import SubTable from './SubTable.vue';
export default {
  name: 'SubconverterView',
  components: {
    SubTable,
  },
};
</script>

<style scoped>
.light-style .landing-hero {
  background: linear-gradient(338.18deg, #fafaff 0%, #ececec 94.44%);
}
.landing-hero .hero-animation-img {
  margin-bottom: -24rem;
}
@media (max-width: 1199.98px) {
  .landing-hero .hero-animation-img {
    margin-bottom: -18rem;
  }
}
@media (max-width: 575.98px) {
  .landing-hero .hero-animation-img {
    margin-bottom: -10rem;
  }
}

/* Landing Hero Blank */
.landing-hero-blank {
  padding-top: 20rem;
}
@media (max-width: 1199.98px) {
  .landing-hero-blank {
    padding-top: 15rem;
  }
}
@media (max-width: 575.98px) {
  .landing-hero-blank {
    padding-top: 7rem;
  }
}
</style>
