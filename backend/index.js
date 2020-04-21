const {config, engine} = require('express-edge')

const express = require('express');
const mong = require('mongodb')
const mongo = mong.MongoClient;
const bodyParser = require('body-parser')

const url = 'mongodb+srv://clases:clases123@cluster0-f9acl.gcp.mongodb.net/test';

const app = new express()

app.use(engine)
app.set('views', `../frontend`)

// Body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Home
app.get('/', (req, res) => {
    res.render('home')
})

// ALUMNOS //
app.get('/alumnos/:page', async (req, res) => {
    const resPerPage = 10;
    const page = req.params.page;

    mongo.connect(url, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        const alumnos = await dbo.collection("alumnos").find({}, { projection: { direccion : 0} }).skip((resPerPage * page) - resPerPage).limit(resPerPage).sort({ _id: 1 }).toArray();
        const numAlumnos = await dbo.collection("alumnos").count({});

        console.log(alumnos)

        res.render('alumnos', {
            alumnos: alumnos,
            currentPage: parseInt(page),
            pages: Math.ceil(numAlumnos / resPerPage),
        })
    });
});

// DETALLE ALUMNO //
app.get('/detalleAlumno/:id', (req, res) => {
    const idAlumno = req.params.id;

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idAlumno };
        dbo.collection("alumnos").find(query).toArray(function(err, alumnos) {
            if (err) throw err;
            console.log(alumnos[0]);
            var alumno = alumnos[0]
            db.close();
            res.render('detalleAlumno', {
                alumno
          })
        });
    });
});

// INGRESAR ALUMNO (DESPLEGAR MATRICULA)//
app.get('/ingresarAlumno', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");

        dbo.collection("alumnos").find({}, { projection: { _id : 1}}).sort({_id:-1}).limit(1).toArray(function(err, result) {
        if (err) throw err;
        var next = +result[0]._id.replace('A','') + 10;
        if (next > 10000000) {
            var newID = "A" + next
            db.close();

            res.render('ingresarAlumno', {
                newID
        })
        } else {
            var newID = "A0" + next
            db.close();

            res.render('ingresarAlumno', {
                newID
        })
        }
        });
    });
})

// INGRESAR ALUMNO (GUARDAR A DB)//
app.post('/ingresarAlumno/guardar', (req, res) => {
    var item = {
        _id: req.body.id,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        f_nac: req.body.f_nac,
        direccion: req.body.direccion,
        semestre: parseInt(req.body.semestre),
        promedio: parseInt(req.body.promedio),
        location: {type : "Point", coordinates :[parseFloat(req.body.longitud), parseFloat(req.body.latitud)]}
    };

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        dbo.collection("alumnos").insertOne(item, function(err, result) {
          if (err) throw err;
          console.log('Alumno insertado');
          db.close();
        });
    });
    
    res.redirect('/alumnos/1');
})

// EDITAR ALUMNO (DESPLEGAR DATOS)//
app.get('/editarAlumno/:id', (req, res) => {
    const idAlumno = req.params.id;

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idAlumno };
        dbo.collection("alumnos").find(query).toArray(function(err, alumnos) {
            if (err) throw err;
            console.log(alumnos[0]);
            var alumno = alumnos[0]
            db.close();
            res.render('editarAlumno', {
                alumno
          })
        });
    });
});

// EDITAR ALUMNO (GUARDAR A DB)//
app.post('/editarAlumno/guardar', (req, res) => {
    const idAlumno = req.body.id;
    console.log(idAlumno)

    var item = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        f_nac: req.body.f_nac,
        direccion: req.body.direccion,
        semestre: parseInt(req.body.semestre),
        promedio: parseInt(req.body.promedio),
        location: {type : "Point", coordinates :[parseFloat(req.body.longitud), parseFloat(req.body.latitud)]}
    };

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idAlumno };
        console.log(query)
        dbo.collection("alumnos").update(query, item, function(err, result) {
            if (err) throw err;
            console.log('Alumno editado');
            db.close();
        });
    });
    
    res.redirect('/alumnos/1');
})

// BORRAR ALUMNO (DESPLEGAR DATOS)//
app.get('/borrarAlumno/:id', (req, res) => {
    const idAlumno = req.params.id;

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idAlumno };
        dbo.collection("alumnos").find(query).toArray(function(err, alumnos) {
            if (err) throw err;
            console.log(alumnos[0]);
            var alumno = alumnos[0]
            db.close();
            res.render('borrarAlumno', {
                alumno
          })
        });
    });
});

// BORRAR ALUMNO (GUARDAR A DB)//
app.post('/borrarAlumno', (req, res) => {
    const idAlumno = req.body.id;
    console.log(idAlumno)

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idAlumno };
        console.log(query)
        dbo.collection("alumnos").deleteOne(query, function(err, result) {
            if (err) throw err;
            console.log('Alumno eliminado');
            db.close();
        });
    });
    
    res.redirect('/alumnos/1');
})

