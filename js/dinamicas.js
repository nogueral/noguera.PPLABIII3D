
export const crearTabla = (data)=>{

    const checkbox = document.querySelectorAll(".traerDatos");
    //console.log(checkbox);
    
    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    tabla.classList.add("table");
    tabla.classList.add("table-bordered");
    tabla.classList.add("table-striped");
    tabla.classList.add("table-dark");
    tabla.classList.add("table-hover");

    const cabecera = document.createElement("tr");
    //cargo el thead
    for (const key in data[0]) {

        if(key !== "id"){
            const th = document.createElement("th");
            //metodo
            const contenido = document.createTextNode(key);

            th.appendChild(contenido);


            cabecera.appendChild(th);

        }

    }

    thead.appendChild(cabecera);
    tabla.appendChild(thead);

    //cargo el tbody
    data.forEach((element) => {
        const tr = document.createElement("tr");

        for (const key in element) {
            

            if(key === "id"){
                tr.setAttribute("data-id", element[key]);
            }else{
                //propiedad
                const td = document.createElement("td");
                td.textContent = element[key];


                tr.appendChild(td);
            }

        }

        tbody.appendChild(tr);

    });

    tabla.appendChild(tbody);

    return tabla;
}

export const crearArticulo = (data)=>{

    const $divisionMain = document.getElementById("divisionMain");

    data.forEach((element, index) => {
        
        const $articulo = document.createElement("article");
        $articulo.classList.add("mainArticle");
        const $titulo = document.createElement("h3");
        $titulo.classList.add("mainTexto");
        $titulo.textContent = element.titulo;
        $articulo.appendChild($titulo);
        const $descripcion = document.createElement("p");
        $descripcion.classList.add("mainTexto");
        $descripcion.textContent = element.descripcion;
        $articulo.appendChild($descripcion);
        const $precio = document.createElement("p");
        $precio.classList.add("mainPrecio");
        $precio.textContent = "$" + element.precio + ".-";
        $articulo.appendChild($precio);

        const $ul = document.createElement("ul");
        const $li1 = document.createElement("li");
        const $img1 = document.createElement("img");
        $img1.setAttribute("src", "../assets/puerta.png");
        $img1.setAttribute("width", "20px");
        $img1.setAttribute("alt", "puertas");
        $img1.classList.add("iconos");
        $li1.appendChild($img1);
        const $span1 = document.createElement("span");
        $span1.classList.add("iconos");
        $span1.textContent = element.puertas;
        $li1.appendChild($span1);
        $ul.appendChild($li1);

        const $li2 = document.createElement("li");
        const $img2 = document.createElement("img");
        $img2.setAttribute("src", "../assets/tacometro.png");
        $img2.setAttribute("width", "20px");
        $img2.setAttribute("alt", "km");
        $img2.classList.add("iconos");
        $li2.appendChild($img2);
        const $span2 = document.createElement("span");
        $span2.classList.add("iconos");
        $span2.textContent = element.km;
        $li2.appendChild($span2);
        $ul.appendChild($li2);

        const $li3 = document.createElement("li");
        const $img3 = document.createElement("img");
        $img3.setAttribute("src", "../assets/motor.png");
        $img3.setAttribute("width", "20px");
        $img3.setAttribute("alt", "potencia");
        $img3.classList.add("iconos");
        $li3.appendChild($img3);
        const $span3 = document.createElement("span");
        $span3.classList.add("iconos");
        $span3.textContent = element.potencia;
        $li3.appendChild($span3);
        $ul.appendChild($li3);

        $articulo.appendChild($ul);

        const $a = document.createElement("a");
        $a.setAttribute("href", "#");
        $a.textContent = "Ver Vehiculo";

        $articulo.appendChild($a);

        $divisionMain.appendChild($articulo);

    });
}