const agg = [
    {$lookup: {from: 'alumnos', localField: 'alumnos', foreignField: '_id', as: 'result'}}, 
    {$unwind: {path: '$result'}}, 
    {$group: {_id: "$profesor", nombre: {$max: "$nombre"}, promedioPorclase: {$avg: "$result.promedio"}}}, 
    {$sort: {promedioPorclase: 1}},
    {$limit: 15}
]

module.exports = agg