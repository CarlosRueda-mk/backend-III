# Backend III - Preentrega

## Descripción

Este proyecto corresponde a la preentrega del curso **Backend III**.

El objetivo principal fue refactorizar una API REST utilizando una arquitectura por capas, separando las responsabilidades entre **Routes**, **Controllers**, **Services** y **Repositories**, siguiendo buenas prácticas de desarrollo con Node.js, Express y MongoDB.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Dotenv

---

## Arquitectura

El proyecto utiliza una arquitectura por capas:

```
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
```

### Responsabilidad de cada capa

### Routes

Definen los endpoints de la API y redirigen las solicitudes al Controller correspondiente.

### Controllers

Reciben las solicitudes HTTP (`req` y `res`), llaman al Service y devuelven la respuesta al cliente.

### Services

Contienen la lógica de negocio de la aplicación.

Ejemplos:

- Validación de usuarios existentes.
- Validación de códigos de productos.
- Verificación de existencia antes de actualizar o eliminar.

### Repositories

Son los únicos encargados de interactuar con la base de datos mediante Mongoose.

---

## Funcionalidades

### Productos

- Obtener todos los productos
- Obtener producto por ID
- Crear producto
- Actualizar producto
- Eliminar producto

### Usuarios

- Obtener todos los usuarios
- Obtener usuario por ID
- Crear usuario
- Actualizar usuario
- Eliminar usuario

---

## Variables de entorno

Crear un archivo `.env` con las siguientes variables:

```env
PORT
MONGODB_URI
```

---

## Instalación

Clonar el repositorio:

```bash
git clone <url-del-repositorio>
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

o

```bash
npm start
```

---

## Endpoints

### Productos

| Método | Endpoint          |
| ------ | ----------------- |
| GET    | /api/products     |
| GET    | /api/products/:id |
| POST   | /api/products     |
| PUT    | /api/products/:id |
| DELETE | /api/products/:id |

---

### Usuarios

| Método | Endpoint       |
| ------ | -------------- |
| GET    | /api/users     |
| GET    | /api/users/:id |
| POST   | /api/users     |
| PUT    | /api/users/:id |
| DELETE | /api/users/:id |

---

## Validaciones implementadas

### Productos

- No permite crear productos con el mismo código.
- Verifica la existencia del producto antes de actualizar o eliminar.

### Usuarios

- No permite registrar usuarios con un email existente.
- Verifica la existencia del usuario antes de actualizar o eliminar.

---

## Mocking

Se incorporó un módulo de mocking para generar datos de prueba de manera automática utilizando Faker.

El módulo expone endpoints para generar datos simulados sin persistirlos en la base de datos y un endpoint para insertar datos de prueba en MongoDB.

### Endpoints

#### Obtener usuarios simulados

GET /api/mocks/users?quantity=5

Genera la cantidad indicada de usuarios y los devuelve en formato JSON sin almacenarlos en la base de datos.

---

#### Obtener productos simulados

GET /api/mocks/products?quantity=5

Genera productos simulados sin almacenarlos en la base de datos.

---

#### Obtener órdenes simuladas

GET /api/mocks/orders?quantity=5

Genera órdenes simuladas sin almacenarlas en la base de datos.

---

#### Obtener entregas simuladas

GET /api/mocks/deliveries?quantity=5

Genera entregas simuladas sin almacenarlas en la base de datos.

---

#### Poblar la base de datos

POST /api/mocks/populate

Inserta datos de prueba en MongoDB respetando las relaciones entre las entidades.

Body de ejemplo:

```json
{
  "users": 5,
  "products": 10,
  "orders": 8,
  "deliveries": 8
}
```

Este endpoint:

- Inserta usuarios de prueba.
- Inserta productos de prueba.
- Inserta órdenes asociadas a usuarios y productos existentes.
- Inserta entregas asociadas a órdenes y repartidores.

# Manejo profesional de errores

Se implementó un sistema centralizado de manejo de errores para toda la API utilizando errores personalizados, un diccionario de errores y un middleware global.

## Componentes

El sistema está compuesto por los siguientes archivos:

```text
src/errors/
├── custom-error.js
├── error-codes.js
├── error-dictionary.js
└── error.middleware.js
```

### CustomError

Todos los errores esperados del sistema utilizan la clase `CustomError`, la cual permite definir:

- Código HTTP
- Código interno del error
- Mensaje descriptivo
- Información adicional (cause)

### Error Dictionary

Todos los errores del proyecto se encuentran centralizados en `error-dictionary.js`, evitando repetir mensajes y códigos en distintos archivos.

Ejemplos:

- USER_NOT_FOUND
- PRODUCT_NOT_FOUND
- ORDER_NOT_FOUND
- DELIVERY_NOT_FOUND
- EMAIL_ALREADY_EXISTS
- PRODUCT_ALREADY_EXISTS
- INVALID_QUANTITY

### Middleware Global

La API utiliza un middleware global para responder todos los errores de forma consistente.

Los controllers ya no envían respuestas de error directamente, sino que delegan el manejo mediante `next(error)`.

## Formato de respuesta

Los errores responden con una estructura uniforme.

Ejemplo:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found",
    "cause": null
  }
}
```

## Cómo probar

### Usuario inexistente

```http
GET /api/users/:id
```

Utilizar un ObjectId inexistente para obtener un error **404**.

---

### Producto duplicado

```http
POST /api/products
```

Intentar crear un producto utilizando un código (`code`) que ya exista.

Respuesta esperada:

- HTTP 409 Conflict

---

### Cantidad inválida en Mocking

```http
GET /api/mocks/users?quantity=0
```

o

```http
GET /api/mocks/users?quantity=-1
```

Respuesta esperada:

- HTTP 400 Bad Request

---

### Error interno

Los errores inesperados son capturados automáticamente por el middleware global y responden con un **500 Internal Server Error**, sin exponer detalles internos del servidor.

## Autor

Carlos Rueda

Curso: Backend III

Tecnologías: Node.js | Express | MongoDB | Mongoose | dotenv | faker
