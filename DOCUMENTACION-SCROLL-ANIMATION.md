# Documentación - Efecto de Scroll Animado en Medify

## 📋 Índice
1. [Componente Principal](#componente-principal)
2. [Instalación de Dependencias](#instalación-de-dependencias)
3. [Uso del Componente](#uso-del-componente)
4. [Parámetros de Animación](#parámetros-de-animación)
5. [Integración en Páginas](#integración-en-páginas)
6. [Características Técnicas](#características-técnicas)
7. [Efectos Visuales Detallados](#efectos-visuales-detallados)
8. [Troubleshooting](#troubleshooting)

---

## 1. Componente Principal

### FadeInSection.jsx

**Ubicación:** `/src/componentes/FadeInSection.jsx`

```jsx
"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FadeInSection = ({ 
  children, 
  delay = 0,
  duration = 1.2,
  y = 50,
  className = ""
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // Animar solo los hijos directos (títulos, párrafos, etc.), NO la sección completa
    const childElements = element.children;
    
    if (childElements.length === 0) return;

    // Animación ultra impactante: fade + slide + scale + blur
    gsap.fromTo(
      childElements,
      {
        opacity: 0,
        y: y,
        scale: 0.9,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        stagger: 0.2, // Stagger más pronunciado para efecto dramático
        scrollTrigger: {
          trigger: element,
          start: 'top 90%', // Inicia antes para que sea más visible
          end: 'top 40%',
          toggleActions: 'play none none reverse',
          scrub: 0.5, // Suaviza la animación con el scroll
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, y]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default FadeInSection;
```

---

## 2. Instalación de Dependencias

### Comando de Instalación:
```bash
npm install gsap
```

### Dependencias en package.json:
```json
{
  "dependencies": {
    "gsap": "^3.13.0"
  }
}
```

**Nota:** GSAP (GreenSock Animation Platform) es la librería de animación más robusta y eficiente para JavaScript.

---

## 3. Uso del Componente

### Ejemplo Básico:
```jsx
import FadeInSection from '@/componentes/FadeInSection';

export default function MiPagina() {
  return (
    <FadeInSection>
      <h1>Este título aparecerá con animación</h1>
      <p>Este párrafo también se animará</p>
    </FadeInSection>
  );
}
```

### Ejemplo con Props Personalizadas:
```jsx
<FadeInSection 
  delay={0.3}        // Retraso de inicio (segundos)
  duration={1.5}     // Duración de la animación (segundos)
  y={100}            // Distancia del slide desde abajo (píxeles)
  className="mb-16"  // Clases CSS adicionales
>
  <h2>Contenido animado</h2>
  <p>Más contenido</p>
</FadeInSection>
```

### Ejemplo con Múltiples Secciones:
```jsx
export default function Pagina() {
  return (
    <>
      <FadeInSection>
        <h1>Primera Sección</h1>
      </FadeInSection>

      <FadeInSection delay={0.2}>
        <h2>Segunda Sección</h2>
        <p>Con delay de 0.2 segundos</p>
      </FadeInSection>

      <FadeInSection delay={0.4} y={80}>
        <h2>Tercera Sección</h2>
        <p>Con delay mayor y más distancia de slide</p>
      </FadeInSection>
    </>
  );
}
```

---

## 4. Parámetros de Animación

### Props del Componente:

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | ReactNode | - | Elementos que se animarán |
| `delay` | number | `0` | Retraso inicial en segundos |
| `duration` | number | `1.2` | Duración de la animación en segundos |
| `y` | number | `50` | Distancia del desplazamiento vertical en píxeles |
| `className` | string | `""` | Clases CSS adicionales para el contenedor |

### Efectos de Animación Aplicados:

1. **Opacity (Fade)**: 
   - Inicio: `0` (invisible)
   - Final: `1` (completamente visible)

2. **TranslateY (Slide)**: 
   - Inicio: `50px` (desplazado hacia abajo)
   - Final: `0px` (posición original)

3. **Scale (Zoom)**: 
   - Inicio: `0.9` (90% del tamaño)
   - Final: `1` (100% tamaño normal)

4. **Blur (Enfoque)**: 
   - Inicio: `blur(10px)` (desenfocado)
   - Final: `blur(0px)` (enfocado)

### Configuración GSAP:

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| **ease** | `power3.out` | Curva de aceleración suave (desaceleración al final) |
| **stagger** | `0.2` | Diferencia en segundos entre la animación de cada hijo |
| **scrub** | `0.5` | Sincronización con el scroll (0.5 = suave) |
| **start** | `top 90%` | La animación inicia cuando el elemento está al 90% del viewport |
| **end** | `top 40%` | La animación termina al llegar al 40% del viewport |
| **toggleActions** | `play none none reverse` | Reproduce al entrar y revierte al salir hacia arriba |

---

## 5. Integración en Páginas

### Ejemplo en servicios/page.jsx:
```jsx
import FadeInSection from "@/componentes/FadeInSection";

export default function Servicios() {
  return (
    <div className="container mx-auto px-6">
      {/* Sección Hero */}
      <FadeInSection>
        <h1 className="text-5xl font-bold text-white">Nuestros Servicios</h1>
        <p className="text-xl text-white/80">
          Soluciones tecnológicas para la salud moderna
        </p>
      </FadeInSection>

      {/* Tarjetas de Servicios */}
      <FadeInSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">Sistema de Gestión de Pacientes</div>
          <div className="card">Plataforma de Telemedicina</div>
          <div className="card">Gestión de Agenda Avanzada</div>
        </div>
      </FadeInSection>

      {/* Call to Action */}
      <FadeInSection delay={0.4}>
        <h2 className="text-4xl font-bold">¿Necesitas una solución personalizada?</h2>
        <button className="btn-primary">Contáctanos</button>
      </FadeInSection>
    </div>
  );
}
```

### Ejemplo en page.jsx principal:
```jsx
import FadeInSection from "@/componentes/FadeInSection";
import Portada from "@/app/portada/page";
import Servicios from "@/app/servicios/page";

export default function Home() {
  return (
    <>
      <Portada />
      
      {/* Sección de Digitalización */}
      <section className="py-24">
        <FadeInSection>
          <h2 className="text-6xl font-bold text-white">
            ¿Necesitas <span className="text-gradient">digitalizar</span> tu práctica médica?
          </h2>
          <p className="text-2xl text-white/85 mt-6">
            Transformamos consultas médicas tradicionales en experiencias digitales eficientes.
          </p>
        </FadeInSection>
      </section>

      <Servicios />
    </>
  );
}
```

### Ejemplo en sobreNosotros/page.jsx:
```jsx
import FadeInSection from "@/componentes/FadeInSection";

export default function SobreNosotros() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Introducción */}
      <FadeInSection>
        <h1 className="text-6xl font-bold text-white">Sobre Medify</h1>
        <p className="text-xl text-white/90 mt-6">
          Somos una empresa dedicada a la transformación digital del sector salud...
        </p>
      </FadeInSection>

      {/* Misión, Visión, Valores */}
      <FadeInSection delay={0.2}>
        <h2 className="text-5xl font-bold text-white">Nuestro Compromiso</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="card">
            <h3 className="text-2xl font-semibold">Misión</h3>
            <p>Revolucionar la atención médica...</p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-semibold">Visión</h3>
            <p>Ser líderes en innovación...</p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-semibold">Valores</h3>
            <ul>
              <li>Innovación</li>
              <li>Excelencia</li>
              <li>Integridad</li>
            </ul>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
```

---

## 6. Características Técnicas

### ✅ Ventajas:

1. **Rendimiento Optimizado**
   - Usa GSAP, la librería más eficiente para animaciones
   - Hardware-accelerated (GPU) para fluidez máxima
   - No afecta el rendimiento del sitio

2. **Scroll-Triggered**
   - Las animaciones solo ocurren cuando el elemento es visible
   - Ahorra recursos al no animar elementos fuera de pantalla
   - Mejora la experiencia del usuario

3. **Reversible**
   - La animación se revierte si el usuario hace scroll hacia arriba
   - Efecto bidireccional para mejor UX

4. **Efecto Dramático**
   - Combina 4 efectos simultáneos (fade, slide, scale, blur)
   - Máximo impacto visual
   - Ideal para sitios de marketing y landing pages

5. **Stagger Automático**
   - Los elementos hijos se animan secuencialmente
   - Efecto "cascada" profesional
   - Configurable mediante el prop `delay`

6. **Cleanup Automático**
   - Limpia los triggers cuando el componente se desmonta
   - Previene memory leaks
   - Gestión óptima de recursos

### ⚙️ Configuración ScrollTrigger Explicada:

```javascript
scrollTrigger: {
  trigger: element,           
  // Elemento que activa la animación (el contenedor FadeInSection)
  
  start: 'top 90%',          
  // Inicia cuando el TOP del elemento llega al 90% del viewport
  // (viewport tiene 0% arriba y 100% abajo)
  
  end: 'top 40%',            
  // Termina cuando el TOP del elemento llega al 40% del viewport
  
  toggleActions: 'play none none reverse',  
  // Formato: onEnter | onLeave | onEnterBack | onLeaveBack
  // play: reproduce al entrar
  // none: no hace nada al salir
  // none: no hace nada al volver a entrar desde abajo
  // reverse: revierte la animación al salir hacia arriba
  
  scrub: 0.5,                
  // Sincroniza con el scroll (0.5 = transición suave de 0.5s)
  // false = animación independiente del scroll
  // true = completamente sincronizado
  // número = suaviza la sincronización
}
```

### 🎯 Flujo de Ejecución:

1. **Montaje del Componente**
   - Se crea la referencia `sectionRef`
   - Se ejecuta el `useEffect`

2. **Detección de Elementos**
   - Se obtiene el elemento DOM
   - Se extraen los elementos hijos

3. **Configuración de Animación**
   - GSAP configura el estado inicial (invisible, abajo, pequeño, borroso)
   - ScrollTrigger monitorea la posición del scroll

4. **Trigger de Animación**
   - Cuando el elemento llega al 90% del viewport
   - Inicia la transición al estado final

5. **Animación Secuencial**
   - Cada hijo se anima con 0.2s de diferencia (stagger)
   - Efecto cascada dramático

6. **Cleanup**
   - Al desmontar, se eliminan los triggers
   - Gestión limpia de memoria

---

## 7. Efectos Visuales Detallados

### Estado Inicial (Antes de Scroll):

```javascript
{
  opacity: 0,              // Completamente invisible (0%)
  y: 50,                   // 50 píxeles abajo de su posición final
  scale: 0.9,              // 90% del tamaño final (ligeramente más pequeño)
  filter: 'blur(10px)',    // Desenfocado con blur de 10 píxeles
}
```

**Resultado Visual:**
- El elemento es invisible
- Está posicionado 50px más abajo
- Es un 10% más pequeño
- Está completamente borroso

### Estado Final (Después de Scroll):

```javascript
{
  opacity: 1,              // Completamente visible (100%)
  y: 0,                    // En su posición original del DOM
  scale: 1,                // Tamaño normal (100%)
  filter: 'blur(0px)',     // Sin blur, completamente enfocado
  duration: 1.2,           // La transición dura 1.2 segundos
  ease: 'power3.out',      // Curva de desaceleración suave
  stagger: 0.2,            // 0.2 segundos de diferencia entre cada hijo
}
```

**Resultado Visual:**
- El elemento es completamente visible
- Está en su posición correcta
- Tiene su tamaño normal
- Está perfectamente enfocado

### Transición Visual (Durante la Animación):

**0.0s - 0.3s:**
- Opacity: `0 → 0.3`
- Y: `50px → 35px`
- Scale: `0.9 → 0.93`
- Blur: `10px → 7px`

**0.3s - 0.6s:**
- Opacity: `0.3 → 0.6`
- Y: `35px → 20px`
- Scale: `0.93 → 0.96`
- Blur: `7px → 4px`

**0.6s - 0.9s:**
- Opacity: `0.6 → 0.85`
- Y: `20px → 8px`
- Scale: `0.96 → 0.98`
- Blur: `4px → 1px`

**0.9s - 1.2s:**
- Opacity: `0.85 → 1`
- Y: `8px → 0px`
- Scale: `0.98 → 1`
- Blur: `1px → 0px`

### Efecto Stagger Explicado:

Si tienes 3 elementos hijos dentro de `<FadeInSection>`:

```jsx
<FadeInSection>
  <h1>Título</h1>      {/* Inicia en t=0.0s */}
  <p>Párrafo 1</p>     {/* Inicia en t=0.2s */}
  <p>Párrafo 2</p>     {/* Inicia en t=0.4s */}
</FadeInSection>
```

**Línea de Tiempo:**
- `0.0s`: El `<h1>` comienza a animarse
- `0.2s`: El primer `<p>` comienza a animarse (el h1 está al 16% de su animación)
- `0.4s`: El segundo `<p>` comienza a animarse (el h1 está al 33%, el primer p al 16%)
- `1.2s`: El `<h1>` termina su animación
- `1.4s`: El primer `<p>` termina su animación
- `1.6s`: El segundo `<p>` termina su animación

---

## 8. Troubleshooting

### ❌ Problema: La animación no funciona

**Posibles causas y soluciones:**

1. **GSAP no está instalado**
   ```bash
   npm install gsap
   ```

2. **Falta "use client" en el componente padre**
   ```jsx
   "use client";  // Agregar al inicio del archivo
   import FadeInSection from '@/componentes/FadeInSection';
   ```

3. **No hay elementos hijos**
   ```jsx
   // ❌ MAL (no tiene hijos directos)
   <FadeInSection>
     <div>
       <h1>Título</h1>
     </div>
   </FadeInSection>

   // ✅ BIEN (tiene hijos directos)
   <FadeInSection>
     <h1>Título</h1>
     <p>Párrafo</p>
   </FadeInSection>
   ```

4. **Problema con SSR (Server-Side Rendering)**
   - Asegúrate de que el componente padre tenga `"use client"`
   - GSAP necesita acceso al DOM del navegador

### ❌ Problema: La animación es muy rápida/lenta

**Soluciones:**

1. **Ajustar duración:**
   ```jsx
   <FadeInSection duration={2.0}>  {/* Más lento */}
   <FadeInSection duration={0.8}>  {/* Más rápido */}
   ```

2. **Modificar scrub:**
   ```jsx
   // En FadeInSection.jsx, línea 46:
   scrub: 1.0,    // Más sincronizado con scroll (más lento)
   scrub: 0.2,    // Menos sincronizado (más rápido)
   scrub: false,  // Sin sincronización (animación independiente)
   ```

### ❌ Problema: La animación no inicia en el momento correcto

**Soluciones:**

1. **Ajustar el punto de inicio:**
   ```jsx
   // En FadeInSection.jsx, línea 44:
   start: 'top 80%',   // Inicia más tarde (cuando llega al 80%)
   start: 'top 95%',   // Inicia más temprano (cuando llega al 95%)
   start: 'top 50%',   // Inicia al centro del viewport
   ```

2. **Cambiar el punto final:**
   ```jsx
   // En FadeInSection.jsx, línea 45:
   end: 'top 30%',     // Termina más arriba
   end: 'top 60%',     // Termina más abajo
   ```

### ❌ Problema: El efecto blur no funciona en Safari

**Solución:**
Safari tiene mejor soporte con `-webkit-filter`:

```jsx
// Modificar en FadeInSection.jsx:
{
  opacity: 0,
  y: y,
  scale: 0.9,
  filter: 'blur(10px)',
  WebkitFilter: 'blur(10px)',  // Agregar esta línea
}
```

### ❌ Problema: La animación se ejecuta múltiples veces

**Solución:**
El cleanup está manejado, pero si persiste:

```jsx
// Verificar que solo haya un FadeInSection por sección
// ❌ MAL
<FadeInSection>
  <FadeInSection>
    <h1>Título</h1>
  </FadeInSection>
</FadeInSection>

// ✅ BIEN
<FadeInSection>
  <h1>Título</h1>
</FadeInSection>
```

### ❌ Problema: Los elementos "saltan" al cargar la página

**Solución:**
Agregar CSS para ocultar elementos antes de la animación:

```css
/* En tu archivo CSS global */
.fade-section > * {
  opacity: 0;
}
```

```jsx
<FadeInSection className="fade-section">
  <h1>Título</h1>
</FadeInSection>
```

---

## 📊 Comparación de Configuraciones

### Configuraciones Preestablecidas:

#### Animación Sutil (Profesional):
```jsx
<FadeInSection 
  duration={0.8}
  y={30}
>
  {/* Contenido */}
</FadeInSection>
```
```javascript
// Modificar en el componente:
scale: 0.95,        // Menos escala
filter: 'blur(5px)', // Menos blur
stagger: 0.1,       // Menos espacio entre elementos
```

#### Animación Dramática (Marketing):
```jsx
<FadeInSection 
  duration={1.5}
  y={80}
>
  {/* Contenido */}
</FadeInSection>
```
```javascript
// Modificar en el componente:
scale: 0.85,         // Más escala
filter: 'blur(15px)', // Más blur
stagger: 0.3,        // Más espacio entre elementos
```

#### Animación Rápida (Interactiva):
```jsx
<FadeInSection 
  duration={0.6}
  y={20}
>
  {/* Contenido */}
</FadeInSection>
```
```javascript
// Modificar en el componente:
scale: 0.98,        // Casi sin escala
filter: 'blur(3px)', // Poco blur
stagger: 0.05,      // Mínimo espacio
ease: 'power2.out', // Curva más rápida
```

---

## 🎨 Casos de Uso Recomendados

### 1. Landing Pages
- **Configuración:** Animación dramática
- **Delay:** 0.3 - 0.5s entre secciones
- **Y:** 80 - 100px

### 2. Páginas de Contenido (Blog, Artículos)
- **Configuración:** Animación sutil
- **Delay:** 0.1 - 0.2s
- **Y:** 30 - 40px

### 3. Portfolios
- **Configuración:** Animación equilibrada (actual)
- **Delay:** 0.2s
- **Y:** 50px

### 4. Dashboards/Aplicaciones
- **Configuración:** Animación rápida
- **Delay:** 0s - 0.1s
- **Y:** 20px

---

## 🔧 Personalización Avanzada

### Crear variantes del componente:

```jsx
// FadeInSectionSlow.jsx
export default function FadeInSectionSlow({ children, className }) {
  return (
    <FadeInSection duration={2.0} y={100} className={className}>
      {children}
    </FadeInSection>
  );
}

// FadeInSectionFast.jsx
export default function FadeInSectionFast({ children, className }) {
  return (
    <FadeInSection duration={0.6} y={20} className={className}>
      {children}
    </FadeInSection>
  );
}
```

---

## 📝 Notas Finales

- **Rendimiento:** La animación está optimizada y no afecta el rendimiento del sitio
- **Accesibilidad:** Respetar `prefers-reduced-motion` para usuarios sensibles a movimiento
- **SEO:** Las animaciones no afectan el SEO ya que el contenido está en el DOM
- **Compatibilidad:** Funciona en todos los navegadores modernos (Chrome, Firefox, Safari, Edge)

---

**Desarrollado para:** Medify Healthcare Platform  
**Fecha:** Noviembre 2025  
**Versión:** 1.0  
**Librería:** GSAP 3.13.0  
**Framework:** Next.js 15.4.4

---

¿Preguntas o necesitas ayuda? Contacta al equipo de desarrollo de Medify.
