# Astronomical Travels
## Un sitio para postear viajes relacionados a la astronomía

### Proyecto Final - Épica Tramo III

### Utilizando el stack

![Build Status](https://static.javatpoint.com/blog/images/mern-stack.png)

## Documentacion del BACKEND

### Antes de empezar
- Clona este repositorio a tu máquina local usando git clone o descargándolo como archivo ZIP.

- Debes tener Node.js instalado en tu computadora.
- Tambien dedes tener MongoDB instalado y ejecutar los servicios mongod si deseas inspeccionar la base de datos necesitarás instalar  mongocompass.

# ***Atencion***
### El ***frontend*** funciona en el 
# ***PORT 3131***
### El ***backend*** funciona en el
# ***PORT 3030***
***En esta version no se pueden cambiar los puertos En un futuro llevaremos los numeros de puerto a la configuracion de sur archivos .env correspondientes,***
si solamente utilizara el backend y no el frontend si puede cambiar el PORT al numero que ustede desee en el archivo ***.env***

### Iniciando la instalacion y configuracion
- Instala las dependencias del proyecto ejecutando :
npm install
- Una vez instalado, hay que copiar el archivo .env.example y a su copia, ponerle .env y completar los valores que están puestos dentro LLAVE=VALOR. recomiendo utilizar en PORT el 3030 ejemplo
PORT=3030 

### Poner en marcha la API
npm run dev

### Probando el servidor Backend
Abre tu navegador de preferencia e ingresa la url localhost:3030 , deberia mostrarte el siguiente mensaje 
***src/routes/index.routes.js Pagina de inicio***
si ves este mensaje es que todo el proceso funcionó correctamente y la API ya esta disponible :smile:


Puedes utilizar POSTMAN https://www.postman.com/downloads/?utm_source=postman-home para hacer pruebas directamente en la API

Sino, puedes instalar el FRONTEND para consumir esta API, leyendo como en este caso, el archivo README.md incluido en la carpeta FRONTEND

### contacto eduardomarceloolivares@gmail.com