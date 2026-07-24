/*==========================================================
VXPLAY SOFTWARE STUDIO
api/contact.js

Función serverless (Vercel) que envía las cotizaciones
usando la cuenta de Gmail del estudio vía SMTP.

Las credenciales NUNCA van aquí: se leen de variables de
entorno configuradas en el panel de Vercel.

  GMAIL_USER          vxplay.co@gmail.com
  GMAIL_APP_PASSWORD  contraseña de aplicación (16 letras)
  CONTACT_TO          opcional, destino. Por defecto GMAIL_USER
  TELEGRAM_BOT_TOKEN  opcional, alerta instantánea
  TELEGRAM_CHAT_ID    opcional, a quién avisa el bot

Se usa contraseña de aplicación porque Google bloquea el
acceso SMTP con la contraseña normal de la cuenta.

Telegram es opcional: si no están sus dos variables, el
aviso se omite en silencio y el correo se envía igual.
==========================================================*/

const nodemailer = require("nodemailer");


// Topes de longitud: evitan que alguien intente meter
// megabytes de texto en un correo.
const LIMITS = {

    nombre: 100,

    email: 150,

    empresa: 120,

    mensaje: 5000

};


module.exports = async (req, res) => {

    if (req.method !== "POST") {

        res.setHeader("Allow", "POST");

        return res.status(405).json({

            success: false,

            message: "Método no permitido."

        });

    }

    const user = process.env.GMAIL_USER;

    const pass = process.env.GMAIL_APP_PASSWORD;

    const to = process.env.CONTACT_TO || user;

    if (!user || !pass) {

        console.error("Faltan GMAIL_USER o GMAIL_APP_PASSWORD");

        return res.status(500).json({

            success: false,

            message: "El servidor de correo no está configurado."

        });

    }

    const body = typeof req.body === "string"
        ? safeParse(req.body)
        : (req.body || {});

    // Honeypot: si viene relleno es un bot. Respondemos
    // éxito para no darle pistas, pero no enviamos nada.
    if (body.botcheck) {

        return res.status(200).json({ success: true });

    }

    const data = {

        nombre: clean(body.nombre, LIMITS.nombre),

        email: clean(body.email, LIMITS.email),

        empresa: clean(body.empresa, LIMITS.empresa) || "No especificada",

        mensaje: clean(body.mensaje, LIMITS.mensaje)

    };

    const error = validate(data);

    if (error) {

        return res.status(400).json({ success: false, message: error });

    }

    // Telegram va primero y aparte: es el canal de alerta,
    // así que debe dispararse aunque el correo falle después.
    await notifyTelegram(data);

    try {

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: { user, pass }

        });

        await transporter.sendMail({

            from: `"Portafolio VXPLAY" <${user}>`,

            to,

            // Al responder en Gmail, la respuesta va al cliente.
            replyTo: `"${data.nombre}" <${data.email}>`,

            subject: `Nueva cotización de ${data.nombre}`,

            text: buildText(data),

            html: buildHtml(data)

        });

        // La confirmación al cliente es un extra: si falla,
        // la cotización ya llegó y no debe romper la respuesta.
        try {

            await transporter.sendMail({

                from: `"VXPLAY Software Studio" <${user}>`,

                to: data.email,

                replyTo: to,

                subject: "Recibimos tu solicitud — VXPLAY",

                text: buildReplyText(data),

                html: buildReplyHtml(data)

            });

        } catch (err) {

            console.error("Auto-respuesta no enviada:", err.message);

        }

        return res.status(200).json({ success: true });

    } catch (err) {

        console.error("Fallo al enviar:", err.message);

        return res.status(500).json({

            success: false,

            message: "No se pudo enviar el mensaje."

        });

    }

};


/*==========================================================
ALERTA POR TELEGRAM

Nunca lanza excepción: una alerta caída no puede tumbar
una cotización que sí llegó.
==========================================================*/

async function notifyTelegram(data) {

    const token = process.env.TELEGRAM_BOT_TOKEN;

    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) return;

    const text = [

        "🔔 <b>Nueva cotización</b>",

        "",

        `👤 <b>Nombre:</b> ${escapeHtml(data.nombre)}`,

        `📧 <b>Correo:</b> ${escapeHtml(data.email)}`,

        `🏢 <b>Empresa:</b> ${escapeHtml(data.empresa)}`,

        "",

        `💬 ${escapeHtml(data.mensaje)}`

    ].join("\n");

    try {

        // Telegram corta a los 4096 caracteres; el mensaje ya
        // viene topado, pero por si se suman los emojis.
        const response = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({

                    chat_id: chatId,

                    parse_mode: "HTML",

                    disable_web_page_preview: true,

                    text: text.slice(0, 4000)

                })

            }
        );

        if (!response.ok) {

            const detail = await response.text();

            console.error("Telegram rechazó el aviso:", detail);

        }

    } catch (err) {

        console.error("Telegram no respondió:", err.message);

    }

}


