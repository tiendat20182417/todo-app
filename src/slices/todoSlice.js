import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todolist: [],
  filterStatus: 'all',
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todolist.push(action.payload)
    },
    deleteTodo: (state, action) => {
      state.todolist = state.todolist.filter(
        (todo) => todo.id !== action.payload
      )
    },
    updateTodo: (state, action) => {
      const index = state.todolist.findIndex(
        (item) => item.id === action.payload.id
      )
      state.todolist[index] = { ...action.payload }
    },
    checkStatusTodo: (state, action) => {
      const index = state.todolist.findIndex(
        (item) => item.id === action.payload.id
      )
      state.todolist[index].status =
        state.todolist[index].status === 'incomplete'
          ? 'complete'
          : 'incomplete'
    },
    updateFilterStatusTodo: (state, action) => {
      state.filterStatus = action.payload
    },
  },
})

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  checkStatusTodo,
  updateFilterStatusTodo,
} = todoSlice.actions
export default todoSlice.reducer
