<template>
  <div class="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <router-link class="navbar-brand" to="/">Life Organiser</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/boards">Boards <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link style="color: #e500fa;" class="nav-link" to="/about">Micaiah</router-link>
          </li>
          <li class="nav-item">
            <router-link style="color: #0026ff;" class="nav-link" to="/about">David</router-link>
          </li>
          <li class="nav-item">
            <router-link style="color: #15ff00;" class="nav-link" to="/about">Daniel</router-link>
          </li>
          <li class="nav-item">
            <router-link style="color: #ff0000;" class="nav-link" to="/about">Benjamin</router-link>
          </li>
          <li class="nav-item">
            <router-link style="color: #fffb00;" class="nav-link" to="/about">Michael</router-link>
          </li>
        </ul>
        <button v-if="this.$store.state.activeUser.name"
          class="fancy-pancy-create-button btn btn-sm btn-secondary nav-item dropdown">
          <a style="width: 100%; height: 100%;" class="nav-link dropdown-toggle" data-toggle="dropdown" href="#"
            role="button" aria-haspopup="true" aria-expanded="false">Create New</a>
          <form @submit.prevent="addBoard" class="dropdown-menu" x-placement="bottom-start"
            style="position: absolute; transform: translate3d(0px, 45px, 0px); top: 0px; left: 0px; will-change: transform;">
            <input class="form-control mr-sm-2" style="margin-bottom: 5px;" type="text" placeholder="title"
              v-model="newBoard.title" required>
            <input class="form-control mr-sm-2" style="margin-bottom: 5px;" type="text" placeholder="description"
              v-model="newBoard.description">
            <div class="dropdown-divider"></div>
            <button style="width: 100%" class="btn btn-secondary my-2 my-sm-0" type="submit">Create</button>
          </form>
        </button>
        <button class="btn btn-sm btn-secondary rounded" @click="logOut()">LogOut</button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
  import router from '@/router.js'
  export default {
    name: "App",

    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        },
        newBoard: {
          title: '',
          content: '' || 'No Description',
          creator: '', //make user
        }
      }
    },
    computed: {
      user() {
        this.$store.state.activeUser.name
      }
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      },
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      logOut() {
        this.$store.dispatch("logOut")
      }
    },
  };
</script>

<style>
  .fancy-pancy-create-button {
    color: rgba(255, 0, 221, 0.541)
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  a {
    color: #42b983;
  }

  #bg-image-whole-pg {
    background: none;
  }

  html {
    background-image: url('../Assets/Abstract-Flower-Backgrounds.jpg');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-attachment: fixed;
  }
</style>