# Implementación de operaciones CRUD en bases de datos SQL y NoSQL

El sistema de gestión de productos necesita registrar, consultar, actualizar y eliminar productos en una base de datos. Los productos tienen un nombre, precio, stock y categoría. El sistema debe prohibir precios negativos y nombres duplicados. Al eliminar un producto, debe asegurarse de que no existan referencias en otros sistemas. Debes implementar las operaciones CRUD tanto en una base de datos SQL como en una NoSQL.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 12 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición de esquemas y operaciones básicas

**Objetivo:** Definir el esquema de la base de datos y las operaciones CRUD para productos.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Diseña el esquema de la base de datos para productos, considerando las restricciones de precio y nombre.
- Implementa las operaciones CRUD para productos en una base de datos SQL.
- Implementa las operaciones CRUD para productos en una base de datos NoSQL.

**Entregable:** Esquemas de bases de datos SQL y NoSQL con operaciones CRUD para productos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las diferencias entre bases de datos SQL y NoSQL al definir los esquemas.
- Utiliza el depurador de IntelliJ IDEA para verificar la correcta implementación de las operaciones.

</details>

### Fase 2: Validaciones y manejo de errores

**Objetivo:** Implementar validaciones y manejo de errores en las operaciones CRUD.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Agrega validaciones para evitar precios negativos y nombres duplicados en las operaciones CRUD.
- Implementa el manejo de errores para las operaciones CRUD, asegurando que el sistema responda adecuadamente ante situaciones de error.

**Entregable:** Operaciones CRUD con validaciones y manejo de errores en bases de datos SQL y NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza el depurador de IntelliJ IDEA para verificar las validaciones y el manejo de errores.
- Considera diferentes casos de error y cómo el sistema debe responder.

</details>

### Fase 3: Optimización y refactorización

**Objetivo:** Optimizar y refactorizar las operaciones CRUD para mejorar el rendimiento y la mantenibilidad.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Analiza el rendimiento de las operaciones CRUD y busca oportunidades de optimización.
- Refactoriza el código para mejorar la mantenibilidad y la claridad.

**Entregable:** Operaciones CRUD optimizadas y refactorizadas en bases de datos SQL y NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza el depurador de IntelliJ IDEA para analizar el rendimiento y verificar las optimizaciones.
- Considera patrones de diseño y buenas prácticas de codificación.
- IntelliJ IDEA Debugger: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en bases de datos SQL y NoSQL?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en un sistema de gestión de productos?
- **comoSeUsa**: ¿Cómo se usan las operaciones CRUD en el contexto de un sistema de gestión de productos?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de operaciones CRUD en bases de datos SQL y NoSQL?

## Criterios de Evaluacion

- Definición correcta del esquema de la base de datos para productos.
- Implementación de operaciones CRUD en bases de datos SQL y NoSQL.
- Aplicación de validaciones para evitar precios negativos y nombres duplicados.
- Manejo adecuado de errores en las operaciones CRUD.
- Optimización y refactorización de las operaciones CRUD para mejorar el rendimiento y la mantenibilidad.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
