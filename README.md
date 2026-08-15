<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./public/logos/sun-white.svg">
    <img src="./public/logos/sun-black.svg" alt="Aleph" width="72" />
  </picture>
</p>

<h1 align="center">Aleph Hackathon San José 2026</h1>

<p align="center">
  Guía del chapter local para anotarse, llegar preparado y entregar el proyecto.
</p>

<p align="center">
  <a href="https://astro.build/"><img src="https://img.shields.io/badge/Astro-7.2.2-FF5D01?logo=astro&logoColor=white" alt="Astro 7.2.2" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4.3.3" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-22.12+-339933?logo=nodedotjs&logoColor=white" alt="Node.js 22.12 o superior" /></a>
  <a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-10+-CB3837?logo=npm&logoColor=white" alt="npm" /></a>
</p>

<p align="center">
  <a href="https://alephhackathon.crecimiento.build/">Sitio oficial</a> ·
  <a href="https://x.com/alephhackathon">X</a> ·
  <a href="https://t.me/+sXWv0kpT7qo4ZTdk">Telegram</a>
</p>

## Qué es esta web

Este sitio reúne la información práctica del chapter de San José, Costa Rica, de la [Aleph Hackathon](https://alephhackathon.crecimiento.build/), que se realiza el 22 y 23 de agosto de 2026.

La web permite consultar:

- cómo completar el apply oficial y reservar el cupo presencial;
- agenda, sede y cómo llegar;
- setup, cuentas y herramientas necesarias;
- reglas del evento y preguntas frecuentes;
- cómo preparar y entregar el proyecto;
- una credencial para compartir en Instagram o X.

El sábado es presencial en el Hotel Radisson San José, Calle Central y Av. 15, Barrio Tournón, San José. El domingo es online para hacking, submissions, judging y cierre.

## Aleph y sponsors del chapter

<p align="center">
  <a href="https://alephhackathon.crecimiento.build/">
    <img src="./public/logos/sun-black.svg" alt="Aleph Hackathon" height="64" />
  </a>
</p>

El chapter de San José está co-organizado por Zeek, Sebastián Ceciliano, Michael Sibaja, Fabián Sánchez, Emilio Alfaro, Tamara Ortega y Santiago Villareal. Los co-organizadores se editan en `src/content/site.ts` y sus logos van en `public/logos/`.

## Tecnologías

- [Astro](https://astro.build/) para generar el sitio estático.
- [Tailwind CSS](https://tailwindcss.com/) 4 integrado mediante `@tailwindcss/vite`.
- TypeScript para el contenido, la lógica de interacción y el generador de credenciales.
- CSS propio para el sistema visual, responsive design y accesibilidad.
- APIs nativas del navegador para diálogos, checklist local, countdown, compartir y generación de imágenes.

## Levantar el proyecto

### Requisitos

- Node.js `>=22.12.0`
- npm `>=10`

### Desarrollo local

```bash
npm ci
npm run dev
```

Abrí la URL que muestra Astro, normalmente [`http://localhost:4321`](http://localhost:4321).

### Build y preview

```bash
npm run build
npm run preview
```

`npm run build` genera el sitio listo para producción en `dist/`.

## Deploy en Vercel

1. Importá este repositorio (fork del chapter de Salta: `facundopadilla/aleph-hackathon-2026-salta`).
2. Elegí Astro como framework preset.
3. Usá `npm run build` como build command.
4. Usá `dist` como output directory.

El proyecto es estático y no necesita un adapter de Astro ni variables de entorno.

## Estructura del proyecto

```text
.
├── public/
│   ├── fonts/             # Geist y assets tipográficos
│   └── logos/             # Aleph y logos de sponsors
├── src/
│   ├── components/        # Navegación, secciones y componentes UI
│   ├── content/site.ts    # Copy, agenda, datos del evento y links
│   ├── layouts/           # Layout base y metadata
│   ├── lib/               # Lógica del generador de credenciales
│   ├── pages/             # Rutas Astro
│   └── styles/            # CSS global y tokens visuales
├── DESIGN.md              # Sistema visual y decisiones de diseño
├── PRODUCT.md             # Propósito, usuarios y criterios del producto
└── package.json           # Scripts y dependencias
```

Para cambiar textos o links del evento, editá [`src/content/site.ts`](src/content/site.ts). El CTA de WhatsApp aparece solo cuando se completa `links.whatsapp`.

## Links oficiales

### Aleph Hackathon

- [Sitio oficial](https://alephhackathon.crecimiento.build/)
- [X / Twitter](https://x.com/alephhackathon)
- [Telegram](https://t.me/+sXWv0kpT7qo4ZTdk)
- [Notion](https://alephhackathon.notion.site)
- [DoraHacks](https://dorahacks.io/org/alephhackathon)

### Crecimiento

- [Sitio web](https://crecimiento.build/)
- [Instagram](https://www.instagram.com/crecimientoar/)
- [LinkedIn](https://www.linkedin.com/company/crecimientobuild)

### Chapter San José

- Zeek · Sebastián Ceciliano · Michael Sibaja · Fabián Sánchez · Emilio Alfaro · Tamara Ortega · Santiago Villareal
