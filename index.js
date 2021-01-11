const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 3000;
const server = http.Server(app);

const states = require("./data/states.json");
const cities = require("./data/cities.json");

const departments = states.states.filter((s) => s.id_country === 110);

app.use(express.static("client"));

app.get("/", (req, res) => {
  res.send({
    departments: departments.map((s) => {
      return { id: s.id, name: s.name };
    }),
  });
});

app.get("/ciudades", (req, res) => {
  res.send({
    cities: cities.cities
      .filter((c) => !!departments.some((d) => d.id === c.id_state))
      .map((c) => {
        return { id: c.id, department_id: c.id_state, name: c.name };
      }),
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
