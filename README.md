# Customer-service

📌 **Descripción**
`customer-service` es un microservicio desarrollado en Node.js con Express y Sequelize, encargado de gestionar la información personal de los diferentes clientes (consumidores) de la aplicación. Proporciona una API REST segura y escalable para la gestión de clientes, facilitando la creación, actualización y consulta de datos.

🚀 **Tecnologías utilizadas**
- **Node.js** - Entorno de ejecución para JavaScript en el servidor.
- **Express.js** - Framework minimalista para la construcción de APIs REST.
- **Sequelize** - ORM para la gestión de bases de datos relacionales.
- **PostgreSQL** - Base de datos relacional utilizada en el proyecto.

⚙️ **Requisitos previos**
Antes de ejecutar el servicio, asegúrate de tener instalado:

- **Node.js** (v14+ recomendado)
- **npm** (Administrador de paquetes de Node.js)
- **PostgreSQL** (como base de datos)

📦 **Instalación y ejecución**
Clona el repositorio:

```sh
git clone https://github.com/2A2G/customer-service.git
cd customer-service
```

Instala las dependencias:

```sh
npm install
```

Configura las variables de entorno en un archivo `.env`:

```ini
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=customer_db
```

Ejecuta las migraciones de base de datos:

```sh
npx sequelize-cli db:migrate
```

Inicia el servicio:

```sh
npm start
```

Para desarrollo con autorecarga:

```sh
npm run dev
```

📜 **Licencia**
Este proyecto está bajo la Licencia MIT.

© 2025 [2A2G](https://github.com/2A2G) & [Charlie100901](https://github.com/Charlie100901)

Se permite el uso, modificación y distribución de este software de forma gratuita, siempre que se conserve este aviso de licencia.

