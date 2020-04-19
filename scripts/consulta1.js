const agg = [
    {$project: {'nombre': 1, 'apellidos': 1, 'tipo': 1, 'sueldo': 1}}, 
    {$group: {_id: "$sueldo", Profesores: {$push: {Matricula: "$_id", Nombre: "$nombre", Apellidos: "$apellidos", Tipo: "$tipo"}}}}, 
    {$unwind: {path: "$Profesores"}},
    {$limit: 15},
    {$sort: {_id: 1}}
]

module.exports = agg