const agg = [
    {$facet: {"AlumnosDeProfesor": [{$unwind: "$alumnos"}, {$sortByCount: "$profesor"}]}}, 
    {$unwind: {path: "$AlumnosDeProfesor"}}, 
    {$group: {_id: "$AlumnosDeProfesor._id", AlumnosPorProfesor: {$sum: "$AlumnosDeProfesor.count"}}}, 
    {$sort: {AlumnosPorProfesor: 1}},
    {$limit: 30}
]

module.exports = agg