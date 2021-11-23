//import {autos} from "./autos.js";
import { Anuncio_Auto } from "./anuncio.js";
import {crearTabla} from "./dinamicas.js";

const $divTabla = document.getElementById("tabla");
const url = "http://localhost:3000/anuncios";
getAnunciosAjax();


//asigno el evento change a los checkbox para que pueda actualizar la tabla cada vez que se modifican
const checkbox = document.querySelectorAll(".traerDatos");

checkbox.forEach((check) => {
                
    check.addEventListener("change", getAnunciosAjax);

});

window.addEventListener("click", (e)=>{

    if(e.target.matches("td")){

        console.log(e.target.parentElement.dataset.id);
        let id = e.target.parentElement.dataset.id;
        getAnuncioAjax(id);
    }else if(e.target.matches("#btnDelete")){
        handlerDelete(parseInt($formulario.txtId.value));
        $formulario.txtId.value = "";
        const $btnEliminar = document.getElementById("btnDelete").classList.add("oculto");
        $formulario.reset();
    }
});

function cargarFormulario(auto){
    console.log($formulario);
    const {txtId, titulo, transaccion, descripcion, precio, puertas, kms, potencia} = $formulario;
    
    txtId.value = auto.id;
    titulo.value = auto.titulo;
    transaccion.value = auto.transaccion;
    descripcion.value = auto.descripcion;
    precio.value = auto.precio;
    puertas.value = auto.puertas;
    kms.value = auto.km;
    potencia.value = auto.potencia;

    const $submit = document.getElementsByClassName("submit")[0];
    $submit.value = "Modificar";
    const $btnEliminar = document.getElementById("btnDelete").classList.remove("oculto");

}

const $formulario = document.forms[0];

$formulario.addEventListener("submit", (e)=>{

    e.preventDefault();
    console.log("Enviando...");

    const {txtId, titulo, transaccion, descripcion, precio, puertas, kms, potencia} = $formulario;

    const formAuto = new Anuncio_Auto(txtId.value, titulo.value, transaccion.value, descripcion.value, precio.value, puertas.value, kms.value, potencia.value);

    if(formAuto.id === ''){
        //alta
        formAuto.id = Date.now();
        handlerCreate(formAuto);

    } else {

        //modificacion
        handlerUpdate(formAuto);
        const $btnEliminar = document.getElementById("btnDelete").classList.add("oculto");
        $formulario.txtId.value = "";
    }


    $formulario.reset();
});

const createAnuncioFetch = (nuevoAuto) => {

    const options = {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(nuevoAuto)
    }
    agregarSpinner();
    fetch(url, options)
    .then((res)=>res.ok ? res.json() : Promise.reject(`Error: ${res.status} : ${res.statusText}`))
    .then((data)=>{

        console.log(`${data.id}, ${data.nombre}, ${data.apellido}`);
    })
    .catch((err)=>{
        console.error(err);
    })
    .finally(()=>{
        eliminarSpinner();
    });

};

const handlerCreate = (nuevoAuto)=>{

    createAnuncioFetch(nuevoAuto);
};

const updateAnuncioFetch = (autoEditado) => {

    const options = {
        method:"PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(autoEditado)
    }
    agregarSpinner();
    fetch(url + "/" + autoEditado.id, options)
    .then((res)=>res.ok ? res.json() : Promise.reject(`Error: ${res.status} : ${res.statusText}`))
    .then((data)=>{

        console.log(data);
    })
    .catch((err)=>{
        console.error(err);
    })
    .finally(()=>{
        eliminarSpinner();
    });

};

const handlerUpdate = (autoEditado)=>{

    updateAnuncioFetch(autoEditado);

    const $submit = document.getElementsByClassName("submit")[0];
    $submit.value = "Guardar";

};

const deleteAnuncioFetch = (id) => {

    const options = {
        method:"DELETE"
    }
    agregarSpinner();
    fetch(url + "/" + id, options)
    .then((res)=>res.ok ? res.json() : Promise.reject(`Error: ${res.status} : ${res.statusText}`))
    .then((data)=>{

        console.log(data);
    })
    .catch((err)=>{
        console.error(err);
    })
    .finally(()=>{
        eliminarSpinner();
    });

};

const handlerDelete = (id)=>{

    deleteAnuncioFetch(id);
    //getAnunciosAjax();
    const $submit = document.getElementsByClassName("submit")[0];
    $submit.value = "Guardar";
};

function actualizarTabla(data){

    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstChild);
    }

    if(data){
        $divTabla.appendChild(crearTabla(data));
    }
    
};


// No tocar


function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./assets/1493.gif");
    spinner.setAttribute("alt","Imagen spinner");
    document.getElementById("spinner-container").appendChild(spinner);
}

// No tocar

function eliminarSpinner(){


    const $spinnerContainer = document.getElementById("spinner-container");

    while($spinnerContainer.hasChildNodes()){
        $spinnerContainer.removeChild($spinnerContainer.firstElementChild);
    }
}

function getAnuncioAjax(id){



    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", ()=>{


        if(xhr.readyState == 4){

            if(xhr.status >=200 && xhr.status < 300){

                const data = JSON.parse(xhr.responseText);
                cargarFormulario(data);

            } else {
                
                console.error(`Error: ${xhr.status} : ${xhr.statusText}`);
            }

            eliminarSpinner();

        } else {

            agregarSpinner();
        }

    });

    xhr.open("GET", url + "/" + id);
    xhr.send();

};

function getAnunciosAjax(){



    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", ()=>{

        if(xhr.readyState == 4){

            if(xhr.status >=200 && xhr.status < 300){

                const data = JSON.parse(xhr.responseText);

                const checkbox = document.querySelectorAll(".traerDatos");

                data.map((elemento)=>{

                    checkbox.forEach(check => {
                        if(check.checked == false){
                            delete elemento[check.value];
                        }
                    });

                    return elemento;
                })

                console.log(data);
                actualizarTabla(data);

            } else {
                
                console.error(`Error: ${xhr.status} : ${xhr.statusText}`);
            }

            eliminarSpinner();

        } else {

            agregarSpinner();
        }
    });

    xhr.open("GET", url);
    xhr.send();
};

// filtrar anuncios para calcular promedio 

const select = document.getElementById("selectFiltros");
const filtroPrecio = document.getElementById("filtroPrecio");

select.addEventListener('change', () => {
    
    
    console.log(select.value);

    agregarSpinner();
    fetch(url)
    .then((res)=>res.ok ? res.json() : Promise.reject(`Error: ${res.status} : ${res.statusText}`))
    .then((data)=>{

        if(select.value != 'N/A'){
            const anuncios = filtrarAnuncios(data, select.value);
            console.log(anuncios);
            const prom = calcularPromedio(anuncios);
            console.log(prom);
            filtroPrecio.value = parseFloat(prom);
        }else{
            filtroPrecio.value = 'N/A';
        }
        
    })
    .catch((err)=>{
        console.error(err);
    })
    .finally(()=>{
        eliminarSpinner();
    });
});

function filtrarAnuncios(data, seleccion){

    return data.filter(elemento => elemento.transaccion == seleccion);
}

function calcularPromedio(anuncios){
  
    let suma = anuncios.reduce((anterior, actual)=>{
        let add = anterior + parseFloat(actual.precio);
        console.log(add);
        return add;
    }, 0);

    return Math.round(suma / anuncios.length);
    
    }
