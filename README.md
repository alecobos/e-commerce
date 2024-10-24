# e-commerce
Proyecto E-commerce para el proyecto final de Backend 1 de Coderhouse
Descripción
Este proyecto es una aplicación web que permite la gestión de carritos y productos. Los usuarios pueden crear cuentas, agregar productos a sus carritos, y gestionar sus carritos de manera individual. Además, la aplicación incluye un CRUD completo de productos y utiliza sockets para la comunicación en tiempo real.

Características
Rutas de API Funcionales: Todas las rutas de la API están completamente funcionales y permiten la interacción con los datos de usuarios, productos y carritos.
Sockets: El proyecto utiliza sockets para la comunicación en tiempo real, permitiendo actualizaciones instantáneas en la interfaz de usuario.
Gestión de Carritos: Cada usuario puede crear su propio carrito y ver los productos que ha agregado de manera individual.
CRUD de Productos: La aplicación permite la creación, lectura, actualización y eliminación de productos de manera visual.
Paginación de Productos: Los productos se muestran con paginación para una mejor experiencia de usuario.
Creación de Usuarios: Los usuarios pueden registrarse y crear cuentas de manera visual.
Gestión Visual de Carritos: Los usuarios pueden crear y borrar carritos de forma visual.
Base de Datos MongoDB: El proyecto utiliza MongoDB como base de datos para almacenar la información de usuarios, productos y carritos.
Método Populate: Los carritos utilizan el método populate para incluir información detallada de los productos y usuarios relacionados.

Rutas de API

Usuarios
post /api/users Create
get /api/users Read All
get /api/users/:uid Read One
put /api/users/:uid Update
delete /api/users/:uid Destroy

Productos
post /api/products Create
get /api/products Read All
get /api/products/:pid Read One
put /api/products/:pid Update
delete /api/products/:pid Destroy

Carritos
post /api/carts Create
get /api/carts Read All
get /api/carts/:cid Read One
put /api/carts/:cid Update
delete /api/carts/:cid Destroy

Funcionalidades Visuales
Gestión de Productos: Interfaz visual para crear, leer, actualizar y eliminar productos.
Paginación de Productos: Los productos se muestran con paginación para facilitar la navegación.
Gestión de Usuarios: Interfaz visual para la creación de usuarios y el inicio de sesión.
Gestión de Carritos: Interfaz visual para la creación y eliminación de carritos, así como la visualización de los productos en el carrito del usuario logueado.
Sockets
El proyecto utiliza sockets para la comunicación en tiempo real. Esto permite que las actualizaciones en los carritos y productos se reflejen instantáneamente en la interfaz de usuario.

Base de Datos
El proyecto utiliza MongoDB como base de datos para almacenar la información de usuarios, productos y carritos. Los carritos utilizan el método populate para incluir información detallada de los productos y usuarios relacionados.

Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cualquier cambio que te gustaría hacer.