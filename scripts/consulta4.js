const mong = require('mongodb')

const agg = [
    {$geoNear: {near: {type: "Point", coordinates: [1.348195,9.3568025]}, distanceField: "dist.calculated", query: {_id: mong.ObjectID('5e93347e2c56e0be29203409')}}}, 
    {$lookup: {from: 'alumnos', localField: 'alumnos', foreignField: '_id', as: 'result'}}, 
    {$unwind: {path: '$result'}}, 
    {$project: {'_id':0,'result.nombre':1, 'result.apellidos':1, 'result.semestre':1, 'result.promedio':1, 'result.location.coordinates':1, 'dist.calculated':1}}, 
    {$limit: 15},
    {$sort: {_id:1}}
]

module.exports = agg