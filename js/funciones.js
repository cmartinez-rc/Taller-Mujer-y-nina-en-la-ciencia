/*
Se ha decidido que este código sea proporcionado por la complejidad y/o agobiante que pudiera llegar a ser
*/
function agregarRespuesta(contador, respuesta) {
    const puntos = puntosAleatorios(contador);
    const contenedor = document.querySelector("#respuestas");
    contenedor.insertAdjacentHTML(
        "beforeend",
        `
            <div class="respuesta respuesta${contador + 1}" data-puntos="${puntos}">
                <span>${contador + 1}</span><span>${respuesta}</span><span>${puntos}</span>
            </div>
            `,
    );
}

function puntosAleatorios(contador) {
    const limite = 50 - contador * 6;
    return Math.floor(Math.random() * (limite - (limite - 6) + 1)) + (limite - 6);
}

function activarJugador(boton) {
    if (botonPresionado) return;
    let jugador
    botonPresionado = true
    if (boton == 1) {
        jugador = document.querySelector("#jugador1");
    } else {
        jugador = document.querySelector("#jugador2");
    }
    jugador.style.display = "block";
    setTimeout(() => {
        jugador.style.display = "none";
        botonPresionado = false;
    }, 3000); /* ✏️ Tiempo en milisegundos que durará el color del jugador que presionó primero su botón */
}

function buscarRespuesta(numeroRespuesta) {
    const respuesta = document.querySelector(".respuesta" + numeroRespuesta);
    if (!respuesta.classList.contains("revelada")) {
        respuesta.classList.add("revelada");
        puntaje.textContent = +puntaje.textContent + +respuesta.dataset.puntos;
        return true
    }
    return false;
}

function revelarRespuestas() {
    const sinResponder = document.querySelectorAll('.respuesta:not(.revelada)')
    sinResponder.forEach(sr => sr.classList.toggle('mostrar'))
}

function mostrarFallo(repetir) {
    const emoji = "❌" /* ✏️ Emoji que se mostrará en los "fallos" de los jugadores */
    document.body.insertAdjacentHTML(
        "beforeend",
        `<div class="fallo">${emoji.repeat(repetir)}</div>`,
    );
    setTimeout(() => {
        document.querySelector(".fallo").remove();
    }, 1400); /* ✏️ Tiempo en milisegundos que durará el emoji de error en pantalla */
}

function nuevaPregunta() {
    const nievelesUsados =
        JSON.parse(localStorage.getItem("niveles_usados")) ?? [];
    if (nievelesUsados.length >= preguntas.length) return null;

    let nivel = Math.floor(Math.random() * preguntas.length);
    while (nievelesUsados.includes(nivel)) {
        nivel = Math.floor(Math.random() * preguntas.length);
    }
    nivelActual = nivel;
    return nivel;
}

function guardarAvance() {
    const nivelesUsados =
        JSON.parse(localStorage.getItem("niveles_usados")) ?? [];
    nivelesUsados.push(nivelActual);
    localStorage.setItem(
        "niveles_usados",
        JSON.stringify([...new Set(nivelesUsados)]),
    );
}

function musicaFundido(sonido, espera = 4) {
    let intervalo;
    sonido.play()
    setTimeout(() => {
        intervalo = setInterval(() => {
            sonido.volume -= .05
            if (sonido.volume < .05) {
                sonido.pause()
                clearInterval(intervalo)
            }
        }, 50);
    }, espera * 1000);
}

function generarPDF() {
    let contenido = `
        <html>
          <head>
            <title>Preguntas y respuestas</title>
            <style>
              body { font-family: Arial; padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
              h1 { text-align: center; }
              .card {
                border: 1px solid #ccc;
                padding: 10px;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
      `;

    preguntas.forEach((obj) => {
        contenido += `<div class="card"><strong>ID: ${obj.id}</strong><br>`;
        for (const key in obj) {
            if (key == "id") continue;
            if (key == "respuestas") {
                contenido += `<b>${key}:</b><br>`;
                contenido += `${obj[key].join("<br>")}`;
            } else {
                contenido += `<b>${key}:</b> ${obj[key]}<br>`;
            }
        }
        contenido += `</div>`;
    });

    contenido += `
      </body>
    </html>
  `;


    const ventana = window.open("", "_blank");
    ventana.document.write(contenido);
    ventana.focus();
    ventana.print();
    ventana.close();
}
