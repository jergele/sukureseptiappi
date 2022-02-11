const mysql = require("mysql");
const express = require("express");

var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
const server = app.listen(3000, () => console.log("Serveri valmiina"));

// yhteys tietokantaan

const conn = mysql.createConnection({
  host: "localhost",
  user: "jere",
  password: "kt123456",
  database: "sukureseptitietokanta",
  multipleStatements: true,
});

conn.connect((err) => {
  if (err) {
    console.log("Virhe yhdistäessä tietokantaan");
    return;
  }
  console.log("Yhteys muodostettu tietokantaan");
});

// lisätään Cors, mahdollista alkuun kaikille pyynnöille.

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-type", "application/json");
  // Pass to next layer of middleware

  next();
});

// kaikkien reseptien haku, tieto harmillisesti ID:einä mutta muokkaan myöhemmin

app.get("/resepti", (req, res) => {
  conn.query("SELECT * FROM resepti", (err, rows) => {
    if (err) throw err;
    return res.status(200).json(rows);
  });
});

app.get("/resepti/:id", (req, res) => {
  const id = Number(req.params.id);
  //const id = req.params.id;
  conn.query("SELECT * FROM resepti WHERE ReseptiID=?", id, (err, rows) => {
    if (err) throw err;
    res.end(JSON.stringify(rows[0]));
  });
});

// Reseptin raaka-aine sisältö erikseen

app.get("/resepti/:id/sisalto", (req, res) => {
  const id = Number(req.params.id);
  //const id = req.params.id;
  conn.query(
    "SELECT r.ReseptiID,r.Reseptinimi, r.Kuvailu, r.Valmistusaika, ra.Raakaainenimi,rra.Maara, rra.Mitta, o.Sisalto FROM resepti r, raakaaine ra, ohje o, reseptin_raakaaine rra WHERE r.ReseptiID = rra.ReseptiID AND rra.RaakaaineID = ra.RaakaaineID AND r.ReseptiID = o.ReseptiID AND r.ReseptiID = ?",
    id,
    (err, rows) => {
      if (err) throw err;
      res.end(JSON.stringify(rows));
    }
  );
});

// Reseptin ohje erikseen

app.get("/resepti/:id/ohje", (req, res) => {
  const id = Number(req.params.id);
  //const id = req.params.id;
  conn.query(
    "SELECT Sisalto FROM Ohje WHERE ReseptiID = ?",
    id,
    (err, rows) => {
      if (err) throw err;
      res.end(JSON.stringify(rows));
    }
  );
});

// Reseptin lisääminen

app.post("/lisaaresepti", (req, res) => {
  let resepti = req.body;
  console.log(resepti);

  if (!resepti) {
    return res
      .status(400)
      .send({ error: true, message: "Reseptiä ei muodostunut" });
  }
  conn.query(
    "INSERT INTO Resepti SET ? ",
    resepti,
    function (error, results, fields) {
      if (error) throw error;
      // antaa resulttina
      return res.send(JSON.stringify({ id: results.instertId, ...resepti }));
    }
  );
});

// Reseptin muokkaus

app.put("/resepti/:id", (req, res) => {
  const id = Number(req.params.id);
  //const id = req.params.id;
  const updatedUser = req.body;
  conn.query(
    "UPDATE Resepti SET ? WHERE ReseptiID = ?;",
    [updatedUser, req.params.id],
    function (error, results) {
      if (error) throw error;
      conn.query("SELECT * FROM Resepti WHERE ReseptiID=?", id, (err, rows) => {
        if (err) throw err;

        res.end(JSON.stringify(rows[0]));
      });
    }
  );
});

// poista resepti

app.delete("/resepti/:id", (req, res) => {
  console.log("Poistettu id:");
  const id = Number(req.params.id);
  console.log(id);
  conn.query(
    "DELETE FROM Resepti Where ReseptiID = ?",
    [req.params.id],
    function (error, results) {
      if (error) throw error;
      return;
    }
  );
});

module.exports = app;
