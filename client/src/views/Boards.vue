<template>
  <div class="boards">

    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>

    <div style="height: auto; margin: 25px; min-width: 320px; max-width: 8%" class="card card-803 "
      v-for="board in boards" :key="board._id">
      <router-link class="title-color card-header" :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}
      </router-link>
      <h6 class="mix-a-lot">Board By:{{board.authorId}}</h6>
      <div class="card-body">
        <p class=" body-color card-text">{{board.description}}</p>
      </div>

      <div class="card-body">
        <!-- <button class="btn btn-info rounded-pill ">You like this</button> -->
        <button @click="deleteBoard(board._id)" class="btn btn-secondary rounded ">Delete</button>
      </div>
      <div style="-webkit-text-fill-color: blueviolet;" class="card-footer text-muted">
        {{board.authorId}} but in Purple
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.activeUser._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      }
    }
  };
</script>



<style scoped>
  .card-803 {
    max-width: 100%;
  }

  .card,
  .card>* {
    background-color: rgba(85, 1, 163, 0.226);
  }

  .mix-a-lot {
    -webkit-text-fill-color: deepskyblue;
  }

  .title-color {
    -webkit-text-fill-color: cyan;
  }

  .body-color {
    -webkit-text-fill-color: turquoise;
  }
</style>