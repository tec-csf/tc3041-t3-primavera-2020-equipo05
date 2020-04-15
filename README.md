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

*[Incluya aquí una explicación de la solución utilizada para el frontend de la tarea. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 2.3.1 Lenguaje de programación
#### 2.3.2 Framework
#### 2.3.3 Librerías de funciones o dependencias

### 2.4 Backend

*[Incluya aquí una explicación de la solución utilizada para el backend de la tarea. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 2.4.1 Lenguaje de programación
#### 2.4.2 Framework
#### 2.4.3 Librerías de funciones o dependencias

## 2.5 Pasos a seguir para utilizar la aplicación


*[Incluya aquí una guía paso a paso para poder utilizar la aplicación, desde la clonación del repositorio hasta el despliegue de la solución en una plataforma en la nube.]*

## 3. Referencias

https://json-schema.org/

https://medium.com/@svinkle/publish-and-share-your-own-website-for-free-with-github-2eff049a1cb5

