export type MySql2TableStatus = {
  Name: string
  Engine: 'InnoDB' | (string & {})
  Version: number
  Row_format: 'Dynamic' | (string & {})
  Rows: number
  Avg_row_length: number
  Data_length: number
  Max_data_length: number
  Index_length: number
  Data_free: number
  Auto_increment: null
  Create_time: string
  Update_time: string
  Check_time: null
  Collation: 'utf8_general_ci' | (string & {})
  Checksum: null
  Create_options: string
  Comment: string
}

export type MySql2InformationSchemaTables = {
  TABLE_CATALOG: string
  TABLE_SCHEMA: string
  TABLE_NAME: string
  TABLE_TYPE: 'BASE TABLE' | (string & {})
  ENGINE: 'InnoDB' | (string & {})
  VERSION: number
  ROW_FORMAT: 'Dynamic' | (string & {})
  TABLE_ROWS: number
  AVG_ROW_LENGTH: number
  DATA_LENGTH: number
  MAX_DATA_LENGTH: number
  INDEX_LENGTH: number
  DATA_FREE: number
  AUTO_INCREMENT: null
  CREATE_TIME: string
  UPDATE_TIME: string
  CHECK_TIME: null
  TABLE_COLLATION: 'utf8_general_ci' | (string & {})
  CHECKSUM: null
  CREATE_OPTIONS: string
  TABLE_COMMENT: string
}
