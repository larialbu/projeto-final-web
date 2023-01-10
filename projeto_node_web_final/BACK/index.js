// endpois - apis
const express = require('express');
const app = express();
const port = 3000;

//cors
const cors = require('cors');

app.use(cors({
  origin: '*',
  methods: "*"
}));

// banco de dados
const db = require('./_database');

//pegar corpo da requisição
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })



db.connect();

// app.get('/', function (req, res) {
//     res.send(db.query('\dt'));
// });

app.post('/login', jsonParser, function (req, res) {
  // console.log(req.body.email);
    query = `select * from users where email = '${req.body.email}'`;
    
    db.query(query, (err, retorno)=>{
      console.log(retorno.rows[0] == undefined);
      if (!err) {
        if (retorno.rows[0] == undefined) {
          var data = {
            response: "user não existe"
          };
          res.send(data);

        }else {
          if (retorno.rows[0].senha == req.body.senha ) {
            var data = {
              response: "existe"
            };
            res.send(data);
          }else{
            var data = {
              response: "existe, mas senha incorreta"
            };
            res.send(data);
          }
        }
      }

    });
});

app.post('/register', jsonParser, function (req, res) {
  var queryCadastrarUser = "INSERT INTO users(email, senha) VALUES ($1, $2)"

  function cadastrarUser(query) {
    // db.connect();
    db.query(query, [req.body.email, req.body.senha]);
    
    var data= {
      response: "usuario cadastrado"
    };
    res.send(data);

    // db.end();
  }

  cadastrarUser(queryCadastrarUser);

});

app.route('/produto')
  .get(jsonParser, (req, res) => {
  function pegarValores() {
    // db.connect();
    db.query('Select * from produtos', (err, retorno)=>{
      if (!err) {
        var data = {
          response: retorno.rows
        };
        res.send(data);
        // db.end();

      } else {
        res.send(err.message);
        // db.end();

      }
    });
    
  }

  pegarValores();
    
  })
  .post(jsonParser, (req, res) => {
    var queryInsertValues = "INSERT INTO produtos(nome_produto, preco, descricao) VALUES ($1, $2, $3)"

    function inserirValores(query) {
      // db.connect();
      db.query(query, [req.body.nome, req.body.preco, req.body.descricao]);
      // db.end();
    }

    inserirValores(queryInsertValues);

    res.send(req.body);
    

  })
  .put((req, res) => {
    res.send('Update the book')
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


