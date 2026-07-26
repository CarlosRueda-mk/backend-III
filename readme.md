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

## Estado del proyecto

Preentrega Backend III finalizada.

Se implementó correctamente la separación por capas:

- Routes
- Controllers
- Services
- Repositories

y la conexión con MongoDB mediante Mongoose.

## Autor

Carlos Rueda

Curso: Backend III

Tecnologías: Node.js | Express | MongoDB | Mongoose
