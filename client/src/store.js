import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    boards: [],
    lists: [],
    tasks: {},
    activeUser: {},
    activeList: [],
    activeTask: [],
    activeBoard: {}
  },

  mutations: {
    setUser(state, activeUser) {
      state.activeUser = activeUser
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, data) {
      state.lists = data
    },
    setTasks(state, data) {
      //state.tasks[data.listId] = data.tasks   <--- this wont work reactively
      Vue.set(state.tasks, data.listId, data.tasks)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
          console.log('register res', res)
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
          console.log('auth', res)
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    logOut({ commit, dispatch }) {
      auth.delete('/logout')
        .then(res => {
          router.push({ name: 'login' })
          console.log('logout res', res)
          location.reload(true)
        }).catch(err => {
          console.error(err)
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
          console.log('login res', res)
        })
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
          console.log('getBoards', res)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    async createList({ commit, dispatch }, payload) {
      let res = await api.post('lists', payload)
      dispatch('getLists', payload.boardId)
      // commit('setTasks', res.data) do we need this
      console.log('createList', res.data)
    }, //createList
    //#endregion --Boards

    //#region -- Lists
    async getLists({ commit, dispatch }, payload) {
      let res = await api.get('boards/' + payload + '/lists')
      console.log('got Lists', res.data)
      commit('setLists', res.data)
    },
    async createTask({ commit, dispatch }, payload) {
      let res = await api.post('tasks', payload)
      dispatch('getTasks', payload.listId)
      console.log(' new Comment', res.data)
    },
    async deleteList({ commit, dispatch }, payload) {
      try {
        let res = await api.delete('lists/' + payload._id)
        console.log(payload.listId)
        dispatch('getLists', payload.boardId)
      } catch (error) {
        console.error(error)
      }
    }, //deleteList
    //endregion --Lists
    //#region -- TASKS
    async getTasks({ commit, dispatch }, listId) { //listId will need to be a listId
      let res = await api.get('lists/' + listId + '/tasks')
      commit('setTasks', {
        listId: listId,
        tasks: res.data
      })
    }, //getTasks
    async deleteTask({ commit, dispatch }, payload) {
      try {
        let res = await api.delete('tasks/' + payload._id)
        dispatch('getTasks', payload.listId)
      } catch (error) {
        console.error(error)
      }
    }, //deleteTask
    async updateTask({ commit, dispatch }, payload) {
      let res = await api.put('tasks/' + payload._id, payload)
      dispatch('getTasks', payload.listId)
      dispatch('getTasks', payload.oldId)

      console.log('New Comment', res.data)
    }, //createComment
    async deleteComment({ commit, dispatch }, payload) {
      // let res = await api.put('tasks/' + payload._id, payload)
      dispatch('getTasks', payload.listId)
      console.log('Goodbye Comment')
    }, //deleteComment

    //#enfregion -- Tasks
  }
})
