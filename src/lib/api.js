/* Cliente de la Medify API (medify-api, Node/Express).
 * NEXT_PUBLIC_API_URL apunta a la raíz de la API, ej: http://localhost:4010/api  ·  https://api.medifyclinic.cl/api
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4010/api").replace(/\/$/, "");

/* Dos sesiones independientes: la del profesional/centro (/mi-perfil) y la del equipo Medify (/dashboard) */
const KEYS = { cuenta: "medify_token", admin: "medify_admin_token" };

export function getToken(tipo = "cuenta") {
  try { return localStorage.getItem(KEYS[tipo]); } catch { return null; }
}

/* El token también va en una cookie para que middleware.js pueda bloquear /dashboard y /mi-perfil
 * en el servidor, antes de entregar la página (localStorage no viaja en la petición). */
function escribirCookie(nombre, valor, maxAge) {
  try {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${nombre}=${valor}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
  } catch { /* sin document (SSR) */ }
}

export function guardarToken(token, tipo = "cuenta") {
  try { localStorage.setItem(KEYS[tipo], token); } catch { /* modo privado: la sesión dura solo esta pestaña */ }
  escribirCookie(KEYS[tipo], token, 7 * 24 * 60 * 60); // misma duración que el JWT de la API
}

export function cerrarSesion(tipo = "cuenta") {
  try { localStorage.removeItem(KEYS[tipo]); } catch { /* nada que limpiar */ }
  escribirCookie(KEYS[tipo], "", 0);
}

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

/* fetch con JSON + token. `auth` = "cuenta" | "admin" | false.
 * Lanza ApiError con el mensaje que devuelve la API (ya viene en español). */
export async function apiFetch(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = auth ? getToken(auth) : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.");
  }

  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401 && auth) cerrarSesion(auth); // token vencido o inválido: se limpia para forzar login
    throw new ApiError(res.status, data?.error || "Ocurrió un error inesperado.", data?.details);
  }
  return data;
}

/* Convierte details de Zod ([{ campo: "body.email", mensaje }]) en un texto corto para mostrar */
export function mensajeDeError(err) {
  if (err?.details?.length) {
    return err.details.map(d => `${d.campo.replace(/^body\./, "")}: ${d.mensaje}`).join(" · ");
  }
  return err?.message || "Ocurrió un error inesperado.";
}

/* Lee la imagen para poder achicarla. createImageBitmap no existe o no decodifica algunos formatos en todos
 * los navegadores (ej. HEIC del iPhone/Mac): si falla, se intenta con un <img>. null = no se pudo leer. */
async function leerImagen(file) {
  if (typeof createImageBitmap === "function") {
    try { return await createImageBitmap(file); } catch { /* sigue con <img> */ }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } catch {
    return null;
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 0); // se libera después de dibujar
  }
}

const FORMATOS_DIRECTOS = ["image/jpeg", "image/png", "image/webp"];

/* Achica la foto en el navegador antes de subirla (máx. 1200px, JPEG ~85%): una foto de celular de 4 MB
 * queda en ~150 KB, sube rápido y no choca con el límite de 3 MB de la API. */
async function reducirImagen(file, max = 1200) {
  const img = await leerImagen(file);
  if (!img) {
    // No se pudo leer en este navegador: si ya es JPG/PNG/WebP liviano se sube tal cual
    if (FORMATOS_DIRECTOS.includes(file.type) && file.size <= 3 * 1024 * 1024) return file;
    throw new ApiError(400, "No pudimos procesar esa imagen. Usa una foto JPG o PNG (las fotos HEIC del iPhone no son compatibles).");
  }
  const ancho = img.width || img.naturalWidth;
  const alto = img.height || img.naturalHeight;
  const escala = Math.min(1, max / Math.max(ancho, alto));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(ancho * escala);
  canvas.height = Math.round(alto * escala);
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", 0.85));
  if (!blob) throw new ApiError(400, "No pudimos procesar esa imagen. Prueba con otra foto JPG o PNG.");
  return blob;
}

/* Sube una foto de perfil/logo (multipart, campo "foto") y devuelve la cuenta actualizada */
export async function subirFoto(path, file, auth) {
  const form = new FormData();
  const imagen = await reducirImagen(file);
  form.append("foto", imagen, imagen === file ? file.name : "foto.jpg");
  const token = getToken(auth);
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
  } catch {
    throw new ApiError(0, "No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.");
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data?.error || "No se pudo subir la imagen.");
  return data;
}
