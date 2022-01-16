import { RequestHandler } from 'express'
import { Todo } from './../models'

const _TODOS: Todo[] = [
  {
    id: 1,
    text: 'First TODO',
  },
  {
    id: 2,
    text: 'Second TODO',
  },
  {
    id: 3,
    text: 'Third TODO',
  },
  {
    id: 4,
    text: 'Fourth TODO',
  },
  {
    id: 5,
    text: 'Fifth TODO',
  },
]
let _INDEX = 3

export const createTodo: RequestHandler = (req, res) => {
  const text = (req.body as { text: string }).text

  if (!text) {
    // res.status(400).send({ error: 'Bad request: missing todo text' })
    // return
    throw new Error('Bad request: missing todo text')
  }

  const newTodo: Todo = {
    id: _INDEX,
    text,
  }
  _TODOS.push(newTodo)
  _INDEX++
  res.status(201).send(newTodo)
}

export const getTodos: RequestHandler = (_, res) => res.status(200).send(_TODOS)

export const getTodoById: RequestHandler<{ id: string }> = (req, res) => {
  const id = +req.params.id

  if (!id || isNaN(id)) {
    throw new Error('400: Bad Request - invalid ID')
  } else if (id < 3) {
    throw new Error(
      '401: Unauthorized Request - missing necessary security clearance',
    )
  }

  const index = _TODOS.findIndex(todo => todo.id === id)

  if (index < 0) {
    throw new Error(`404: No TODO found with id ${id}`)
  }

  res.status(200).send(_TODOS[index])
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res) => {
  const id = +req.params.id
  const text = (req.body as { text: string }).text

  if (!id || isNaN(id)) {
    throw new Error('Bad request: missing or invalid todo id')
  }

  if (!text) {
    throw new Error('Bad request: missing todo text')
  }

  const todo = _TODOS.find((todo: Todo) => todo.id === id)
  if (!todo) {
    throw new Error(`Bad request: no todo found with id ${id}`)
  }

  todo.text = text

  res.status(200).send(todo)
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
  const id = +req.params.id

  if (!id || isNaN(id)) {
    throw new Error('Bad request: missing or invalid todo id')
  }

  const todoIndex = _TODOS.findIndex((todo: Todo) => todo.id === id)
  if (todoIndex < 0) {
    throw new Error(`Bad request: no todo found with id ${id}`)
  }

  _TODOS.splice(todoIndex, 1)

  res.status(200).send()
}
