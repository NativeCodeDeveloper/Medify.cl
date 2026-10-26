import { NextResponse } from "next/server";

/**
 * Middleware de subdominio — buscar.medify.cl
 *
 * Cuando un usuario entra por buscar.medify.cl, se sirve el marketplace
 * sin cambiar la URL visible en el browser (rewrite interno).
 *
 * medify.cl sigue funcionando exactamente igual (home, precios, unirse, etc.)
 */

const BUSCAR_HOSTS = [
  "buscar.medify.cl",
  "buscar.medifyclinic.cl",
];

/*
 * Rutas privadas: se bloquean en el servidor, antes de entregar la página.
 * El token (cookie que guarda src/lib/api.js al iniciar sesión) se valida contra la API,
 * que además revisa que el admin/cuenta siga activo. Sin sesión válida → al login.
 */
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4010/api").replace(/\/$/, "");
const PRIVADAS = [
  { prefijo: "/dashboard", cookie: "medify_admin_token", login: "/login",  verificar: "/auth/admin/yo" },
  { prefijo: "/mi-perfil", cookie: "medify_token",       login: "/acceso", verificar: "/auth/yo" },
];

async function sesionValida(token, ruta) {
  try {
    const res = await fetch(`${API_URL}${ruta}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false; // si la API no responde, se bloquea (falla cerrado)
  }
}

export async function middleware(request) {
  const host = request.headers.get("host") || "";
  const url  = request.nextUrl.clone();

  const privada = PRIVADAS.find(r => url.pathname === r.prefijo || url.pathname.startsWith(r.prefijo + "/"));
  if (privada) {
    const token = request.cookies.get(privada.cookie)?.value;
    if (!token || !(await sesionValida(token, privada.verificar))) {
      const login = new URL(privada.login, request.url);
      const res = NextResponse.redirect(login);
      if (token) res.cookies.delete(privada.cookie);
      return res;
    }
    return NextResponse.next();
  }

  const esBuscar = BUSCAR_HOSTS.some(h => host === h || host.startsWith("buscar."));

  if (!esBuscar) return NextResponse.next();

  /* La raíz "/" ya es el marketplace (src/app/page.jsx), no hace falta reescribirla */

  /*
   * Rutas que NO tienen sentido en buscar.medify.cl
   * → redirigir al home de medify.cl
   */
  const rutasExcluidas = ["/dashboard", "/mi-perfil", "/unirse", "/acceso", "/precios"];
  const esExcluida     = rutasExcluidas.some(r => url.pathname.startsWith(r));

  if (esExcluida) {
    return NextResponse.redirect(new URL("https://medify.cl" + url.pathname));
  }

  /* Todo lo demás (perfiles, filtros, etc.) pasa sin cambios */
  return NextResponse.next();
}

export const config = {
  /*
   * Aplica a todas las rutas excepto archivos estáticos,
   * assets de Next.js y la API interna.
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
