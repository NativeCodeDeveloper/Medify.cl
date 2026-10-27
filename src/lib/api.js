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

/* Achica la foto en el navegador antes de subirla (máx. 1200px, JPEG ~85%): una foto de celular de 4 MB
 * queda en ~150 KB, sube rápido y no choca con el límite de 3 MB de la API. */
async function reducirImagen(file, max = 1200) {
  if (!file.type.startsWith("image/")) throw new ApiError(400, "El archivo debe ser una imagen");
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) throw new ApiError(400, "No pudimos leer la imagen. Prueba con JPG o PNG.");
  const escala = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * escala);
  canvas.height = Math.round(bitmap.height * escala);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", 0.85));
}

/* Sube una foto de perfil/logo (multipart, campo "foto") y devuelve la cuenta actualizada */
export async function subirFoto(path, file, auth) {
  const form = new FormData();
  form.append("foto", await reducirImagen(file), "foto.jpg");
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
