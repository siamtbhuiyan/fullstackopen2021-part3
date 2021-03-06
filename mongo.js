const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please enter password')
  process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://Siam:${password}@cluster0.lb5pf.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.person.name} ${person.person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    date: new Date(),
  })

  person.save().then((result) => {
    console.log(`added ${result.name} ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
