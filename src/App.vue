<template>
  <v-app>
    <v-app-bar app color="" dark>
      <NavbarComp />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavbarComp from "./components/NavbarComp.vue";
export default {
  name: "App",
  components: {
    NavbarComp,
  },

  data: () => ({
    //
  }),
};
</script>
