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
const logoIncio = document.getElementById('logo-inicio');
let num = 0;
let personajes = [];
let ataques = [];
let defensas = [];
let opcionPersonaje;
let inputAsh;
let inputBrock;
let inputDawn;
let inputElectrico1;
let inputElectrico2;
let inputRoca1;
let inputRoca2;
let inputAgua1;
let inputAgua2;
let personajeJugador;
let personajeEnemigo;
let imgLucha;
let vidasJugador=100;
let vidasEnemigo=100;
let ataqueJugador;
let ataqueEnemigo;

class Personaje{
    constructor(nombre,foto,fotoLucha){
        this.nombre = nombre;
        this.foto = foto;
        this.fotoLucha = fotoLucha;
    }
}

let ash = new Personaje("Ash", "assets/characters/ash1.png","assets/characters/ash2.png");
let brock = new Personaje("Brock","assets/characters/Brock1.png","assets/characters/Brock2.png");
let dawn = new Personaje("Dawn","assets/characters/dawn1.png","assets/characters/dawn2.png");

let jessie= new Personaje("Jessie","assets/characters/Jessie1.png","assets/characters/Jessie2.png");
let james= new Personaje("James","assets/characters/James1.png","assets/characters/James1.png");
let helio = new Personaje("Helio","assets/characters/helio1.png","assets/characters/helio2.png");

personajes.push(ash,brock,dawn);
ataques.push(
    {id:"Pikachu", imagen:""},
    {id:"Golem",  imagen:""},
    {id:"Empeleon", imagen:""},
);

defensas.push(
    {id:"Raichu", imagen: ""},
    {id:"Aron", imagen:""},
    {id:"Blastoise", imagen:""},
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
    ModificarFondo('assets/font/seleccionarPesonaje.gif');
    logoIncio.innerHTML = mostrarImagen('assets/font/logo.png','logo','logo')
    personajes.forEach((Personaje)=>{
        opcionPersonaje=`
        <input type="radio" name="personaje" id=${Personaje.nombre}>
        <label id=${Personaje.nombre} class="tarjeta-de-personajes" for=${Personaje.nombre}>
            <img src=${Personaje.foto} id=${Personaje.nombre} alt=${Personaje.nombre}>
        </label>
        `
        contenderTarjetas.innerHTML += opcionPersonaje;
        inputAsh = document.getElementById("Ash")
        inputBrock = document.getElementById("Brock")
        inputDawn = document.getElementById("Dawn")

        
    })

    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
    
}

function seleccionarPersonajeJugador(){
    sectionPersonaje.style.display= "none";
    if(inputAsh.checked){
        personajesLuchaJugador.innerHTML = mostrarImagen(ash.foto,ash.nombre,"imgAsh");
        personajeJugador= ash.nombre;
    }else if( inputBrock.checked){
        personajesLuchaJugador.innerHTML = mostrarImagen(brock.foto,brock.nombre,"imgBrock");
        personajeJugador= brock.nombre;
    }else if(inputDawn.checked){
        personajesLuchaJugador.innerHTML = mostrarImagen(dawn.foto,dawn.nombre,"imgDawn");
        personajeJugador= dawn.nombre;
    }else{
        alert("¡Oye! seleccione a un personeje para la lucha")
        reiniciarJuego();
    }
    enemigoAleatorio();
    mostrarAtaquesDefensas(ataques,ataquesBotones);
    mostrarAtaquesDefensas(defensas,defensaBotones);
   
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
    inputElectrico1 = document.getElementById('Pikachu');
    inputRoca1 = document.getElementById('Golem');
    inputAgua1 = document.getElementById('Empeleon');
    ataqueJugador = (inputElectrico1.checked)? "Pikachu": (inputRoca1.checked)? "Golem":"Empeleon";
    ataqueEnemigo =  ataqueEnemigoAleatorio("Raichu","Aron","Blastoise");
    if(ataqueJugador=="Pikachu" && ataqueEnemigo=="Raichu"|| ataqueJugador=="Golem" && ataqueEnemigo=="Aron"|| ataqueJugador=="Empeleon"&& ataqueEnemigo=="Blastoise"){
        vidasEnemigo -=10;
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,10)
    }else if(ataqueJugador=="Pikachu" && ataqueEnemigo=="Aron"|| ataqueJugador=="Golem" && ataqueEnemigo=="Blastoise"|| ataqueJugador=="Empeleon"&& ataqueEnemigo=="Raichu"){
        vidasEnemigo -=20;
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,20)
    }else{
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,0)
    }
    if(inputElectrico1.checked||inputRoca1.checked||inputAgua1.checked){
        botonSiguente.style.display="block";
        botonAtaque.style.cursor="not-allowed"
        botonAtaque.disabled = true;
    }
    botonSiguente.addEventListener("click",botonesAtaqueAleatorio)
}

function defensaLucha(){
    inputElectrico2 = document.getElementById('Raichu');
    inputRoca2 = document.getElementById('Aron');
    inputAgua2 = document.getElementById('Blastoise');
    ataqueJugador = (inputElectrico2.checked)? "Raichu": (inputRoca2.checked)? "Aron":"Blastoise";
    ataqueEnemigo =  ataqueEnemigoAleatorio("Pikachu","Golem","Empeleon");
    if(ataqueJugador=="Raichu" && ataqueEnemigo=="Pikachu"|| ataqueJugador=="Aron" && ataqueEnemigo=="Golem"|| ataqueJugador=="Blastoise"&& ataqueEnemigo=="Empeleon"){
        vidasJugador -=10;
        mostrarMensajeDefensa(ataqueJugador,ataqueEnemigo,10)
    }else if(ataqueJugador=="Raichu" && ataqueEnemigo=="Empeleon"|| ataqueJugador=="Aron" && ataqueEnemigo=="Pikachu"|| ataqueJugador=="Blastoise"&& ataqueEnemigo=="Golem"){
        vidasJugador -=20;
        mostrarMensajeDefensa(ataqueJugador,ataqueEnemigo,20)
    }else{
        mostrarMensajeDefensa(ataqueJugador,ataqueEnemigo,0)
    }
    if(inputElectrico2.checked|| inputRoca2.checked|| inputAgua2.checked){
        botonSiguente.style.display="block";
        botonDefensa.style.cursor="not-allowed"
        botonDefensa.disabled = true;
    }
    botonSiguente.addEventListener("click",botonesAtaqueAleatorio)
}

function mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,vida){
    let mensaje = `
      <p>${personajeJugador} ha atacado con el pokepon ${ataqueJugador}, ${personajeEnemigo} se ha defendido con 
      el pokemon ${ataqueEnemigo}, le has quitado ${vida} de vida.</p>
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
      <p>${personajeEnemigo} ha atacado con el pokemon ${ataqueEnemigo}, ${personajeJugador} se ha defendido con 
      el pokemon ${ataqueJugador}, te han quitado ${vida} de vida.</p>
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
            personajesLuchaEnemigo.innerHTML=mostrarImagen(jessie.foto,jessie.nombre,"imgJessie");
            personajeEnemigo = jessie.nombre;
        break;
        case 2:
            personajesLuchaEnemigo.innerHTML=mostrarImagen(james.foto,james.nombre,"imgJames");
            personajeEnemigo = james.nombre;
        break;
        case 3:
            personajesLuchaEnemigo.innerHTML=mostrarImagen(helio.foto,helio.nombre,"imgHelio");
            personajeEnemigo = helio.nombre;
            
    }                   
}

function mostrarImagen(direccion,nombre,id){
    let imagen = `
    <img src=${direccion} alt=${nombre} id=${id}>
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