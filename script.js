// clase usuario
class Usuario {
  // propiedades
  nombre
  dinero
  millonario = false

  constructor(){
      this.dinero = (Math.random() * 1000000).toFixed(2);

      if(this.dinero >= 1000000){
          this.millonario = true 
      }
  }
// Obtiene de la API un nombre aleatorio,
// genera una cantidad de dinero aleatoria cuyo máximo es 1.000.000
// y añade al usuario con ambos datos
 async obtenerNombre(){
      let res = await fetch('https://randomuser.me/api');
      let data = await res.json();
      this.nombre =  `${data.results[0].name.first} ${data.results[0].name.last}`;
  }
}

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Vector para almacenar los usuarios
let userList = [];

// TODO: Función que añade un nuevo usuario (objeto) al listado de usuarios (array)
function addData(newUser) {
  
  userList.push(newUser)

}

// Función que formatea un número a dinero
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

async function getRandomUser() {
  // TODO: Crea un objeto usuario (newUser) que tenga como atributos: name y money
  let usuarioNuevo = new Usuario
  await usuarioNuevo.obtenerNombre()
  addData(usuarioNuevo);

  imprimirUsuarios();
}

// Mapeamos la lista de usuarios y los pintamos en el contenedor
function imprimirUsuarios(){
  let htmlLista = ""
    for(let user of userList){
        htmlLista += `<div class='person'><strong>${user.nombre}</strong> ${user.dinero}€ </div>`
    }
  document.querySelector("#contenedorUsuarios").innerHTML = htmlLista
}

function doblarDinero(){
  for(let user of userList){
      user.dinero = user.dinero * 2

      if(user.dinero >= 1000000){
          user.millonario = true 
      }
  }
}

function mostrarMillonarios(){
  userList = userList.filter(function(usuario){
      if (usuario.millonario == true){
          return usuario;
      }
  })
}

function ordenarDesc(){
  userList.sort((a, b) => b.dinero - a.dinero);
}

function totalDinero(){
    const total = userList.reduce((accumulator, user) => accumulator + parseFloat(user.dinero), 0);
    return total.toFixed(2);
}

// Obtenemos un usuario al iniciar la app
getRandomUser();


// TODO: Event listeners
// evento añadir usuario
addUserBtn.addEventListener("click", function(){
  getRandomUser();
})

doubleBtn.addEventListener("click", function(){
  doblarDinero();
  imprimirUsuarios();
})

showMillionairesBtn.addEventListener("click", function(){
  mostrarMillonarios();
  imprimirUsuarios();
})

sortBtn.addEventListener("click", function(){
  ordenarDesc();
  imprimirUsuarios();
})

calculateWealthBtn.addEventListener("click", function(){
  imprimirUsuarios();
  let total = totalDinero()
  let totalWealthElement = `<div class='person'><strong>Total</strong> ${total}€</div>`;
  document.querySelector("#totalMoney").innerHTML = totalWealthElement;
})
