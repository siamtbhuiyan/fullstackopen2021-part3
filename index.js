const Person = require('./models/person.js')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (request, response) => {
  return response.send('Hello')
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.json(people)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((people) => {
      response.json(people)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response) => {
  const date = new Date()

  Person.countDocuments({}, (error, count) => {
    response.send(
      `Phonebook has info for ${count} people <br> <br> <br> ${date}`
    )
  })
})

morgan.token('data', function (req, res) {
  return JSON.stringify(res.req.body)
})

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.data(req, res),
    ].join(' ')
  })
)

app.post('/api/persons', (request, response, next) => {
  const data = request.body

  if (!data.name || data.name === '') {
    return response.status(400).json({ error: 'Enter name' })
  }
  if (!data.number || data.number === '') {
    return response.status(400).json({ error: 'Enter number' })
  }

  const person = new Person({
    name: data.name,
    number: data.number,
    date: new Date(),
  })
  const test = JSON.stringify(person)
  console.log(test)

  person
    .save()
    .then((result) => {
      response.send(result)
    })
    .catch((error) => next(error))
})

const unKnownEndPoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unKnownEndPoint)

const errorHanler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHanler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
