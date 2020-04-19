const agg = [
    {$graphLookup: {from: 'clases', startWith: '$_id', connectFromField: 'salon', connectToField: 'profesor', as: 'ClaseProf'}}, 
    {$unwind: {path: '$ClaseProf'}}, 
    {$limit: 10}, 
    {$sort: {sueldo: 1}}
]

module.exports = agg