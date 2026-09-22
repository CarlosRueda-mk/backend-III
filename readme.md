Backend III - ShipNow API
Descripción

ShipNow es una API REST desarrollada con Node.js, Express y MongoDB, orientada a la gestión de productos, usuarios, órdenes y entregas.

El proyecto fue desarrollado aplicando una arquitectura por capas, separación de responsabilidades, manejo centralizado de errores, logging, documentación con Swagger, pruebas funcionales, carga de archivos y preparación para ejecución en producción mediante Docker.

Tecnologías utilizadas
Node.js
Express
MongoDB
Mongoose
dotenv
Winston
Winston Daily Rotate File
Swagger / OpenAPI
Mocha
Chai
Supertest
Multer
Docker
Docker Compose
Arquitectura

El proyecto utiliza una arquitectura por capas:

Routes
↓
Controllers
↓
Services
↓
Repositories
↓
Models
↓
MongoDB
Routes

Definen los endpoints disponibles de la API y reciben las solicitudes HTTP.

Controllers

Se encargan de recibir las solicitudes, obtener los parámetros necesarios y devolver las respuestas HTTP.

Services

Contienen la lógica de negocio de la aplicación.

Repositories

Se encargan de comunicarse con MongoDB mediante Mongoose.

Models

Definen los esquemas y estructuras de los documentos almacenados en MongoDB.

Funcionalidades principales

La API permite:

Gestionar productos.
Gestionar usuarios.
Gestionar órdenes.
Gestionar entregas.
Generar datos mock para desarrollo y pruebas.
Registrar documentos de usuarios.
Registrar comprobantes de órdenes.
Consultar el estado de salud de la API.
Consultar la documentación Swagger.
Manejar errores de manera centralizada.
Registrar eventos mediante Winston.
Realizar pruebas funcionales.
Ejecutarse mediante Docker.
Ejecutarse junto con MongoDB mediante Docker Compose.
Estructura del proyecto
backend-III/
│
├── docs/
│ ├── deliveries.yaml
│ ├── health.yaml
│ ├── logger.yaml
│ ├── mocks.yaml
│ ├── orders.yaml
│ ├── products.yaml
│ ├── users.yaml
│ │
│ ├── responses/
│ │ └── responses.yaml
│ │
│ └── schemas/
│ ├── delivery.yaml
│ ├── error.yaml
│ ├── health.yaml
│ ├── mock.yaml
│ ├── order.yaml
│ ├── product.yaml
│ ├── success.yaml
│ └── user.yaml
│
├── logs/
│
├── uploads/
│
├── src/
│ ├── config/
│ ├── constants/
│ ├── controllers/
│ ├── dao/
│ ├── errors/
│ ├── middlewares/
│ ├── models/
│ ├── repositories/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── index.js
│
├── test/
│ ├── health.test.js
│ ├── logger.test.js
│ ├── mock.test.js
│ ├── not-found.test.js
│ ├── order-receipt.test.js
│ ├── order.test.js
│ ├── swagger.test.js
│ ├── user-document.test.js
│ └── user.test.js
│
├── .dockerignore
├── .env
├── .env.example
├── .env.test
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
Variables de entorno

El proyecto utiliza variables de entorno para configurar la aplicación.

Crear un archivo .env:

PORT=3000
MONGODB_URI=TU_MONGODB_URI
NODE_ENV=development
LOG_LEVEL=debug

También existe un archivo .env.example para indicar las variables necesarias sin incluir información sensible.

Variables utilizadas
Variable Descripción
PORT Puerto utilizado por la API
MONGODB_URI URL de conexión a MongoDB
NODE_ENV Entorno de ejecución
LOG_LEVEL Nivel de logging

Los valores reales de conexión y configuración no deben subirse al repositorio.

Instalación

Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO>

Ingresar al proyecto:

cd backend-III

Instalar las dependencias:

npm install

Configurar las variables de entorno:

.env

Luego iniciar el servidor:

npm run dev
Ejecución
Desarrollo
npm run dev

El servidor estará disponible en:

http://localhost:3000
Endpoints
Health Check
Consultar estado de la API
GET /health

