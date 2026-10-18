// Fecha del evento: 25 de octubre de 2026 a las 14:00
// En JavaScript los meses empiezan en 0, por eso octubre es el 9
const fechaEvento = new Date(2026, 9, 25, 14, 0, 0);

function actualizarCuenta() {
    const ahora = new Date();
    const diferencia = fechaEvento - ahora; // resultado en milisegundos

    // Si ya llegó la fecha, dejamos todo en cero
    if (diferencia <= 0) {
        document.getElementById("dias").textContent = "0";
        document.getElementById("horas").textContent = "0";
        document.getElementById("minutos").textContent = "0";
        document.getElementById("segundos").textContent = "0";
        return;
    }

    // Convertimos los milisegundos a días, horas, minutos y segundos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    // Escribimos cada número en su lugar de la tarjeta
    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

// La llamamos una vez para que no aparezca vacío el primer segundo
actualizarCuenta();

// Y luego se repite cada 1000 milisegundos (1 segundo)
setInterval(actualizarCuenta, 1000);

// Buscamos la tarjeta del mensaje
const tarjetaMensaje = document.querySelector(".tarjeta-mensaje");

// El observador avisa cuando la tarjeta entra en la pantalla
const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            // Le agregamos la clase "visible" y el CSS hace la animación
            entrada.target.classList.add("visible");
        }
    });
}, { threshold: 0.3 }); // se activa cuando se ve el 30% de la tarjeta

observador.observe(tarjetaMensaje);

// Buscamos la ventana y el video
const modalVideo = document.getElementById("modalVideo");
const videoUltrasonido = document.getElementById("videoUltrasonido");

// Cuando la ventana termina de cerrarse, pausamos el video y lo regresamos al inicio
modalVideo.addEventListener("hidden.bs.modal", function () {
    videoUltrasonido.pause();
    videoUltrasonido.currentTime = 0;
});

// Buscamos la carta de los papás
const tarjetaPapas = document.querySelector(".tarjeta-papas");

// El observador avisa cuando la carta entra en la pantalla
const observadorPapas = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

observadorPapas.observe(tarjetaPapas);

// Busca TODOS los elementos que tengan la clase "revelar"
const elementosRevelar = document.querySelectorAll(".revelar");

// El observador avisa cuando alguno entra en la pantalla
const observadorRevelar = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

// Le pedimos al observador que vigile cada uno
elementosRevelar.forEach(function (elemento) {
    observadorRevelar.observe(elemento);
});
// ===== CONFIRMAR ASISTENCIA POR WHATSAPP =====

// 1. TU NÚMERO DE WHATSAPP
// Se escribe así: 52 + tu número de 10 dígitos, todo junto,
// sin +, sin espacios y sin guiones. Ejemplo: "524771234567"
const numeroWhatsApp = "525664368433";

// 2. Buscamos en la página los elementos que vamos a usar
const formularioConfirmar = document.getElementById("formConfirmar");
const campoNombre = document.getElementById("nombreInvitado");
const campoPersonas = document.getElementById("personasInvitado");
const campoMensaje = document.getElementById("mensajeInvitado");
const avisoNombre = document.getElementById("avisoNombre");
const textoGracias = document.getElementById("textoGracias");

// 3. Esto se ejecuta cuando el invitado toca el botón de confirmar
formularioConfirmar.addEventListener("submit", function (evento) {

    // Evitamos que el formulario recargue la página
    evento.preventDefault();

    // Leemos lo que escribió el invitado. trim() quita los espacios sobrantes
    const nombre = campoNombre.value.trim();
    const personas = campoPersonas.value;
    const mensaje = campoMensaje.value.trim();

    // Si el nombre quedó vacío, mostramos el aviso y paramos aquí
    if (nombre === "") {
        avisoNombre.hidden = false;
        campoNombre.focus();
        return;
    }
    avisoNombre.hidden = true;

    // Armamos el mensaje de WhatsApp. \n significa "salto de línea"
    let texto = "¡Hola! Soy " + nombre + " y confirmo mi asistencia a la revelación de género de Sarai y Angel, el domingo 25 de octubre.";
    texto = texto + "\nPersonas que asistirán: " + personas;

    // Si dejó un mensaje, lo agregamos
    if (mensaje !== "") {
        texto = texto + "\nMensaje: " + mensaje;
    }

    // Convertimos el texto para que se pueda usar dentro de un enlace
    const enlace = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(texto);

    // Abrimos WhatsApp en otra pestaña
    const ventana = window.open(enlace, "_blank");

    // Si el navegador bloqueó la pestaña nueva, abrimos WhatsApp en la misma
    if (ventana === null) {
        window.location.href = enlace;
    }

    // Mostramos el mensaje de gracias
    textoGracias.textContent = "¡Gracias, " + nombre + "! Se abrió WhatsApp con tu mensaje. Solo falta que toques enviar.";
    textoGracias.hidden = false;
});