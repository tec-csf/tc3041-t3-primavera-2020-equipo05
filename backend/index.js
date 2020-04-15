const {config, engine} = require('express-edge')

const express = require('express');
const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser')

const url = 'mongodb+srv://clases:clases123@cluster0-f9acl.gcp.mongodb.net/test';

const app = new express()

// Automatically sets view engine and adds dot notation to app.render
app.use(engine)
app.set('views', `../frontend`)

// Body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/profesores', (req, res) => {
    res.render('profesores')
})

app.get('/clases', (req, res) => {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
            var dbo = db.db("clases");
            dbo.collection("clases").find({}, {projection: { _id : 0} }).limit(6).toArray(function(err, clases) {
            if (err) throw err;
            console.log(clases);
            //console.log(clases[0].alumnos)
            //console.log(clases[0].alumnos[0])
            db.close();
            res.render('clases', {
                clases
          })
        });
    });
})

app.get('/consultas', (req, res) => {
    res.render('consultas')
})

app.get('/alumnos', function(req, res, next) {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        dbo.collection("alumnos").find({}, { projection: { direccion : 0} }).limit(6).toArray(function(err, alumnos) {
          if (err) throw err;
          console.log(alumnos);
          db.close();
          res.render('alumnos', {
              alumnos
          })
        });
    });
  });

app.get('/detalleAlumno/:id', function(req, res, next) {
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

app.post('/ingresarAlumno/guardar', (req, res) => {
    var item = {
        _id: req.body.id,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        f_nac: req.body.f_nac,
        direccion: req.body.direccion,
        semestre: parseInt(req.body.semestre),
        promedio: parseInt(req.body.promedio)
    };

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        dbo.collection("alumnos").insertOne(item, function(err, result) {
          if (err) throw err;
          console.log('Item inserted');
          db.close();
        });
    });
    
    res.redirect('/alumnos');
})

app.get('/editarAlumno/:id', function(req, res, next) {
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

app.post('/editarAlumno/guardar', (req, res) => {
    const idAlumno = req.body.id;
    console.log(idAlumno)

    var item = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        f_nac: req.body.f_nac,
        direccion: req.body.direccion,
        semestre: parseInt(req.body.semestre),
        promedio: parseInt(req.body.promedio)
    };

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("clases");
        var query = { _id: idAlumno };
        console.log(query)
        dbo.collection("alumnos").update(query, item, function(err, result) {
            if (err) throw err;
            console.log('Item updated');
            db.close();
        });
    });
    
    res.redirect('/alumnos');
})

app.get('/borrarAlumno/:id', function(req, res, next) {
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
            console.log('Item updated');
            db.close();
        });
    });
    
    res.redirect('/alumnos');
})

app.listen(4000, () => {
    console.log("Aplicacion corriendo en el puerto 4000")
})