Ejemplo de respuesta:

{
"status": "ok",
"environment": "development",
"uptime": 123.456,
"timestamp": "2026-09-21T00:00:00.000Z"
}

Este endpoint permite verificar que la API se encuentra funcionando correctamente.

Products

Base URL:

/api/products
Método Endpoint Descripción
GET /api/products Obtener productos
GET /api/products/:id Obtener producto por ID
POST /api/products Crear producto
PUT /api/products/:id Actualizar producto
DELETE /api/products/:id Eliminar producto
Users

Base URL:

/api/users
Método Endpoint Descripción
GET /api/users Obtener usuarios
GET /api/users/:id Obtener usuario por ID
POST /api/users Crear usuario
PUT /api/users/:id Actualizar usuario
DELETE /api/users/:id Eliminar usuario
POST /api/users/:id/documents Subir documento de usuario
Orders

Base URL:

/api/orders
Método Endpoint Descripción
GET /api/orders Obtener órdenes
GET /api/orders/:id Obtener orden por ID
POST /api/orders Crear orden
PUT /api/orders/:id Actualizar orden
DELETE /api/orders/:id Eliminar orden
POST /api/orders/:id/receipt Subir comprobante de orden
Deliveries

Base URL:

/api/deliveries
Método Endpoint Descripción
GET /api/deliveries Obtener entregas
GET /api/deliveries/:id Obtener entrega por ID
POST /api/deliveries Crear entrega
PUT /api/deliveries/:id Actualizar entrega
DELETE /api/deliveries/:id Eliminar entrega
Paginación

Los endpoints de listado utilizan paginación mediante los parámetros:

?page=1&limit=10

Ejemplo:

GET /api/users?page=1&limit=10

El valor máximo permitido para limit es:

100

Las respuestas incluyen información de paginación.

Ejemplo:

{
"success": true,
"users": [],
"pagination": {
"page": 1,
"limit": 10,
"total": 25,
"totalPages": 3
}
}

La misma estrategia se utiliza para los listados de órdenes y entregas.

Uploads

La API permite cargar archivos asociados a usuarios y órdenes.

Documentos de usuarios
POST /api/users/:id/documents

El archivo debe enviarse utilizando multipart/form-data.

Campo:

document
Comprobantes de órdenes
POST /api/orders/:id/receipt

El archivo debe enviarse utilizando multipart/form-data.

Campo:

receipt
Validaciones

Los archivos tienen un límite máximo de:

5 MB

Formatos permitidos:

PDF
JPG
JPEG
PNG

Los archivos son procesados mediante Multer.

La información del archivo también se almacena como metadata asociada al recurso correspondiente.

Manejo global de errores

La aplicación utiliza un middleware global para centralizar el manejo de errores.

Las respuestas mantienen una estructura consistente.

Ejemplo:

{
"success": false,
"error": {
"code": "RESOURCE_NOT_FOUND",
"message": "Resource not found"
}
}

Entre los errores contemplados se encuentran:

Recurso no encontrado.
Datos inválidos.
Estado inválido.
Archivo requerido.
Tipo de archivo inválido.
Archivo demasiado grande.
Cantidad de mocks inválida.
Errores de MongoDB.
Errores de Multer.
Errores internos del servidor.
Errores personalizados

La aplicación utiliza errores de dominio para representar diferentes situaciones.

Entre ellos se encuentran:

ResourceNotFoundError
InvalidDataError
InvalidStateError
FileRequiredError
InvalidFileTypeError
FileTooLargeError
InvalidMockQuantityError

Esto permite mantener una respuesta uniforme independientemente del lugar donde se produzca el error.

Logging

El proyecto utiliza Winston para el sistema de logging.

Se manejan diferentes niveles:

fatal
error
warning
info
http
debug
Logs generales

Los eventos generales se almacenan en:

logs/combined-YYYY-MM-DD.log
Logs de errores

Los errores se almacenan en:

logs/error-YYYY-MM-DD.log

Los archivos de log utilizan rotación diaria.

Los logs se mantienen durante un período limitado para evitar un crecimiento indefinido de los archivos.