// PROFESORES //
app.get('/profesores/:page', async (req, res) => {
    const resPerPage = 10;
    const page = req.params.page;

    mongo.connect(url, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        const profesores = await dbo.collection("profesores").find({}, { projection: { direccion : 0} }).skip((resPerPage * page) - resPerPage).limit(resPerPage).sort({ _id: 1 }).toArray();
        const numProfesores = await dbo.collection("profesores").count({});

        console.log(profesores)

        res.render('profesores', {
            profesores: profesores,
            currentPage: parseInt(page),
            pages: Math.ceil(numProfesores / resPerPage),
        })
    });
});

// DETALLE PROFESOR //
app.get('/detalleProfesor/:id', (req, res) => {
    const idProfesor = req.params.id;

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idProfesor };
        dbo.collection("profesores").find(query).toArray(function(err, profesores) {
            if (err) throw err;
            console.log(profesores[0]);
            var profesor = profesores[0]
            db.close();
            res.render('detalleProfesor', {
                profesor
          })
        });
    });
});

// INGRESAR PROFESOR (DESPLEGAR MATRICULA)//
app.get('/ingresarProfesor', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");

        dbo.collection("profesores").find({}, { projection: { _id : 1}}).sort({_id:-1}).limit(1).toArray(function(err, result) {
        if (err) throw err;
        var next = +result[0]._id.replace('L','') + 10;
        if (next > 10000000) {
            var newID = "L" + next
            db.close();

            res.render('ingresarProfesor', {
                newID
        })
        } else {
            var newID = "L0" + next
            db.close();

            res.render('ingresarProfesor', {
                newID
        })
        }
        }); 
    });
})

// INGRESAR PROFESOR (GUARDAR A DB)//
app.post('/ingresarProfesor/guardar', (req, res) => {
    var item = {
        _id: req.body.id,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        f_nac: req.body.f_nac,
        direccion: req.body.direccion,
        tipo: req.body.tipo,
        sueldo: parseInt(req.body.sueldo)
    };

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        dbo.collection("profesores").insertOne(item, function(err, result) {
          if (err) throw err;
          console.log('Profesor insertado');
          db.close();
        });
    });
    
    res.redirect('/profesores/1');
})

// EDITAR PROFESOR (DESPLEGAR DATOS)//
app.get('/editarProfesor/:id', (req, res) => {
    const idProfesor = req.params.id;

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idProfesor };
        dbo.collection("profesores").find(query).toArray(function(err, profesores) {
            if (err) throw err;
            console.log(profesores[0]);
            var profesor = profesores[0]
            db.close();
            res.render('editarProfesor', {
                profesor
          })
        });
    });
});

// EDITAR PROFESOR (GUARDAR A DB)//
app.post('/editarProfesor/guardar', (req, res) => {
    const idProfesor = req.body.id;
    console.log(idProfesor)

    var item = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        f_nac: req.body.f_nac,
        direccion: req.body.direccion,
        tipo: req.body.tipo,
        sueldo: parseInt(req.body.sueldo)
    };

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idProfesor };
        console.log(query)
        dbo.collection("profesores").update(query, item, function(err, result) {
            if (err) throw err;
            console.log('Profesor editado');
            db.close();
        });
    });
    
    res.redirect('/profesores/1');
})

// BORRAR PROFESOR (DESPLEGAR DATOS)//
app.get('/borrarProfesor/:id', (req, res) => {
    const idProfesor = req.params.id;

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idProfesor };
        dbo.collection("profesores").find(query).toArray(function(err, profesores) {
            if (err) throw err;
            console.log(profesores[0]);
            var profesor = profesores[0]
            db.close();
            res.render('borrarProfesor', {
                profesor
          })
        });
    });
});

// BORRAR PROFESOR (GUARDAR A DB)//
app.post('/borrarProfesor', (req, res) => {
    const idProfesor = req.body.id;
    console.log(idProfesor)

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idProfesor };
        console.log(query)
        dbo.collection("profesores").deleteOne(query, function(err, result) {
            if (err) throw err;
            console.log('Profesor eliminado');
            db.close();
        });
    });
    
    res.redirect('/profesores/1');
})

// CLASES //
app.get('/clases/:page', async (req, res) => {
    const resPerPage = 10;
    const page = req.params.page;

    mongo.connect(url, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        const clases = await dbo.collection("clases").find({}, { projection: { direccion : 0} }).skip((resPerPage * page) - resPerPage).limit(resPerPage).sort({ _id: 1 }).toArray();
        const numClases = await dbo.collection("clases").count({});

        console.log(clases)

        res.render('clases', {
            clases: clases,
            currentPage: parseInt(page),
            pages: Math.ceil(numClases / resPerPage),
        })
    });
});

// DETALLE CLASE //
app.get('/detalleClase/:id', (req, res) => {
    const idClase = new mong.ObjectID(req.params.id);
    console.log(idClase)

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idClase };
        dbo.collection("clases").find(query).toArray(function(err, clases) {
            if (err) throw err;
            console.log(clases[0]);
            var clase = clases[0]
            db.close();
            res.render('detalleClase', {
                clase
          })
        });
    });
});

