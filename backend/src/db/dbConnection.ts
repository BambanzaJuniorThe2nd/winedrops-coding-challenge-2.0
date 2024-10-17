// db/dbConnection.ts
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export class DbConnection {
  private db: Database<sqlite3.Database> | null = null;
  private dbPath: string;

  constructor(dbPath: string) {
    this.dbPath = dbPath;
  }

  async initialize() {
    this.db = await open({
      filename: this.dbPath,
      driver: sqlite3.Database
    });
  }

  async query(sql: string, params: any[] = []) {
    if (!this.db) {
      throw new Error("Database not initialized");
    }
    return this.db.all(sql, params);
  }
}