#  Fiestas de Álava 2026 · San Prudencio

Aplicación web interactiva desarrollada con **HTML, CSS y JavaScript puro**, que presenta de forma visual, dinámica y moderna las fiestas de San Prudencio en Álava.

El proyecto combina diseño editorial, animaciones y experiencia de usuario para transformar información cultural en una interfaz atractiva, navegable y responsive.

---

##  Demo

👉 (https://fiesta-san-prudecio.vercel.app/)

---

##  Funcionalidades

###  Countdown dinámico

* Cuenta regresiva en tiempo real hasta el 28 de abril de 2026
* Actualización cada segundo con `setInterval`
* Formateo optimizado con padding

###  Navegación responsive

* Menú hamburguesa en móvil
* Toggle dinámico con JavaScript
* Cierre automático al seleccionar una opción

###  Carrusel interactivo

* Navegación por botones y swipe táctil
* Cálculo dinámico de tarjetas visibles
* Indicadores (dots) sincronizados con el estado
* Adaptación automática en resize

###  Lightbox de galería

* Vista ampliada de imágenes
* Overlay + cierre con botón o tecla `Escape`
* Render dinámico del contenido

###  Búsqueda inteligente con filtros

* Filtrado por categorías (música, gastronomía, danza, etc.)
* Filtros combinables (lógica AND/OR controlada)
* Búsqueda en múltiples campos (título, descripción, lugar, fecha)
* Resaltado dinámico de coincidencias (`<mark>`)
* Debounce para optimización de rendimiento

---

##  Diseño

* Estilo visual inspirado en **Risograph**
* Uso de variables CSS (`:root`) para escalabilidad
* Sistema de sombras desplazadas y bordes sólidos
* Animaciones con `@keyframes` (float, wiggle, iconPop)
* Layout responsive con Flexbox y Grid

---

##  Arquitectura del código

El proyecto sigue un enfoque **modular sin frameworks**:

* Uso de **IIFEs (Immediately Invoked Function Expressions)** para encapsular lógica
* Separación clara de responsabilidades:

  * `countdown`
  * `navigation`
  * `carousel`
  * `lightbox`
  * `search & filters`
* Manipulación eficiente del DOM
* Uso de funciones puras para filtrado (`passes`, `render`)

---

##  Tecnologías

* HTML5
* CSS3 (Custom Properties, Grid, Flexbox, Animaciones)
* JavaScript (ES6+)

---

##  Estructura del proyecto

```
fiestas-alava-2026/
│── index.html
│── css/
│   └── styles.css
│── js/
│   └── main.js
│── imagenes/
```

---

##  Cómo ejecutarlo

1. Clonar el repositorio:

```
git clone https://github.com/camila0424/fiestas_de_alava.git
```

2. Abrir el archivo:

```
index.html
```

No requiere instalación ni dependencias externas.

---

##  Decisiones técnicas destacadas

* Uso de **debounce (280ms)** para mejorar rendimiento en búsqueda
* Cálculo dinámico del carrusel en lugar de valores fijos
* Sistema de filtros desacoplado de la UI
* Renderizado dinámico de resultados sin recargar la página
* Código organizado para fácil escalabilidad sin frameworks

---

##  Posibles mejoras

* Integración con API real de eventos
* Persistencia de filtros en localStorage
* Internacionalización (ES/EU)
* Accesibilidad (ARIA más avanzada)
* Tests unitarios en JavaScript

---

## Autor

Desarrollado por Camila Bedoya
Frontend Developer · JavaScript · UI/UX


