// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Seleccionar elementos del DOM
const inputAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');

// Array para almacenar los nombres
let nombres = [];

// Función para actualizar la lista de amigos
function actualizarListaAmigos() {
    listaAmigos.innerHTML = "";

    nombres.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;

        // Botón para eliminar el nombre (más pequeño)
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '❌'; // Icono de "X" para eliminar
        botonEliminar.style.fontSize = '12px'; // Tamaño más pequeño
        botonEliminar.style.marginLeft = '10px'; // Espaciado
        botonEliminar.addEventListener('click', () => eliminarAmigo(nombre));
        li.appendChild(botonEliminar);

        listaAmigos.appendChild(li);
    });
}

// Función para agregar un nombre a la lista
function agregarAmigo() {
    const nombre = inputAmigo.value.trim();

    // Validación de campo vacío
    if (nombre === '') {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }

    // Validación de caracteres permitidos (letras, espacios, tildes, ñ, guiones, apóstrofes)
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(nombre)) {
        alert('Por favor, ingresa un nombre válido (solo letras, espacios, tildes, ñ, guiones o apóstrofes).');
        return;
    }

    // Validación de nombres repetidos
    if (nombres.some(n => n.toLowerCase() === nombre.toLowerCase())) {
        alert('Este nombre ya está en la lista.');
        return;
    }

    nombres.push(nombre);
    inputAmigo.value = '';
    actualizarListaAmigos();
}

// Función para eliminar un nombre de la lista
function eliminarAmigo(nombre) {
    nombres = nombres.filter(n => n !== nombre);
    actualizarListaAmigos();
}

// Función para limpiar toda la lista y reiniciar el juego
function limpiarLista() {
    nombres = [];
    resultado.innerHTML = ''; // Limpiar el resultado del sorteo
    actualizarListaAmigos();
}

// Función para realizar el sorteo
function sortearAmigo() {
    if (nombres.length === 0) {
        alert('Debes agregar al menos un nombre para realizar el sorteo.');
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * nombres.length);
    const amigoSecreto = nombres[indiceAleatorio];

    resultado.innerHTML = `
        <li>¡El amigo secreto es: <strong>${amigoSecreto}</strong>!</li>
        <button class="button-clear" onclick="limpiarLista()">Jugar Nuevamente</button>
    `;
}

// Asignar eventos a los botones
document.querySelector('.button-add').addEventListener('click', agregarAmigo);
document.querySelector('.button-draw').addEventListener('click', sortearAmigo);