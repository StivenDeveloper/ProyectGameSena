
const inicio = document.getElementById('boton-inicio');
const sectionIncio = document.getElementById('section-inicio');
const sectionPersonaje = document.getElementById('section-personaje');
const contenderTarjetas = document.getElementById('contenedor-tarjetas');
const botonPersonajeJugador= document.getElementById('boton-personaje');
const personajesLuchaJugador = document.getElementById('lucha-jugador');
const personajesLuchaEnemigo = document.getElementById('lucha-enemigo');
let personajes = [];
let ataques = [];
let defensa = [];
let opcionPersonaje;
let inputMario;
let inputLuigi;
let inputToad;
let personjeJugador;

class Personaje{
    constructor(nombre,foto,audio,vida){
        this.nombre = nombre;
        this.foto = foto;
        this.audio= audio;
        this.vida=vida;
    }
}

let mario = new Personaje("Mario", "assets/mario.png","song/mario.mp3",100);
let luigi = new Personaje("Luigi","assets/luigi.png","song/luigi.mp3",100);
let toad = new Personaje("Toad","assets/toad.png","song/toad.mp3",100);

let bowser= new Personaje("Bowser","assets/bowser.png","",100);
let wario = new Personaje("Wario","assets/wario.png","",100);
let waluigi = new Personaje("Waluigi","assets/waluigi.png","",100);

personajes.push(mario,luigi,toad);
ataques.push(
    {id:"fuego", boton:""},
    {id:"agua",  boton:""},
    {id:"hacha", boton:""},
);

defensa.push(
    {id:"Azul", boton: ""},
    {id:"Amarillo", boton:""},
    {id:"Rojo", boton:""},
);

botonPersonajeJugador.style.display="none";
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

function seleccionarPersonajeJugador(evento){
    evento.preventDefault();
    sectionPersonaje.style.display= "none";
    if(inputMario.checked){
        personajesLuchaJugador.innerHTML = mostrarImagen(mario.foto,mario.nombre);
        personjeJugador= mario.nombre;
    }else if( inputLuigi.checked){
        personajesLuchaJugador.innerHTML = mostrarImagen(luigi.foto,luigi.nombre);
        personjeJugador= luigi.nombre;
    }else if(inputToad.checked){
        personajesLuchaJugador.innerHTML = mostrarImagen(toad.foto,toad.nombre);
        personjeJugador= toad.nombre;
    }else{
        alert("¡Oye! seleccione a un personeje para la lucha")
        reiniciarJuego();
    }
    enemigoAleatorio();
}

function enemigoAleatorio(){
    let num = random(1,3);
    switch(num){
        case 1:
            personajesLuchaEnemigo.innerHTML=mostrarImagen(bowser.foto,bowser.nombre);
        break;
        case 2:
            personajesLuchaEnemigo.innerHTML=mostrarImagen(wario.foto,wario.nombre);
        break;
        case 3:
            personajesLuchaEnemigo.innerHTML=mostrarImagen(waluigi.foto,waluigi.nombre);
            
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