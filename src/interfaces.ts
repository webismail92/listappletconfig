export interface IDataStore {
  Store: {
    [key: string]: {
      CmsStore: {
        Custom: {
          Config: {
            Get: () => Promise<any>;
            Set: (input?: any) => Promise<any>;
          };
          list_master: {
            Get: (AccessName?: string, payload?: any) => Promise<any>;
          };
        };
      };
    };
  };
}

export interface IConfig {
  label: string;
  idKeyName: string;
  dataSourceAccessName: string;
  saveDataAccessName: string;
  deleteDataAccessName: string;
}

export interface IRow {
  name: string;
  id: number;
  isSystem: boolean;
}

export interface ICustomCompView {
  // _id: string | null;
  Name: string;
  Option: string;
  // PrimaryTable: string | null;
  // Created: Date;
  // Updated: Date | null;
  // CreatedBy: number;
  // UpdatedBy: number | null;
  // Sort: Sort | null;
  // PrimaryColumn: string | null;
  // ReportingName: string | null;
  // DbProvider: string;
  // Description: string | null;
  Fields: (ICustomField)[] | null;
}

export interface ICustomField {
  // _id: string | null;
  Name: string;
  Alias: string | null;
  IsDisplay: boolean;
  Type: string;
  Operator: string,
  Value: string | null,
}

export interface IComponent {
  _id: string | null;
  Name: string;
  PrimaryTable: string | null;
  Created: Date;
  Updated: Date | null;
  CreatedBy: number;
  UpdatedBy: number | null;
  Sort: Sort | null;
  PrimaryColumn: string | null;
  ReportingName: string | null;
  DbProvider: string;
  Description?: string | null;
  Fields?: (FieldEntity)[] | null;
}

export interface FieldEntity {
  FieldType: string;
  Name: string;
  ColumnName?: string;
  Datatype: string;
  PickList?: PickList;
  Default: string;
  Regex: string;
  RangeFrom: number;
  RangeTo: number;
  Length: number;
  Precision: number;
  Scale: number;
  Permission: Permission;
  CmsControlPermission: CmsControlPermission;
  Comments: string;
  CalType: string;
  IsCached: boolean;
  CalcSql: string;
  SqlLarge: string;
  TargetComp: string;
  JoinOn: string;
  TargetField: string;
  FieldId?: string;
  Constraints: string[];
  // DbProvider: string;
  Created: string,
  Updated: string,
  CreatedBy: number,
  UpdatedBy: number,
  _id?: string,
}

export interface PickList {
  Id: number;
  IsStoreListId: boolean;
}

export interface Permission {
  // IsCmFlag: boolean;
  IsReadONly: boolean;
  IsPerSonalData: boolean;
  // IsApiFlag: boolean;
  IsRequired: boolean;
  // IsSensitiveData: boolean;
  IsAllowXss: boolean;
}

export interface CmsControlPermission {
  IsGet: boolean;
  IsPost: boolean;
  // IsSecuredGet: boolean;
  // IsSecuredPost: boolean;
}

export interface Sort {
  Order: string;
  Field: string;
}