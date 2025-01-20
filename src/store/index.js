import { createStore, createLogger } from 'vuex'
import { nanoid } from 'nanoid'

export default createStore({
  state: () => ({
    bookshelf: [
      {
        id: nanoid(),
        title: 'Eloquent JavaScript: A Modern Introduction to Programming',
        author: 'Marijn Haverbeke',
        year: "2011",
        category: "fantasy",
        isComplete: false,
      },
      {
        id: nanoid(),
        title: 'Fullstack Vue: The Complete Guide to Vue.js and Friends',
        author: 'Ari Lerner and Nate Murray',
        year: "2018",
        category: "classic",
        isComplete: true,
      },
    ],
    search: {
      query: '',
      status: false,
    },
  }),

  // Actions
  actions: {
    addBook: async ({ commit }, data) => await commit('setBook', data),
    removeBook: async ({ commit }, data) => await commit('dropBook', data),
    addSearch: async ({ commit }, data) => await commit('setSearch', data),
  },

  // Mutations
  mutations: {
    setBook: (state, payload) => {
      state.bookshelf.push({
        id: nanoid(),
        title: payload.title,
        author: payload.author,
        year: payload.year,
        category: payload.category,
      })
    },
    update: (state, payload) => {
      const indexOfObj = (callback) => {
        for (let i = 0; i < state.bookshelf.length; i++) {
          if (callback(state.bookshelf[i], i, state.bookshelf)) return i
        }
      }
      let bookIndx = indexOfObj((book) => book.id === payload.id)
      state.bookshelf[bookIndx] = payload

    },
    delete: (state, payload) => {
      state.bookshelf = state.bookshelf.filter(book => book.id != payload);
    },
    setSearch: (state, payload) => {
      state.search = payload
    }
  },

  // Getters
  getters: {
    getBookshelf: (state) => state.bookshelf,
    getBooksByQuery: (state) => {
      return state.bookshelf.filter((el) => el.title.toLowerCase().includes(state.search.query))
    }
  },

})