/*==========================================================
UTILIDADES
==========================================================*/

function safeParse(raw) {

    try {

        return JSON.parse(raw);

    } catch {

        return {};

    }

}


function clean(value, max) {

    if (typeof value !== "string") return "";

    // \r\n fuera: son el vector clásico de inyección de
    // cabeceras en correo (Bcc: falsos, etc.).
    return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);

}


function validate(data) {

    if (data.nombre.length < 2) {

        return "Escribe tu nombre.";

    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {

        return "Escribe un correo electrónico válido.";

    }

    if (data.mensaje.length < 10) {

        return "Cuéntame un poco más sobre tu proyecto.";

    }

    return null;

}


function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

}


/*==========================================================
PLANTILLAS — AVISO PARA EL ESTUDIO
==========================================================*/

function buildText(data) {

    return [

        "Nueva solicitud de cotización",

        "",

        `Nombre:  ${data.nombre}`,

        `Correo:  ${data.email}`,

        `Empresa: ${data.empresa}`,

        "",

        "Mensaje:",

        data.mensaje

    ].join("\n");

}


function buildHtml(data) {

    const row = (label, value) => `
        <tr>
            <td style="padding:12px 0;border-bottom:1px solid #EEE;color:#777;width:110px;vertical-align:top;">${label}</td>
            <td style="padding:12px 0;border-bottom:1px solid #EEE;color:#111;">${escapeHtml(value)}</td>
        </tr>`;

    return `
    <div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;background:#FAFAF8;padding:32px;">
        <div style="max-width:560px;margin:0 auto;background:#FFF;border:1px solid #E6E6E6;border-radius:20px;padding:36px;">
            <p style="margin:0 0 6px;color:#888;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Portafolio VXPLAY</p>
            <h1 style="margin:0 0 26px;font-size:22px;color:#111;">Nueva solicitud de cotización</h1>
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
                ${row("Nombre", data.nombre)}
                ${row("Correo", data.email)}
                ${row("Empresa", data.empresa)}
            </table>
            <p style="margin:26px 0 8px;color:#777;font-size:15px;">Mensaje</p>
            <div style="background:#FAFAF8;border:1px solid #EEE;border-radius:14px;padding:18px;color:#111;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.mensaje)}</div>
            <p style="margin:26px 0 0;color:#999;font-size:13px;line-height:1.6;">
                Responde a este correo y tu respuesta le llegará directamente a ${escapeHtml(data.nombre)}.
            </p>
        </div>
    </div>`;

}


/*==========================================================
PLANTILLAS — CONFIRMACIÓN PARA EL CLIENTE
==========================================================*/

function buildReplyText(data) {

    return [

        `Hola ${data.nombre},`,

        "",

        "Recibimos tu solicitud y la estamos revisando.",

        "Te responderemos en menos de 24 horas.",

        "",

        "Esto fue lo que nos enviaste:",

        data.mensaje,

        "",

        "— VXPLAY Software Studio"

    ].join("\n");

}


function buildReplyHtml(data) {

    return `
    <div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;background:#FAFAF8;padding:32px;">
        <div style="max-width:560px;margin:0 auto;background:#FFF;border:1px solid #E6E6E6;border-radius:20px;padding:36px;">
            <p style="margin:0 0 6px;color:#888;font-size:13px;letter-spacing:1px;text-transform:uppercase;">VXPLAY Software Studio</p>
            <h1 style="margin:0 0 20px;font-size:22px;color:#111;">Hola ${escapeHtml(data.nombre)}, recibimos tu solicitud</h1>
            <p style="margin:0 0 18px;color:#444;font-size:15px;line-height:1.7;">
                Gracias por escribirnos. Ya estamos revisando tu proyecto y te responderemos
                en menos de 24 horas.
            </p>
            <p style="margin:0 0 8px;color:#777;font-size:15px;">Esto fue lo que nos enviaste:</p>
            <div style="background:#FAFAF8;border:1px solid #EEE;border-radius:14px;padding:18px;color:#111;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.mensaje)}</div>
            <p style="margin:26px 0 0;color:#999;font-size:13px;line-height:1.6;">
                Este mensaje es automático, pero puedes responderlo si necesitas añadir algo.
            </p>
        </div>
    </div>`;

}
