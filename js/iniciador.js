const puntaje = document.querySelector("#total");
let nivelActual = 0;
let botonPresionado = false;

// Bloque A - ¿Cómo se van a contar los fallos al responder?

// Bloque A


// Bloque B - Obtener una pregunta de forma aleatoria
const preguntaActual = preguntas[nuevaPregunta()]
// Bloque B




/* 
🪧 Este código se encargara de recuperar la pregunta y sus respuestas, pero para funcionar
debe existir la variable preguntaActual 👀
 */
const identificador = document.querySelector("#identificador");
identificador.textContent = preguntaActual?.id;

preguntaActual?.respuestas.forEach((r, i) => {
    agregarRespuesta(i, r);
});
/* 🪧 */




// Bloque C - Establecer los sonidos del juego

// Bloque C