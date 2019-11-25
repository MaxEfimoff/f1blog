<template>
  <div>
    <Header />
    <section class="section-center padding">
      <div class="section posts padding">
        <h3>Activate User page</h3>
      </div>
    </section>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  created() {
    this.activateUser()
  },
  methods: {
    activateUser() {
      const hash = this.$route.params.hash;

      this.$store.dispatch('auth/activateUser', hash)
        .then(_ => this.$router.push({ name: 'login' }))
        .catch(error => console.log(error))
    }
  },
  components: {
    Header
  }
}
</script>

<style>

</style>