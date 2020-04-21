const agg = [
    {$geoNear: {near: {type:"Point", coordinates:[10.248195,80.3568025]}, distanceField: "distance"}}, 
    {$match: {promedio: {'$gte':80}}}, 
    {$sort: {_id: 1}}, 
    {$limit: 15},
    {$project: {'_id':0, 'nombre':1, 'apellidos':1, 'semestre':1, 'promedio':1, 'location.coordinates':1, 'distance':1}}
]

module.exports = agg