# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

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

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261110115758191), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD en bases de datos SQL y NoSQL
- Tiempo estimado: 12 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición de esquemas y operaciones básicas — objetivo: Definir el esquema de la base de datos y las operaciones CRUD para productos. — entregable (NO resolver): Esquemas de bases de datos SQL y NoSQL con operaciones CRUD para productos.
- Fase 2: Validaciones y manejo de errores — objetivo: Implementar validaciones y manejo de errores en las operaciones CRUD. — entregable (NO resolver): Operaciones CRUD con validaciones y manejo de errores en bases de datos SQL y NoSQL.
- Fase 3: Optimización y refactorización — objetivo: Optimizar y refactorizar las operaciones CRUD para mejorar el rendimiento y la mantenibilidad. — entregable (NO resolver): Operaciones CRUD optimizadas y refactorizadas en bases de datos SQL y NoSQL.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "product-management-api",
  "version": "1.0.0",
  "description": "API para gestión de productos con soporte para bases de datos SQL y NoSQL",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.600.0",
    "@aws-sdk/lib-dynamodb": "^3.600.0",
    "@nestjs/common": "^11.2.0",
    "@nestjs/config": "^4.0.4",
    "@nestjs/core": "^11.2.0",
    "@nestjs/mongoose": "^11.0.0",
    "@nestjs/platform-express": "^11.2.0",
    "@nestjs/swagger": "^11.4.8",
    "@prisma/client": "^5.22.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "mongoose": "^8.4.0",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.24",
    "@nestjs/schematics": "^11.1.0",
    "@nestjs/testing": "^11.2.0",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.14.9",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^7.14.1",
    "@typescript-eslint/parser": "^7.14.1",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.3.2",
    "prisma": "^5.16.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.4",
    "ts-jest": "^29.1.5",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.5.2"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@shared/*": ["src/shared/*"],
      "@test/*": ["test/*"]
    }
  },
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: api/src/domain/entities/product.entity.ts ===
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class ProductEntity {
  @ApiProperty({ example: '1', description: 'Identificador único del producto' })
  id: string;

  @ApiProperty({ example: 'Laptop Gamer', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1299.99, description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 50, description: 'Cantidad en stock del producto' })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({ example: 'Electrónicos', description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Fecha de creación del producto' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Fecha de última actualización del producto' })
  updatedAt: Date;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}

// === ARCHIVO: api/src/domain/repositories/product.repository.ts ===
import { ProductEntity } from '../entities/product.entity';

