const inicio = document.getElementById('boton-inicio');
const sectionIncio = document.getElementById('section-inicio');
const sectionPersonaje = document.getElementById('section-personaje');
const contenderTarjetas = document.getElementById('contenedor-tarjetas');
const botonPersonajeJugador= document.getElementById('boton-personaje');
const personajesLuchaJugador = document.getElementById('lucha-jugador');
const personajesLuchaEnemigo = document.getElementById('lucha-enemigo');
const sectionLucha = document.getElementById('section-lucha');
const mensajeResultado = document.getElementById('mensaje-resultado');
const ataquesBotones = document.getElementById('contenedor-ataques');
const defensaBotones = document.getElementById('contenedor-defensas');
const condenedorAtaque= document.getElementById('contenedor-ataque');
const condenedorDefensa= document.getElementById('contenedor-defensa');
const botonAtaque = document.getElementById('boton-ataque');
const botonDefensa= document.getElementById('boton-defensa');
const botonSiguente = document.getElementById('siguente-round');
const reinicar = document.getElementById('reiniciar-juego');
let num = 0;
let personajes = [];
let ataques = [];
let defensas = [];
let opcionPersonaje;
let inputMario;
let inputLuigi;
let inputToad;
let inputFuego;
let inputAgua;
let inputHacha;
let inputCaAzul;
let inputCaRojo;
let inputCaAmarillo;
let personajeJugador;
let personajeEnemigo;
let imgLucha;
let vidasJugador=100;
let vidasEnemigo=100;
let ataqueJugador;
let ataqueEnemigo;

class Personaje{
    constructor(nombre,foto,audio){
        this.nombre = nombre;
        this.foto = foto;
        this.audio= audio;
    }
}

let mario = new Personaje("Mario", "assets/mario.png","song/mario.mp3");
let luigi = new Personaje("Luigi","assets/luigi.png","song/luigi.mp3");
let toad = new Personaje("Toad","assets/toad.png","song/toad.mp3");

let bowser= new Personaje("Bowser","assets/bowser.png","");
let wario = new Personaje("Wario","assets/wario.png","");
let waluigi = new Personaje("Waluigi","assets/waluigi.png","");

personajes.push(mario,luigi,toad);
ataques.push(
    {id:"agua", boton:""},
    {id:"fuego",  boton:""},
    {id:"hacha", boton:""},
);

defensas.push(
    {id:"azul", boton: ""},
    {id:"rojo", boton:""},
    {id:"amarillo", boton:""},
);

botonPersonajeJugador.style.display="none";
botonAtaque.style.display="none";
botonDefensa.style.display="none";
botonSiguente.style.display="none";
reinicar.style.display="none";
function inicioJuego(evento){
    evento.preventDefault;
    sectionIncio.style.display = "none";
    botonPersonajeJugador.style.display = "block"
    ModificarFondo('assets/fondo2.jpg');
    personajes.forEach((Personaje)=>{
        opcionPersonaje=`
        <input type="radio" name="personaje" id=${Personaje.nombre}>
        <label id=${Personaje.nombre} class="tarjeta-de-personajes" for=${Personaje.nombre}>
            <p>${Personaje.nombre}</p>
            <img src=${Personaje.foto} alt=${Personaje.nombre}>
        </label>
        `
        contenderTarjetas.innerHTML += opcionPersonaje;
        inputMario = document.getElementById("Mario")
        inputLuigi = document.getElementById("Luigi")
        inputToad = document.getElementById("Toad")

        
    })

    reproducirAudioPersonaje(inputMario,mario.audio)
    reproducirAudioPersonaje(inputLuigi,luigi.audio)
    reproducirAudioPersonaje(inputToad,toad.audio)
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
    
}

