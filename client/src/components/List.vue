<template>
  <div class="List">
    <h2>{{listData.title}}</h2>
    <!-- <h4>{{listData.authorId}}</h4> -->
    <task class="card" v-for="t in tasks" :taskData='t' />
    <form class="form" @submit.prevent="createTask" v-if="listData._id">
      <input type="text" class="form-control mr-sm-2" placeholder="Name" v-model="newTask.title" Required>
      <button type="submit">Create Task</button>

    </form>
    <button @click="deleteList">Delete List</button>
  </div>
</template>


<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'List',
    props: ['listData'],
    data() {
      return {
        newTask: {
          title: '',
          listId: this.listData._id,
          boardId: this.listData.boardId
        }
      }
    },
    mounted() {
      this.$store.dispatch('getTasks', this.listData._id)

    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id]
      }
    },
    methods: {
      createTask() {
        this.$store.dispatch('createTask', this.newTask)
        this.newTask = { title: "" };
      },

      deleteList() {
        console.log('deleting list')
        this.$store.dispatch("deleteList", this.listData)

      }
    },

    components: {
      Task
    }
  }
</script>

<style scoped>
  .card {
    background-color: #a15757;
    color: whitesmoke;

  }

  .card h2 {
    color: rgb(9, 255, 0);
  }
</style>