export interface ProductRepository {
  create(product: Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  findAll(): Promise<ProductEntity[]>;
  update(id: string, product: Partial<Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<ProductEntity | null>;
}

// === ARCHIVO: api/src/application/dto/create-product.dto.ts ===
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop Gamer', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name: string;

  @ApiProperty({ example: 1299.99, description: 'Precio del producto' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  price: number;

  @ApiProperty({ example: 50, description: 'Cantidad en stock del producto' })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsPositive({ message: 'El stock debe ser un número positivo' })
  stock: number;

  @ApiProperty({ example: 'Electrónicos', description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty({ message: 'La categoría del producto es obligatoria' })
  category: string;
}

// === ARCHIVO: api/src/application/dto/update-product.dto.ts ===
import { IsString, IsNumber, IsOptional, Min, MaxLength, IsEnum, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Nombre del producto',
    example: 'Laptop HP',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(1, { message: 'El nombre no puede estar vacío' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Precio del producto',
    example: 1299.99,
    minimum: 0.01,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0.01, { message: 'El precio debe ser mayor a 0' })
  price?: number;

  @ApiPropertyOptional({
    description: 'Cantidad en stock',
    example: 50,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock?: number;

  @ApiPropertyOptional({
    description: 'Categoría del producto',
    example: 'Electronics',
    enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
  })
  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @MaxLength(50, { message: 'La categoría no puede exceder 50 caracteres' })
  @IsEnum(['Electronics', 'Clothing', 'Food', 'Books', 'Other'], {
    message: 'Categoría inválida. Valores permitidos: Electronics, Clothing, Food, Books, Other',
  })
  category?: string;
}

// === ARCHIVO: api/src/application/services/product.service.ts ===
import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductNotFoundException, DuplicateProductNameException, ProductAlreadyExistsException } from '../../shared/exceptions/product.exceptions';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly productRepository: ProductRepository) {
    this.logger.log('ProductService inicializado');
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    this.logger.debug(`Creando producto con nombre: ${createProductDto.name}`);

    if (createProductDto.price < 0) {
      this.logger.warn(`Intento de crear producto con precio negativo: ${createProductDto.price}`);
      throw new BadRequestException('El precio no puede ser negativo');
    }

    const existingProduct = await this.productRepository.findByName(createProductDto.name);
    if (existingProduct) {
      this.logger.warn(`Intento de crear producto con nombre duplicado: ${createProductDto.name}`);
      throw new ConflictException(
        new DuplicateProductNameException(createProductDto.name).getResponse()
      );
    }

    const product = await this.productRepository.create(createProductDto);
    this.logger.log(`Producto creado exitosamente con ID: ${product.id}`);
    return product;
  }

  async findById(id: string): Promise<ProductEntity> {
    this.logger.debug(`Buscando producto por ID: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del producto es requerido');
    }

    const product = await this.productRepository.findById(id);
    if (!product) {
      this.logger.warn(`Producto no encontrado con ID: ${id}`);
      throw new NotFoundException(
        new ProductNotFoundException(id).getResponse()
      );
    }

    this.logger.debug(`Producto encontrado: ${product.name}`);
    return product;
  }

  async findAll(): Promise<ProductEntity[]> {
    this.logger.debug('Obteniendo todos los productos');
    const products = await this.productRepository.findAll();
    this.logger.log(`Se encontraron ${products.length} productos`);
    return products;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    this.logger.debug(`Actualizando producto con ID: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del producto es requerido');
    }

    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      this.logger.warn(`Intento de actualizar producto inexistente con ID: ${id}`);
      throw new NotFoundException(
        new ProductNotFoundException(id).getResponse()
      );
    }

    if (updateProductDto.name && updateProductDto.name !== existingProduct.name) {
      const productWithSameName = await this.productRepository.findByName(updateProductDto.name);
      if (productWithSameName && productWithSameName.id !== id) {
        this.logger.warn(`Intento de actualizar a nombre duplicado: ${updateProductDto.name}`);
        throw new ConflictException(
          new DuplicateProductNameException(updateProductDto.name).getResponse()
        );
      }
    }

    if (updateProductDto.price !== undefined && updateProductDto.price < 0) {
      this.logger.warn(`Intento de actualizar a precio negativo: ${updateProductDto.price}`);
      throw new BadRequestException('El precio no puede ser negativo');
    }

    if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
      this.logger.warn(`Intento de actualizar a stock negativo: ${updateProductDto.stock}`);
      throw new BadRequestException('El stock no puede ser negativo');
    }

    const updatedProduct = await this.productRepository.update(id, updateProductDto);
    this.logger.log(`Producto actualizado exitosamente: ${updatedProduct.name}`);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    this.logger.debug(`Eliminando producto con ID: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del producto es requerido');
    }

    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      this.logger.warn(`Intento de eliminar producto inexistente con ID: ${id}`);
      throw new NotFoundException(
        new ProductNotFoundException(id).getResponse()
      );
    }

    await this.productRepository.delete(id);
    this.logger.log(`Producto eliminado exitosamente: ${id}`);
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    this.logger.debug(`Buscando producto por nombre: ${name}`);
    return this.productRepository.findByName(name);
  }

  async checkProductHasReferences(id: string): Promise<boolean> {
    this.logger.debug(`Verificando referencias del producto: ${id}`);
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(
        new ProductNotFoundException(id).getResponse()
      );
    }
    const hasReferences = product.stock > 0;
    if (hasReferences) {
      this.logger.warn(`Producto ${id} tiene ${product.stock} unidades en stock`);
      throw new ProductAlreadyExistsException(product.name);
    }
    return false;
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/sql/product-sql.repository.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';

@Injectable()
export class ProductSqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductSqlRepository.name);
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  private mapToEntity(product: Record<string, unknown>): ProductEntity {
    return {
      id: String(product.id),
      name: String(product.name),
      price: Number(product.price),
      stock: Number(product.stock),
      category: String(product.category),
      createdAt: new Date(product.createdAt as string),
      updatedAt: new Date(product.updatedAt as string),
    };
  }

  async create(data: Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductEntity> {
    this.logger.log(`Creating product with name: ${data.name}`);
    
    const product = await this.prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        category: data.category,
      },
    });

    return this.mapToEntity(product);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding product by id: ${id}`);
    
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      this.logger.warn(`Product not found: ${id}`);
      return null;
    }

    return this.mapToEntity(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    this.logger.log('Finding all products');
    
    const products = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return products.map((product) => this.mapToEntity(product));
  }

  async update(
    id: string,
    data: Partial<Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<ProductEntity> {
    this.logger.log(`Updating product with id: ${id}`);
    
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.stock !== undefined && { stock: data.stock }),
        ...(data.category && { category: data.category }),
      },
    });

    return this.mapToEntity(product);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting product with id: ${id}`);
    
    await this.prisma.product.delete({
      where: { id },
    });
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding product by name: ${name}`);
    
