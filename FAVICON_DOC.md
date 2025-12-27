# Cómo agregar un favicon personalizado en Next.js (Medify)

## ¿Qué es un favicon?
El favicon es el pequeño ícono que aparece en la pestaña del navegador junto al título de tu página web. Es importante para la identidad visual y profesionalismo de tu sitio.

## Pasos realizados

1. **Prepara tu logo**
   - Usa una imagen cuadrada (idealmente 256x256px o 512x512px) en formato `.png` o `.ico`.
   - En este proyecto se usó `favicon.png`.

2. **Coloca el archivo en la carpeta pública**
   - Copia tu archivo `favicon.png` dentro de la carpeta `public/` de tu proyecto Next.js.

3. **Configura el favicon en Next.js**
   - Abre el archivo `src/app/layout.jsx`.
   - Busca la sección `export const metadata = { ... }`.
   - Asegúrate de tener la siguiente configuración:

```js
icons: {
  icon: '/favicon.png', // Favicon principal (logo en la pestaña)
  shortcut: '/favicon.png',
  apple: '/apple-touch-icon.png',
},
```

4. **Listo**
   - Al iniciar o refrescar tu sitio, el logo aparecerá en la pestaña del navegador.

## Notas
- Puedes usar `.ico` si necesitas compatibilidad máxima, pero `.png` es suficiente para la mayoría de navegadores modernos.
- Si cambias el favicon y no ves el cambio, limpia la caché del navegador.

---

**Referencia:**
- [Next.js Docs: Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [MDN: Favicon](https://developer.mozilla.org/en-US/docs/Glossary/Favicon)
