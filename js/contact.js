/*==========================================================
VXPLAY SOFTWARE STUDIO
contact.js

Envío real del formulario de cotización usando Web3Forms.
Los mensajes llegan a vxplay.co@gmail.com.

La ACCESS_KEY es pública por diseño (viaja en el cliente):
no es una contraseña, solo identifica el formulario. El
anti-spam va por honeypot + los filtros de Web3Forms.

Panel para cambiar la clave o el correo destino:
https://web3forms.com
==========================================================*/

const ACCESS_KEY = "6d60870c-142c-4d1b-8bfa-4eda7264ded8";

const ENDPOINT = "https://api.web3forms.com/submit";


document.addEventListener("DOMContentLoaded", () => {

    initContactForm();

});


/*==========================================================
INIT
==========================================================*/

function initContactForm() {

    const form = document.querySelector("#contact-form");

    if (!form) return;

    const button = form.querySelector("#contact-submit");

    const status = form.querySelector("#form-status");

    const originalLabel = button.textContent.trim();

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        // Limpia errores de un intento anterior.
        form.querySelectorAll(".has-error").forEach(el => {

            el.classList.remove("has-error");

        });

        const data = readForm(form);

        // Honeypot relleno = bot. Fingimos éxito y no enviamos.
        if (data.botcheck) {

            showStatus(status, "success", "¡Gracias! Te responderé pronto.");

            form.reset();

            return;

        }

        const errors = validate(form, data);

        if (errors.length) {

            showStatus(status, "error", errors[0]);

            return;

        }

        if (!ACCESS_KEY || ACCESS_KEY === "PEGA_AQUI_TU_ACCESS_KEY") {

            showStatus(
                status,
                "error",
                "El formulario aún no está conectado. Escríbeme a vxplay.co@gmail.com"
            );

            return;

        }

        setLoading(button, true, "Enviando...");

        showStatus(status, "", "");

        try {

            const response = await fetch(ENDPOINT, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Accept": "application/json"

                },

                body: JSON.stringify(buildPayload(data))

            });

            const result = await response.json().catch(() => ({}));

            if (response.ok && result.success) {

                form.reset();

                showStatus(
                    status,
                    "success",
                    "¡Mensaje enviado! Te responderé en menos de 24 horas."
                );

            } else {

                showStatus(
                    status,
                    "error",
                    "No se pudo enviar. Escríbeme a vxplay.co@gmail.com"
                );

            }

        } catch {

            showStatus(
                status,
                "error",
                "Sin conexión. Revisa tu internet o escríbeme a vxplay.co@gmail.com"
            );

        } finally {

            setLoading(button, false, originalLabel);

        }

    });

}


/*==========================================================
LECTURA Y VALIDACIÓN
==========================================================*/

function readForm(form) {

    const value = (name) => {

        const field = form.elements[name];

        return field ? field.value.trim() : "";

    };

    return {

        nombre: value("nombre"),

        email: value("email"),

        empresa: value("empresa"),

        mensaje: value("mensaje"),

        botcheck: form.elements["botcheck"]
            ? form.elements["botcheck"].checked
            : false

    };

}


function validate(form, data) {

    const errors = [];

    const mark = (name) => {

        const field = form.elements[name];

        if (field) field.classList.add("has-error");

    };

    if (data.nombre.length < 2) {

        errors.push("Escribe tu nombre.");

        mark("nombre");

    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {

        errors.push("Escribe un correo electrónico válido.");

        mark("email");

    }

    if (data.mensaje.length < 10) {

        errors.push("Cuéntame un poco más sobre tu proyecto (mínimo 10 caracteres).");

        mark("mensaje");

    }

    return errors;

}


/*==========================================================
PAYLOAD

"from_name" es el remitente que se ve en la bandeja y
"replyTo" hace que al responder el correo vaya al cliente.
==========================================================*/

function buildPayload(data) {

    const empresa = data.empresa || "No especificada";

    return {

        access_key: ACCESS_KEY,

        subject: `Nueva cotización de ${data.nombre}`,

        from_name: "Portafolio VXPLAY",

        replyTo: data.email,

        Nombre: data.nombre,

        Correo: data.email,

        Empresa: empresa,

        Mensaje: data.mensaje,

        botcheck: false

    };

}


/*==========================================================
UI
==========================================================*/

function setLoading(button, loading, label) {

    button.disabled = loading;

    button.classList.toggle("is-loading", loading);

    button.textContent = label;

}


function showStatus(status, type, message) {

    if (!status) return;

    status.textContent = message;

    status.className = "form-status";

    if (type) status.classList.add(`is-${type}`);

    if (message) status.classList.add("is-visible");

}