    const product = await this.prisma.product.findUnique({
      where: { name },
    });

    if (!product) {
      return null;
    }

    return this.mapToEntity(product);
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product-nosql.repository.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Document, Types } from 'mongoose';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';

interface ProductDocument extends Document {
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductNosqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductNosqlRepository.name);
  private readonly productModel: Model<ProductDocument>;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.productModel = this.connection.model<ProductDocument>('Product');
  }

  private mapToEntity(doc: ProductDocument & { _id: Types.ObjectId }): ProductEntity {
    return {
      id: doc._id.toString(),
      name: doc.name,
      price: doc.price,
      stock: doc.stock,
      category: doc.category,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async create(data: Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductEntity> {
    this.logger.log(`Creating product with name: ${data.name}`);
    
    const createdProduct = new this.productModel({
      name: data.name,
      price: data.price,
      stock: data.stock,
      category: data.category,
    });

    const savedProduct = await createdProduct.save();
    return this.mapToEntity(savedProduct as ProductDocument & { _id: Types.ObjectId });
  }

  async findById(id: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding product by id: ${id}`);
    
    try {
      const product = await this.productModel.findById(id).exec();
      
      if (!product) {
        this.logger.warn(`Product not found: ${id}`);
        return null;
      }

      return this.mapToEntity(product as ProductDocument & { _id: Types.ObjectId });
    } catch (error) {
      this.logger.error(`Error finding product by id: ${id}`, error);
      return null;
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    this.logger.log('Finding all products');
    
    const products = await this.productModel
      .find()
      .sort({ createdAt: -1 })
      .exec();

    return products.map((product) => 
      this.mapToEntity(product as ProductDocument & { _id: Types.ObjectId })
    );
  }

  async update(
    id: string,
    data: Partial<Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<ProductEntity> {
    this.logger.log(`Updating product with id: ${id}`);
    
    const updateData: Record<string, unknown> = {};
    
    if (data.name !== undefined) updateData.name = data.name;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.stock !== undefined) updateData.stock = data.stock;
    if (data.category !== undefined) updateData.category = data.category;

    const product = await this.productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!product) {
      this.logger.warn(`Product not found for update: ${id}`);
      throw new Error(`Product not found: ${id}`);
    }

    return this.mapToEntity(product as ProductDocument & { _id: Types.ObjectId });
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting product with id: ${id}`);
    
    const result = await this.productModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      this.logger.warn(`Product not found for deletion: ${id}`);
      throw new Error(`Product not found: ${id}`);
    }
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding product by name: ${name}`);
    
    const product = await this.productModel.findOne({ name }).exec();
    
    if (!product) {
      return null;
    }

    return this.mapToEntity(product as ProductDocument & { _id: Types.ObjectId });
  }
}

// === ARCHIVO: api/src/infrastructure/controllers/product.controller.ts ===
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Logger,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created', type: ProductEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Product with duplicate name' })
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    this.logger.log(`POST /products - Creating product: ${createProductDto.name}`);
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product found', type: ProductEntity })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: String })
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<ProductEntity> {
    this.logger.log(`GET /products/${id}`);
    return this.productService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully', type: [ProductEntity] })
  async getAll(): Promise<ProductEntity[]> {
    this.logger.log('GET /products - Fetching all products');
    return this.productService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product successfully updated', type: ProductEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: String })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`PUT /products/${id} - Updating product`);
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: String })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.logger.log(`DELETE /products/${id}`);
    return this.productService.delete(id);
  }
}

// === ARCHIVO: api/src/infrastructure/config/database.config.ts ===
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import mongoose, { Connection } from 'mongoose';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DatabaseConfig implements OnModuleInit, OnModuleDestroy {
  private prismaClient: PrismaClient | null = null;
  private mongooseConnections: Map<string, Connection> = new Map();
  private dynamoDBClients: Map<string, DynamoDBDocumentClient> = new Map();

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.initializePrisma();
    await this.initializeMongoose();
    this.initializeDynamoDB();
  }

  async onModuleDestroy() {
    await this.closePrismaConnection();
    await this.closeMongooseConnections();
  }

  async initializePrisma(): Promise<PrismaClient> {
    if (this.prismaClient) {
      return this.prismaClient;
    }

    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    const databaseType = this.configService.get<string>('DATABASE_TYPE', 'postgresql');

    this.prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
      log: ['error', 'warn'],
    });

    try {
      await this.prismaClient.$connect();
      console.log(`Connected to ${databaseType} database via Prisma`);
    } catch (error) {
      console.error('Failed to connect to Prisma database:', error);
      throw error;
    }

    return this.prismaClient;
  }

  getPrismaClient(): PrismaClient {
    if (!this.prismaClient) {
      throw new Error('Prisma client not initialized. Call initializePrisma() first.');
    }
    return this.prismaClient;
  }

  async initializeMongoose(): Promise<void> {
    const mongoUris = this.configService.get<string>('MONGO_URIS', 'mongodb://localhost:27017').split(',');
    const mongoDbNames = this.configService.get<string>('MONGO_DB_NAMES', 'product_db').split(',');

    for (let i = 0; i < mongoUris.length; i++) {
      const uri = mongoUris[i].trim();
      const dbName = mongoDbNames[i]?.trim() || `product_db_${i}`;

      try {
        const connection: Connection = mongoose.createConnection(uri, {
          dbName,
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });

        await connection.asPromise();
        this.mongooseConnections.set(dbName, connection);
        console.log(`Connected to MongoDB: ${dbName}`);
      } catch (error) {
        console.error(`Failed to connect to MongoDB ${dbName}:`, error);
      }
    }
  }

  getMongooseConnection(dbName: string = 'product_db'): Connection | null {
    return this.mongooseConnections.get(dbName) || null;
  }

  getAllMongooseConnections(): Map<string, Connection> {
    return this.mongooseConnections;
  }

  initializeDynamoDB(): void {
    const awsRegion = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const awsEndpoint = this.configService.get<string>('AWS_DYNAMODB_ENDPOINT');
    const tableNames = this.configService.get<string>('DYNAMODB_TABLES', 'products').split(',');

    const clientConfig: any = {
      region: awsRegion,
    };

    if (awsEndpoint) {
      clientConfig.endpoint = awsEndpoint;
      clientConfig.tls = false;
    }

    const dynamoClient = new DynamoDBClient(clientConfig);
    const docClient = DynamoDBDocumentClient.from(dynamoClient, {
      marshallOptions: {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
    });

    this.dynamoDBClients.set('default', docClient);

    for (const tableName of tableNames) {
      const trimmedTable = tableName.trim();
      if (trimmedTable && trimmedTable !== 'products') {
        this.dynamoDBClients.set(trimmedTable, docClient);
      }
    }

    console.log(`DynamoDB client initialized for region: ${awsRegion}`);
  }

  getDynamoDBClient(tableName: string = 'default'): DynamoDBDocumentClient {
    const client = this.dynamoDBClients.get(tableName);
    if (!client) {
      return this.dynamoDBClients.get('default')!;
    }
    return client;
  }

  getDynamoDBTableName(): string {
    return this.configService.get<string>('DYNAMODB_TABLE_NAME', 'products');
  }

  private async closePrismaConnection(): Promise<void> {
    if (this.prismaClient) {
      await this.prismaClient.$disconnect();
      console.log('Prisma connection closed');
    }
  }

  private async closeMongooseConnections(): Promise<void> {
    for (const [name, connection] of this.mongooseConnections.entries()) {
      await connection.close();
      console.log(`MongoDB connection closed: ${name}`);
    }
  }

  isConnected(databaseType: 'sql' | 'nosql' | 'dynamodb'): boolean {
    switch (databaseType) {
      case 'sql':
        return this.prismaClient !== null;
      case 'nosql':
        return this.mongooseConnections.size > 0;
      case 'dynamodb':
        return this.dynamoDBClients.size > 0;
      default:
        return false;
    }
  }
}

// === ARCHIVO: api/src/shared/validators/positive-price.validator.ts ===
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
  IsOptional,
  isNumber,
} from 'class-validator';

@ValidatorConstraint({ name: 'positivePrice', async: false })
export class PositivePriceValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (IsOptional(value) || value === undefined || value === null) {
      return true;
    }

    if (!isNumber(value, { allowNaN: false, allowInfinity: false })) {
      return false;
    }

    return value > 0;
  }

  defaultMessage(args: ValidationArguments): string {
    const propertyName = args.property;
    const value = args.value;

    if (value === null || value === undefined) {
      return `${propertyName} should not be null or undefined`;
    }

    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      return `${propertyName} must be a valid number`;
    }

    return `${propertyName} must be a positive number greater than 0, got: ${value}`;
  }
}

export function IsPositivePrice(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: Object, propertyName: string | symbol): void {
    registerDecorator({
      target: object.constructor,
      propertyName: String(propertyName),
      options: validationOptions,
      constraints: [],
      validator: PositivePriceValidator,
    });
  };
}

@ValidatorConstraint({ name: 'priceRange', async: false })
export class PriceRangeValidator implements ValidatorConstraintInterface {
  private readonly minPrice: number;
  private readonly maxPrice: number;

  constructor(minPrice: number = 0.01, maxPrice: number = 999999.99) {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }

  validate(value: any, args: ValidationArguments): boolean {
    if (IsOptional(value) || value === undefined || value === null) {
      return true;
    }

    if (!isNumber(value, { allowNaN: false, allowInfinity: false })) {
      return false;
    }

    return value >= this.minPrice && value <= this.maxPrice;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Price must be between ${this.minPrice} and ${this.maxPrice}`;
  }
}

