import express from "express";
import { prisma } from "./db/prisma";
import { pool } from "./db/pg";

const app = express();
app.use(express.json());

type User = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
};

type Cpf = {
  id: string;
  value: string;
  blocked: boolean;
  createdAt: Date;
};

// Prisma - Get Users
app.get("/cpf", async (_, res) => {
  try {
    const cpfs = await prisma.cpf.findMany();
    console.log(cpfs);
    res.json(cpfs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/cpf", async (req, res) => {
  try {
    const { value } = req.body;
    console.log("THIS VALUE ", value);

    const created = await prisma.cpf.create({
      data: {
        value: value,
        blocked: false,
      },
    });

    console.log("created!!> ", created);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// PG - Get Users
// app.get("/pg/cpf", async (_, res) => {
//   try {
//     console.log("test")
//     const result = await pool.query<Cpf>(`SELECT * FROM "Cpf"`);
//     console.log(result.rowCount);
//     const users: Cpf[] = result.rows;
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// });

const port = process.env.API_PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
