<template>
  <section class="navBlock d-flex justify-center align-center">
    <article class="d-flex align-center">
      <router-link to="/" class="white--text">Home</router-link>
      <router-link to="/create" class="white--text">Create</router-link>
    </article>
  </section>
</template>

<script>
export default {
  name: "NavbarComp",
};
</script>

<style scoped>
.navBlock {
  width: 100%;
}
.navBlock article {
  width: 90%;
  gap: 20px;
}
a {
  text-decoration: none;
}
</style>
