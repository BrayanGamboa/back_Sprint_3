const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

router.get("/", (req, res) => {
  res.send("<h1>Página principal</h1>");
});

router.get("/marca", (req, res) => {
  mysqlConnection.query(`SELECT * FROM marca;`, (err, rows) => {
    try {
      res.status(200).json(rows);
    } catch {
      res.status(500);
      console.log(err);
    }
  });
});

router.get("/vehiculo", (req, res) => {
  mysqlConnection.query(`SELECT * FROM vehiculo;`, (err, rows) => {
    try {
      res.status(200).json(rows);
    } catch {
      res.status(500);
      console.log(err);
    }
  });
});

router.get("/linea", (req, res) => {
  mysqlConnection.query(`SELECT * FROM linea;`, (err, rows) => {
    try {
      res.status(200).json(rows);
    } catch {
      res.status(500);
      console.log(err);
    }
  });
});

router.get("/marca/:nombre", (req, res) => {
  const { nombre } = req.params;
  mysqlConnection.query(
    `SELECT * FROM marca WHERE nombre = "${nombre}"`,
    (err, rows) => {
      try {
        if (!rows[0]) {
          res.status(204).send("Sin datos");
        } else {
          res.status(200).json(rows[0]);
        }
      } catch {
        res.status(500);
        console.log(err);
      }
    }
  );
});

router.get("/linea/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    `SELECT * FROM linea WHERE id_linea = ${id}`,
    (err, rows) => {
      try {
        if (!rows[0]) {
          res.status(204).send("Sin datos");
        } else {
          res.status(200).json(rows[0]);
        }
      } catch {
        res.status(500);
        console.log(err);
      }
    }
  );
});

router.get("/vehiculo/:placa", (req, res) => {
  const { placa } = req.params;
  mysqlConnection.query(
    `SELECT * FROM vehiculo WHERE num_placa = "${placa}"`,
    (err, rows) => {
      try {
        if (!rows[0]) {
          res.status(204).send("Sin datos");
        } else {
          res.status(200).json(rows[0]);
        }
      } catch {
        res.status(500);
        console.log(err);
      }
    }
  );
});

router.delete("/marca_delete/:nombre", (req, res) => {
  const { nombre } = req.params;

  mysqlConnection.query(
    `DELETE FROM marca WHERE nombre = "${nombre}"`,
    (err) => {
      try {
        res.status(200).send("Borrado");
        console.log("Se han borrado");
      } catch {
        res.status(500);
        console.log(err);
      }
    }
  );
});

router.delete("/linea_delete/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    `DELETE FROM linea WHERE id_linea = ${id}`,
    (err) => {
      try {
        res.status(200).send("Borrado");
        console.log("Se han borrado");
      } catch {
        res.status(500);
        console.log(err);
      }
    }
  );
});

router.delete("/vehiculo_delete/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    `DELETE FROM vehiculo WHERE id_marca = ${id}`,
    (err) => {
      try {
        res.status(200).send("Borrado");
        console.log("Se han borrado");
      } catch {
        res.status(500);
        console.log(err);
      }
    }
  );
});

router.post("/linea_new", (req, res) => {
  const { descripcion, estado, id_marca } = req.body;
  if (!descripcion || !estado || !id_marca) {
    res.status(409).send({ error: "Conflict" });
  } else {
    res.status(200).send("Se envió correctamente");
    mysqlConnection.query(
      `INSERT INTO linea (descripcion, estado, id_marca)VALUES ("${descripcion}","${estado}",${id_marca});`
    );
  }
});

router.post("/marca_new", (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  if (!nombre || !descripcion || !estado) {
    res.status(409).send({ error: "Conflict" });
  } else {
    res.status(200).send("Se envió correctamente");
    mysqlConnection.query(
      `INSERT INTO marca (nombre, descripcion, estado)VALUES ("${nombre}","${descripcion}","${estado}");`
    );
  }
});

router.put("/vehiculo_update/:placa", (req, res) => {
  const { placa } = req.params;
  const { modelo, fch_vence_seg, fch_vence_tecno, linea, url_img } = req.body;
  try {
    res.status(200).send("Se envió correctamente");
    mysqlConnection.query(
      `UPDATE vehiculo SET modelo = "${modelo}", fch_vence_seg = "${fch_vence_seg}", fch_vence_tecno = "${fch_vence_tecno}", linea = ${linea}, url_img = "${url_img}" WHERE num_placa = "${placa}";`
    );
  } catch {
    res.status(204);
  }

});

module.exports = router;