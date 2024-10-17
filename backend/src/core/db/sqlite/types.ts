export interface ManagesSqliteDb {
  initialize(): Promise<void>;
  query(sql: string, params?: any[]): Promise<any[]>;
}