app.get('/ingresarClase', (req, res) => {
    res.render('ingresarClase')
})

// INGRESAR CLASE (GUARDAR A DB)//
app.post('/ingresarClase/guardar', (req, res) => {
    var item = {
        nombre: req.body.nombre,
        horario: req.body.horario,
        idioma: req.body.idioma,
        salon: parseInt(req.body.salon),
        profesor: req.body.profesor,
        alumnos: (req.body.alumnos.replace(/\s/g, "")).split(','),
        location: {type : "Point", coordinates :[parseFloat(req.body.longitud), parseFloat(req.body.latitud)]}
    };

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        dbo.collection("clases").insertOne(item, function(err, result) {
          if (err) throw err;
          console.log('Clase insertada');
          db.close();
        });
    });
    
    res.redirect('/clases/1');
})

// EDITAR CLASE (DESPLEGAR DATOS)//
app.get('/editarClase/:id', (req, res) => {
    const idClase = new mong.ObjectID(req.params.id);

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idClase };
        dbo.collection("clases").find(query).toArray(function(err, clases) {
            if (err) throw err;
            console.log(clases[0]);
            var clase = clases[0]
            db.close();
            res.render('editarClase', {
                clase
          })
        });
    });
});

// EDITAR CLASE (GUARDAR A DB)//
app.post('/editarClase/guardar', (req, res) => {
    const idClase = new mong.ObjectID(req.body.id);
    console.log(idClase)

    var item = {
        nombre: req.body.nombre,
        horario: req.body.horario,
        idioma: req.body.idioma,
        salon: parseInt(req.body.salon),
        profesor: req.body.profesor,
        alumnos: (req.body.alumnos.replace(/\s/g, "")).split(','),
        location: {type : "Point", coordinates :[parseFloat(req.body.longitud), parseFloat(req.body.latitud)]}
    };

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idClase };
        console.log(query)
        dbo.collection("clases").update(query, item, function(err, result) {
            if (err) throw err;
            console.log('Clase editada');
            db.close();
        });
    });
    
    res.redirect('/clases/1');
})

// BORRAR CLASE (DESPLEGAR DATOS)//
app.get('/borrarClase/:id', (req, res) => {
    const idClase = new mong.ObjectID(req.params.id);

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idClase };
        dbo.collection("clases").find(query).toArray(function(err, clases) {
            if (err) throw err;
            console.log(clases[0]);
            var clase = clases[0]
            db.close();
            res.render('borrarClase', {
                clase
          })
        });
    });
});

// BORRAR CLASE (GUARDAR A DB)//
app.post('/borrarClase', (req, res) => {
    const idClase = new mong.ObjectID(req.body.id);
    console.log(idClase)

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idClase };
        console.log(query)
        dbo.collection("clases").deleteOne(query, function(err, result) {
            if (err) throw err;
            console.log('Clase eliminada');
            db.close();
        });
    });
    
    res.redirect('/clases/1');
})

app.get('/consultas', (req, res) => {
    res.render('consultas')
})

app.get('/unwind', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
          var dbo = db.db("clases");
          const agg = require('../scripts/consulta1')
          dbo.collection("profesores").aggregate(agg).toArray(function(err, result) {
          if (err) throw err;
            console.log(result);
            db.close();
            
            res.render('desplegaConsultas', {
                type: "unwind",
                profesores: result
            })
          });
        });
})

app.get('/lookup', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
          var dbo = db.db("clases");
          const agg = require('../scripts/consulta2')
          dbo.collection("clases").aggregate(agg).toArray(function(err, result) {
          if (err) throw err;
            console.log(result);
            db.close();
            
            res.render('desplegaConsultas', {
                type: "lookup",
                clases: result
            })
          });
        });
})

app.get('/graphLookup', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
          var dbo = db.db("clases");
          const agg = require('../scripts/consulta3')
          dbo.collection("profesores").aggregate(agg).toArray(function(err, result) {
          if (err) throw err;
            console.log(result);
            db.close();
            
            res.render('desplegaConsultas', {
                type: "graphLookup",
                clases: result
            })
          });
        });
})

app.get('/geoNear', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
          var dbo = db.db("clases");
          const agg = require('../scripts/consulta4')
          dbo.collection("alumnos").aggregate(agg).toArray(function(err, result) {
          if (err) throw err;
            console.log(result);
            db.close();
            
            res.render('desplegaConsultas', {
                type: "geoNear",
                alumnos: result
            })
          });
        });
})

app.get('/facet', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
          var dbo = db.db("clases");
          const agg = require('../scripts/consulta5')
          dbo.collection("clases").aggregate(agg).toArray(function(err, result) {
          if (err) throw err;
            console.log(result);
            db.close();
            
            res.render('desplegaConsultas', {
                type: "facet",
                numAlumnos: result
            })
          });
        });
})

app.listen(4000, () => {
    console.log("Aplicacion corriendo en el puerto 4000")
})