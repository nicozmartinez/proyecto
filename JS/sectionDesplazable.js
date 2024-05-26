//llamado a los botones e imagenes
const botonAnterior = document.querySelector('.anterior');
const botonSiguiente = document.querySelector('.siguiente');
const imagenes = document.querySelectorAll('.section-desplazable img');

//indice de imagen actual
let imagenActual = 0;

//muestra imagen actual
function mostrarImagen() {
    // Ocultar todas las imágenes
    imagenes.forEach(img => img.style.display = 'none');
    // Mostrar solo la imagen actual
    imagenes[imagenActual].style.display = 'block';
}


//imagen anterior
function imagenAnterior() {
    imagenActual--;
    if (imagenActual < 0) {
        imagenActual = imagenes.length - 1;
    }
    mostrarImagen();
}

//imagen siguiente
function imagenSiguiente() {
    imagenActual++;
    if (imagenActual >= imagenes.length) {
        imagenActual = 0;
    }
    mostrarImagen();
}

//botones de navegacion
botonAnterior.addEventListener('click', imagenAnterior);
botonSiguiente.addEventListener('click', imagenSiguiente);

//muestra la 1ra imagen
mostrarImagen();