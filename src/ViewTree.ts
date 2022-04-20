import { FieldEntity, IComponent, IJoin, ISelectedField, Sort } from "./tree-interface";

export default class ViewTree {
    join: Join | null = null;
    component: Component;
    children: ViewTree[] = [];
    isExpanded: boolean = false;
    isExpandedField: boolean = false;
    isApplyForNewComp: boolean = false;
    isLoadComponent: boolean = false;
    isLinkOpen: boolean = false;
    isActive: boolean = false;
    parentId: string = "";
    prevComp: ViewTree | null = null;
    SelFields: ISelectedField[] | null = null;

    constructor(component: Component, join: Join | null) {
        this.component = component;
        this.join = join;
    }

    add(component: Component, join: Join) {
        let newCompTree = new ViewTree(component, join);
        newCompTree.prevComp = this;
        this.children.push(newCompTree);
    }

   

    closeAllOpenPopupdUi(comp: ViewTree[]) {
        comp.map((item: ViewTree) => {
            item.isExpandedField = false;
            item.isLinkOpen = false;
            if (this.component._id !== item.component._id) {
                item.isLoadComponent = false;
                item.isApplyForNewComp = false;
            }
            updateTreeUi(item, "LOAD_BTN",this.component._id);
        });
    }

    closeAllOpenFieldUi(comp: ViewTree[]) {
        comp.map((item: ViewTree) => {
            item.isLoadComponent = false;
            item.isApplyForNewComp = false;
            if (this.component._id !== item.component._id) {
                item.isExpandedField = false;
            }
            updateTreeUi(item, "FIELD_BTN",this.component._id);
        });
    }

    removeComponent(compId: string) {
        let filteredChildren = this.children.filter((child) => child.component._id !== compId);
        this.children = filteredChildren;
    }

    removeLink(compLinkId: string) {
        let filteredChildren = this.children.filter((child) => child.join ? child.join._id !== compLinkId : null);
        this.children = filteredChildren;
    }

    updateLink(joinData: Join) {
        this.join = joinData;
    }

    addFieldU(field: SelectedField) {
        let fieldArr = this.SelFields ? [...this.SelFields] : [];
        fieldArr.push(field);
        this.SelFields = fieldArr;
    }

    removeFieldU(field: SelectedField) {
        // console.log('removeField', field, this.SelFields);

        const updatedField: ISelectedField[] | null | undefined = this.SelFields?.filter(f => f.ColumnName !== field.ColumnName);
        this.SelFields = updatedField ? updatedField : null;
    }

    updateField(field: SelectedField) {
        if (this.SelFields) {
            const findIndex = this.SelFields.findIndex(f => f.ColumnName === field.ColumnName);
            this.SelFields[findIndex] = field;
        }
    }

}


export class Join implements IJoin {
    _id: string = "";
    // ObjectId: string = "";
    SourceCompId: string = "";
    TargetCompId: string = "";
    // SourceFieldId: string = "";
    // TargetFieldId: string = "";
    SourceFieldName: string = "";
    TargetFieldName: string = "";
    Name: string = "";
    ObjectName: string = "";
    ObjectReportName: string | null = "";
    // Operator: string | null = "";
    // Value: string | null = "";
    // Alias: string | null = "";

    constructor() { }

    create(join: IJoin) {
        this._id = join._id;
        // this.ObjectId = join.ObjectId;
        this.SourceCompId = join.SourceCompId;
        this.TargetCompId = join.TargetCompId;
        // this.SourceFieldId = join.SourceFieldId;
        // this.TargetFieldId = join.TargetFieldId;
        this.SourceFieldName = join.SourceFieldName;
        this.TargetFieldName = join.TargetFieldName;
        this.Name = join.Name;
        this.ObjectName = join.ObjectName;
        this.ObjectReportName = join.ObjectReportName;
        // this.Operator = join.Operator;
        // this.Value = join.Value;
        // this.Alias = join.Alias;
    }
}

export class Component implements IComponent {
    _id: string | null = "";
    Name: string = "";
    PrimaryTable: string | null = "";
    Created: Date = new Date();
    Updated: Date | null = null;
    CreatedBy: number = 0;
    UpdatedBy: number | null = null;
    Sort: Sort | null = null;
    PrimaryColumn: string | null = null;
    ReportingName: string | null = null;
    DbProvider: string = "";
    Fields?: FieldEntity[] | null | undefined = null;

    constructor() { }

    create(component: IComponent) {
        this._id = component._id;
        this.Name = component.Name;
        this.PrimaryTable = component.PrimaryTable;
        this.Created = component.Created;
        this.Updated = component.Updated;
        this.CreatedBy = component.CreatedBy;
        this.UpdatedBy = component.UpdatedBy;
        this.Sort = component.Sort;
        this.PrimaryColumn = component.PrimaryColumn;
        this.ReportingName = component.ReportingName;
        this.DbProvider = component.DbProvider;
        this.Fields = component.Fields;
    }
}

export class SelectedField implements ISelectedField {
    Name: string = "";
    ColumnName: string = "";
    Alias: string = "";
    Type: string = "";
    Value: string | null = null;
    Operator: string = "";
    Output: boolean = false;
    Table: string = "";
    PrimaryTable: string = "";
}

const updateTreeUi = (comp: ViewTree, view: string,comId: string | null) =>
comp.children && (

    comp.children.map((item: ViewTree) => {
        switch (view) {
            case "LOAD_BTN":
                item.isExpandedField = false;
                item.isLoadComponent = false;
                if (comId !== item.component._id) {
                    item.isLoadComponent = false;
                    item.isApplyForNewComp = false;
                }
                break;
            case "FIELD_BTN":
                item.isLoadComponent = false;
                item.isApplyForNewComp = false;
                if (comId !== item.component._id) {
                    item.isExpandedField = false;
                }
                break;

            default:
                break;
        }
        updateTreeUi(item, view,comId);
    })

);