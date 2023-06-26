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
const reinicar = document.getElementById('reiniciar-juego');
const logoIncio = document.getElementById('logo-inicio');
const barraVidaJugador = document.querySelector('#vida-progreso-jugador')
const barraVidaEnemigo = document.querySelector('#vida-progreso-enemigo')
const logoAtaDef= document.getElementById('logo-at-de')
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
let vidasJugador=100;
let vidasEnemigo=100;
let ataqueJugador;
let ataqueEnemigo;

class Personaje{
    constructor(nombre,foto){
        this.nombre = nombre;
        this.foto = foto;
    }
}

let ash = new Personaje("Ash", "assets/characters/ash1.png");
let brock = new Personaje("Brock","assets/characters/Brock1.png");
let dawn = new Personaje("Dawn","assets/characters/dawn1.png");

let jessie= new Personaje("Jessie","assets/characters/Jessie1.png");
let james= new Personaje("James","assets/characters/James1.png");
let helio = new Personaje("Helio","assets/characters/helio2.png");

personajes.push(ash,brock,dawn);
ataques.push(
    {id:"Pikachu", imgCarta:"assets/characters/cartaPikachu.png",imgPokemon:"assets/characters/pikachu.png",imgGif:"assets/characters/pikachu.gif"},
    {id:"Golem",  imgCarta:"assets/characters/cartaGolem.png",imgPokemon:"assets/characters/golem.png",imgGif:"assets/characters/golem.gif"},
    {id:"Empoleon", imgCarta:"assets/characters/cartaEmpoleon.png",imgPokemon:"assets/characters/empoleon.png",imgGif:"assets/characters/empoleon.gif"},
);

defensas.push(
    {id:"Jolteon", imgCarta:"assets/characters/cartaJolteon.png",imgPokemon:"assets/characters/jolteon.png",imgGif:"assets/characters/jolteon.gif"},
    {id:"Lairon", imgCarta:"assets/characters/cartaLairon.png",imgPokemon:"assets/characters/lairon.png",imgGif:"assets/characters/lairon.gif"},
    {id:"Blastoise", imgCarta:"assets/characters/cartaBlastoise.png",imgPokemon:"assets/characters/blastoise.png",imgGif:"assets/characters/blastoise.gif"},
);

botonPersonajeJugador.style.display="none";
sectionLucha.style.display="none";

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
    sectionLucha.style.display="grid";
    ModificarFondo('assets/font/lucha.gif');
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
    num = numAleatorio(1,2)
    botonesAtaqueAleatorio();
}

function botonesAtaqueAleatorio(){
    if(vidasJugador>0 && vidasEnemigo>0){
        if(num==1){
            condenedorDefensa.style.display="none"
            condenedorAtaque.style.display="block";
            logoAtaDef.innerHTML=mostrarImagen('assets/characters/logo-espada.png','logo-ataque','img-ataque')
            inputElectrico1 = document.getElementById('Pikachu');
            inputRoca1 = document.getElementById('Golem');
            inputAgua1 = document.getElementById('Empoleon');
            num=2;
            inputElectrico1.addEventListener("click",luchaAtaque)
            inputRoca1.addEventListener("click",luchaAtaque)
            inputAgua1.addEventListener("click",luchaAtaque)
        }else{
            condenedorAtaque.style.display="none";
            condenedorDefensa.style.display="block";
            logoAtaDef.innerHTML=mostrarImagen('assets/characters/logo-escudo.png','logo-defensa','img-defensa')
            inputElectrico2 = document.getElementById('Jolteon');
            inputRoca2 = document.getElementById('Lairon');
            inputAgua2 = document.getElementById('Blastoise');
            num=1;
            inputElectrico2.addEventListener("click",luchaDefensa)
            inputRoca2.addEventListener("click",luchaDefensa)
            inputAgua2.addEventListener("click",luchaDefensa) 
        }
    }else{
        logoAtaDef.style.display="none";
        resultadoFinal();
    }
}

function luchaAtaque(){
    ataqueJugador = (inputElectrico1.checked)? "Pikachu": (inputRoca1.checked)? "Golem":"Empoleon";
    let numA = (ataqueJugador=="Pikachu")?0: (ataqueJugador=="Golem")?1:2;
    ataqueEnemigo=ataqueEnemigoAleatorio("Jolteon","Lairon","Blastoise");
    let numB = (ataqueEnemigo=="Jolteon")?0: (ataqueEnemigo=="Lairon")?1:2;
    if(ataqueJugador=="Pikachu" && ataqueEnemigo=="Jolteon"|| ataqueJugador=="Golem" && ataqueEnemigo=="Lairon"|| ataqueJugador=="Empoleon"&& ataqueEnemigo=="Blastoise"){
        vidasEnemigo -=10;
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,10,1,ataques,numA,defensas,numB)
        if(vidasEnemigo<0){
            vidasEnemigo =0;
        }
        barraVidaEnemigo.style.width= vidasEnemigo+"%";
        botonesAtaqueAleatorio()
    }else if(ataqueJugador=="Pikachu" && ataqueEnemigo=="Lairon"|| ataqueJugador=="Golem" && ataqueEnemigo=="Blastoise"|| ataqueJugador=="Empoleon"&& ataqueEnemigo=="Jolteon"){
        vidasEnemigo -=20;
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,20,1,ataques,numA,defensas,numB)
        if(vidasEnemigo<0){
            vidasEnemigo =0;
        }
        barraVidaEnemigo.style.width= vidasEnemigo+"%";
        botonesAtaqueAleatorio()
    }else{
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,0,1,ataques,numA,defensas,numB)
        botonesAtaqueAleatorio()
    }
}