Consola

La salida por consola está habilitada únicamente en:

NODE_ENV=development

En producción no se utiliza la consola como transporte del logger.

Logger de prueba

En desarrollo existe un endpoint para validar el sistema de logging:

GET /api/logger/test

Este endpoint está disponible únicamente fuera de producción.

Mocks

Los endpoints de mocks permiten generar datos para desarrollo y pruebas.

Base URL:

/api/mocks

Estos endpoints están disponibles únicamente cuando:

NODE_ENV !== production

En producción se encuentran deshabilitados.

Seguridad de endpoints internos

Los endpoints utilizados para:

mocks
pruebas de logger

no se encuentran disponibles en producción.

Esto evita exponer funcionalidades internas de desarrollo en un entorno productivo.

Swagger

La API cuenta con documentación utilizando Swagger / OpenAPI.

La documentación está disponible en:

http://localhost:3000/api/docs/

Swagger documenta:

Health check.
Products.
Users.
Orders.
Deliveries.
Mocks.
Logger.
Uploads.
Respuestas de éxito.
Respuestas de error.
Schemas utilizados por la API.

La documentación se encuentra organizada dentro de:

docs/
Schemas Swagger

El proyecto incluye schemas para los principales recursos:

Delivery
Error
Health
Mock
Order
Product
Success
User

También se incluyen respuestas reutilizables para diferentes situaciones HTTP.

Testing

El proyecto utiliza:

Mocha
Chai
Supertest

Los tests se encuentran dentro de:

test/

Para ejecutar todas las pruebas:

npm test

Las pruebas utilizan un entorno separado mediante:

.env.test

Esto permite utilizar una base de datos independiente del entorno de desarrollo.

Tests incluidos

El proyecto cuenta con pruebas para:

Health Check.
Users.
Orders.
Receipts de órdenes.
Documents de usuarios.
Mocks.
Logger.
Swagger.
Recursos inexistentes.
Flujos principales de creación, consulta y actualización.

Las pruebas funcionales utilizan Supertest para realizar solicitudes HTTP reales contra la aplicación.

Base de datos de testing

El entorno de testing utiliza:

.env.test

Ejemplo:

PORT=3001
MONGODB_URI=TU_MONGODB_TEST_URI
NODE_ENV=test
LOG_LEVEL=error

Los datos utilizados durante las pruebas se mantienen separados de la base de datos principal.

Producción

Para ejecutar la aplicación en producción:

NODE_ENV=production

En producción:

Se deshabilitan los endpoints de mocks.
Se deshabilita el endpoint de prueba del logger.
Se mantiene disponible Swagger.
Se mantiene disponible el Health Check.
Se utiliza el sistema de logging mediante archivos.
No se utiliza el transporte de consola de Winston.
Docker

El proyecto incluye un Dockerfile preparado para producción mediante un build multi-stage.

El Dockerfile utiliza dos etapas:

dependencies
production

La primera etapa instala las dependencias de producción.

La segunda etapa contiene únicamente lo necesario para ejecutar la aplicación.

Construcción de la imagen Docker

Desde la raíz del proyecto:

docker build -t shipnow-api .
Ejecución del contenedor

Para ejecutar la API:

docker run -p 3000:3000 \
 -e PORT=3000 \
 -e NODE_ENV=production \
 -e LOG_LEVEL=info \
 -e MONGODB_URI="TU_MONGODB_URI" \
 shipnow-api

La API estará disponible en:

http://localhost:3000

Health Check:

http://localhost:3000/health

Swagger:

http://localhost:3000/api/docs/
Docker Compose

El proyecto también incluye:

docker-compose.yml

Este archivo permite levantar:

API ShipNow.
MongoDB.

MongoDB utiliza un volumen persistente:

mongo_data

Además, MongoDB posee un health check para verificar que el servicio esté disponible antes de iniciar la API.

La API depende de que MongoDB se encuentre saludable.

Ejecutar con Docker Compose

Desde la raíz del proyecto:

docker compose up --build

Para ejecutar los servicios en segundo plano:

docker compose up --build -d

Para detener los servicios:

