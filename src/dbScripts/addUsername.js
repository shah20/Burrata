db = db.getSiblingDB("burrata");

db.getCollection('dishes').updateMany(
    {},
    {
        $set: { 'userName': 'admin' }
    }
)