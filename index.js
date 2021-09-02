const { response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());

morgan.token("data", function (req, res) {
  return JSON.stringify(res.req.body);
});

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.data(req, res),
    ].join(" ");
  })
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  return response.send("Hello");
});

app.get("/api/persons", (request, response) => {
  return response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    return response.json(person);
  } else {
    return response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  return response.status(204).end();
});

const generateRandomId = () => {
  const id = Math.floor(Math.random() * 10000);
  return id;
};

app.post("/api/persons", (request, response) => {
  const data = request.body;
  const person = {
    id: generateRandomId(),
    name: data.name,
    number: data.number,
  };

  if (!data.name || data.name === "") {
    return response.status(400).json({ error: "Enter name" });
  }
  if (!data.number || data.number === "") {
    return response.status(400).json({ error: "Enter number" });
  }

  const same = persons.find((p) => p.name === data.name);

  if (same) {
    return response.status(400).json({ error: "name must be unique" });
  }

  persons = persons.concat(person);

  return response.json(persons);
});
app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `Phonebook has info for ${persons.length} people <br><br> ${date}`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
