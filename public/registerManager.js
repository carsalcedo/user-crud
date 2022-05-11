const d = document,
     $formulario = d.getElementById('formulario'),
     $inputs = d.querySelectorAll('#formulario input'),
     $table = d.querySelector(".crud-table"),
	 $title = d.querySelector(".crud-title"),
	 $template = d.getElementById("crud-template").content,
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

const getAll = async () =>{
	try {
		let res = await fetch("http://localhost:3000/user"),
            json = await res.json();

			if (!res.ok) throw { status: res.status, statusText: res.statusText};
			console.log(json);
			json.forEach(el =>{
				$template.querySelector(".name").textContent = el.nombre;
				$template.querySelector(".lastname").textContent = el.apellido;
				$template.querySelector(".username").textContent = el.username;
				$template.querySelector(".email").textContent = el.email;
				$template.querySelector(".telephone").textContent = el.telefono;
				$template.querySelector(".country").textContent = el.pais;
				$template.querySelector(".documentT").textContent = el.documento;
				$template.querySelector(".ci").textContent = el.ci;
				$template.querySelector(".edit").dataset.id = el._id;
				$template.querySelector(".edit").dataset.name = el.nombre;
				$template.querySelector(".edit").dataset.lastname = el.apellido;
				$template.querySelector(".edit").dataset.username = el.username;
				$template.querySelector(".edit").dataset.email = el.email;
				$template.querySelector(".edit").dataset.telephone = el.telefono;
				$template.querySelector(".edit").dataset.country = el.pais;
				$template.querySelector(".edit").dataset.documentT = el.documento;
				$template.querySelector(".edit").dataset.ci = el.ci;
				$template.querySelector(".delete").dataset.id = el._id;
				

				let $clone = d.importNode($template, true);
				$fragment.appendChild($clone);

			});
			$table.querySelector("tbody").appendChild($fragment);
	} catch (err) {
		console.log(err)
		let message = err.statusText || "ocurrió error";
            $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
	}
}

d.addEventListener("DOMContentLoaded", getAll);



/*$formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.usuario && campos.nombre && campos.apellido && campos.usuario && campos.correo && campos.telefono, campos.country, campos.ci){
		$formulario.reset();

		d.getElementById('mensaje-exito').classList.add('active');
        d.getElementById('mensaje').classList.remove('active');
		setTimeout(() => {
			d.getElementById('mensaje-exito').classList.remove('active');
            registerForm.classList.remove('active')
		}, 2000);

		d.querySelectorAll('.correcto').forEach((icono) => {
			icono.classList.remove('correcto');
		});
	} else {
		d.getElementById('mensaje').classList.add('active');
	}
});*/