import { NO_INDEXAR } from "@/lib/seo";
import Panel from "./Panel";

/* Layout de servidor solo para declarar la metadata (no indexar); el panel con menú lateral y la
 * verificación de sesión viven en Panel.jsx, que es un componente de cliente. */
export const metadata = { title: "Mi perfil", ...NO_INDEXAR };

export default function Layout({ children }) {
  return <Panel>{children}</Panel>;
}
