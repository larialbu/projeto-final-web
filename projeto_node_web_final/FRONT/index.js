var url = "http://localhost:3000/produto";
var urlLogin = "http://localhost:3000/login";
var urlRegistro = "http://localhost:3000/register";

function mostrarProdutos() {
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            var corpo = document.getElementById("teste");
           console.log(response.response)

           for (let index = 0; index < response.response.length; index++) {
            const element = response.response[index].nome_produto + "------------------" + response.response[index].preco + "--------------- " + response.response[index].descricao + "<br>";
            
            corpo.innerHTML += element;
            
           }
            
        });    
}

function login() {
    var mail = document.getElementById('email').value;
    var password =  document.getElementById('senha').value;

    // metodo post login
    const data = {
        email: mail,
        senha: password
    }

    fetch(urlLogin, {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data.response);
            if (data.response == "existe") {
                console.log("user cadastrado");
                window.location.href = "indexProduto.html";
            }else if(data.response == "user não existe"){
                alert("user não existe");

            }else if(data.response == "existe, mas senha incorreta"){
                alert("existe, mas senha incorreta");
            }

    })
    .catch((error) => {
        // console.error('Error:', error);
        console.log('Error:');
        alert("user não cadastrado");
    });
}

function cadastrar() {
    var mail = document.getElementById('email_cad').value;
    var password =  document.getElementById('senha_cad').value;

    const data = {
        email: mail,
        senha: password
    }
    
    fetch(urlRegistro, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success: usuario cadastrado', data);
        window.location.href = "indexProduto.html";
      }).catch((error) => {
        // console.error('Error:', error);
        console.log('Error:');
        alert("user não cadastrado");
    });
}

function cadastrarProduto() {
    var nome = document.getElementById('nome_login').value;
    var valor =  document.getElementById('valor').value;
    var descricao =  document.getElementById('descricao').value;

      //metodo post cadastrar produto
      const data = {
        nome: nome,
        preco: valor,
        descricao:descricao
    }

    fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success: produto cadastrado', data);
        window.location.href = "getProdutos.html";
    })
}