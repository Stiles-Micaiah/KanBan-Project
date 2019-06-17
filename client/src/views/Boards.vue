<template>
  <div class="boards container-fluid">
    <div style="height: auto; margin: 25px; min-width: 300px; max-width: 50%" class="card card-803 "
      v-for="board in boards" :key="board._id">
      <router-link class="title-color card-header" :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}
      </router-link>
      <h6 class="mix-a-lot">Board By:{{board.authorId}}</h6>
      <img :src="board.image" alt="">

      <div class="card-body container w-100">
        <div class="btn-vote inline-block row">
          <button class="btn btn-info rounded-pill" @click="upVoteThis">^</button>
          {{board.upVotes.length}}:{{board.downVotes.length}}
          <button class="btn btn-info rounded-pill" @click="downVoteThis">v</button>
        </div>
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
          image: "",
          name: this.$store.state.activeUser.name
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
        this.newBoard = { title: "", image: "" };
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