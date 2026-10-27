/* Errores de tipeo frecuentes en el dominio del correo. Algunos (gmil.com, hotmial.com) existen y reciben
 * correo de terceros, así que un error así manda los avisos de Medify a un desconocido.
 * Misma lista que medify-api/utils/correo.js (la API también los rechaza). */
const DOMINIOS_MAL_ESCRITOS = {
  "gmil.com": "gmail.com", "gmal.com": "gmail.com", "gmai.com": "gmail.com", "gmial.com": "gmail.com",
  "gamil.com": "gmail.com", "gnail.com": "gmail.com", "gmaill.com": "gmail.com", "gmail.co": "gmail.com",
  "gmail.con": "gmail.com", "gmail.cl": "gmail.com", "gmail.cm": "gmail.com", "gmali.com": "gmail.com",
  "hotmial.com": "hotmail.com", "hotmal.com": "hotmail.com", "hotmil.com": "hotmail.com", "hotmai.com": "hotmail.com",
  "hotmail.con": "hotmail.com", "hotmail.co": "hotmail.com", "hormail.com": "hotmail.com", "homail.com": "hotmail.com",
  "outlok.com": "outlook.com", "outllok.com": "outlook.com", "outlook.con": "outlook.com", "otlook.com": "outlook.com",
  "yahooo.com": "yahoo.com", "yaho.com": "yahoo.com", "yahoo.con": "yahoo.com",
  "iclod.com": "icloud.com", "icloud.co": "icloud.com", "icoud.com": "icloud.com",
};

/* Devuelve el correo corregido si el dominio es un error típico (ej. "ana@gmil.com" → "ana@gmail.com"), o null */
export function sugerirCorreo(email) {
  const [usuario, dominio] = String(email ?? "").trim().toLowerCase().split("@");
  const correcto = dominio && DOMINIOS_MAL_ESCRITOS[dominio];
  return usuario && correcto ? `${usuario}@${correcto}` : null;
}