function seleccionarPersonajeJugador(){
    sectionPersonaje.style.display= "none";
    if(inputMario.checked){
        personajesLuchaJugador.innerHTML = mostrarImagen(mario.foto,mario.nombre);
        personajeJugador= mario.nombre;
    }else if( inputLuigi.checked){
        personajesLuchaJugador.innerHTML = mostrarImagen(luigi.foto,luigi.nombre);
        personajeJugador= luigi.nombre;
    }else if(inputToad.checked){
        personajesLuchaJugador.innerHTML = mostrarImagen(toad.foto,toad.nombre);
        personajeJugador= toad.nombre;
    }else{
        alert("¡Oye! seleccione a un personeje para la lucha")
        reiniciarJuego();
    }
    enemigoAleatorio();
    mostrarAtaquesDefensas(ataques,ataquesBotones);
    mostrarAtaquesDefensas(defensas,defensaBotones);
   
    condenedorAtaque.style.display="none";
    condenedorDefensa.style.display="none";
    num = random(1,2)
    botonesAtaqueAleatorio();
}

function botonesAtaqueAleatorio(){
    console.log("Vida del jugador "+vidasJugador)
    console.log("Vida del enemigo "+vidasEnemigo)
    if(vidasJugador>0 && vidasEnemigo>0){
        botonSiguente.style.display="none";
        if(num==1){
            condenedorDefensa.style.display="none"
            condenedorAtaque.style.display="block";
            botonAtaque.style.display="block";
            botonAtaque.style.cursor="default"
            botonAtaque.disabled = false;
            num = 2;
            botonAtaque.addEventListener("click",ataqueLucha)
        }else{
            condenedorAtaque.style.display="none";
            condenedorDefensa.style.display="block";
            botonDefensa.style.display="block";
            botonDefensa.style.cursor="default";
            botonDefensa.disabled = false;
            num = 1;
            botonDefensa.addEventListener('click',defensaLucha)
        }
    }else{
        botonSiguente.style.display="none";
        reinicar.style.display="block";
        reinicar.addEventListener("click",reiniciarJuego)
        resultadoFinal()
    }
}

function resultadoFinal(){
    if(vidasJugador>vidasEnemigo){
        mensajeFinal("GANASTE");
    }else{
        mensajeFinal("PERDISTE");
    }
}

function ataqueLucha(){
    inputAgua = document.getElementById('agua');
    inputFuego = document.getElementById('fuego');
    inputHacha = document.getElementById('hacha');
    ataqueJugador = (inputAgua.checked)? "agua": (inputFuego.checked)? "fuego":"hacha";
    ataqueEnemigo =  ataqueEnemigoAleatorio("azul","rojo","amarillo");
    if(ataqueJugador=="agua" && ataqueEnemigo=="azul"|| ataqueJugador=="fuego" && ataqueEnemigo=="rojo"|| ataqueJugador=="hacha"&& ataqueEnemigo=="amarillo"){
        vidasEnemigo -=10;
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,10)
    }else if(ataqueJugador=="agua" && ataqueEnemigo=="rojo"|| ataqueJugador=="fuego" && ataqueEnemigo=="amarillo"|| ataqueJugador=="hacha"&& ataqueEnemigo=="azul"){
        vidasEnemigo -=20;
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,20)
    }else{
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,0)
    }
    if(inputAgua.checked||inputFuego.checked||inputHacha.checked){
        botonSiguente.style.display="block";
        botonAtaque.style.cursor="not-allowed"
        botonAtaque.disabled = true;
    }
    botonSiguente.addEventListener("click",botonesAtaqueAleatorio)
}

