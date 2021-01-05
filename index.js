const cardContainer = document.getElementById("cardContainer");
const listContainer = document.getElementById("listContainer");
const totalContainer = document.getElementById("totalContainer");
const carrito = document.getElementById("numerito");
const butonSubmit = document.getElementById('buton-submit');
let cantidadCarrito = 0;
const arrayListadeCompras = [];

const pokemones = [
  {
    nombre: "pepe",
    id: 1,
    precio: 50,
    stock: 4,
    restarStock: function () {
      this.stock--;
    },
    sumarStock: function () {
      this.stock++;
    }
  },
  {
    nombre: "juan",
    id: 2,
    precio: 60,
    stock: 5,
    restarStock: function () {
      this.stock--;
    },
    sumarStock: function () {
      this.stock++;
    }
  },
  {
    nombre: "ricardo",
    id: 3,
    precio: 70,
    stock: 7,
    restarStock: function () {
      this.stock--;
    },
    sumarStock: function () {
      this.stock++;
    }
  },
  {
    nombre: "patricio",
    id: 4,
    precio: 30,
    stock: 10,
    restarStock: function () {
      this.stock--;
    },
    sumarStock: function () {
      this.stock++;
    }
  },
  {
    nombre: "carlos",
    id: 5,
    precio: 10,
    stock: 8,
    restarStock: function () {
      this.stock--;
    },
    sumarStock: function () {
      this.stock++;
    }
  },
  {
    nombre: "joan",
    id: 6,
    precio: 45,
    stock: 2,
    restarStock: function () {
      this.stock--;
    },
    sumarStock: function () {
      this.stock++;
    }
  },
];

// funcion para cuando compras se resta el stock
function restarStockenObjeto(e) {
  if (e.target.id === "deleteProductButton") {
    const elementoABuscar = e.target.parentNode.attributes.key.value;
    const resultado = pokemones.find((item) => item.id == elementoABuscar);

    let cantidadDeStock = resultado.stock;
    verificarStock(cantidadDeStock, resultado);
  }
}

// funcion verificar si hay stock
function verificarStock(params, params2) {
  if (params <= 0) {
    return;
  } else {
    params2.restarStock();
    showList(pokemones);
    cantidadCarrito++;
    carrito.innerHTML = `<p>${cantidadCarrito}</p>`;
    listaDeCompras(params2);
  }
}

// funcion se agrega a lista de compras y se suma el total;
function listaDeCompras(params) {
  arrayListadeCompras.push(params);
  listContainer.innerHTML = `<table class="table table-light">
  <thead>
    <tr class="tr-1">
      <th scope="col">Img</th>
      <th scope="col">Nombre</th>
      <th scope="col">Precio</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>${arrayListadeCompras
    .map(
      (
        item
      ) => `<tr><th scope="row" ><div class="img-tabla-1">  <img src="https://pokeres.bastionbot.org/images/pokemon/${
        item.id
      }.png" alt=""></div></th>
  <td>${item.nombre.toUpperCase()}</td>
  <td>$${item.precio}</td>
  <td key="${
    item.id
  }"><span class="icon-cancel-circle"  id='deleteProductLista'></span></td>
  </tr>`
    )
    .join(" ")} 
  </tbody>
</table>`;
  totalContainer.innerHTML = `<table class="table table-light">
<thead>
  <tr class="tr-1">
    <th scope="col"></th>
    <th scope="col">Total</th>
    <th scope="col">$${arrayListadeCompras[0].precio}</th>
    <th scope="col"></th>
  </tr>
</thead>

</table>`;

  if (arrayListadeCompras.length > 1) {
    const arrayNuevoSuma = arrayListadeCompras.map((item) => item["precio"]);
    const sumaTotal = arrayNuevoSuma.reduce((acu, item) => acu + item);

    totalContainer.innerHTML = `<table class="table table-light">
<thead>
  <tr class="tr-1">
    <th scope="col"></th>
    <th scope="col">Total</th>
    <th scope="col">$${sumaTotal}</th>
    <th scope="col"></th>
   
  </tr>

</thead>

</table>`;
  }
}

// funcion mostrar pokemones para comprar
function showList(array) {
  return (cardContainer.innerHTML = `<ul class='ul-1'> ${array
    .map(
      (item) => `<li >
  <div class="card" key=${
    item.id
  }><p class="titulo">${item.nombre.toUpperCase()} $${item.precio} 
  stock: ${item.stock <= 0 ? "no hay" : item.stock}</p>
  <img class="imagen" src="https://pokeres.bastionbot.org/images/pokemon/${
    item.id
  }.png">
  <button id='deleteProductButton'>Agregar</button></div></li>`
    )
    .join(" ")}</ul>`);
}

// funcion borrar pokemones de la lista
function borrarPokeLista(e) {
  if (e.target.id === "deleteProductLista") {
    cantidadCarrito--;
    carrito.innerHTML = `<p>${cantidadCarrito}</p>`;
    const elementoABuscar = e.target.parentNode.attributes.key.value;
    

    const resultado = arrayListadeCompras.find(
      (item) => item.id == elementoABuscar
    );
    resultado.sumarStock();
    showList(pokemones)

    const indexAEliminar = arrayListadeCompras.indexOf(resultado);

    arrayListadeCompras.splice(indexAEliminar, 1);
   

    listContainer.innerHTML = `<table class="table table-light">
  <thead>
    <tr class="tr-1">
      <th scope="col">Img</th>
      <th scope="col">Nombre</th>
      <th scope="col">Precio</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>${arrayListadeCompras
    .map(
      (
        item
      ) => `<tr><th scope="row" ><div class="img-tabla-1">  <img src="https://pokeres.bastionbot.org/images/pokemon/${
        item.id
      }.png" alt=""></div></th>
  <td>${item.nombre.toUpperCase()}</td>
  <td>$${item.precio}</td>
  <td key="${
    item.id
  }"><span class="icon-cancel-circle"  id='deleteProductLista'></span></td>
  </tr>`
    )
    .join(" ")} 
  </tbody>
</table>`;

    totalContainer.innerHTML = `<table class="table table-light">
<thead>
  <tr class="tr-1">
    <th scope="col"></th>
    <th scope="col">Total</th>
    <th scope="col">$${arrayListadeCompras.length === 1 ? arrayListadeCompras[0].precio : ''}</th>
    <th scope="col"></th>
  </tr>
</thead>

</table>`;

 if (arrayListadeCompras.length > 1) {
      const arrayNuevoSuma = arrayListadeCompras.map((item) => item["precio"]);
      const sumaTotal = arrayNuevoSuma.reduce((acu, item) => acu + item);

     return totalContainer.innerHTML = `<table class="table table-light">
<thead>
  <tr class="tr-1">
    <th scope="col"></th>
    <th scope="col">Total</th>
    <th scope="col">$${sumaTotal}</th>
    <th scope="col"></th>
  </tr>
</thead>

</table>`;
    }
  }

  
}

// Eventos

showList(pokemones);
document.addEventListener("click", restarStockenObjeto);
document.addEventListener("click", borrarPokeLista);
butonSubmit.addEventListener('click', ()=> arrayListadeCompras.length === 0 ? alert('Debes comprar aunque sea uno') : location.reload());



