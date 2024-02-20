document.addEventListener
(
    "DOMContentLoaded",
    function()
    {
        let section=document.getElementsByTagName("section")[0];
        principal();
        function principal()
        {
            let arrastrado = null;
            let arrastrables;
            let objetivos = document.getElementsByClassName("card-body zonaDeDescenso objetivoDeDescenso bg-secondary");

            if(!verificarSiLocalStorageTareasExiste())
            {
                crearLocalStorageTareas();
            }
            else
            {
                if(JSON.stringify(obtenerTareasGuardadas())!=="[]")
                {
                    mostrarTareasGuardadas();
                    arrastrables = document.getElementsByClassName("card arrastrable border border-secondary mb-4");
                    for(let arrastrable of arrastrables)
                    {
                        arrastrable.addEventListener
                        (
                            "dragstart", 
                            (event) =>
                            {
                                // store a ref. on the dragged elem
                                arrastrado = event.target;
                            }
                        );
                    }
                }
                else
                {
                    alert("No hay tareas creadas");
                }
            }
            section.onclick=function(event)
            {
                if (event.target.id === 'botonCrear')
                {
                    if(verificarQueLosCamposNoEstenVacios())
                    {
                        let idTarea=generarIdTarea()
                        let idDeLaColumnaDondeSeCrearaLaTarea="columnaPendiente";
                        let titulo=document.getElementById("titulo");
                        let descripcion=document.getElementById("descripcion");
                        let prioridad=document.getElementById("prioridad");

                        let fechaHoraActual = new Date();
                        let dia = fechaHoraActual.getDate();
                        let mes = fechaHoraActual.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
                        let año = fechaHoraActual.getFullYear();
                        let hora = fechaHoraActual.getHours();
                        let minutos = fechaHoraActual.getMinutes();
                        let segundos = fechaHoraActual.getSeconds();

                        let fechaEnLaQueFueCreadaLaTarea=dia+"/"+mes+"/"+año;
                        let horaEnLaQueFueCreadaLaTarea=hora+":"+minutos+":"+segundos;
                        crearTarea(idTarea,titulo.value,descripcion.value,prioridad.value,fechaEnLaQueFueCreadaLaTarea,horaEnLaQueFueCreadaLaTarea,idDeLaColumnaDondeSeCrearaLaTarea);
                        guardarLaTareaEnLocalStorage(idTarea,titulo.value,descripcion.value,prioridad.value,fechaEnLaQueFueCreadaLaTarea,horaEnLaQueFueCreadaLaTarea,idDeLaColumnaDondeSeCrearaLaTarea);
                        borrarCamposDeLFormulario();

                        arrastrables = document.getElementsByClassName("card arrastrable border border-secondary mb-4");
                        for(let arrastrable of arrastrables)
                        {
                            arrastrable.addEventListener
                            (
                                "dragstart", 
                                (event) =>
                                {
                                    // store a ref. on the dragged elem
                                    arrastrado = event.target;
                                }
                            );
                        }
                    }
                }
                else if(event.target.className==="btn btn-danger")
                {
                    if(preguntarAlUsuarioSiEstaSeguroDeEliminarLaTarea())
                    {
                        let tarea=event.target.closest(".arrastrable")
                        borrarTareaDelLocalStorage(tarea.id);
                        tarea.remove();
                    }
                }
                else if(event.target.className==="btn btn-success me-3")
                {
                    let divModal=document.getElementById("divModal");
                    let tituloModal=document.getElementById("tituloModal");
                    let descripcionModal=document.getElementById("descripcionModal");
                    let fechaModal=document.getElementById("fechaModal");
                    let horaModal=document.getElementById("horaModal");
                    let prioridadModal=document.getElementById("prioridadModal");

                    divModal.style.color="white";
                    tituloModal.textContent="Titulo: "+obtenerTareasGuardadas().find(tarea=>tarea.idTarea===event.target.closest(".arrastrable").id).titulo;
                    descripcionModal.textContent="Descripción: "+obtenerTareasGuardadas().find(tarea=>tarea.idTarea===event.target.closest(".arrastrable").id).descripcion;
                    fechaModal.textContent="Fecha: "+obtenerTareasGuardadas().find(tarea=>tarea.idTarea===event.target.closest(".arrastrable").id).fechaEnLaQueFueCreadaLaTarea;
                    horaModal.textContent="Hora: "+obtenerTareasGuardadas().find(tarea=>tarea.idTarea===event.target.closest(".arrastrable").id).horaEnLaQueFueCreadaLaTarea;
                    prioridadModal.textContent="Prioridad: "+obtenerTareasGuardadas().find(tarea=>tarea.idTarea===event.target.closest(".arrastrable").id).prioridad;
                    if(prioridadModal.textContent==="Prioridad: No especificada")
                    {
                        divModal.style.backgroundColor="rgba(128, 128, 128, 0.731)";
                    }
                    else if(prioridadModal.textContent==="Prioridad: Prioridad baja")
                    {
                        divModal.style.backgroundColor="rgba(0, 0, 255, 0.731)";
                    }
                    else if(prioridadModal.textContent==="Prioridad: Prioridad media")
                    {
                        divModal.style.backgroundColor="rgba(128, 0, 128, 0.731)";
                    }
                    else
                    {
                        divModal.style.backgroundColor="rgba(255, 0, 0, 0.731)";
                    }
                }
            }
            for(let objetivo of objetivos)
            {
                objetivo.addEventListener
                (
                    "dragover",
                    (event) => 
                    {
                        // prevent default to allow drop
                        event.preventDefault();
                    }
                );
            }
            for(let objetivo of objetivos)
            {
                objetivo.addEventListener
                (
                    "drop",
                    (event) =>
                    {
                        // prevent default action (open as a link for some elements)
                        event.preventDefault();
                        // move dragged element to the selected drop target
                        if (event.target.className === "card-body zonaDeDescenso objetivoDeDescenso bg-secondary")
                        {
                            arrastrado.parentNode.removeChild(arrastrado);
                            event.target.appendChild(arrastrado);
                            buscarObjetoTareaEnLocalStorageYModificarColumnaDondeSeEncuentra(arrastrado.id,event.target.id);
                            if(event.target.id==="columnaCompletada")
                            {
                                bloquearTarea(arrastrado);
                            }
                        }
                    }
                );
            }
        }
        function verificarQueLosCamposNoEstenVacios()
        {
            let laTareaPasoTodasLasValidaciones=false;
            principal();
            function principal()
            {
                let titulo=document.getElementById("titulo");
                let descripcion=document.getElementById("descripcion");

                let validacionCampoVacioTitulo=false;
                let validacionLongitudTitulo=false;
                let campoTituloPasoTodasLasValidaciones=false;
                validacionCampoVacioTitulo=verificarQueElCampoNoEsteVacio(validacionCampoVacioTitulo,titulo);
                validacionLongitudTitulo=verificarLongitud(validacionLongitudTitulo,titulo,50);

                let validacionCampoVacioDescripcion=false;
                let validacionLongitudDescripcion=false;
                let campoDescripcionPasoTodasLasValidaciones=false;
                validacionCampoVacioDescripcion=verificarQueElCampoNoEsteVacio(validacionCampoVacioDescripcion,descripcion);
                validacionLongitudDescripcion=verificarLongitud(validacionLongitudDescripcion,descripcion,255);

                if(validacionCampoVacioTitulo&&validacionLongitudTitulo)
                {
                    let mensajeError = document.getElementById("mensajeValidacionTitulo");
                    mensajeError.textContent = "";
                    campoTituloPasoTodasLasValidaciones=true;
                }

                if(validacionCampoVacioDescripcion&&validacionLongitudDescripcion)
                {
                    let mensajeError = document.getElementById("mensajeValidacionDescripcion");
                    mensajeError.textContent = "";
                    campoDescripcionPasoTodasLasValidaciones=true;
                }

                if(campoTituloPasoTodasLasValidaciones&&campoDescripcionPasoTodasLasValidaciones)
                {
                    laTareaPasoTodasLasValidaciones=true;
                }
            }
            function verificarQueElCampoNoEsteVacio(validacionCampoVacio,elementoInput)
            {
                // Elimina los espacios en blanco del valor del elemento input
                let elementoInputSinEspacios = elementoInput.value.trim();

                // Verifica si el campo nombre está vacío
                if (elementoInputSinEspacios === "")
                {
                    // El campo nombre está vacío
                    // Muestra un mensaje de error
                    let mensajeError = document.getElementById("mensajeValidacion"+elementoInput.name);
                    mensajeError.style.color = "red";
                    mensajeError.textContent = "El campo '"+elementoInput.name+"' no puede quedar vacío.";

                    // Evita que el formulario se envíe
                    event.preventDefault();
                }
                else
                {
                    validacionCampoVacio=true;
                }
                return validacionCampoVacio;
            }
            function verificarLongitud(validacionLongitud,elementoInput,longitudMaxima)
            {
                // Verifica si la longitud del campo nombre es menor a 35
                const longitudInvalida = elementoInput.value.length >= longitudMaxima;

                // Si la longitud del campo nombre es mayor o igual a 35, muestra un mensaje de error
                if (longitudInvalida)
                {
                    // Muestra un mensaje de error
                    const mensajeError = document.getElementById("mensajeValidacion"+elementoInput.name);
                    mensajeError.style.color = "red";
                    mensajeError.textContent = "La longitud del campo '"+elementoInput.name+"' no puede ser mayor a "+longitudMaxima+" caracteres.";

                    // Evita que el formulario se envíe
                    event.preventDefault();
                }
                else
                {
                    validacionLongitud=true;
                }
                return validacionLongitud;
            }
            return laTareaPasoTodasLasValidaciones;
        }
        function crearTarea(idTarea,titulo,descripcion,prioridad,fechaEnLaQueFueCreadaLaTarea,horaEnLaQueFueCreadaLaTarea,idDeLaColumnaDondeSeCrearaLaTarea)
        {
            let columna=document.getElementById(idDeLaColumnaDondeSeCrearaLaTarea);

            let divCarta=document.createElement("div");
            divCarta.className="card arrastrable border border-secondary mb-4";
            divCarta.id=idTarea;
            if(idDeLaColumnaDondeSeCrearaLaTarea==="columnaCompletada")
            {
                divCarta.setAttribute("draggable","false");
            }
            else
            {
                divCarta.setAttribute("draggable","true");
            }
            columna.appendChild(divCarta);

            let divCartaBody=document.createElement("div");
            divCartaBody.className="card-body ";
            if(prioridad==="No especificada")
            {
                divCartaBody.style.backgroundColor="rgba(128, 128, 128, 0.457)";
            }
            else if(prioridad==="Prioridad baja")
            {
                divCartaBody.style.backgroundColor="rgba(0, 0, 255, 0.675)";
            }
            else if(prioridad==="Prioridad media")
            {
                divCartaBody.style.backgroundColor="rgba(128, 0, 128, 0.675)";
            }
            else
            {
                divCartaBody.style.backgroundColor="rgba(255, 0, 0, 0.457)";
            }
            divCarta.appendChild(divCartaBody);

            let divTituloYCheck=document.createElement("div");
            divTituloYCheck.className="row";
            divCartaBody.appendChild(divTituloYCheck);

            let divTitulo=document.createElement("div");
            divTitulo.className="col-sm-9";
            divTituloYCheck.appendChild(divTitulo);

            let divCheck=document.createElement("div");
            divCheck.className="col-sm-3";
            divTituloYCheck.appendChild(divCheck);

            let h6Titulo=document.createElement("p");
            h6Titulo.className="h6";
            h6Titulo.textContent=titulo;
            h6Titulo.style="font-weight: bold;";
            divTitulo.appendChild(h6Titulo);

            let inputCheck=document.createElement("input");
            inputCheck.setAttribute("type","checkbox");
            inputCheck.setAttribute("disabled","true");
            inputCheck.className="form-check-input";
            inputCheck.id="check"+idTarea;
            if(idDeLaColumnaDondeSeCrearaLaTarea==="columnaCompletada")
            {
                inputCheck.setAttribute("checked","true");
            }
            divCheck.appendChild(inputCheck);
            
            let parrafoDescripcion=document.createElement("p");
            parrafoDescripcion.className="card-text ";
            parrafoDescripcion.textContent=descripcion;
            parrafoDescripcion.setAttribute("hidden","true");
            divCartaBody.appendChild(parrafoDescripcion);
            
            let parrafoFecha=document.createElement("p");
            parrafoFecha.className="card-text ";
            parrafoFecha.textContent="Fecha de creación: "+fechaEnLaQueFueCreadaLaTarea;
            parrafoFecha.setAttribute("hidden","true");
            divCartaBody.appendChild(parrafoFecha);

            let parrafoHora=document.createElement("p");
            parrafoHora.className="card-text ";
            parrafoHora.textContent="Hora de creación: "+horaEnLaQueFueCreadaLaTarea;
            parrafoHora.setAttribute("hidden","true");
            divCartaBody.appendChild(parrafoHora);

            let divBotones=document.createElement("div");
            divBotones.style="text-align: center;";
            divCartaBody.appendChild(divBotones);

            let parrafoPrioridad=document.createElement("p");
            parrafoPrioridad.className="card-text";
            parrafoPrioridad.textContent="Prioridad: "+prioridad;
            parrafoPrioridad.setAttribute("hidden","true");
            divBotones.appendChild(parrafoPrioridad);

            let botonMostrarInformacion=document.createElement("button");
            botonMostrarInformacion.type="button";
            botonMostrarInformacion.className="btn btn-success me-3";
            botonMostrarInformacion.textContent="Ver";
            botonMostrarInformacion.setAttribute("data-bs-toggle","modal");
            botonMostrarInformacion.setAttribute("data-bs-target","#informacionDeLaTarea");
            divBotones.appendChild(botonMostrarInformacion);

            let botonEliminar=document.createElement("button");
            botonEliminar.type="button";
            botonEliminar.className="btn btn-danger";
            botonEliminar.textContent="Eliminar";
            divBotones.appendChild(botonEliminar);
        }
        function verificarSiLocalStorageTareasExiste()
        {
            let hayTareasCreadas=false;
            let datosJSON = localStorage.getItem("tareas"); 
            if(datosJSON!==null)
            {
                hayTareasCreadas=true;
            }
            return hayTareasCreadas;
        }
        function crearLocalStorageTareas()
        {
            let tareas=[];
            let datosJSON = JSON.stringify(tareas);
            localStorage.setItem("tareas", datosJSON);
        }
        function obtenerTareasGuardadas()
        {
            let tareas;
            let datosJSON = localStorage.getItem('tareas');
            let datos = JSON.parse(datosJSON);
            tareas=datos;
            return tareas;
        }
        function mostrarTareasGuardadas()
        {
            let tareas=obtenerTareasGuardadas();
            tareas.forEach
            (
                tarea=>
                {
                    crearTarea(tarea.idTarea,tarea.titulo,tarea.descripcion,tarea.prioridad,tarea.fechaEnLaQueFueCreadaLaTarea,tarea.horaEnLaQueFueCreadaLaTarea,tarea.idDeLaColumnaDondeSeCrearaLaTarea);
                }
            );
        }
        function guardarLaTareaEnLocalStorage(idTarea,titulo,descripcion,prioridad,fechaEnLaQueFueCreadaLaTarea,horaEnLaQueFueCreadaLaTarea,idDeLaColumnaDondeSeCrearaLaTarea)
        {
            let tareas=obtenerTareasGuardadas();
            tareas.push({idTarea:idTarea,titulo:titulo,descripcion:descripcion,prioridad:prioridad,fechaEnLaQueFueCreadaLaTarea:fechaEnLaQueFueCreadaLaTarea,horaEnLaQueFueCreadaLaTarea:horaEnLaQueFueCreadaLaTarea,idDeLaColumnaDondeSeCrearaLaTarea:idDeLaColumnaDondeSeCrearaLaTarea});
            let datosJSON = JSON.stringify(tareas);
            localStorage.setItem("tareas", datosJSON);
        }
        function borrarCamposDeLFormulario()
        {
            let titulo=document.getElementById("titulo");
            let descripcion=document.getElementById("descripcion");
            let opcionNoEspecificada=document.getElementById("noEspecificada");
            titulo.value="";
            descripcion.value="";
            opcionNoEspecificada.selected=true;
        }
        function generarIdTarea()
        {
            let cantidadDeTareasCreadas;
            let idTarea;
            if(!verificarSiLocalStorageCantidadDeTareasCreadasExiste())
            {
                cantidadDeTareasCreadas=1;
                idTarea="t"+cantidadDeTareasCreadas;
                crearOModificarLocalStorageCantidadDeTareasCreadas(cantidadDeTareasCreadas);
            }
            else
            {
                cantidadDeTareasCreadas=Number(obtenerCantidadDeTareasCreadas())+1;
                idTarea="t"+cantidadDeTareasCreadas;
                crearOModificarLocalStorageCantidadDeTareasCreadas(cantidadDeTareasCreadas);
            }
            return idTarea;
        }
        function verificarSiLocalStorageCantidadDeTareasCreadasExiste()
        {
            let LocalStorageCantidadDeTareasCreadasExiste=false;
            let datosJSON = localStorage.getItem("cantidadDeTareasCreadas"); 
            if(datosJSON!==null)
            {
                LocalStorageCantidadDeTareasCreadasExiste=true;
            }
            return LocalStorageCantidadDeTareasCreadasExiste;
        }
        function crearOModificarLocalStorageCantidadDeTareasCreadas(cantidadDeTareasCreadas)
        {
            localStorage.setItem("cantidadDeTareasCreadas", cantidadDeTareasCreadas);
        }
        function obtenerCantidadDeTareasCreadas()
        {
            let cantidadDeTareasCreadas;
            cantidadDeTareasCreadas = localStorage.getItem('cantidadDeTareasCreadas');
            return cantidadDeTareasCreadas;
        }
        function buscarObjetoTareaEnLocalStorageYModificarColumnaDondeSeEncuentra(idTarea,columnaDondeSeEncuentra)
        {
            let tareas=obtenerTareasGuardadas();
            let tarea=tareas.find(tarea=>tarea.idTarea===idTarea);
            tarea.idDeLaColumnaDondeSeCrearaLaTarea=columnaDondeSeEncuentra;
            let datosJSON = JSON.stringify(tareas);
            localStorage.setItem("tareas", datosJSON);
        }
        function bloquearTarea(tarea)
        {
            tarea.setAttribute("draggable","false");
            let check=document.getElementById("check"+tarea.id)
            check.setAttribute("checked","true");
        }
        function preguntarAlUsuarioSiEstaSeguroDeEliminarLaTarea()
        {
            let elUsuarioQuiereEliminarLaTarea=false;
            let confirmacion = window.confirm
            (
                "¿Estas seguro de eliminar esta tarea?"
            )
            if (confirmacion)
            {
                elUsuarioQuiereEliminarLaTarea=true;
            }
            return elUsuarioQuiereEliminarLaTarea;
        }
        function borrarTareaDelLocalStorage(idTarea)
        {
            let tareas=obtenerTareasGuardadas();
            let tarea=tareas.find(tarea=>tarea.idTarea===idTarea);
            let index=tareas.indexOf(tarea);
            tareas.splice(index,1);
            let datosJSON = JSON.stringify(tareas);
            localStorage.setItem("tareas", datosJSON);
        }
    }
);