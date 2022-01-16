import express, { Request, Response, NextFunction } from 'express'
import { json } from 'body-parser'

import todoRoutes from './routes/todos'
import { handleError } from './handlers'

const allowedOrigins = ['http://127.0.0.1:4200', 'http://localhost:4200']
const PORT = process.env.PORT || 3000

const app = express()

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, accept-language',
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

app.use(json())

app.use('/todos', todoRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { code, message } = handleError(err.message)
  console.warn(code)
  console.error(message)
  res.status(code).send({ code, message })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
