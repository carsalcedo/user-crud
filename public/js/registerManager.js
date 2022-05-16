const d = document,
     $formulario = d.getElementById('formulario'),
     $inputs = d.querySelectorAll('#formulario input'),
     $table = d.querySelector(".crud-table"),
	 $title = d.querySelector(".crud-title"),
	 //$template = d.getElementById("crud-template").content,
     $fragment = d.createDocumentFragment();

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    country: /^[a-zA-ZÀ-ÿ\s]{1,15}$/,
	ci: /^\d{7,9}$/ // 7 a 9 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	apellido: false,
	correo: false,
	telefono: false,
    country: false,
    ci: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
        case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "country":
			validarCampo(expresiones.country, e.target, 'country');
		break;
		case "ci":
			validarCampo(expresiones.ci, e.target, 'ci');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		d.getElementById(`grupo__${campo}`).classList.remove('incorrecto');
		d.getElementById(`grupo__${campo}`).classList.add('correcto');
		d.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		d.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		d.querySelector(`#grupo__${campo} .input-error`).classList.remove('active');
		campos[campo] = true;
	} else {
		d.getElementById(`grupo__${campo}`).classList.add('incorrecto');
		d.getElementById(`grupo__${campo}`).classList.remove('correcto');
		d.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		d.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		d.querySelector(`#grupo__${campo} .input-error`).classList.add('active');
		campos[campo] = false;
	}
}

$inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});


d.addEventListener("submit", async e =>{
	if(e.target === $formulario){
		e.preventDefault();

		if(campos.nombre && campos.apellido && campos.usuario && campos.correo && campos.telefono && campos.ci ){
			d.getElementById('mensaje-exito').classList.add('active');
			d.getElementById('mensaje').classList.remove('active');
			setTimeout(() => {
				d.getElementById('mensaje-exito').classList.remove('active');
			}, 2000);
			
		}else{
			d.getElementById('mensaje').classList.add('active');
		}

		if(!e.target.id.value){
			//CREATE_POST
			try {
				let options = {
					method: "POST",
					headers: {
						"Content-type": "application/json; charset=utf-8"
					},
					body: JSON.stringify({
						nombre: e.target.nombre.value,
						apellido: e.target.apellido.value,
						username: e.target.usuario.value,
						email: e.target.correo.value,
						telefono: e.target.telefono.value,
						pais: e.target.country.value,
						documento: e.target.documento.value,
						ci: e.target.ci.value,
					})
				},
				res = await fetch("http://localhost:3000/user/create", options),
				data = await res.json();

				if (!res.ok) throw { status: res.status, statusText: res.statusText };
				location.reload();
				

			} catch (err) {
				console.log(err)
				let message = err.statusText || "Ocurrió un error";
				$formulario.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
			}
		}else{
			//UPDATE_PUT
			try {
				let options = {
					method: "PUT",
					headers: {
						"Content-type": "application/json; charset=utf-8"
					},
					body: JSON.stringify({
						nombre: e.target.nombre.value,
						apellido: e.target.apellido.value,
						username: e.target.usuario.value,
						email: e.target.correo.value,
						telefono: e.target.telefono.value,
						pais: e.target.country.value,
						documento: e.target.documento.value,
						ci: e.target.ci.value
					})
				},
				res = await fetch(`http://localhost:3000/user/update?userID=${e.target.id.value}`, options),
				json = await res.json();

				if (!res.ok) throw { status: res.status, statusText: res.statusText };
				location.reload();

			} catch (err) {
				let message = err.statusText || "Ocurrió un error";
				$formulario.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
			}
		}
	}

});


d.addEventListener("click", async e =>{
	if (e.target.matches(".edit")) {
		$title.textContent = "Update User";
		$formulario.nombre.value = e.target.dataset.nombre;
		$formulario.apellido.value = e.target.dataset.apellido;
		$formulario.usuario.value = e.target.dataset.username;
		$formulario.correo.value = e.target.dataset.email;
		$formulario.telefono.value = e.target.dataset.telefono;
		$formulario.country.value = e.target.dataset.pais;
		$formulario.documento.value = e.target.dataset.documento;
		$formulario.ci.value = e.target.dataset.ci;
		$formulario.id.value = e.target.dataset.id;
	}

	if (e.target.matches(".delete")) {
	let isDelete = confirm(`¿Estás seguro de eliminar el id ${e.target.dataset.id}?`);

	if (isDelete) {
	//Delete - DELETE
	try {
		let options = {
		method: "DELETE",
		headers: {
			"Content-type": "application/json; charset=utf-8"
		}
		},
		res = await fetch(`http://localhost:3000/user/delete?userID=${e.target.dataset.id}`, options),
		json = await res.json();

		if (!res.ok) throw { status: res.status, statusText: res.statusText };

		location.reload();
	} catch (err) {
		let message = err.statusText || "Ocurrió un error";
		alert(`Error ${err.status}: ${message}`);
	}
	}
 }
})