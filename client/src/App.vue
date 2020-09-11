<template>
  <v-app>
    <div class="d-flex justify-center">
      <h1 id="addTodo">Add ToDo</h1>
    </div>
    <div class="d-flex justify-center">
      <form @submit.prevent="createUrl()">
        <label for="url">URL</label>
        <input v-model="url" name="url" id="url" />
        <label for="name">Name</label>
        <input v-model="name" name="name" id="name" />
      </form>
    </div>
    <div class="d-flex justify-center">
      <v-btn @click="createUrl()" color="primary">Add ToDo</v-btn>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    url: "TestTer",
    name: "",
    created: null,
  }),
  mounted(){
    console.log("Mounted")
  },
  methods: {
    async createUrl() {
      console.log(this.url, this.name);
      const response = await fetch("http://localhost:4242/url", {
        method: "POST",
        body: JSON.stringify({
          name: this.name,
          url: this.url
        }),
      });
      this.created = await response.json();
      console.log(this.created)
    },
    addToDo() {
      axios
        .post("http://localhost:4242/url", {
          url: this.newTodo,
        })
        .then((response) => {
          this.message = response.data;
        });
    },
  },
};
</script>