function luchaDefensa(){
    ataqueJugador= (inputElectrico2.checked)?"Jolteon":(inputRoca2.checked)?"Lairon":"Blastoise";
    let numA = (ataqueJugador=="Jolteon")?0: (ataqueJugador=="Lairon")?1:2;
    ataqueEnemigo=ataqueEnemigoAleatorio("Pikachu","Golem","Empoleon");
    let numB = (ataqueEnemigo=="Pikachu")?0: (ataqueEnemigo=="Golem")?1:2;
    if(ataqueJugador=="Jolteon" && ataqueEnemigo=="Pikachu"|| ataqueJugador=="Lairon" && ataqueEnemigo=="Golem"|| ataqueJugador=="Blastoise"&& ataqueEnemigo=="Empoleon"){
        vidasJugador -=10;
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,10,2,defensas,numA,ataques,numB)
        if(vidasJugador<0){
            vidasJugador=0;
        }
        barraVidaJugador.style.width= vidasJugador+"%";
        botonesAtaqueAleatorio()
    }else if(ataqueJugador=="Jolteon" && ataqueEnemigo=="Empoleon"|| ataqueJugador=="Lairon" && ataqueEnemigo=="Pikachu"|| ataqueJugador=="Blastoise"&& ataqueEnemigo=="Golem"){
        vidasJugador -=20;
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,20,2,defensas,numA,ataques,numB)
        if(vidasJugador<0){
            vidasJugador=0;
        }
        barraVidaJugador.style.width= vidasJugador+"%";
        botonesAtaqueAleatorio()
    }else{
        mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,0,2,defensas,numA,ataques,numB)
        botonesAtaqueAleatorio()
    }
}

function resultadoFinal(){
    if(vidasJugador>vidasEnemigo){
        mensajeResultado.innerHTML= mostrarImagen('assets/font/logoVictoria.png','victoria','logo-victoria')
    }else{
        mensajeResultado.innerHTML= mostrarImagen('assets/font/logoDerrota.png','derrota','logo-derrota')
    }
}

function mostrarMensajeAtaque(ataqueJugador,ataqueEnemigo,vida,tipoAtaque,arryA,indiceA,arryB,indiceB){
    let tipo = (tipoAtaque==1)? `${personajeJugador} ha atacado con el pokemon ${ataqueJugador}, ${personajeEnemigo} se ha defendido con 
    el pokemon ${ataqueEnemigo}, le has quitado ${vida} de vida.`: `${personajeEnemigo} ha atacado con el pokemon ${ataqueEnemigo}, ${personajeJugador} se ha defendido con 
    el pokemon ${ataqueJugador}, te han quitado ${vida} de vida.`
    let mensaje = `
    <input type="checkbox" id="btn-modal">
    <div class="contenedor-mensaje">
        <div class="contenido-mensaje">
            <p>${tipo}</p>
            <div class="model-pokemones">
                <img width='100px' height='150px' src=${arryA[indiceA].imgGif}></img>
                <img width='100px' height='150px' src=${arryB[indiceB].imgGif} ></img>
            </div>
            <div class="btn-cerrar">
                <label for="btn-modal">x</label>
            </div>
        </div>
    </div>
    `
    mensajeResultado.innerHTML = mensaje;
}

function mostrarAtaquesDefensas(arry,botones){
    for(let i=0; i<arry.length;i++){
        let imgLucha = `
        <input type="radio" name="ataques-Defensa" id=${arry[i].id}>
        <label id=${arry[i].id} class="img-ataques-defensa" for=${arry[i].id}>
            <div class="carta">
                <img src=${arry[i].imgCarta} alt=${arry[i].id} class="carta-pokemon">
                <img src=${arry[i].imgPokemon} alt=${arry[i].id} class="pokemon">
            </div>
        </label>
        `
        botones.innerHTML += imgLucha;
    }
}

function enemigoAleatorio(){
    let num = numAleatorio(1,3);
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
    let num = numAleatorio(1,3)
    return (num==1)? opcion1: (num==2)? opcion2: opcion3;
}

function numAleatorio(min,max){
    return Math.floor(Math.random()* (max-min+1)+min)
}


function reiniciarJuego(){
    location.reload();
}

inicio.addEventListener('click',inicioJuego);