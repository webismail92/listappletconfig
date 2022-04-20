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
  
  export interface IComponentLists extends Array<IComponent> { }
  
  export interface ISaveComponent {
    Name: string;
    PrimaryTable: string | null;
    ReportingName: string | null;
    DbProvider?: string;
    Sort?: Sort | null;
    Description: string | null;
    PrimaryColumn?: string | null;
  }
  export interface Sort {
    Order: string;
    Field: string;
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
  
  export interface FieldEntities extends Array<FieldEntity> { }
  
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
  
  export interface IFieldOperation extends FieldEntity {
    CompName: string,
    CompId: string;
    OperationType: string,
    OldFieldName: string | null,
  }
  
  export interface ITableList {
    Id: number,
    Name: string
  }
  
  export interface ITableLists extends Array<ITableList> { }
  
  export interface IComponentDef {
    Id: string,
    Name: string
  }
  
  export interface IFieldList {
    "Id": number,
    "Name": string,
    "Column": string,
    "Len": number,
    "Type": string,
    "Read Only": boolean,
    "Required": boolean,
    "Pick List": string | null,
    "Default": string,
    "Join": string | null,
    "Link": string | null,
    "Validation": string | null,
    "Encrypt": boolean,
    TypeLen?: string | null,
  }
  
  export interface IFieldLists extends Array<IFieldList> { }
  
  export interface ILinkInfo {
    _id: string,
    ObjectId: string,
    SourceCompId: string,
    TargetCompId: string,
    // SourceFieldId: string,
    // TargetFieldId: string,
    SourceFieldName: string,
    TargetFieldName: string,
    Name: string,
    ObjectName: string,
    ObjectReportName: string | null,
  }
  
  export interface ILinks extends Array<ILinkInfo> { }
  
  export interface IJoin {
    _id: string,
    // ObjectId: string,
    SourceCompId: string,
    TargetCompId: string,
    // SourceFieldId: string,
    // TargetFieldId: string,
    SourceFieldName: string,
    TargetFieldName: string,
    Name: string,
    ObjectName: string,
    ObjectReportName: string | null,
    // Operator: string | null,
    // Value: string | null,
    // Alias: string | null,
  }
  
  
  export interface IDataField {
    "id": number,
    "name": string,
    "type": string,
    "joinid": number,
    "allowxss": boolean,
    "readonly": boolean,
    "cachedFlag": boolean | null,
    "required": boolean,
    "APIFlag": boolean,
    "cmFlag": boolean,
    "allowGet": boolean,
    "allowSecureGet": boolean,
    "allowPost": boolean,
    "allowSecurePost": boolean,
    "created": string,
    "targetBusCompId": number,
    "colid": number,
    "personalFlag": boolean,
    "sensitiveFlag": boolean,
    "Owner": string
  }
  
  export interface IDataFields extends Array<IDataField> { }
  
  export interface ISelectedField {
    Name: string,
    Alias: string,
    Value: string | null,
    Type: string,
    Operator: string,
    Output: boolean,
    Table: string,
    PrimaryTable: string,
    ColumnName: string,
  }
  
  export interface ICompLink {
    Created: string,
    Name: string,
    ObjectName: string,
    ObjectReportName: string,
    SourceCompId: string,
    SourceFieldName: string,
    TargetCompId: string,
    TargetFieldName: string,
    Updated: string
    components: IComponent[]
  }
  
  export interface ISaveView {
    Name: string,
    Description: string,
  }
  
  export interface IView {
    _id: string,
    Name: string,
    Description: string,
    Created: string,
    Updated: string,
    Tree: string,
    ComponentName: string,
    ComponentId: string
  }