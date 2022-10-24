const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


//configura as variaveis de ambiente
dotenv.config();
const mongoPass = process.env.MONGO_PASS;

//importa o model user
require("./models/User");
const User = mongoose.model("User");

const app = express();
app.use(express.json());


//midleware cors
// MODIFICAR QUEM PODE FAZER REQUISIÇAO ANTES DE LANÇAR
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    app.use(cors());
    next();
});

const port = process.env.PORT || 3000;

//configuraçao do mongoose  com variavel de ambiente ${mongoPass}
mongoose
  .connect(`mongodb+srv://felipr:${mongoPass}@pokemodoro.0vmodpf.mongodb.net/?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`Conectado com sucesso ao MongoDB`);
  })
  .catch((err) => {
    console.log("Nao foi possivel se conectar ao MongoDB.");
  });

  //get home
app.get("/", (req, res) => {
  return res.json({ titulo: "BEM VINDO A POKEMODORO API" });
});


//USER
//create user
app.post("/user", (req, res) => {
  const user = User.create(req.body, (err) => {
    if (err)
      return res.status(400).json({
        error: true,
        message: "Erro ao criar usuario",
      });
    return res.status(200).json({
      error: false,
      message: "Usuario criado com sucesso",
    });
  });
});

//get user
app.get("/user", (req, res) => {
  User.find({})
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      return res.status(400).json({
        error: true,
        message: "Erro ao retornar users",
      });
    });
});

//get user utilizando o nome como filtro
app.get("/user/:name", (req, res) => {
  console.log(req.params.name);

  User.findOne({ name: req.params.name })
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      return res.status(400).json({
        error: true,
        message: "Nao foi possivel encontrar um usuario com esse nome",
      });
    });
});

//get user utilizando userId como filtro
app.get("/userId/:_id", (req, res) => {
    console.log(req.params._id);
  
    User.findOne({ _id: req.params._id })
      .then((userId) => {
        return res.json(userId);
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          message: "Nao foi possivel encontrar um usuario com esse userId",
        });
      });
  });

  //UPDATE POKEMON
  app.put("/updatePokemons/:_id", (req, res) => {
    User.findOneAndUpdate( {_id: req.params._id}, {pokemons: req.body.pokemons}, {new: true} )
  .then((updatePokemons)=> {
    return res.json(updatePokemons);
  })
  .catch((err)=> {
    return res.status(400).json({
      error: true,
      message: "Nao foi possivel fazer o update dos pokemons",

  });
});
});


app.listen(port, () => {
    console.log(
      `Listening on port ${port}, on localhost http://localhost:${port}`
    );
  });