const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const dbBasePath = process.env.DB_PATH || path.join(__dirname, '..', 'data');
const dbPath = path.join(dbBasePath, 'db.json');

function seedDatabase() {
  console.log('Database seeded!');
  const dbSeedPath = path.join(__dirname, '..', 'db-seed.json');
  // not database found copy sample data
  fs.copyFileSync(dbSeedPath, dbPath);
}

// seed database in development if not existing
if (process.env.NODE_ENV === 'development' || process.env.DB_SEED) {
  try {
    fs.statSync(dbPath);
  } catch (e) {
    seedDatabase();
  }
}

const adapter = new FileSync(dbPath);
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({
  categories: [],
  bookings: [],
}).write();

// create: db.get('bookings').push(booking).write();
// find: db.get('bookings').filter({ booking }).value() || [];
// get one: db.get('bookings').find({ id: params.bookingId }).value();
// remove: db.get('bookings').remove({ id: params.bookingId }).write();

db.read();

db.seedDatabase = seedDatabase;

module.exports = db;
