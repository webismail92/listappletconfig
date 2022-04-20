import React, { useState, ChangeEvent, FormEvent, FC, useEffect } from "react";
import "./App.css";
import styles from "./styles.module.css";
import tableStyle from "./Table.module.css";
import api from "./api";
import { ICustomCompView, ICustomField } from "./interfaces";
import Loader from "./components/Loader";
import ViewTree from "./ViewTree";
import { parse, stringify, toJSON, fromJSON } from "flatted";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowDown from "./icons/ArrowDown";
import ArrowUp from "./icons/ArrowUp";

let configJson: any = (window.parent.window as any)["customConfig"] || {};

interface IProps {}

const CONST_INPUT_TYPE = {
  ALIAS: "alias",
  OUTPUT: "output",
  VALUE: "value",
  OPERATOR: "operator",
  DYNAMIC: "dynamic",
  INPUT_TYPE: "input_type",
};

const CONST_TYPE = {
  STATIC: "static_value",
  DYNAMIC: "dynamic_value",
  INPUT_TYPE: "input_type",
};

const CONST_OPERATOR = [
  { label: "=", value: "=" },
  { label: ">", value: ">" },
  { label: "<", value: "<" },
  { label: ">=", value: ">=" },
  { label: "<=", value: "<=" },
  { label: "<>", value: "<>" },
  { label: "StartsWith", value: "StartsWith" },
  { label: "EndsWith", value: "EndsWith" },
  { label: "Contains", value: "Contains" },
];

