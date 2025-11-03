# 🏥 CuidaSalud - Sistema de Gestión de Seguros de Vida

Sistema completo de gestión de afiliados para seguros de vida, desarrollado con tecnologías modernas y escalables.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Características](#-características)
- [API Documentation](#-api-documentation)
- [Estructura de Base de Datos](#-estructura-de-base-de-datos)

## 📖 Descripción

CuidaSalud es una aplicación web para la gestión de afiliados a seguros de vida. Permite el registro de usuarios, gestión de contratos con numeración automática incremental, panel de administración, y cálculo automático de cuotas basado en la edad del afiliado.

## 🚀 Tecnologías

### Backend
- **NestJS** - Framework Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación basada en tokens
- **Bcrypt** - Encriptación de contraseñas
- **Swagger/OpenAPI** - Documentación de API
- **Class Validator** - Validación de datos

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Server Actions** - Manejo de datos del lado del servidor
- **Styled Components** - Componentes con estilos personalizados

## 📁 Estructura del Proyecto

```
venemergencia/
├── cuida-salud/              # Backend (NestJS)
│   ├── src/
│   │   ├── afiliados/        # Módulo de afiliados
│   │   ├── auth/             # Módulo de autenticación
│   │   └── main.ts           # Punto de entrada
│   ├── package.json
│   └── docker-compose.yml    # MongoDB container
│
└── cuidasaludfront/          # Frontend (Next.js)
    ├── app/                  # App Router
    │   ├── admin/            # Panel de administración
    │   ├── dashboard/        # Dashboard de usuario
    │   ├── login/            # Página de login
    │   └── registro/         # Página de registro
    ├── components/           # Componentes reutilizables
    ├── lib/                  # Utilidades y contextos
    ├── types/                # Tipos TypeScript
    └── package.json
```

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **npm** o **yarn** - Viene con Node.js
- **MongoDB** (v7.0 o superior) - [Descargar](https://www.mongodb.com/try/download/community)
- **Git** - [Descargar](https://git-scm.com/)

### Verificar instalaciones

```bash
node --version   # Debe mostrar v18.x.x o superior
npm --version    # Debe mostrar 9.x.x o superior
mongod --version # Debe mostrar v7.0.x o superior
```

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/abelserradev/cuida_salud.git
cd cuida_salud
```

### 2. Instalar dependencias del Backend

```bash
cd cuida-salud
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../cuidasaludfront
npm install
```

## ⚙️ Configuración

### Backend (cuida-salud)

1. **Iniciar MongoDB con Docker** (recomendado):

```bash
cd cuida-salud
docker-compose up -d
```

O si tienes MongoDB instalado localmente, inicia el servicio:

```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

2. **Verificar conexión a MongoDB**:

MongoDB debe estar corriendo en `mongodb://localhost:27017`

3. **Configurar variables de entorno** (opcional):

Crea un archivo `.env` en `cuida-salud/` si necesitas personalizar:

```env
# Puerto del servidor
PORT=4200

# MongoDB
MONGODB_URI=mongodb://localhost:27017/cuida-salud

# JWT Secret (cambiar en producción)
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRES_IN=7d
```

### Frontend (cuidasaludfront)

Las variables de entorno ya están configuradas, pero puedes personalizarlas creando `.env.local`:

```env
# URL del backend
NEXT_PUBLIC_API_URL=http://localhost:4200
```

## 🚀 Ejecución

### Opción 1: Ejecutar todo el proyecto

Necesitarás **3 terminales** abiertas:

#### Terminal 1 - MongoDB (si no usas Docker)
```bash
mongod
```

#### Terminal 2 - Backend
```bash
cd cuida-salud
npm run start:dev
```

El backend estará disponible en: **http://localhost:4200**

#### Terminal 3 - Frontend
```bash
cd cuidasaludfront
npm run dev
```

El frontend estará disponible en: **http://localhost:3000**

### Opción 2: Usar Docker para MongoDB

```bash
# Terminal 1 - Iniciar MongoDB con Docker
cd cuida-salud
docker-compose up

# Terminal 2 - Backend
cd cuida-salud
npm run start:dev

# Terminal 3 - Frontend
cd cuidasaludfront
npm run dev
```

## ✨ Características

### Para Usuarios
- ✅ Registro de afiliados con validación completa
- ✅ Autenticación segura con JWT
- ✅ Dashboard personalizado
- ✅ Visualización de información personal
- ✅ Número de contrato único e incremental (C-001, C-002, etc.)
- ✅ Cálculo automático de cuota anual según edad
- ✅ Información de plan y próximos pagos

### Para Administradores
- ✅ Panel de administración completo
- ✅ Listado de todos los afiliados
- ✅ Búsqueda y filtrado de usuarios
- ✅ Paginación (5 usuarios por página)
- ✅ Estadísticas en tiempo real
- ✅ Visualización detallada de usuarios
- ✅ Gestión de estados (activar/desactivar)

### Seguridad
- 🔐 Encriptación de contraseñas con Bcrypt
- 🔐 Autenticación JWT con httpOnly cookies
- 🔐 Validación de datos en backend y frontend
- 🔐 Protección de rutas con middleware
- 🔐 CORS configurado

## 📚 API Documentation

Una vez que el backend esté corriendo, accede a la documentación interactiva de la API:

**Swagger UI**: http://localhost:4200/api/docs

### Principales Endpoints

#### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/registro` - Registrar nuevo afiliado
- `GET /auth/perfil` - Obtener perfil del usuario autenticado

#### Afiliados
- `POST /afiliados` - Crear afiliado
- `GET /afiliados` - Listar todos los afiliados
- `GET /afiliados/:id` - Obtener afiliado por ID

## 🗄️ Estructura de Base de Datos

### Colección: afiliados

```javascript
{
  _id: ObjectId,
  numeroContrato: String,        // C-001, C-002, etc. (único)
  nombre: String,
  apellido: String,
  telefono: String,
  documentoIdentidad: String,    // Único
  genero: String,                // 'M' o 'F'
  fechaNacimiento: Date,
  email: String,                 // Único
  password: String,              // Hasheado con bcrypt
  activo: Boolean,
  roles: [String],               // ['afiliado'] o ['admin']
  fechaCreacion: Date,
  fechaActualizacion: Date
}
```

### Índices Creados
- `documentoIdentidad` (único)
- `email` (único)
- `numeroContrato` (único)
- `fechaCreacion` (descendente)

## 🔄 Migración de Datos (Usuarios Existentes)

Si ya tienes usuarios en la base de datos y agregaste el campo `numeroContrato` después, ejecuta este script en MongoDB:

```javascript
// Conectar a MongoDB Compass o mongosh
use cuida-salud;

db.afiliados.find().sort({fechaCreacion: 1}).forEach((doc, index) => {
  if (!doc.numeroContrato) {
    const numeroContrato = 'C-' + (index + 1).toString().padStart(3, '0');
    db.afiliados.updateOne(
      { _id: doc._id },
      { $set: { numeroContrato: numeroContrato } }
    );
    print('Actualizado: ' + doc.nombre + ' -> ' + numeroContrato);
  }
});
```

## 👤 Usuarios de Prueba

Después de registrar tu primer usuario, puedes:

1. **Usuario Regular**: Registrarse en `/registro`
2. **Administrador**: Modificar manualmente en MongoDB:

```javascript
db.afiliados.updateOne(
  { email: "tu_email@ejemplo.com" },
  { $set: { roles: ["admin"] } }
);
```

## 🛠️ Comandos Útiles

### Backend
```bash
npm run start:dev     # Modo desarrollo con hot-reload
npm run start         # Modo producción
npm run build         # Compilar para producción
npm run lint          # Ejecutar linter
```

### Frontend
```bash
npm run dev           # Modo desarrollo
npm run build         # Compilar para producción
npm run start         # Ejecutar versión compilada
npm run lint          # Ejecutar linter
```

## 🐛 Solución de Problemas

### MongoDB no se conecta
- Verifica que MongoDB esté corriendo: `mongod --version`
- Verifica el puerto: por defecto es `27017`
- Si usas Docker: `docker ps` para ver contenedores activos

### Error "Module not found"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Puerto ya en uso
```bash
# Backend (puerto 4200)
# Windows: netstat -ano | findstr :4200
# Linux/Mac: lsof -i :4200

# Frontend (puerto 3000)
# Windows: netstat -ano | findstr :3000
# Linux/Mac: lsof -i :3000
```

### Los datos no se muestran en el dashboard
1. Cierra sesión
2. Ejecuta la migración de datos (si aplica)
3. Vuelve a iniciar sesión

## 📝 Licencia

Este proyecto es de código privado.

## 👨‍💻 Autor

**Abel Serra**
- GitHub: [@abelserradev](https://github.com/abelserradev)

## 📧 Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.

---

Desarrollado con ❤️ usando NestJS y Next.js

