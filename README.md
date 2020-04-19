# Tarea 3. Bases de datos NoSQL (MongoDB)

---

##### Integrantes:
1. *Gabriel Schlam Huber* - *A01024122* - *Santa Fe*
2. *Eduardo Harari* - *A01025876* - *Santa Fe*
3. *Diego Alejandro Moreno Acevedo* - *A01022113* - *Santa Fe*
4. *Naji M. A. Saadat* - *A01025599* - *Santa Fe*

---
## 1. Aspectos generales

Las orientaciones de la tarea se encuentran disponibles en la plataforma **Canvas**.

Este documento es una guía sobre qué información debe entregar como parte de la tarea, qué requerimientos técnicos debe cumplir y la estructura que debe seguir para organizar su entrega.


### 1.1 Requerimientos técnicos

A continuación se mencionan los requerimientos técnicos mínimos de la tarea, favor de tenerlos presente para que cumpla con todos.

* El equipo tiene la libertad de elegir las tecnologías de desarrollo a utilizar en la tarea, sin embargo, debe tener presente que la solución final se deberá ejecutar en una plataforma en la nube. Puede ser  [Google Cloud Platform](https://cloud.google.com/?hl=es), [Azure](https://azure.microsoft.com/en-us/), [AWS](https://aws.amazon.com/es/free/) u otra.
* La arquitectura de la solución deberá estar separada claramente por capas (*frontend*, *backend*, datos y almacenamiento).
* Todo el código, *scripts* y la documentación de la tarea debe alojarse en este repositorio de GitHub, siguiendo la estructura que aparece a continuación.

### 1.2 Estructura del repositorio

El proyecto debe seguir la siguiente estructura de carpetas:
```
- / 			        # Raíz de toda la tarea
    - README.md			# Archivo con la información general de la tarea (este archivo)
    - frontend			# Carpeta con la solución del frontend (Web app)
    - backend			# Carpeta con la solución del backend (API)
    - scripts		        # Carpeta con los scripts necesarios para generar la base de datos, cargar datos y ejecutar las consultas
    - database			# Carpeta con el modelo de la bases de datos utilizando JSON Schema

```

### 1.3 Documentación de la tarea

Como parte de la entrega de la tarea, se debe incluir la siguiente información:

* Diagrama del *Modelo de la base de datos utilizando JSON Schema*.
* *Scripts* para generar la base de datos, cargar datos y ejecutar consultas.
* Guía de configuración, instalación y despliegue de la aplicación en la plataforma en la nube  seleccionada.
* El código debe estar documentado siguiendo los estándares definidos para el lenguaje de programación seleccionado.

## 2. Solución

A continuación aparecen descritos los diferentes elementos que forman parte de la solución de la tarea.

### 2.1 Modelo de la *base de datos* 

```json
[
    {
      "title": "Alumno",
      "type": "object",
      "properties": {
        "_id": {
          "type": "string",
          "description": "El id (Matricula) del alumno."
        },
        "nombre": {
          "type": "string",
          "description": "El nombre del alumno."
        },
        "apellidos": {
          "type": "string",
          "description": "El o los apellidos del alumno."
        },
        "f_nac": {
          "type": "string",
          "description": "Fecha de nacimiento."
        },
        "direccion": {
          "type": "string",
          "description": "La direccion del alumno."
        },
        "semestre": {
          "description": "El semestre acreditado del alumno.",
          "type": "integer",
          "minimum": 1,
          "maximum": 10
        },
        "promedio": {
          "description": "El promedio acumulado del alumno.",
          "type": "integer",
          "minimum": 60,
          "maximum": 100
        }
      }
    },
    {
      "title": "Profesor",
      "type": "object",
      "properties": {
        "_id": {
          "type": "string",
          "description": "El id (Matricula) del profesor."
        },
        "nombre": {
          "type": "string",
          "description": "El nombre del profesor."
        },
        "apellidos": {
          "type": "string",
          "description": "El o los apellidos del profesor."
        },
        "f_nac": {
          "type": "string",
          "description": "Fecha de nacimiento."
        },
        "direccion": {
          "type": "string",
          "description": "La direccion del profesor."
        },
        "tipo": {
          "type": "string",
          "description": "El tipo de profesor."
        },
        "sueldo": {
          "description": "El promedio acumulado del profesor.",
          "type": "integer",
          "minimum": 0
        }
      }
    },
    {
      "title": "Clase",
      "type": "object",
      "properties": {
        "nombre": {
          "type": "string",
          "description": "El nombre de la clase."
        },
        "horario": {
          "type": "string",
          "description": "El horario de la clase."
        },
        "idioma": {
          "type": "string",
          "description": "El idioma de la clase."
        },
        "salon": {
          "description": "El numero de salon de la clase.",
          "type": "integer",
          "minimum": 1000
        },
        "profesor": {
          "type": "string",
          "description": "El id del profesor de la clase."
        },
        "alumnos": {
          "description": "Los ids de los alumnos asignados a la clase.",
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
  ]
```

### 2.2 Arquitectura de la solución

![Diagrama UML](database/DiagramaUML.png)

### 2.3 Frontend

Para el Frontend se utilizó el lenguaje de Edge, que es constituido por HTML. Además se utilizó Bootstrap para apoyarnos en el diseño y complementar la pagina web. Bootstrap es una herramienta muy poderosa que tiene su propio diseño al insertar pedazos de código basados en HTML. Con Bootstrap se crearon los botones, así como el estilo de las letras, los TextBox, etc. https://getbootstrap.com/docs/4.4/getting-started/introduction/. En este link podemos encontrar la documentación de Bootstrap así como los pasos para poder trabajar con él de la mejor manera.

Por otro lado, se utilizó el lenguaje de Edge, el cual es básicamente HTML, usando Node y Npm, con implementación de vistas (en este caso, [app.edge](frontend/layouts/app.edge)), además de implementación para desplegar la información recibida del backend, en este caso, de la Base de Datos de MongoDB.

#### 2.3.1 Lenguaje de programación
* Edge
* HTML
#### 2.3.2 Framework
* Bootstrap
* Edge
#### 2.3.3 Librerías de funciones o dependencias
* Edge
* Node
* Npm

### 2.4 Backend

Para el Backend se utilizó principalmente Node, con sus respectivos módulos y dependencias, las cuales se encuentran enlistadas en [package.json](backend/package.json), junto a [package-lock.json](backend/package-lock.json)

Al utilizar Node, se utiliza además Javascript, ya que es el lenguaje de programación que utiliza.

Para la Base de Datos se utilizó MongoDB, una base de datos No SQL. Y la conexión para insertar los datos base ([alumnos.json](scripts/alumnos.json), [clases.json](scripts/clases.json), [profesores.json](scripts/profesores.json)) y para comprobar cualquier cambio, se realizó en MongoDB Compass.

En este caso. la conexión entre el Frontend y la Base de Datos, junto a sus operaciones, se realiza por medio del archivo [index.js](backend/index.js).

Por último, se utilizaron las librerías Body-parser, Edge, Express, Express-edge, Mongoose y Nodemon, dándoles diferentes usos dentro del archivo mencionado anteriormente. Nodemon, por otro lado, se utiliza en la configuración inicial de [package.json](backend/package.json), para que al correr ```npm run start``` se corra al inicio [index.js](backend/index.js) y se actualice constantemente algún cambio en el mismo.

#### 2.4.1 Lenguaje de programación
Javascript
#### 2.4.2 Framework
* Node
* MongoDB Compass
#### 2.4.3 Librerías de funciones o dependencias
* Body-parser, versíon 1.19.0
* Edge, versíon 7.10.1
* Express, versíon 4.17.1
* Express-edge, versíon 2.0.2
* Mongoose, versíon 5.9.9
* Nodemon, versíon 2.0.3

## 2.5 Pasos a seguir para utilizar la aplicación
1.  **Clonación de este repositorio:**

    Clone este repositorio en la carpeta que eliga en su ordenador.
2.  **Instalación de Node:**
	
    [Instalación de node](https://nodejs.org/)
3.  **Configuración de MongoDB en Atlas y en MongoDB Compass:**
    1. Cree una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    2. Genere un clúster nuevo, en la sección *Clusters*, *Build a New Cluster*.
    3. Cambie la configuración de seguridad a su clúster para permitir conexiones desde cualquier dirección IP (0.0.0.0/0), en la sección *Network Access*, *Add IP Address*.
    4.  Agregue un usuario/contraseña con permisos de Lectura/Escritura en las bases de datos, en la sección *Database Access*, *Add New Database User*.
    5.  Establezca una conexión al clúster utilizando MongoDB Compass:
	    1. Seleccione el clúster creado en la sección *Clusters*, *Connect*, *Connect Using MongoDB Compass*.
	    2. Siga las instrucciones directamente en la página, para instalar MongoDB Compass.
	    3. Copie el *connection string*.
	    4. Ingrese a MongoDB Compass y pegue su *connection string*.
    6. Cree una base de datos nombrada *clases*.
    7. Cree las colecciones necesarias (*alumnos*, *profesores* y *clases*).
    8. Inserte los scripts correspondientes a cada colección, ingresando a la misma y seleccionando *Import Data* y tomando como input *JSON*.
	    * Alumnos: [alumnos.json](scripts/alumnos.json)
	    * Profesores: [profesores.json](scripts/profesores.json)
	    * Clases: [clases.json](scripts/clases.json)
4.  **Instale todo lo relacionado con Npm:**
	
    Vaya a la carpeta raíz donde clonó el repositorio y corra el siguiente comando: ```npm install ```
5. **Modifique el url de conexión hacia la base de datos:**
	
    Vaya al archivo [index.js](backend/index.js), a la línea 8: ```const url = 'mongodb+srv://clases:clases123@cluster0-f9acl.gcp.mongodb.net/test';``` y modifique el url por el *connection string* tomado en el paso 3 de estas instrucciones.
6. **Corra el servidor:**
	  
    Vaya a la carpeta *backend* y corra el siguiente comando: ```npm run start```
7. **AWS....**

## 3. Referencias
* https://json-schema.org/
* https://edge.adonisjs.com/
* https://medium.com/@svinkle/publish-and-share-your-own-website-for-free-with-github-2eff049a1cb5

