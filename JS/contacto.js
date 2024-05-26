document
  .querySelector(".form-contacto")
  .addEventListener("submit", function (event) {
    const name = document.querySelector('.simple_input[type="text"]').value;
    const email = document.querySelector('.simple_input[type="email"]').value;
    const checkbox = document.getElementById("terms-checkbox");

    if (!name) {
      alert("Por favor, ingrese su nombre.");
      event.preventDefault();
    } else if (!email) {
      alert("Por favor, ingrese su correo electrónico.");
      event.preventDefault();
    } else if (!email.includes("@")) {
      alert("Por favor, ingrese un correo electrónico válido.");
      event.preventDefault();
    } else if (!checkbox.checked) {
      alert("Debe aceptar los terminos y condiciones para continuar");
      event.preventDefault();
    } else {
      console.log([
        {
          "nombre: ": name,
          "email: ": email,
        },
      ]);
      //   event.preventDefault();
    }
  });