docker compose down

Para detener los servicios y eliminar los volúmenes:

docker compose down -v

La API estará disponible en:

http://localhost:3000

Swagger:

http://localhost:3000/api/docs/

Health Check:

http://localhost:3000/health
Docker Compose y MongoDB

Dentro de Docker Compose, la API se conecta a MongoDB utilizando el nombre del servicio:

mongodb://mongo:27017/shipnow

Esto es diferente de una conexión local o de MongoDB Atlas.

El nombre:

mongo

corresponde al servicio definido en docker-compose.yml.

.dockerignore

El proyecto incluye un .dockerignore para evitar copiar archivos innecesarios dentro de la imagen Docker.

Entre los elementos excluidos se encuentran:

node_modules
.env
.env.test
.git
logs
uploads
coverage
npm-debug.log
Archivos excluidos del repositorio

Los siguientes archivos y directorios contienen información o datos que no deben versionarse:

.env
.env.test
logs/
uploads/
node_modules/
coverage/

El archivo:

.env.example

sí debe formar parte del repositorio porque sirve como referencia para configurar el proyecto.

Scripts disponibles

Los principales comandos del proyecto son:

npm install

Instala las dependencias.

npm run dev

Inicia el servidor en modo desarrollo.

npm start

Inicia el servidor en modo producción.

npm test

Ejecuta la suite de pruebas.

Flujo general de una solicitud

Una solicitud HTTP sigue el siguiente flujo:

Cliente
↓
Route
↓
Controller
↓
Service
↓
Repository
↓
Model
↓
MongoDB

La respuesta realiza el camino inverso:

MongoDB
↓
Model
↓
Repository
↓
Service
↓
Controller
↓
Cliente

Los errores son procesados por el middleware global correspondiente.

Manejo de archivos

Los archivos cargados por los usuarios son procesados mediante Multer.

El sistema valida:

Existencia del archivo.
Tipo MIME.
Extensión.
Tamaño máximo.
Errores producidos durante la carga.

Los documentos y comprobantes almacenan metadata relacionada con el archivo.

Configuración centralizada

La configuración de la aplicación se encuentra centralizada para evitar acceder directamente a las variables de entorno desde diferentes partes del proyecto.

Las variables son validadas al iniciar la aplicación.

Si falta una variable obligatoria, la aplicación informa el error y finaliza el proceso.

MongoDB

La aplicación utiliza:

MongoDB

y:

Mongoose

para la persistencia y comunicación con la base de datos.

Los modelos definen la estructura de los documentos y los repositories centralizan las operaciones realizadas sobre MongoDB.

Estados y constantes

Los valores utilizados por la aplicación se centralizan mediante constantes.

Esto permite evitar valores escritos directamente en diferentes partes del código y mantener una única fuente de verdad.

Las constantes se encuentran dentro de:

src/constants/
Variables y configuración para desarrollo

Para trabajar localmente se recomienda utilizar:

NODE_ENV=development

Esto permite:

Habilitar logs en consola.
Habilitar endpoints de mocks.
Habilitar el endpoint de prueba del logger.
Trabajar con las funcionalidades destinadas al desarrollo.
Variables y configuración para producción

Para producción:

NODE_ENV=production

En este entorno:

Los mocks están deshabilitados.
El endpoint de prueba del logger está deshabilitado.
Los logs se almacenan mediante archivos.
La consola no se utiliza como transporte de Winston.
Se mantiene disponible el Health Check.
Se mantiene disponible Swagger.
Comandos rápidos
Desarrollo
npm install
npm run dev
Tests
npm test
Docker
docker build -t shipnow-api .
docker run -p 3000:3000 shipnow-api
Docker Compose
docker compose up --build
URLs principales
API
http://localhost:3000
Health Check
http://localhost:3000/health
Swagger
http://localhost:3000/api/docs/
Products
http://localhost:3000/api/products
Users
http://localhost:3000/api/users
Orders
http://localhost:3000/api/orders
Deliveries
http://localhost:3000/api/deliveries
Autor

Carlos Rueda

Proyecto desarrollado como parte del curso Backend III.
