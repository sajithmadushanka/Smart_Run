import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase;

export const initDb = async () => {
  db = await SQLite.openDatabaseAsync("runs.db");

  await db.withTransactionAsync(async () => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS runs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        duration TEXT,
        distance REAL,
        avgSpeed REAL,
        route TEXT
      )
    `);
  });
};

export const saveRunToDb = async (
  duration: string,
  distance: number,
  avgSpeed: number,
  routeCoords: any[]
) => {
  if (!db) {
    throw new Error("Database not initialized. Call initDb() first.");
  }

  await db.withTransactionAsync(async () => {
    await db.execAsync(
      `INSERT INTO runs (date, duration, distance, avgSpeed, route)
       VALUES ('${new Date().toISOString()}', '${duration}', ${distance}, ${avgSpeed}, '${JSON.stringify(
        routeCoords
      )}')`
    );
  });
};

export const getAllRuns = async () => {
    if (!db) throw new Error("Database not initialized");
  
    const result = await db.getAllAsync(`SELECT * FROM runs ORDER BY id DESC`);
    return result;
  };
  