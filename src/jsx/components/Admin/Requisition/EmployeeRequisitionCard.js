import DatePicker from "react-datepicker";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const EmployeeRequisitionCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [empreqCode, setEmpreqCode] = useState("");

  const [requisitionType, setRequisitionType] = useState("");

  const [desiredStartDate, setDesiredStartDate] = useState(new Date());
  const [closinDate, setClosingDate] = useState(new Date());

  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");

  const [employeeList, setEmployeeList] = useState([]);
  const [replaceEmp, setReplaceEmp] = useState("");
  const [HODEmp, setHODEmp] = useState("");
  const [HREmp, setHREmp] = useState("");
  const [MDEmp, setMDEmp] = useState("");

  const [contractList, setContractList] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");

  const [reqDescription, setReqDescription] = useState("");
  const [reqReason, setReqReason] = useState("");
  const [reqComment, setReqComment] = useState("");

  // const [requirementListPush, setRequirementListPush] = useState([]);
  const [requirementlist, setRequirementlist] = useState([
    {
      id: "",
      description: "",
      rqmentcode: "",
      mandatory: "No",
      lineno: "",
      jobno: "",
    },
  ]);
  //Qualification
  const [qualificationList, setQualificationList] = useState([
    {
      id: "",
      description: "",
      qficationcode: "",
      mandantory: "No",
      lineno: "",
      jobno: "",
    },
  ]);

  //Responsibility

  const [responsibiltyList, setResponsibilityList] = useState([
    {
      id: "",
      description: "",
      jobno: "",
      lineno: "",
      responsibilitycode: "",
    },
  ]);

  //Check list
  const [checkList, setCheckList] = useState([
    {
      id: "",
      Lineno: "",
      Reqno: "",
      Code: "",
      Description: "",
    },
  ]);

  const [initCheckCode,setInitCheckCode] = useState('')

  //{ id: "", description: "",rqmentcode:"",mandatory:"",lineno:"",jobno:"" },
  // // =>console.log(requirementlist);

  // handle input change
  const handleInputRequireChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...requirementlist];

    if (name === "mandatory") {
      if (list[index]["mandatory"] === "No") {
        list[index][name] = "Yes";
        list[index].id = index;

        setRequirementlist(list);
      } else {
        list[index][name] = "No";
        list[index].id = index;
        // =>console.log(list);
        setRequirementlist(list);
      }
    } else {
      list[index][name] = value;
      list[index].id = index;
      setRequirementlist(list);
    }
  };
  // handle cick event of the remove button
  const handleRemoveRequireClick = (index) => {
    const list = [...requirementlist];
    let _no = list[index].lineno;

    if (_no !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete",
        icon: "warning",
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/removerequirement/${_no}`,
              config
            );
          }
        })
        .then((json) => {
          list.splice(index, 1);
          setRequirementlist(list);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list.splice(index, 1);
      setRequirementlist(list);
    }
  };
  //handle cick event of the Add button
  const handleAddRequireClick = () => {
    const list = [...requirementlist];
    if (list[0] !== undefined) {
      let requirementcode = list[0]["rqmentcode"];
      setRequirementlist([
        ...requirementlist,
        {
          id: "",
          description: "",
          rqmentcode: requirementcode,
          mandatory: "No",
          lineno: "",
          jobno: "",
        },
      ]);
    } else {
      swal("Oh", "Define Requirement Code in D365", "error");
    }
  };
  const handlePushRequireClick = (index) => {
    //Get the record
    const list = [...requirementlist];
    let record = list[index];
    // // =>console.log(record);
    let jobno = list[0]["jobno"];
    let data = {
      Description: record.description,
      Jobno: jobno,
      Mandatory: record.mandatory,
      Rqmentcode: record.rqmentcode,
      Lineno: record.lineno,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willUpload) => {
        if (willUpload) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/addrequirement/${props.location.state[0].jobNo}`,
            data,
            config
            // method: 'post',
          );
        }
      })
      // .then(result => result.json())
      .then((json) => {
        // =>console.log(json.data);
        swal("Success!", "Your record has been uploaded!", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Seems like we couldn't upload the record", "error");
      });
  };

  // handle input change
  const handleInputQualifChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...qualificationList];

    if (name === "mandantory") {
      if (list[index]["mandantory"] === "No") {
        list[index][name] = "Yes";
        list[index].id = index;

        setQualificationList(list);
      } else {
        list[index][name] = "No";
        list[index].id = index;
        // =>console.log(list[index]);
        setQualificationList(list);
      }
    } else {
      list[index][name] = value;
      list[index].id = index;
      setQualificationList(list);
    }
  };
  // handle cick event of the remove button
  const handleRemoveQualifClick = (index) => {
    const list1 = [...qualificationList];
    let _no = list1[index].lineno;
    // =>console.log(_no);
    if (_no !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete",
        icon: "warning",
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/removequalification/${_no}`,
              config
            );
          }
        })
        .then((json) => {
          // // =>console.log(json.data);
          list1.splice(index, 1);
          setQualificationList(list1);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list1.splice(index, 1);
      setQualificationList(list1);
    }
  };
  //handle cick event of the Add button
  const handleAddQualifClick = () => {
    const list = [...qualificationList];
    if (list[0] !== undefined) {
      let qualificationcode = list[0]["qficationcode"];
      setQualificationList([
        ...qualificationList,
        {
          id: "",
          description: "",
          qficationcode: qualificationcode,
          mandantory: "No",
          lineno: "",
          jobno: "",
        },
      ]);
    } else {
      swal("Oh", "Define Qualification Code in D365", "error");
    }
  };
  const handlePushQualifClick = (index) => {
    //Add record to d365
    const list = [...qualificationList];
    let record = list[index];
    // // =>console.log(record);
    if(list[0] !== undefined){
      let jobno = list[0]["jobno"];
      
      let data = {
        Description: record.description,
        Jobno: jobno,
        Mandantory: record.mandantory,
        Qficationcode: record.qficationcode,
        Lineno: record.lineno,
      };
  
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };
  
      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to upload",
        icon: "warning",
        dangerMode: true,
      })
        .then((willUpload) => {
          if (willUpload) {
            return axios.post(
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/addqualification/${props.location.state[0].jobNo}`,
              data,
              config
            );
          }
        })
        .then((json) => {
          // =>console.log(json.data);
          swal("Success!", "Your record has been uploaded!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't upload the record", "error");
        });
    } else {
      swal("Oh", "Define Qualification Code in D365", "error");
    }

  };

  // handle input change
  const handleInputResponChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...responsibiltyList];
    list[index][name] = value;
    list[index].id = index;
    setResponsibilityList(list);
  };
  // handle cick event of the remove button
  const handleRemoveResponClick = (index) => {
    const list1 = [...responsibiltyList];
    let _no = list1[index].lineno;
    if (_no !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete",
        icon: "warning",
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/removeresponsibility/${_no}`,
              config
            );
          }
        })
        .then((json) => {
          // // =>console.log(json.data);
          list1.splice(index, 1);
          setResponsibilityList(list1);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list1.splice(index, 1);
      setResponsibilityList(list1);
    }
  };
  //handle cick event of the Add button
  const handleAddResponClick = () => {
    const list = [...responsibiltyList];
    if (list[0] !== undefined) {
      let responsibilitycode = list[0]["responsibilitycode"];
      setResponsibilityList([
        ...responsibiltyList,
        {
          id: "",
          description: "",
          Responsibilitycode: responsibilitycode,
          // mandatory: "No",
          lineno: "",
          jobno: "",
        },
      ]);
    } else {
      swal("Oh", "Define Qualification Code in D365", "error");
    }
  };
  const handlePushResponClick = (index) => {
    //Add record to d365
    const list = [...responsibiltyList];
    let record = list[index];
    // // =>console.log(record);
    let jobno = list[0]["jobno"]===""?props.location.state[0].jobNo:list[0]["jobno"];
    let data = {
      Description: record.description,
      Jobno: jobno,
      // Mandatory:record.mandatory,
      Responsibilitycode: record.responsibilitycode,
      Lineno: record.lineno,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willUpload) => {
        if (willUpload) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/addresponsibility`,
            data,
            config
          );
        }
      })
      .then((json) => {
        // =>console.log(json.data);
        swal("Success!", "Your record has been uploaded!", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Seems like we couldn't upload the record", "error");
      });
  };

  // handle input change
  const handleInputChecklistChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...checkList];
    list[index][name] = value;
    list[index].id = index;
    setCheckList(list);
  };
  // handle cick event of the remove button
  const handleRemoveCheckistClick = (index) => {
    const list1 = [...checkList];
    let _no = list1[index].lineno;
    if (_no !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete",
        icon: "warning",
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/removereschecklist/${_no}`,
              config
            );
          }
        })
        .then((json) => {
          // // =>console.log(json.data);
          list1.splice(index, 1);
          setCheckList(list1);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list1.splice(index, 1);
      setCheckList(list1);
    }
  };
  //handle cick event of the Add button
  const handleAddChecklistClick = () => {
    const list = [...checkList];
    if (list[0] !== undefined) {
      let auxcode = list[0]["code"];
      setCheckList([
        ...checkList,
        {
          id: "",
          description: "",
          code: auxcode,
          lineno: "",
          reqno: "",
        },
      ]);
    } else {
      swal("Oh", "Define Qualification Code in D365", "error");
    }
  };
  const handlePushChecklistClick = (index) => {
    //Add record to d365

    const list = [...checkList];
    let record = list[index];
    let _code = list[0]["code"];
    if (list[0]["code"] === undefined || list[0]["code"]==='N/A') {
      //means its the first row
      let data = {
        Lineno: '',
        Reqno: props.location.state[0].empReqNo,
        Code: initCheckCode,
        Description: record.description,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to upload",
        icon: "warning",
        dangerMode: true,
      })
        .then((willUpload) => {
          if (willUpload) {
            return axios.post(
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/addcheck`,
              data,
              config
            );
          }
        })
        .then((json) => {
          // =>console.log(json.data);
          swal("Success!", "Your record has been uploaded!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't upload the record", "error");
        });

   
    } else {
      let data = {
        Lineno: record.lineno,
        Reqno: record.reqno,
        Code: _code,
        Description: record.description,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to upload",
        icon: "warning",
        dangerMode: true,
      })
        .then((willUpload) => {
          if (willUpload) {
            return axios.post(
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/addcheck`,
              data,
              config
            );
          }
        })
        .then((json) => {
          // =>console.log(json.data);
          swal("Success!", "Your record has been uploaded!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't upload the record", "error");
        });
    }
  };

  useEffect(() => {
    setEmpreqCode(props.location.state[0].empReqNo);
    //Get Emp requisition card Source data
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/staffrequision/getempreqsourcedata/${props.location.state[0].empReqNo}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          //populate emp list
          setEmployeeList(response.data.employeeListModels);
          //pop dept
          setDepartmentList(response.data.departmentListModels);
          //pop contract
          setContractList(response.data.contractListModels);

          // =>console.log(response.data);
          //  if (employeeList.length > 0) {
          categoryFive();
          // }
          setLoading(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        swal("Oh!", err.data.message, "error");
      });
  }, [props.location.state]);

  // Get category 5 data
  const categoryFive = () => {
    //Get Job Cat 5 data
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/staffrequision/getcategoryfive/${props.location.state[0].jobNo}/${props.location.state[0].empReqNo}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          //populate requirements
          setRequirementlist(response.data.requirementModels);
          //Qualifications
          setQualificationList(response.data.qualificationModels);
          //Responsibility
          setResponsibilityList(response.data.responsibilityModels);
          //Get Mandatory initial code
          setInitCheckCode(response.data.checklistInitCodeAux)
          // Check list
          setCheckList(response.data.checklistModels);



          // =>console.log(response.data);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        swal("Oh!", err.data.message, "error");
      });
  };

  const handleApproveChecklist = ()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Approve",
      icon: "warning",
      dangerMode: true,
    })
      .then((willUpload) => {
        if (willUpload) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/enableattachment/${props.location.state[0].empReqNo}`,
            // data,
            config
          );
        }
      })
      .then((json) => {
        // =>console.log(json.data);
        swal("Success!", "Your record has been Approved!", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Seems like we couldn't approve the record", "error");
      });
  }

  const uploadGenData = ()=>{
    let data={
      Requisiontype:requisitionType,
      Startdate:desiredStartDate,
      Enddate:closinDate,
      Contracttype:selectedContract.value,
      Department:selectedDept.value,
      Employeereplaced:replaceEmp.value,
      HOD:HODEmp.value,
      HRManager:HREmp.value,
      MD:MDEmp.value,
      Description:reqDescription,
      Reason:reqReason,
      Comment:reqComment,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willUpload) => {
        if (willUpload) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/updaterequisition/${props.location.state[0].empReqNo}`,
            data,
            config
            // method: 'post',
          );
        }
      })
      // .then(result => result.json())
      .then((json) => {
        // =>console.log(json.data);
        swal("Success!", "Your record has been uploaded!", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Seems like we couldn't upload the record; ensure all field are keyed", "error");
      });

    
  }

  const handleApprovePublish =()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Approve and Publish",
      icon: "warning",
      dangerMode: true,
    })
      .then((willUpload) => {
        if (willUpload) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/approveandpublish/${props.location.state[0].empReqNo}`,
            // data,
            config
          );
        }
      })
      .then((json) => {
        // =>console.log(json.data);
        swal("Success!", "Your record has been Approved and Publish", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Seems like we couldn't approve the record", "error");
      });
  }

  if (loading) {
    return (
      <>
        <div className="container">
          <div className="headerDiv"></div>
          <div className="jobRow">
            <div id="preloader-home">
              <div
                className="sk-three-bounce"
                style={{ backgroundColor: "#f9f9f9" }}
              >
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  // categoryFive();
  return (
    <>
      <div className="container">
        <div className="reqCard">
          <div className="card rounded-0">
            <div className="card-header">
              <h4>General Data</h4>
              {/* <hr /> */}
            </div>
            <form>
              <div className="row p-1">
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="label">Requision Type</label>
                    <select
                      name=""
                      id=""
                      className="form-control"
                      value={requisitionType}
                      onChange={(e) => setRequisitionType(e.target.value)}
                    >
                      <option value={""}></option>
                      <option value="Internal">Internal</option>
                      <option value="Internal/External">
                        Internal/External
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Desired Start Date</label>
                    <DatePicker
                      className="form-control"
                      selected={desiredStartDate}
                      onChange={(date) => setDesiredStartDate(date)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>End Date</label>
                    <DatePicker
                      className="form-control"
                      selected={closinDate}
                      onChange={(date) => setClosingDate(date)}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    Contract Type
                  </label>
                  <Select
                    defaultValue={selectedContract}
                    onChange={setSelectedContract}
                    options={contractList}
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    Department
                  </label>
                  <Select
                    defaultValue={selectedDept}
                    onChange={setSelectedDept}
                    options={departmentList}
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    Employee to Replace
                  </label>
                  <Select
                    defaultValue={replaceEmp}
                    onChange={setReplaceEmp}
                    options={employeeList}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    HOD
                  </label>
                  <Select
                    defaultValue={HODEmp}
                    onChange={setHODEmp}
                    options={employeeList}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    HR Manager
                  </label>
                  <Select
                    defaultValue={HREmp}
                    onChange={setHREmp}
                    options={employeeList}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    MD/FD/GM
                  </label>
                  <Select
                    defaultValue={MDEmp}
                    onChange={setMDEmp}
                    options={employeeList}
                  />
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="regDesc" className="label">
                      Requsition Description
                    </label>
                    <textarea
                      id="regDesc"
                      // cols="30"
                      value={reqDescription}
                      onChange={(e) => setReqDescription(e.target.value)}
                      rows="1"
                      className="form-control"
                      placeholder="Content max size 250 character"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="rReq" className="label">
                      Reason for Requisition
                    </label>
                    <textarea
                      id="rReq"
                      value={reqReason}
                      onChange={(e) => setReqReason(e.target.value)}
                      rows="1"
                      className="form-control"
                      placeholder="Content max size 250 character"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Commen" className="label">
                      Comment
                    </label>
                    <textarea
                      id="Commen"
                      value={reqComment}
                      onChange={(e) => setReqComment(e.target.value)}
                      rows="1"
                      className="form-control"
                      placeholder="Content max size 250 character"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="upload-gen-data-div">
                [Step 1]
              <button
                                    type="button"
                                    className="btn btn-success rounded-0 mx-1 my-1"
                                    onClick={() => uploadGenData()}
                                  >
                                    Upload <i className="fa fa-arrow-up"></i>
                                  </button>
              </div>
            </form>
            <div className="card-header">
              <h4>Category 5</h4>
            </div>
            <form>
              {/* Row 1 Requirements */}
              <div className="row">
                <div className="col-md-12">
                  <h5 className="my-3 ml-3">Job Requirements</h5>
                  <div className="reqcontentDataDiv">
                    <div className="jobRequirement-set">
                      {requirementlist.map((x, i) => (
                        <div className="row mx-1" key={i}>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control rounded-0"
                                placeholder="Enter..."
                                name="description"
                                value={x.description}
                                onChange={(e) => handleInputRequireChange(e, i)}
                              />
                            </div>
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="" className="mr-2">
                              required
                            </label>
                            <input
                              name="mandatory"
                              type="checkbox"
                              // {...x.mandatory}
                              // checked
                              checked={x.mandatory === "No" ? false : true}
                              value={x.mandatory}
                              onChange={(e) => handleInputRequireChange(e, i)}
                            />
                          </div>
                          <div className="col-md-4">
                            <div className="button-div">
                              {requirementlist.length !== 1 && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-danger rounded-0"
                                    onClick={() => handleRemoveRequireClick(i)}
                                  >
                                    Del <i className="fa fa-trash"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success rounded-0"
                                    onClick={() => handlePushRequireClick(i)}
                                  >
                                    Push <i className="fa fa-arrow-up"></i>
                                  </button>
                                </>
                              )}
                              {requirementlist.length - 1 === i && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-info rounded-0"
                                    onClick={handleAddRequireClick}
                                  >
                                    Add <i className="fa fa-arrow-down"></i>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <h5 className="my-3 ml-3">Job Qualifications</h5>
                  <div className="reqcontentDataDiv">
                    <div className="jobRequirement-set">
                      {qualificationList.map((x1, i1) => (
                        <div className="row mx-1" key={i1}>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control rounded-0"
                                placeholder="Enter..."
                                name="description"
                                value={x1.description}
                                onChange={(e) => handleInputQualifChange(e, i1)}
                              />
                            </div>
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="" className="mr-2">
                              required
                            </label>
                            <input
                              name="mandantory"
                              type="checkbox"
                              checked={x1.mandantory === "No" ? false : true}
                              value={x1.mandantory}
                              onChange={(e) => handleInputQualifChange(e, i1)}
                            />
                          </div>
                          <div className="col-md-4">
                            <div className="button-div">
                              {qualificationList.length !== 1 && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-danger rounded-0"
                                    onClick={() => handleRemoveQualifClick(i1)}
                                  >
                                    Del <i className="fa fa-trash"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success rounded-0"
                                    onClick={() => handlePushQualifClick(i1)}
                                  >
                                    Push <i className="fa fa-arrow-up"></i>
                                  </button>
                                </>
                              )}
                              {qualificationList.length - 1 === i1 && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-info rounded-0"
                                    onClick={handleAddQualifClick}
                                  >
                                    Add <i className="fa fa-arrow-down"></i>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <h5 className="my-3 ml-3">Job Responsibility</h5>
                  <div className="reqcontentDataDiv">
                    <div className="jobRequirement-set">
                      {responsibiltyList.map((x2, i2) => (
                        <div className="row mx-1" key={i2}>
                          <div className="col-md-8">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control rounded-0"
                                placeholder="Enter..."
                                name="description"
                                value={x2.description}
                                onChange={(e) => handleInputResponChange(e, i2)}
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-2">
                            <label htmlFor="" className="mr-2">
                              required
                            </label>
                            <input
                              name="mandatory"
                              type="checkbox"
                              checked={x2.mandantory === "No" ? false : true}
                              value={x2.mandantory}
                              onChange={(e) => handleInputResponChange(e, i2)}
                            />
                          </div> */}
                          <div className="col-md-4">
                            <div className="button-div">
                              {responsibiltyList.length !== 1 && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-danger rounded-0"
                                    onClick={() => handleRemoveResponClick(i2)}
                                  >
                                    Del <i className="fa fa-trash"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success rounded-0"
                                    onClick={() => handlePushResponClick(i2)}
                                  >
                                    Push <i className="fa fa-arrow-up"></i>
                                  </button>
                                </>
                              )}
                              {responsibiltyList.length - 1 === i2 && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-info rounded-0"
                                    onClick={handleAddResponClick}
                                  >
                                    Add <i className="fa fa-arrow-down"></i>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <h5 className="my-3 ml-3">HR Mandatory Documents</h5>
                  <div className="reqcontentDataDiv">
                    <div className="jobRequirement-set">
                      {checkList.map((x3, i3) => (
                        <div className="row mx-1" key={i3}>
                          <div className="col-md-8">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control rounded-0"
                                placeholder="Enter..."
                                name="description"
                                value={x3.description}
                                onChange={(e) =>
                                  handleInputChecklistChange(e, i3)
                                }
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="button-div">
                              {checkList.length !== 1 && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-danger rounded-0"
                                    onClick={() =>
                                      handleRemoveCheckistClick(i3)
                                    }
                                  >
                                    Del <i className="fa fa-trash"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success rounded-0"
                                    onClick={() => handlePushChecklistClick(i3)}
                                  >
                                    Push <i className="fa fa-arrow-up"></i>
                                  </button>
                                </>
                              )}
                              {checkList.length - 1 === i3 && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-info rounded-0"
                                    onClick={handleAddChecklistClick}
                                  >
                                    Add <i className="fa fa-arrow-down"></i>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="row  mx-1 my-1">
                        <div className="col-md-6">
                          [Step 3]
                        <button
                                    type="button"
                                    className="btn btn-success rounded-0"
                                    onClick={handleApproveChecklist}
                                  >
                                    Approve Checklist <i className="fa fa-arrow-left"></i>
                                  </button>
                        </div>
                        <div className="col-md-6 text-right">
                       
                        </div>
                      </div>
                      <div className="row mx-1 my-1">
                        <div className="col-md-6"></div>
                        <div className="col-md-6 text-right">
                          [Step 4]
                        <button
                                    type="button"
                                    className="btn btn-warning rounded-0"
                                    onClick={handleApprovePublish}
                                  >
                                    Approve and Publish <i className="fa fa-globe"></i>
                                  </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(EmployeeRequisitionCard);
