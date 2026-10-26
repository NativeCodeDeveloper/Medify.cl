/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  /* El marketplace vive en "/" (ruta principal). /marketplace queda como alias antiguo;
     los perfiles siguen en /marketplace/[id]. La query (?q=, filtros) se conserva. */
  async redirects() {
    return [{ source: "/marketplace", destination: "/", permanent: false }]; // pasar a true cuando sea definitivo (SEO)
  },
};

export default nextConfig;
