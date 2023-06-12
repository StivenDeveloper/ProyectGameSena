
const inicio = document.getElementById('boton-inicio');
const seccionIncio = document.getElementById('seccion-inicio');
const seleccionarAtaque = document.getElementById('seleccionar-personaje');
const contenderTarjetas = document.getElementById('contenedor-tarjetas');
let personajes = [];
let opcionPersonaje;
let inputMario;
let inputLuigi;
let inputToad;

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

personajes.push(mario,luigi,toad);


function inicioJuego(evento){
    evento.preventDefault;
    seccionIncio.style.display = "none";
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

console.log(random(1,10))

inicio.addEventListener('click',inicioJuego);