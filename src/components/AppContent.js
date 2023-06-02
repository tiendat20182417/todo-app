import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'
import style from '../styles/modules/app.module.scss'

const AppContent = () => {
  const dataFilterStatus = useSelector((state) => state.todo.filterStatus)
  const todolist = useSelector((state) => state.todo.todolist)

  useEffect(() => {
    console.log(dataFilterStatus)
  }, [dataFilterStatus])

  const todoListCp = [...todolist]
  const todoListCpSort = todoListCp.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  )

  const todoListMain = todoListCpSort.filter((item) => {
    if (dataFilterStatus === 'all') {
      return true
    }
    return item.status === dataFilterStatus
  })

  return (
    <div className={style.container}>
      {todoListMain && todoListMain.length > 0 ? (
        todoListMain.map((todo) => <TodoItem todo={todo} key={todo.id} />)
      ) : (
        <div className={style.container__content}>
          <p className={style.content}>No Todos</p>
        </div>
      )}
    </div>
  )
}

export default AppContent