export function IsPriceInRange(
  minPrice: number = 0.01,
  maxPrice: number = 999999.99,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string | symbol): void {
    registerDecorator({
      target: object.constructor,
      propertyName: String(propertyName),
      options: validationOptions,
      constraints: [minPrice, maxPrice],
      validator: new PriceRangeValidator(minPrice, maxPrice),
    });
  };
}

@ValidatorConstraint({ name: 'validStock', async: false })
export class ValidStockValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (IsOptional(value) || value === undefined || value === null) {
      return true;
    }

    if (!Number.isInteger(value)) {
      return false;
    }

    return value >= 0;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a non-negative integer`;
  }
}

export function IsValidStock(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: Object, propertyName: string | symbol): void {
    registerDecorator({
      target: object.constructor,
      propertyName: String(propertyName),
      options: validationOptions,
      constraints: [],
      validator: ValidStockValidator,
    });
  };
}

// === ARCHIVO: api/src/shared/exceptions/product.exceptions.ts ===
import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    public readonly productId?: string,
    public readonly productName?: string,
  ) {
    super(
      {
        statusCode: status,
        message,
        error: 'Product Error',
        ...(productId && { productId }),
        ...(productName && { productName }),
      },
      status,
    );
  }
}

export class ProductNotFoundException extends ProductException {
  constructor(productId: string) {
    super(
      `Product with ID '${productId}' not found`,
      HttpStatus.NOT_FOUND,
      productId,
    );
    this.name = 'ProductNotFoundException';
  }
}

export class ProductAlreadyExistsException extends ProductException {
  constructor(productName: string) {
    super(
      `Product with name '${productName}' already exists`,
      HttpStatus.CONFLICT,
      undefined,
      productName,
    );
    this.name = 'ProductAlreadyExistsException';
  }
}

export class DuplicateProductNameException extends ProductException {
  constructor(productName: string) {
    super(
      `Product with name '${productName}' already exists`,
      HttpStatus.CONFLICT,
      undefined,
      productName,
    );
    this.name = 'DuplicateProductNameException';
  }
}

export class InvalidProductDataException extends ProductException {
  constructor(message: string, validationErrors?: Record<string, string[]>) {
    super(message, HttpStatus.BAD_REQUEST);
    this.name = 'InvalidProductDataException';
    if (validationErrors) {
      this['validationErrors'] = validationErrors;
    }
  }
}

export class ProductInUseException extends ProductException {
  constructor(productId: string, referencedBy: string[]) {
    super(
      `Product with ID '${productId}' cannot be deleted as it is referenced by: ${referencedBy.join(', ')}`,
      HttpStatus.CONFLICT,
      productId,
    );
    this.name = 'ProductInUseException';
    this['referencedBy'] = referencedBy;
  }
}

export class InsufficientStockException extends ProductException {
  constructor(productId: string, requestedQuantity: number, availableStock: number) {
    super(
      `Insufficient stock for product '${productId}'. Requested: ${requestedQuantity}, Available: ${availableStock}`,
      HttpStatus.UNPROCESSABLE_ENTITY,
      productId,
    );
    this.name = 'InsufficientStockException';
    this['requestedQuantity'] = requestedQuantity;
    this['availableStock'] = availableStock;
  }
}

export class NegativePriceException extends ProductException {
  constructor(price: number) {
    super(
      `Price cannot be negative. Provided value: ${price}`,
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'NegativePriceException';
    this['providedPrice'] = price;
  }
}

export class InvalidPriceException extends ProductException {
  constructor(price: number) {
    super(
      `Invalid price value: ${price}. Price must be a positive number`,
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'InvalidPriceException';
    this['providedPrice'] = price;
  }
}

export class ProductOperationException extends ProductException {
  constructor(operation: string, originalError: Error) {
    super(
      `Failed to perform '${operation}' operation on product: ${originalError.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.name = 'ProductOperationException';
    this['operation'] = operation;
    this['originalError'] = originalError.message;
  }
}