function defensaLucha(){
    inputCaAzul = document.getElementById('azul');
    inputCaRojo = document.getElementById('rojo');
    inputCaAmarillo = document.getElementById('amarillo');
    ataqueJugador = (inputCaAzul.checked)? "azul": (inputCaRojo.checked)? "rojo":"amarillo";
    ataqueEnemigo =  ataqueEnemigoAleatorio("agua","fuego","hacha");
    if(ataqueJugador=="azul" && ataqueEnemigo=="agua"|| ataqueJugador=="rojo" && ataqueEnemigo=="fuego"|| ataqueJugador=="amarillo"&& ataqueEnemigo=="hacha"){
        vidasJugador -=10;
        mostrarMensajeDefensa(ataqueJugador,ataqueEnemigo,10)
    }else if(ataqueJugador=="azul" && ataqueEnemigo=="hacha"|| ataqueJugador=="rojo" && ataqueEnemigo=="agua"|| ataqueJugador=="amarillo"&& ataqueEnemigo=="fuego"){
        vidasJugador -=20;
        mostrarMensajeDefensa(ataqueJugador,ataqueEnemigo,20)
    }else{
        mostrarMensajeDefensa(ataqueJugador,ataqueEnemigo,0)
    }
    if(inputCaAzul.checked|| inputCaRojo.checked|| inputCaAmarillo.checked){
        botonSiguente.style.display="block";
        botonDefensa.style.cursor="not-allowed"
        botonDefensa.disabled = true;
    }
    botonSiguente.addEventListener("click",botonesAtaqueAleatorio)
}

function mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,vida){
    let mensaje = `
      <p>${personajeJugador} ha atacado con ${ataqueJugador}, ${personajeEnemigo} se ha defendido con 
      el caparazón ${ataqueEnemigo}, le has quitado ${vida} de vida.</p>
    `
    mensajeResultado.innerHTML = mensaje;
}

function mensajeFinal(msg){
    let mensaje = `
      <h1>${msg} </h1>
    `
    mensajeResultado.innerHTML = mensaje;
}
function mostrarMensajeDefensa(ataqueJugador,ataqueEnemigo,vida){
    let mensaje = `
      <p>${personajeEnemigo} ha atacado con ${ataqueEnemigo}, ${personajeJugador} se ha defendido con 
      el caparazón ${ataqueJugador}, te han quitado ${vida} de vida.</p>
    `
    mensajeResultado.innerHTML = mensaje;
}
function mostrarAtaquesDefensas(arry,botones){
    for(let i=0; i<arry.length;i++){
        imgLucha = `
        <input type="radio" name="personaje" id=${arry[i].id}>
        <label id=${arry[i].id} class="img-ataques-defensa" for=${arry[i].id}>
            <p>${arry[i].id}</p>
            <img src=${arry[i].boton} alt=${arry[i].id}>
        </label>
        `
        botones.innerHTML += imgLucha;
    }
}


function enemigoAleatorio(){
    let num = random(1,3);
    switch(num){
        case 1:
            personajesLuchaEnemigo.innerHTML=mostrarImagen(bowser.foto,bowser.nombre);
            personajeEnemigo = bowser.nombre;
        break;
        case 2:
            personajesLuchaEnemigo.innerHTML=mostrarImagen(wario.foto,wario.nombre);
            personajeEnemigo = wario.nombre;
        break;
        case 3:
            personajesLuchaEnemigo.innerHTML=mostrarImagen(waluigi.foto,waluigi.nombre);
            personajeEnemigo = waluigi.nombre;
            
    }                   
}

function mostrarImagen(direccion,nombre){
    let imagen = `
    <img src=${direccion} alt=${nombre}>
    `
    return imagen;
}

function ModificarFondo(direccion){
    document.body.style.background= `url(${direccion})` ;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment="fixed";
    document.body.style.backgroundPosition="center";
}

function  ataqueEnemigoAleatorio(opcion1,opcion2,opcion3){
    let num = random(1,3)
    return (num==1)? opcion1: (num==2)? opcion2: opcion3;
}
function extraerAtaque(){
       ataqueJugador=(inputAgua.checked)? "agua": (inputfuego.checked)? "fuego": "hacha"
}


function reproducirAudioPersonaje(boton,direccion){
    boton.addEventListener("click", ()=>{
        let etiquetaAudio = document.createElement("audio");
        etiquetaAudio.setAttribute("src",`${direccion}`)
        etiquetaAudio.play();
    })
}

function random(min,max){
    return Math.floor(Math.random()* (max-min+1)+min)
}


function reiniciarJuego(){
    location.reload();
}

inicio.addEventListener('click',inicioJuego);