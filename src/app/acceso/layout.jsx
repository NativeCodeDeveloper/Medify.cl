import { NO_INDEXAR } from "@/lib/seo";

export const metadata = { title: "Ingresa a tu cuenta", ...NO_INDEXAR };

export default function Layout({ children }) {
  return children;
}
