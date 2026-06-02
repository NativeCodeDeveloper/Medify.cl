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

export function middleware(request) {
  const host = request.headers.get("host") || "";
  const url  = request.nextUrl.clone();

  const esBuscar = BUSCAR_HOSTS.some(h => host === h || host.startsWith("buscar."));

  if (!esBuscar) return NextResponse.next();

  /* Raíz del subdominio → mostrar el marketplace */
  if (url.pathname === "/") {
    url.pathname = "/marketplace";
    return NextResponse.rewrite(url);
  }

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