export class DatabaseConnectionException extends ProductException {
  constructor(databaseType: string, originalError: Error) {
    super(
      `Failed to connect to ${databaseType} database: ${originalError.message}`,
      HttpStatus.SERVICE_UNAVAILABLE,
    );
    this.name = 'DatabaseConnectionException';
    this['databaseType'] = databaseType;
    this['originalError'] = originalError.message;
  }
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';

  await app.listen(port, host);
  logger.log(`Aplicación iniciada en http://${host}:${port}/api`);
  logger.log(`Documentación Swagger disponible en http://${host}:${port}/api/docs`);
}

bootstrap();

// === ARCHIVO: api/src/app.module.ts ===
import { Module, Logger, OnModuleInit, OnModuleDestroy, Inject, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductSqlRepository } from './infrastructure/repositories/sql/product-sql.repository';
import { ProductNosqlRepository } from './infrastructure/repositories/nosql/product-nosql.repository';
import { DatabaseConfig } from './infrastructure/config/database.config';
import { ProductRepository } from './domain/repositories/product.repository';

export const PRODUCT_REPOSITORY_TOKEN = 'ProductRepository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [ProductController],
  providers: [
    DatabaseConfig,
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useFactory: (configService: ConfigService, databaseConfig: DatabaseConfig): ProductRepository => {
        const dbType = configService.get<string>('DATABASE_TYPE', 'sql');
        const logger = new Logger('ProductRepositoryFactory');

        if (dbType === 'nosql') {
          logger.log('Inicializando repositorio NoSQL (MongoDB)');
          return new ProductNosqlRepository(databaseConfig.getMongooseConnection());
        }

        if (dbType === 'dynamodb') {
          logger.log('DynamoDB seleccionado - debe implementarse el repositorio correspondiente');
        }

        logger.log('Inicializando repositorio SQL (PostgreSQL/Prisma)');
        return new ProductSqlRepository();
      },
      inject: [ConfigService, DatabaseConfig],
    },
    ProductService,
  ],
  exports: [ProductService, PRODUCT_REPOSITORY_TOKEN],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly databaseConfig: DatabaseConfig) {}

  async onModuleInit() {
    this.logger.log('Inicializando módulo de aplicación');
    try {
      await this.databaseConfig.onModuleInit();
      this.logger.log('Conexiones de base de datos inicializadas correctamente');
    } catch (error) {
      this.logger.error('Error al inicializar conexiones de base de datos', error);
    }
  }

  async onModuleDestroy() {
    this.logger.log('Cerrando módulo de aplicación');
    try {
      await this.databaseConfig.onModuleDestroy();
      this.logger.log('Conexiones de base de datos cerradas correctamente');
    } catch (error) {
      this.logger.error('Error al cerrar conexiones de base de datos', error);
    }
  }
}

