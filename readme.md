# Backend III - ShipNow API

## Descripción

Este proyecto corresponde a la preentrega del curso **Backend III**.

El objetivo principal fue desarrollar y refactorizar una API REST para el sistema **ShipNow**, aplicando una arquitectura por capas y buenas prácticas de desarrollo con **Node.js, Express y MongoDB**.

La aplicación separa las responsabilidades entre:

- Routes
- Controllers
- Services
- Repositories

Además, se incorporaron funcionalidades de:

- Manejo centralizado de errores.
- Generación de datos mock con Faker.
- Sistema de logging.
- Documentación de la API mediante Swagger.
- Tests funcionales automatizados con Mocha, Chai y Supertest.
- Entorno de testing separado del entorno de desarrollo.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Dotenv
- Faker
- Winston
- Swagger UI Express
- Mocha
- Chai
- Supertest

---

# Arquitectura

El proyecto utiliza una arquitectura por capas:

```text
Cliente
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
MongoDB
Responsabilidad de cada capa
Routes

Definen los endpoints disponibles en la API y redirigen las solicitudes al Controller correspondiente.

Controllers

Reciben las solicitudes HTTP (req y res), llaman a los Services y devuelven las respuestas correspondientes.

Los errores son delegados al middleware global mediante next(error).

Services

Contienen la lógica de negocio de la aplicación.

Algunas responsabilidades:

Validación de usuarios existentes.
Validación de códigos de productos.
Verificación de existencia antes de actualizar o eliminar.
Validación de estados.
Generación de datos mock.
Repositories

Son los responsables de interactuar directamente con MongoDB mediante Mongoose.

De esta manera, las consultas a la base de datos quedan separadas de la lógica de negocio.

Funcionalidades
Productos
Obtener todos los productos.
Obtener producto por ID.
Crear producto.
Actualizar producto.
Eliminar producto.
Usuarios
Obtener todos los usuarios.
Obtener usuario por ID.
Crear usuario.
Actualizar usuario.
Eliminar usuario.
Órdenes
Obtener todas las órdenes.
Obtener orden por ID.
Crear una orden.
Actualizar una orden.
Eliminar una orden.
Validar estados de las órdenes.
Entregas
Gestión de entregas asociadas a órdenes.
Asociación de repartidores.
Manejo de prioridades y estados.
Variables de entorno

La aplicación utiliza variables de entorno para configurar el servidor y la conexión con MongoDB.

Crear un archivo .env:

PORT=3000
MONGODB_URI=tu_mongodb_connection_string
NODE_ENV=development

Para ejecutar los tests se utiliza un archivo independiente:

.env.test

Este archivo debe utilizar una base de datos exclusiva para testing.

Ejemplo:

PORT=3001
MONGODB_URI=tu_mongodb_test_connection_string
NODE_ENV=test

No subir los archivos .env al repositorio. Se recomienda utilizar .env.example como referencia.

Instalación

Clonar el repositorio:

git clone <url-del-repositorio>

Ingresar al proyecto:

cd backend-III

Instalar las dependencias:

npm install
Ejecución

Para ejecutar el proyecto en modo desarrollo:

npm run dev

También puede ejecutarse mediante:

npm start
Endpoints
Productos
Método	Endpoint
GET	/api/products
GET	/api/products/:id
POST	/api/products
PUT	/api/products/:id
DELETE	/api/products/:id
Usuarios
Método	Endpoint
GET	/api/users
GET	/api/users/:id
POST	/api/users
PUT	/api/users/:id
DELETE	/api/users/:id
Órdenes
Método	Endpoint
GET	/api/orders
GET	/api/orders/:id
POST	/api/orders
PUT	/api/orders/:id
DELETE	/api/orders/:id
Logger
Método	Endpoint
GET	/api/logger/test

Este endpoint permite comprobar el funcionamiento del sistema de logging.

Swagger

La documentación de la API está disponible mediante Swagger UI:

GET /api/docs

La interfaz permite consultar los endpoints documentados y visualizar la estructura de las solicitudes y respuestas de la API.

Mocking

Se incorporó un módulo de mocking utilizando Faker para generar datos de prueba automáticamente.

Los endpoints de generación de mocks permiten obtener datos simulados sin almacenarlos en la base de datos.

Además, se incorporó un endpoint para poblar la base de datos con datos de prueba relacionados entre sí.

Endpoints
Obtener usuarios simulados
GET /api/mocks/users?quantity=5

Genera la cantidad indicada de usuarios y los devuelve en formato JSON sin almacenarlos en la base de datos.

Obtener productos simulados
GET /api/mocks/products?quantity=5

Genera productos simulados sin almacenarlos en la base de datos.

Obtener órdenes simuladas
GET /api/mocks/orders?quantity=5

Genera órdenes simuladas sin almacenarlas en la base de datos.

Obtener entregas simuladas
GET /api/mocks/deliveries?quantity=5

Genera entregas simuladas sin almacenarlas en la base de datos.

Poblar la base de datos
POST /api/mocks/populate

Inserta datos de prueba en MongoDB respetando las relaciones entre las entidades.

Body de ejemplo:

{
  "users": 5,
  "products": 10,
  "orders": 8,
  "deliveries": 8
}

El endpoint:

Inserta usuarios de prueba.
Inserta productos de prueba.
Crea órdenes asociadas a usuarios y productos existentes.
Crea entregas asociadas a órdenes.
Asocia repartidores a las entregas.
Manejo profesional de errores

Se implementó un sistema centralizado de manejo de errores para toda la API mediante:

CustomError
Diccionario centralizado de errores.
Códigos internos de error.
Middleware global de errores.
Componentes
src/errors/

├── custom-error.js
├── error-codes.js
├── error-dictionary.js
└── error.middleware.js
CustomError

Los errores esperados utilizan la clase CustomError, permitiendo definir:

Código HTTP.
Código interno del error.
Mensaje descriptivo.
Información adicional (cause).
Error Dictionary

Los errores se encuentran centralizados en error-dictionary.js.

Algunos ejemplos:

USER_NOT_FOUND
PRODUCT_NOT_FOUND
ORDER_NOT_FOUND
DELIVERY_NOT_FOUND
EMAIL_ALREADY_EXISTS
PRODUCT_ALREADY_EXISTS
INVALID_QUANTITY
INTERNAL_SERVER_ERROR
Middleware global

Los Controllers no manejan directamente las respuestas de error.

Cuando ocurre un error esperado, se utiliza:

next(error);

El middleware global se encarga de generar una respuesta uniforme.

Formato de respuesta

Los errores siguen una estructura común:

{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found",
    "cause": null
  }
}

Los errores inesperados son manejados como:

500 Internal Server Error

sin exponer información interna del servidor.

Validaciones implementadas
Productos
No permite crear productos con el mismo código.
Verifica la existencia del producto antes de actualizarlo.
Verifica la existencia del producto antes de eliminarlo.
Valida los datos requeridos del producto.
Usuarios
No permite registrar usuarios con un email existente.
Verifica la existencia del usuario antes de actualizarlo.
Verifica la existencia del usuario antes de eliminarlo.
Órdenes
Verifica la existencia de la orden antes de actualizarla.
Verifica la existencia de la orden antes de eliminarla.
Verifica la existencia de la orden al consultarla por ID.
Valida los estados permitidos de las órdenes.
Valida que los datos requeridos estén presentes.
Mocking

Las cantidades solicitadas para generar mocks deben encontrarse entre:

1 - 100

Una cantidad inválida genera un error:

400 Bad Request
Logging

Se incorporó un sistema de logging utilizando Winston.

El logger permite registrar diferentes niveles de información:

debug
http
info
warning
error
fatal

Los diferentes módulos de la aplicación utilizan el logger para registrar eventos importantes.

Por ejemplo:

Conexión exitosa con MongoDB.
Creación de órdenes.
Cantidades inválidas en los mocks.
Recursos inexistentes.
Errores inesperados.

También se incorporó un endpoint específico para comprobar el funcionamiento del logger:

GET /api/logger/test

Este endpoint ejecuta mensajes de prueba correspondientes a los distintos niveles configurados.

Documentación con Swagger

La API cuenta con documentación interactiva mediante Swagger UI.

La documentación se encuentra disponible en:

/api/docs

Para acceder:

http://localhost:3000/api/docs

Swagger permite consultar la documentación de los endpoints y conocer:

Métodos HTTP disponibles.
Rutas.
Parámetros.
Estructuras de las solicitudes.
Respuestas esperadas.

La documentación busca mantener coherencia entre el comportamiento documentado y el comportamiento real de la API.

Testing

Se implementó una suite de tests funcionales automatizados utilizando:

Mocha: ejecución y organización de los tests.
Chai: validación de resultados y estructuras.
Supertest: realización de peticiones HTTP contra la aplicación Express.

Los tests utilizan un entorno separado del desarrollo mediante .env.test.

Ejecución de los tests

Los tests pueden ejecutarse mediante:

npm test

El proyecto utiliza un script de testing configurado para cargar las variables de entorno de .env.test.

Los tests se ejecutan directamente sobre app.js, sin necesidad de iniciar manualmente el servidor ni abrir un puerto adicional.

Base de datos de testing

El entorno de testing utiliza una base de datos independiente de la utilizada durante el desarrollo.

Los datos utilizados durante las pruebas son controlados y descartables.

Los tests realizan limpieza de los datos generados para evitar que las pruebas dependan del estado previo de la base de datos.

Tests funcionales implementados

Actualmente la suite contiene tests para los principales módulos de la aplicación.

Users API

Se prueba:

Obtener todos los usuarios.
Validación de la estructura de la respuesta.
Intentar registrar un usuario utilizando un email existente.
Respuesta 409 Conflict.
Formato del error.
Orders API

Se prueba:

Obtener todas las órdenes.
Crear una orden con datos válidos.
Consultar una orden por ID.
Consultar una orden inexistente.
Respuesta 404 Not Found.
Actualizar el estado de una orden.
Rechazar un estado inválido.
Respuesta 400 Bad Request.
Rechazar datos incompletos.
Mocks API

Se prueba:

Generación de usuarios.
Generación de productos.
Generación de órdenes.
Generación de entregas.
Validación de cantidades inválidas.
Poblar la base de datos mediante /api/mocks/populate.
Validación de la estructura de los datos generados.
Logger API

Se prueba:

GET /api/logger/test

El test verifica:

Status HTTP 200.
Estructura de la respuesta.
Mensaje esperado del endpoint.
Swagger API

Se prueba el acceso a:

GET /api/docs

El test verifica que la documentación de Swagger sea accesible correctamente.

Ruta inexistente

También se incorporó un test para verificar el comportamiento ante una ruta que no existe.

Se valida:

Status HTTP 404.
Estructura de error.
Código de error.
Mensaje correspondiente.
Casos de error testeados

La suite contempla diferentes escenarios de error:

Caso	Status
Usuario duplicado	409
Orden inexistente	404
Estado de orden inválido	400
Datos incompletos	400
Cantidad de mock inválida	400
Ruta inexistente	404

Los tests no se limitan a comprobar el código HTTP, sino que también verifican la estructura y las propiedades importantes del cuerpo de la respuesta.

Resultado de los tests

La suite funcional actual cuenta con:

18 passing

Todos los tests fueron ejecutados correctamente mediante:

npm test
Cómo probar errores manualmente
Usuario inexistente
GET /api/users/:id

Utilizar un ObjectId inexistente para obtener:

404 Not Found
Producto duplicado
POST /api/products

Intentar crear un producto utilizando un código (code) que ya exista.

Respuesta esperada:

409 Conflict
Orden inexistente
GET /api/orders/:id

Utilizar un ObjectId inexistente.

Respuesta esperada:

404 Not Found
Estado de orden inválido
PUT /api/orders/:id

Body:

{
  "status": "invalid_status"
}

Respuesta esperada:

400 Bad Request
Cantidad inválida en Mocking
GET /api/mocks/users?quantity=0

o:

GET /api/mocks/users?quantity=-1

Respuesta esperada:

400 Bad Request
Estructura general del proyecto
src/
├── config/
├── constants/
├── controllers/
├── errors/
├── middlewares/
├── mocks/
├── models/
├── repositories/
├── routes/
├── services/
├── app.js
└── server.js

test/
├── logger.test.js
├── mock.test.js
├── not-found.test.js
├── order.test.js
├── swagger.test.js
└── user.test.js
Autor

Carlos Rueda

Curso: Backend III

Tecnologías:

Node.js
Express
MongoDB
Mongoose
Dotenv
Faker
Winston
Swagger
Mocha
Chai
Supertest
```
