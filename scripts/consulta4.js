const agg = [
    {$project: {'promedio': 1}}, 
    {$group: {_id: "$promedio", promedioPorAlumno: {$push: "$_id"}}}, 
    {$unwind: {path: '$promedioPorAlumno'}},
    {$limit: 15},
    {$sort: {_id: 1}}
]

module.exports = agg