// === ARCHIVO: client/package.json ===
{
  "name": "product-management-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "react": "19.3.1",
    "react-dom": "19.3.1",
    "axios": "1.7.2",
    "react-hook-form": "7.52.0",
    "@hookform/resolvers": "3.6.0",
    "zod": "3.23.8"
  },
  "devDependencies": {
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "@vitejs/plugin-react": "4.3.1",
    "typescript": "5.5.3",
    "vite": "5.3.1",
    "eslint": "8.57.0",
    "eslint-plugin-react": "7.34.2",
    "eslint-plugin-react-hooks": "4.6.2",
    "eslint-plugin-react-refresh": "0.4.7"
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}

// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gestión de Productos</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/features/products/types.ts ===
export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
}

// === ARCHIVO: client/src/features/products/productApi.ts ===
import axios from 'axios';
import type { ProductEntity, CreateProductDto, UpdateProductDto } from './types';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  getAllProducts: async (): Promise<ProductEntity[]> => {
    const response = await apiClient.get<ProductEntity[]>('/products');
    return response.data;
  },

  getProductById: async (id: string): Promise<ProductEntity> => {
    const response = await apiClient.get<ProductEntity>(`/products/${id}`);
    return response.data;
  },

  createProduct: async (data: CreateProductDto): Promise<ProductEntity> => {
    const response = await apiClient.post<ProductEntity>('/products', data);
    return response.data;
  },

  updateProduct: async (id: string, data: UpdateProductDto): Promise<ProductEntity> => {
    const response = await apiClient.put<ProductEntity>(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};

// === ARCHIVO: client/src/features/products/ProductList.tsx ===
import { useState, useEffect } from 'react';
import { productApi } from './productApi';
import type { ProductEntity } from './types';

interface ProductListProps {
  onEdit: (product: ProductEntity) => void;
  onDelete: (id: string) => void;
}

export function ProductList({ onEdit, onDelete }: ProductListProps) {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productApi.getAllProducts();
      setProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) {
      return;
    }
    try {
      await productApi.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar producto';
      alert(message);
    }
  };

  if (loading) {
    return (
      <div className="product-list__loading">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list__error">
        <p>Error: {error}</p>
        <button onClick={fetchProducts}>Reintentar</button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-list__empty">
        <p>No hay productos registrados</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      <table className="product-list__table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td className="product-list__actions">
                <button
                  onClick={() => onEdit(product)}
                  className="product-list__edit-btn"
                  aria-label={`Editar ${product.name}`}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="product-list__delete-btn"
                  aria-label={`Eliminar ${product.name}`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// === ARCHIVO: client/src/features/products/ProductForm.tsx ===
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { productApi } from './productApi';
import type { ProductEntity, CreateProductDto, UpdateProductDto } from './types';

const productSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  price: z
    .number({ invalid_type_error: 'El precio debe ser un número' })
    .min(0, 'El precio no puede ser negativo'),
  stock: z
    .number({ invalid_type_error: 'El stock debe ser un número' })
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  category: z
    .string()
    .min(1, 'La categoría es requerida')
    .max(50, 'La categoría no puede exceder 50 caracteres'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: ProductEntity | null;
  onSuccess: () => void;
  onCancel: () => void;
  onSubmit?: (data: CreateProductDto | UpdateProductDto) => Promise<ProductEntity>;
}

export function ProductForm({ product, onSuccess, onCancel, onSubmit: externalOnSubmit }: ProductFormProps) {
  const isEditing = !!product;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          price: product.price,
          stock: product.stock,
          category: product.category,
        }
      : {
          name: '',
          price: 0,
          stock: 0,
          category: '',
        },
  });

  const handleSubmitForm = async (data: ProductFormData) => {
    if (externalOnSubmit) {
      await externalOnSubmit(data);
      onSuccess();
      return;
    }

    try {
      if (isEditing && product) {
        const updateData: UpdateProductDto = {
          name: data.name,
          price: data.price,
          stock: data.stock,
          category: data.category,
        };
        await productApi.updateProduct(product.id, updateData);
      } else {
        const createData: CreateProductDto = {
          name: data.name,
          price: data.price,
          stock: data.stock,
          category: data.category,
        };
        await productApi.createProduct(createData);
      }
      reset();
      onSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar el producto';
      alert(message);
    }
  };

  return (
    <div className="product-form">
      <h2>{isEditing ? 'Editar Producto' : 'Crear Producto'}</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="product-form__form">
        <div className="product-form__field">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <span className="product-form__error">{errors.name.message}</span>
          )}
        </div>

        <div className="product-form__field">
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            aria-invalid={errors.price ? 'true' : 'false'}
          />
          {errors.price && (
            <span className="product-form__error">{errors.price.message}</span>
          )}
        </div>

        <div className="product-form__field">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            {...register('stock', { valueAsNumber: true })}
            aria-invalid={errors.stock ? 'true' : 'false'}
          />
          {errors.stock && (
            <span className="product-form__error">{errors.stock.message}</span>
          )}
        </div>

        <div className="product-form__field">
          <label htmlFor="category">Categoría</label>
          <input
            id="category"
            type="text"
            {...register('category')}
            aria-invalid={errors.category ? 'true' : 'false'}
          />
          {errors.category && (
            <span className="product-form__error">{errors.category.message}</span>
          )}
        </div>

        <div className="product-form__actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="product-form__submit"
          >
            {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="product-form__cancel"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// === ARCHIVO: client/src/App.tsx ===
import { useState, useCallback } from 'react';
import axios from 'axios';
import { ProductList } from './features/products/ProductList';
import { ProductForm } from './features/products/ProductForm';
import { ProductEntity, CreateProductDto, UpdateProductDto } from './features/products/types';

const API_BASE_URL = 'http://localhost:3000';

function App() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedProduct, setSelectedProduct] = useState<ProductEntity | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateSuccess = useCallback(() => {
    setView('list');
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleEditSuccess = useCallback(() => {
    setView('list');
    setSelectedProduct(null);
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleCancel = useCallback(() => {
    setView('list');
    setSelectedProduct(null);
  }, []);

  const handleEdit = useCallback((product: ProductEntity) => {
    setSelectedProduct(product);
    setView('edit');
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const confirmed = window.confirm('¿Está seguro de que desea eliminar este producto?');
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('No se pudo eliminar el producto. Verifique que no tenga referencias.');
    }
  }, []);

  const handleCreateSubmit = useCallback(async (data: CreateProductDto | UpdateProductDto): Promise<ProductEntity> => {
    const response = await axios.post<ProductEntity>(`${API_BASE_URL}/products`, data);
    return response.data;
  }, []);

  const handleUpdateSubmit = useCallback(async (data: CreateProductDto | UpdateProductDto): Promise<ProductEntity> => {
    if (!selectedProduct) {
      throw new Error('No hay producto seleccionado para actualizar');
    }
    const response = await axios.put<ProductEntity>(`${API_BASE_URL}/products/${selectedProduct.id}`, data);
    return response.data;
  }, [selectedProduct]);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Gestión de Productos</h1>
      </header>
      
      <main className="app__main">
        {view === 'list' && (
          <>
            <div className="app__actions">
              <button 
                className="btn btn--primary"
                onClick={() => setView('create')}
              >
                Nuevo Producto
              </button>
            </div>
            <ProductList
              key={refreshKey}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
        
        {view === 'create' && (
          <ProductForm
            onSuccess={handleCreateSuccess}
            onCancel={handleCancel}
            onSubmit={handleCreateSubmit}
          />
        )}
        
        {view === 'edit' && selectedProduct && (
          <ProductForm
            product={selectedProduct}
            onSuccess={handleEditSuccess}
            onCancel={handleCancel}
            onSubmit={handleUpdateSubmit}
          />
        )}
      </main>
    </div>
  );
}

export default App;

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
