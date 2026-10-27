import Image from "next/image";

/* Foto de un perfil del marketplace. Si el profesional o centro no tiene foto, se muestra el logo
 * de Medify sobre fondo oscuro (logo completo en espacios grandes, solo el pulso en los chicos).
 * El contenedor padre define el tamaño y la forma (relative + overflow-hidden). */
export default function FotoPerfil({ src, alt, sizes, chica = false, className = "object-cover object-top" }) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} className={className} />;
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#1d1d1f]" role="img" aria-label={alt}>
      <Image
        src={chica ? "/logofavicom.png" : "/logonavar.png"}
        alt=""
        width={chica ? 64 : 160}
        height={chica ? 38 : 36}
        className={chica ? "h-auto w-[62%] object-contain" : "h-auto w-[46%] max-w-[180px] object-contain"}
      />
    </div>
  );
}
