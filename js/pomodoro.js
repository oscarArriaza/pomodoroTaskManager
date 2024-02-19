document.addEventListener
(
    "DOMContentLoaded",
    function()
    {
        let header=document.getElementsByTagName("header")[0];
        let modalConfirmacionReinicioTemporizador=document.getElementById("modalConfirmacionReinicioTemporizador");
        let primerDigitoMinutos=document.getElementById("imagenPrimerDigitoMinutos");
        let segundoDigitoMinutos=document.getElementById("imagenSegundoDigitoMinutos");
        let dosPuntos=document.getElementById("imagenDosPuntos");
        let primerDigitoSegundos=document.getElementById("imagenPrimerDigitoSegundos");
        let segundoDigitoSegundos=document.getElementById("imagenSegundoDigitoSegundos");
        let inicio;
        let fin;
        let dif;
        let elTemporizadorEstaCorriendo;
        let elRelojEstaEnRojo=false;
        let elTemporizadorLlegoACero=false;
        principal();
        function principal()
        {
            let minutos=25;
            header.onclick=function(event)
            {
                if(event.target.className==="btn btn-primary botonMinutos")
                {
                    if(event.target.textContent==="01 min")
                    {
                        if(elTemporizadorEstaCorriendo!==true)
                        {
                            primerDigitoMinutos.src="../media/imagenes/numeros/0.png";
                            segundoDigitoMinutos.src="../media/imagenes/numeros/1.png";
                            minutos=1;
                        }
                        else
                        {
                            let botonAfirmativoReiniciarTemporizador=document.getElementById("botonAfirmativoReiniciarTemporizador");
                            botonAfirmativoReiniciarTemporizador.setAttribute("data-minutos","1");
                        }
                    }
                    else if(event.target.textContent==="05 min")
                    {
                        if(elTemporizadorEstaCorriendo!==true)
                        {
                            primerDigitoMinutos.src="../media/imagenes/numeros/0.png";
                            segundoDigitoMinutos.src="../media/imagenes/numeros/5.png";
                            minutos=5;
                        }
                        else
                        {
                            let botonAfirmativoReiniciarTemporizador=document.getElementById("botonAfirmativoReiniciarTemporizador");
                            botonAfirmativoReiniciarTemporizador.setAttribute("data-minutos","5");
                        }
                    }
                    else if(event.target.textContent==="15 min")
                    {
                        if(elTemporizadorEstaCorriendo!==true)
                        {
                            primerDigitoMinutos.src="../media/imagenes/numeros/1.png";
                            segundoDigitoMinutos.src="../media/imagenes/numeros/5.png";
                            minutos=15;
                        }
                        else
                        {
                            let botonAfirmativoReiniciarTemporizador=document.getElementById("botonAfirmativoReiniciarTemporizador");
                            botonAfirmativoReiniciarTemporizador.setAttribute("data-minutos","15");
                        }
                    }
                    else if(event.target.textContent==="25 min")
                    {
                        if(elTemporizadorEstaCorriendo!==true)
                        {
                            primerDigitoMinutos.src="../media/imagenes/numeros/2.png";
                            segundoDigitoMinutos.src="../media/imagenes/numeros/5.png";
                            minutos=25;
                        }
                        else
                        {
                            let botonAfirmativoReiniciarTemporizador=document.getElementById("botonAfirmativoReiniciarTemporizador");
                            botonAfirmativoReiniciarTemporizador.setAttribute("data-minutos","25");
                        }
                    }
                }

                if(event.target.id==="botonIniciar")
                {
                    event.target.textContent="Pausar";
                    event.target.id="botonPausar";
                    agregarLaFuncionDeReiniciarElTemporizadorALosBotonesDeLosMinutos();
                    iniciarTemporizador(minutos);
                }
                else if(event.target.id==="botonPausar")
                {
                    event.target.textContent="Reanudar";
                    event.target.id="botonReanudar";
                    pausarTemporizador();
                }
                else if(event.target.id==="botonReanudar")
                {
                    event.target.textContent="Pausar";
                    event.target.id="botonPausar";
                    reanudarTemporizador();
                }
                else if(event.target.id==="botonAsignarOtroTemporizador")
                {
                    clearInterval(intervalo2);
                    quitarLaFuncionDeReiniciarElTemporizadorALosBotonesDeLosMinutos();
                    elTemporizadorEstaCorriendo=false;
                    primerDigitoMinutos.src="../media/imagenes/numeros/2.png";
                    segundoDigitoMinutos.src="../media/imagenes/numeros/5.png";
                    dosPuntos.src="../media/imagenes/numeros/dosPuntos.png";
                    primerDigitoSegundos.src="../media/imagenes/numeros/0.png";
                    segundoDigitoSegundos.src="../media/imagenes/numeros/0.png";
                    event.target.textContent="Iniciar";
                    event.target.id="botonIniciar";
                    silvato.pause();
                    minutos=25;
                }
            }
            modalConfirmacionReinicioTemporizador.onclick=function(event)
            {
                if(event.target.id==="botonAfirmativoReiniciarTemporizador")
                {
                    let botonPausarReanudar=document.getElementsByClassName("btn btn-primary botonIniciarPausarReanudar")[0];
                    clearInterval(intervalo);
                    if(elTemporizadorLlegoACero)
                    {
                        clearInterval(intervalo2);
                        elTemporizadorLlegoACero=false;
                    }
                    silvato.pause();
                    minutos=event.target.getAttribute("data-minutos");
                    minutos=Number(minutos);
                    if(minutos.toString().length==2)
                    {
                        primerDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(0)+".png";
                        segundoDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(1)+".png";
                        dosPuntos.src="../media/imagenes/numeros/dosPuntos.png";
                        primerDigitoSegundos.src="../media/imagenes/numeros/0.png";
                        segundoDigitoSegundos.src="../media/imagenes/numeros/0.png";
                    }
                    else
                    {
                        primerDigitoMinutos.src="../media/imagenes/numeros/0.png";
                        segundoDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(0)+".png";
                        dosPuntos.src="../media/imagenes/numeros/dosPuntos.png";
                        primerDigitoSegundos.src="../media/imagenes/numeros/0.png";
                        segundoDigitoSegundos.src="../media/imagenes/numeros/0.png";
                    }
                    elTemporizadorEstaCorriendo=false;
                    quitarLaFuncionDeReiniciarElTemporizadorALosBotonesDeLosMinutos();
                    botonPausarReanudar.textContent="Iniciar";
                    botonPausarReanudar.id="botonIniciar";
                }
            }
        }
        function iniciarTemporizador(minutos)
        {
            actualizarDisplay(minutos,"iniciarTemporizador");
        }
        function actualizarDisplay(minutos,funcionQueLaInvoco)
        {
            let segundos;
            let end;
            let timeLeftInSeconds;
            elTemporizadorEstaCorriendo=true;
            if(funcionQueLaInvoco==="iniciarTemporizador")
            {
                end = Date.now() + (minutos * 60 * 1000)+1000; // AÑADIDO (hora del sistema en la que debe acabar el temporizador)
            }
            else
            {
                dif = fin - inicio;
                timeLeftInSeconds=obtenerTimeLeftInSeconds();
                end = Date.now() + (timeLeftInSeconds * 1000)+dif; // AÑADIDO (hora del sistema en la que debe acabar el temporizador)
            }
            
               
            intervalo=setInterval(empezarCuentaRegresiva,1000);
          
            function empezarCuentaRegresiva()
            {   
                if(funcionQueLaInvoco==="iniciarTemporizador")
                {
                    timeLeftInSeconds = Math.floor((end - Date.now()) / 1000);
                    minutos = Math.floor(timeLeftInSeconds / 60); // Redondea al entero inferior (4,8 minutos --> 4)
                    segundos = timeLeftInSeconds % 60;   
                }
                else
                {
                    timeLeftInSeconds = Math.floor((end - (Date.now()+dif)) / 1000);
                    minutos = Math.floor(timeLeftInSeconds / 60); // Redondea al entero inferior (4,8 minutos --> 4)
                    segundos = timeLeftInSeconds % 60;   
                }
                
                
                

                if(timeLeftInSeconds===0)
                {
                    clearInterval(intervalo);
                    elTemporizadorLlegoACero=true;
                    let silvato=document.getElementById("silvato");
                    silvato.play();
                    let botonAsignarOtroTemporizador=document.getElementById("botonPausar");
                    botonAsignarOtroTemporizador.id="botonAsignarOtroTemporizador";
                    botonAsignarOtroTemporizador.textContent="Asignar otro temporizador";
                    intervalo2=setInterval(toggleReloj,500);
                }

                //segundosDelDisplay=segundos;
                if(segundos.toString().length===2)
                {
                    
                    if(minutos.toString().length===2)
                    {
                        primerDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(0)+".png";
                        segundoDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(1)+".png";
                        primerDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(0)+".png";
                        segundoDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(1)+".png";
                    }
                    else
                    {
                        primerDigitoMinutos.src="../media/imagenes/numeros/0.png";
                        segundoDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(0)+".png";
                        primerDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(0)+".png";
                        segundoDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(1)+".png";
                    }
                }
                else
                {
                    if(minutos.toString().length===2)
                    {
                        primerDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(0)+".png";
                        segundoDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(1)+".png";
                        primerDigitoSegundos.src="../media/imagenes/numeros/0.png";
                        segundoDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(0)+".png";
                    }
                    else
                    {
                        primerDigitoMinutos.src="../media/imagenes/numeros/0.png";
                        segundoDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(0)+".png";
                        primerDigitoSegundos.src="../media/imagenes/numeros/0.png";
                        segundoDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(0)+".png";
                    }
                }
                guardarTimeLeftInSeconds(timeLeftInSeconds);
            }
        }
        function pausarTemporizador()
        {
            clearInterval(intervalo);
            inicio = Date.now();
        }
        function reanudarTemporizador()
        {
            fin = Date.now();
            let timeLeftInSeconds=obtenerTimeLeftInSeconds();
            minutos = Math.floor(timeLeftInSeconds / 60); // Redondea al entero inferior (4,8 minutos --> 4)
            segundos = timeLeftInSeconds % 60;
            if(segundos.toString().length===2)
            {
                if(minutos.toString().length===2)
                {
                    primerDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(0)+".png";
                    segundoDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(1)+".png";
                    primerDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(0)+".png";
                    segundoDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(1)+".png";
                }
                else
                {
                    primerDigitoMinutos.src="../media/imagenes/numeros/0.png";
                    segundoDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(0)+".png";
                    primerDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(0)+".png";
                    segundoDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(1)+".png";
                }
            }
            else
            {
                if(minutos.toString().length===2)
                {
                    primerDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(0)+".png";
                    segundoDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(1)+".png";
                    primerDigitoSegundos.src="../media/imagenes/numeros/0.png";
                    segundoDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(0)+".png";
                }
                else
                {
                    primerDigitoMinutos.src="../media/imagenes/numeros/0.png";
                    segundoDigitoMinutos.src="../media/imagenes/numeros/"+minutos.toString().charAt(0)+".png";
                    primerDigitoSegundos.src="../media/imagenes/numeros/0.png";
                    segundoDigitoSegundos.src="../media/imagenes/numeros/"+segundos.toString().charAt(0)+".png";
                }
            }
            actualizarDisplay(minutos,"reanudarTemporizador");
        }
        function guardarTimeLeftInSeconds(seconds)
        {
            let datos= 
            {
                seconds:seconds,
            }
            let datosJSON=JSON.stringify(datos);
            localStorage.setItem('timeLeftInSeconds',datosJSON);
        }
        function obtenerTimeLeftInSeconds()
        {
            let timeLeftInSeconds;
            let datosJSON = localStorage.getItem('timeLeftInSeconds');
            let datos = JSON.parse(datosJSON);
            timeLeftInSeconds=datos.seconds;
            return timeLeftInSeconds;
        }
        function agregarLaFuncionDeReiniciarElTemporizadorALosBotonesDeLosMinutos()
        {
            let botonesMinutos=document.getElementsByClassName("btn btn-primary botonMinutos");
            for (let botonMinuto of botonesMinutos)
            {
                botonMinuto.setAttribute("data-bs-toggle","modal");
                botonMinuto.setAttribute("data-bs-target","#modalConfirmacionReinicioTemporizador");                
            }
        }
        function quitarLaFuncionDeReiniciarElTemporizadorALosBotonesDeLosMinutos()
        {
            let botonesMinutos=document.getElementsByClassName("btn btn-primary botonMinutos");
            for (let botonMinuto of botonesMinutos)
            {
                botonMinuto.removeAttribute("data-bs-toggle");
                botonMinuto.removeAttribute("data-bs-target");
            }
        }
        function toggleReloj()
        {
            if(elRelojEstaEnRojo===false)
            {
                primerDigitoMinutos.src="../media/imagenes/numeros/0Rojo.png";
                segundoDigitoMinutos.src="../media/imagenes/numeros/0Rojo.png";
                dosPuntos.src="../media/imagenes/numeros/dosPuntosRojos.png";
                primerDigitoSegundos.src="../media/imagenes/numeros/0Rojo.png";
                segundoDigitoSegundos.src="../media/imagenes/numeros/0Rojo.png";
                elRelojEstaEnRojo=true;
            }
            else
            {
                primerDigitoMinutos.src="../media/imagenes/numeros/0.png";
                segundoDigitoMinutos.src="../media/imagenes/numeros/0.png";
                dosPuntos.src="../media/imagenes/numeros/dosPuntos.png";
                primerDigitoSegundos.src="../media/imagenes/numeros/0.png";
                segundoDigitoSegundos.src="../media/imagenes/numeros/0.png";
                elRelojEstaEnRojo=false;
            }
        }
    }
);