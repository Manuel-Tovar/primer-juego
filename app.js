// Llamando a los Jugadores en el HTML en la Seccion "seleccionar-jugada"

const sectionSeleccionarJugador = document.getElementById('seleccionar-jugada') 
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")

const botonEleccionJugador = document.getElementById('boton-jugada')

// Llamando a los botones de HTML en la seccion "seleccionar-ataque"

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')


const botonpiedra = document.getElementById('boton-piedra')
const botonPapel = document.getElementById('boton-papel')
const botonTijera = document.getElementById('boton-tijera')

const sectionMensajes = document.getElementById("resultado")

const sectionReiniciar = document.getElementById('reiniciar')
const botonReiniciar = document.getElementById('boton-reiniciar')

const spanJugador = document.getElementById('eleccion-jugador')
const spanVidasJugador = document.getElementById('vidas-jugador')
const sectionAtaqueJugador = document.getElementById("ataques-del-jugador")


const spanJugadaEnemigo = document.getElementById('eleccion-enemigo')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionAtaqueEnemigo = document.getElementById("ataques-del-enemigo")


let jugador = []
let opcionesJugador
let inputAli 
let inputManuel 
let inputAlicia 
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 5
let vidasEnemigo = 5 
let enemigo = []

class Jugadores {
    constructor (nombre, apellido, foto, vida) {
        this.nombre = nombre
        this.apellido = apellido
        this.foto = foto
        this.vida = vida
    }
}

class Enemigos {
    constructor (nombre, apellido) {

        this.nombre = nombre
        this.apellido = apellido
    }
}

let manuel = new Jugadores ("Manuel ", "Tovar", "./imagenes/manuel.jpg", 5)
let ali = new Jugadores ("Ali ","Tovar", "./imagenes/ali.jpg", 5 )
let alicia = new Jugadores ("Alicia ", "Tovar", "./imagenes/alicia.jpg", 5)

let milagros = new Enemigos ("Milagros ", "Marquez")
let papaLelo = new Enemigos ("Papa ", "Lelo")
let jorkellys = new Enemigos ("Jorkellys ", "Susej")

jugador.push(manuel,ali,alicia)

enemigo.push(milagros,papaLelo,jorkellys)

jugador.forEach((jugadorArreglo) => {

    opcionesJugador = `
    <input type="radio" name="jugador" id= ${jugadorArreglo.nombre} /> 
    <label class="tarjeta-de-jugador" for=${jugadorArreglo.nombre}>
        <p>${jugadorArreglo.nombre} ${jugadorArreglo.apellido} </p>
        <img src=${jugadorArreglo.foto} alt=${jugadorArreglo.nombre} >

    </label>
    
    `
    contenedorTarjetas.innerHTML += opcionesJugador
    
     inputAli = document.getElementById('Ali')
     inputManuel = document.getElementById('Manuel')
     inputAlicia = document.getElementById('Alicia')
});



function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'

    sectionReiniciar.style.display = 'none'
    
    botonEleccionJugador.addEventListener('click', seleccionarJugador)

    botonpiedra.addEventListener('click', ataquePiedra)
    
    botonPapel.addEventListener('click', ataquePapel)
    
    botonTijera.addEventListener('click', ataqueTijera)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)

}

window.addEventListener('load', iniciarJuego)

function seleccionarJugador() {

    sectionSeleccionarJugador.style.display = 'none'   
    
    sectionSeleccionarAtaque.style.display = 'flex'
    
    if (inputAli.checked) {
        spanJugador.innerHTML = jugador[1].nombre + jugador[1].apellido
    } else if (inputManuel.checked) {
        spanJugador.innerHTML = jugador[0].nombre + jugador[0].apellido
    } else if (inputAlicia.checked) {
        spanJugador.innerHTML = jugador[2].nombre + jugador[2].apellido
    } else {      
        alert('Selecciona un Jugador 😒')
        reiniciarJuego()
    }

    seleccionarEnemigo()
}

function seleccionarEnemigo() {

    let jugadaAleatoria = aleatorio( 0, jugador.length -1 )

    spanJugadaEnemigo.innerHTML = enemigo[jugadaAleatoria].nombre + enemigo[jugadaAleatoria].apellido

}

function ataquePiedra() {

    ataqueJugador = "PIEDRA👊"
    ataqueAleatorioEnemigo()
}

function ataquePapel() {
    ataqueJugador = "PAPEL✋"
    ataqueAleatorioEnemigo()
}

function ataqueTijera() {
    ataqueJugador = "TIJERA✌"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "PIEDRA👊"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "PAPEL✋"
    } else {
        ataqueEnemigo = "TIJERA✌"
    }

    combate()
}

function combate() {
    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje(" 👍EMPATE👍 ")
    } else if(ataqueJugador == "PIEDRA👊" && ataqueEnemigo == "TIJERA✌") {
        crearMensaje(" 😲GANASTE🎉 " )
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = (vidasEnemigo + " Vidas" )
    } else if(ataqueJugador == "PAPEL✋" && ataqueEnemigo == "PIEDRA👊") {
        crearMensaje(" 😁GANASTE🎉 " )
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = (vidasEnemigo + " Vidas")
    } else if(ataqueJugador == "TIJERA✌" && ataqueEnemigo == "PAPEL✋") {
        crearMensaje(" 😜GANASTE🎉 ")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = (vidasEnemigo + " Vidas" )
    } else {
        crearMensaje(" 😰PERDISTE😭 ")
        vidasJugador--
        spanVidasJugador.innerHTML = (vidasJugador + " Vidas")
    }

    revisarVidas()
}

function revisarVidas() {

    if (vidasEnemigo == 0) {
        crearMensajeFinal("🎉 FELICITACIONES! GANASTE 🎉 "  )
    } else if (vidasJugador == 0) {
        crearMensajeFinal(" 😭😢Lo siento, perdiste 😰😭 ")
    }
}

function crearMensaje(resultado) {

    let nuevoAtaqueJugador = document.createElement ("p")
    let nuevoAtaqueEnemigo = document.createElement ("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    sectionAtaqueJugador.innerHTML = ataqueJugador
    sectionAtaqueEnemigo.innerHTML = ataqueEnemigo
    

}


function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal

    botonpiedra.disabled = true
    
    botonPapel.disabled = true
    
    botonTijera.disabled = true

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