const App: FC<IProps> = () => {
  const [config, setConfig] = useState<ICustomCompView | undefined>();
  const [data, setData] = useState<ICustomCompView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCompSelected, setIsCompSelected] = useState("component");
  const [selected, setSelected] = useState("");
  const [isExpandTable, setIsExpandTable] = useState(false);

  const onExpandTable = () => {
    setIsExpandTable(isExpandTable ? false : true);
  };

  const loadConfig = () => {
    let config = (window.parent.window as any)["customConfig"];
    if (config) {
      config = JSON.parse(config);
      console.log('config',config);
      if (typeof config === "object") {
        let customComp: ICustomCompView = {
          // _id: config._id,
          Name: config.Name,
          // DbProvider: config.DbProvider,
          Fields: [...config.Fields],
          Option: config.Option,
        };
        configJson = Object.assign({},customComp);
        setConfig(customComp);
        setIsCompSelected(config.Option);
        setSelected(config.Name);
      }
    }
  };

  const getConfigJson = () => {
    return JSON.stringify(configJson);
  };

  const onChangeComponent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    // if (value !== "") {
      let item = data[+value];
      let customField: ICustomField[] = [];
      if (item.Fields && item.Fields.length > 0) {
        item.Fields.forEach((item) => {
          customField.push({
            // _id: item._id,
            Name: item.Name,
            Alias: item.Alias,
            IsDisplay: true,
            Value: null,
            Operator: "",
            Type: "",
          });
        });
      }
      let customComp: ICustomCompView = {
        // _id: item._id,
        Name: item.Name,
        Option: isCompSelected,
        // DbProvider: item.DbProvider,
        Fields: customField,
      };
      // console.log("customComp", customComp);

      setConfig(customComp);
      setSelected(value);
      configJson = Object.assign({},customComp);
    // } else {
    //   setConfig(undefined);
    //   setSelected("");
    // }
  };

  const onChangeAlias = (event: React.ChangeEvent<HTMLInputElement>, customField: ICustomField, index: number) => {
    const { value } = event.target;
    
    // if (value !== "") {
      let cf: ICustomField = customField;
      cf.Alias = value;
      if (config) {
        let comp: ICustomCompView = { ...config };
        if (comp.Fields) {
          comp.Fields[index] = cf;
        }
        setConfig(comp);
        // Object.assign(configJson, comp);
        configJson = Object.assign({},comp);
      }
    // }
  };

  const onChnageIsDisplay = (event: React.ChangeEvent<HTMLInputElement>, customField: ICustomField, index: number) => {
    const { checked } = event.target;

    let cf: ICustomField = customField;
    cf.IsDisplay = checked;
    if (config) {
      let comp: ICustomCompView = { ...config };
      if (comp.Fields) {
        comp.Fields[index] = cf;
      }
      setConfig(comp);
      // Object.assign(configJson, comp);
      configJson = Object.assign({},comp);
      // console.log("configJson", configJson);
    }
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsCompSelected(value);
    setConfig(undefined);
    setSelected("");
  };

  const onChangeFieldInputType = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    customField: ICustomField,
    index: number
  ) => {
    const { value } = e.target;
    // if (value !== "") {
      let cf: ICustomField = customField;
      cf.Value = value;
      if (config) {
        let comp: ICustomCompView = { ...config };
        if (comp.Fields) {
          comp.Fields[index] = cf;
        }
        setConfig(comp);
        // Object.assign(configJson, comp);
        configJson = Object.assign({},comp);
      }
    // }
  };

  const displayInputType = (row: ICustomField, index: number) => {
    switch (row.Type) {
      case CONST_TYPE.STATIC:
        return (
          <input type="text" value={row.Value ? row.Value : ""} placeholder="Enter Value" onChange={(e) => onChangeFieldInputType(e, row, index)} />
        );
        break;
      case CONST_TYPE.DYNAMIC:
        return (
          <select value={row.Value ? row.Value : ""} onChange={(e) => onChangeFieldInputType(e, row, index)}>
            <option>Select Dynamic Field</option>
            {config?.Fields?.map((item: ICustomField, index: number) => {
              return (
                <option key={"fieldItem" + index} value={item.Name}>
                  {item.Name}
                </option>
              );
            })}
          </select>
        );
        break;
      case CONST_TYPE.INPUT_TYPE:
        return (
          <input
            type="text"
            value={row.Value ? row.Value : ""}
            placeholder="Enter Input Value"
            onChange={(e) => onChangeFieldInputType(e, row, index)}
          />
        );
        break;

      default:
        break;
    }
  };

  const onChangeFieldOperator = (e: React.ChangeEvent<HTMLSelectElement>, customField: ICustomField, index: number) => {
    const { value } = e.target;
    if (value !== "") {
      let cf: ICustomField = customField;
      cf.Operator = value;
      if (config) {
        let comp: ICustomCompView = { ...config };
        if (comp.Fields) {
          comp.Fields[index] = cf;
        }
        setConfig(comp);
        // Object.assign(configJson, comp);
        configJson = Object.assign({},comp);
      }
    }
  };

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>, customField: ICustomField, index: number) => {
    const { value } = e.target;
    if (value !== "") {
      let cf: ICustomField = customField;
      cf.Type = value;
      if (config) {
        let comp: ICustomCompView = { ...config };
        if (comp.Fields) {
          comp.Fields[index] = cf;
        }
        setConfig(comp);
        // Object.assign(configJson, comp);
        configJson = Object.assign({},comp);
      }
    }
  };

  const createTree = (comp: ViewTree, arr: any) => {
    // console.log('comp',comp);

    comp.children &&
      comp.children.map((item: ViewTree) => {
        if (item.SelFields && item.SelFields?.length > 0) {
          // console.log('item.SelFields',item.SelFields);

          item.SelFields.forEach((item) => {
            arr.push(item);
          });
        }
        createTree(item, arr);
      });
  };

  const formatViewData = (data: any) => {
    let updatedData: any = [];
    data.forEach((item: any) => {
      if (item.Tree) {
        let fields: any = [];
        createTree(parse(item.Tree), fields);
        updatedData.push({
          Name: item.Name,
          Fields: fields,
        });
      }
    });
    return updatedData;
  };

  useEffect(() => {
    loadConfig();
    (window.parent.window as any)["ApplyConfig"] = function () {
      (window.parent.window as any)["customConfig"] = getConfigJson();
      return true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getCompList = async () => {
      await api
        .get("GetComponents", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response: any) => {
          let compList = response.data;
          if (compList.Status === 200 && compList.Success) {
            setData(compList.Success);
            setLoading(false);
          } else {
            toast.error("Something went wrong!");
          }
        })
        .catch((error) => {
          console.log("error ---", error);
          return error.response.data;
        });
    };
    const getViewList = async () => {
      await api
        .get("GetView", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response: any) => {
          let compList = response.data;
          if (compList.Status === 200 && compList.Success) {
            let data = compList.Success;
            let updatedData = formatViewData(data);
            // console.log('updatedData',updatedData);

            setData(updatedData);
            setLoading(false);
          } else {
            toast.error("Something went wrong!");
          }
        })
        .catch((error) => {
          console.log("error ---", error);
          return error.response.data;
        });
    };

    if (isCompSelected === "component") {
      setLoading(true);
      getCompList();
      // console.log("comp");
    } else {
      setLoading(true);
      getViewList();
      // console.log("view");
    }
  }, [isCompSelected]);

  console.log("config", config);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        // pauseOnHover
        transition={Slide}
        theme={"colored"}
      />
      {loading ? <Loader /> : null}
      <div className={styles.inputBox_Button}>
        <div className={styles.inputBox}>
          <div className={styles.lbl}>Select Component/View</div>
          <div className={styles.act_btn}>
            <div className={styles.act_row}>
              <div className={styles.inputBox}> Component</div>
              <input
                type="radio"
                name="selectComp"
                value={"component"}
                onChange={handleChangeOption}
                checked={isCompSelected === "component" ? true : false}
              />
            </div>
            <div className={styles.act_row}>
              <div className={`${styles.inputBox} ${styles.align}`}> View</div>
              <input type="radio" name="selectComp" value={"view"} onChange={handleChangeOption} checked={isCompSelected === "view" ? true : false} />
            </div>
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.lbl}>Select {isCompSelected === "component" ? "Component" : "View"}</div>
          <select name="component" defaultValue={selected} id="component" onChange={onChangeComponent}>
            <option>--Select {isCompSelected === "component" ? "Component" : "View"}--</option>
            {data.map((item, index) => {
              return (
                <option value={index} key={index} selected={config?.Name === item.Name ? true : false}>
                  {item.Name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={`${tableStyle.my_table}  ${isExpandTable ? tableStyle.transition : ""}`}>
        <div className={`${tableStyle.table} `}>
          <div className={`${tableStyle.table_band}`} onClick={onExpandTable}>
            <div className={`${tableStyle.table_title}`}>{isCompSelected === "component" ? "Component" : "View"} Fields</div>
            {/* icon for Expand collaose table */}
            {/* <ExpandArrow /> */}
            {/* <CollapseArrow /> */}
            {/* <div className={`${tableStyle.table_btn} `}>Save</div> */}
            <div className={`${tableStyle.tbl_icon} ${isExpandTable ? tableStyle.expand : tableStyle.collapse}`}>
              {isExpandTable ? <ArrowDown /> : <ArrowUp />}
            </div>
          </div>

          <div>
            <div className={`${tableStyle.tbl_band} `}>
              <div className={`${tableStyle.tbl_head} ${tableStyle.col_01}  `}>Column</div>
              <div className={`${tableStyle.tbl_head} ${tableStyle.col_02} `}>Alias </div>
              {/* <div className={`${tableStyle.tbl_head} ${tableStyle.col_03} `}>Table</div> */}
              <div className={`${tableStyle.tbl_head} ${tableStyle.col_04} `}>Condition</div>
              <div className={`${tableStyle.tbl_head} ${tableStyle.col_05} `}>Is Display</div>
            </div>
            <div className={`${tableStyle.new_row} ${tableStyle.nice_scroll}`}>
              {config?.Fields?.map((item, index) => {
                return (
                  <div className={`${tableStyle.row} `} key={index}>
                    <div className={`${tableStyle.type} ${tableStyle.col_01} `}>
                      <div className={`${tableStyle.drag} `}>{/* <DragIcon /> */}</div>
                      <div className={`${tableStyle.type} `}>{item.Name}</div>
                    </div>
                    <div className={`${tableStyle.types} ${tableStyle.col_02} `}>
                      <input type="text" name="Alias" value={item.Alias ? item.Alias : ""} onChange={(event) => onChangeAlias(event, item, index)} />
                    </div>
                    {/* <div className={`${tableStyle.types} ${tableStyle.col_03} `}>---table name---</div> */}
                    <div className={`${tableStyle.typess} ${tableStyle.col_04} `}>
                      <select value={item.Type} onChange={(e) => onChangeType(e, item, index)}>
                        <option>Select Type</option>
                        <option value={CONST_TYPE.STATIC}>{"Static Value"}</option>
                        <option value={CONST_TYPE.DYNAMIC}>{"Dynamic Value"}</option>
                        <option value={CONST_TYPE.INPUT_TYPE}>{"Input Type"}</option>
                      </select>

                      <select value={item.Operator} onChange={(e) => onChangeFieldOperator(e, item, index)}>
                        <option>Select Operator</option>
                        {CONST_OPERATOR.map((item) => {
                          return (
                            <option value={item.value} key={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                      </select>

                      {displayInputType(item, index)}
                    </div>
                    <div className={`${tableStyle.endtype} ${tableStyle.col_05} `}>
                      <input type="checkbox" checked={item.IsDisplay} onChange={(event) => onChnageIsDisplay(event, item, index)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
