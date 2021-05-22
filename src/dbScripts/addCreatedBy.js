db = db.getSiblingDB("burrata");

db.getCollection('dishes').updateMany(
    {},
    {
        $set: {
            'createdBy': 'admin'
        },
        $unset: {
            userName: ''
        }
    }
)