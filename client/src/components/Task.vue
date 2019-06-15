<template>
  <div class="Task">
    <h3>{{taskData.title}}</h3>
    <button type="button" class="btn btn-secondary btn-sm">Move</button>
    <button type="button" class="btn btn-secondary btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false">
      <span class="sr-only">Toggle Dropdown</span>
      </span>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <option class="dropdown-item" v-for="list in lists" :value="list._id" @click="moveTask(list._id)">
          {{list.title}}</option>
      </div>
    </button>

    <!-- <h5>{{taskData.author}}</h5> -->
    <p>{{taskData.description}}</p>
    <div v-for="comment in taskData.comments" :commentData='comment'>
      <p>{{comment.authorId}} : {{comment.content}} <button class="btn-sm" v-if="comment._id"
          @click="deleteComment(comment._id)">Delete</button></p>
    </div>

    <form class="form" @submit.prevent="createComment" v-if="taskData._id">
      <input type="text" class="form-control" placeholder="Comment" v-model="newComment.content" Required>
      <button type="submit">add comment</button>
    </form>
    <button @click="deleteTask">Delete Task</button>
  </div>
</template>


<script>
  export default {
    name: 'Task',
    props: ['taskData'],
    data() {
      return {
        newComment: {
          content: '',
          authorId: this.taskData.authorId
        },
        changeList: {
          _id: this.taskData._id,
          listId: ''
        }
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      createComment() {
        this.taskData.comments.push(this.newComment)
        this.$store.dispatch('updateTask', this.taskData)
      },//createComment
      deleteComment(id) {
        let index = this.taskData.comments.findIndex(comment => {
          return comment._id == id
        })
        this.taskData.comments.splice(index, 1)
        this.$store.dispatch('updateTask', this.taskData)
        console.log('deleting comment')
      }, //deleteComment
      deleteTask() {
        this.$store.dispatch("deleteTask", this.taskData)
        console.log('deleting task')
      }, // deleteTask
      moveTask(newId) {

        this.taskData.oldId = this.taskData.listId
        this.taskData.listId = newId
        this.$store.dispatch("updateTask", this.taskData)
        console.log('do a barrel roll')
      }, //moveTask
    } //methods
  }
</script>



<style scoped>
  .Task {
    background-color: #773535;
    color: whitesmoke;

  }
</style>