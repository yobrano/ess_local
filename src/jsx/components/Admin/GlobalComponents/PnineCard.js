import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

import "./PayslipCard.css";
const PnineCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [yearList, setYearList] = useState([]);
  const [selectedYear, setSelectedYear] = useState({});

  useEffect(() => {
    //get
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/payroll/getpayrollyears`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setYearList(response.data.years);
          setLoading(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  }, []);

  const viewPNine = () => {
    //Init the the req
    const config = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
      timeout: 60000,
    };

    // axios.get(`${process.env.REACT_APP_API_S_LINK}/staffrequision/getempreqcode/${selectedJob}`, config)
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Proceed",
      icon: "warning",
      dangerMode: true,
    })
      .then((willProcede) => {
        if (willProcede) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/payroll/generatepnine/${selectedYear.value}`,
            config
          );
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          const file = new Blob([response.data], { type: "application/pdf" });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          const pdfWindow = window.open();
          pdfWindow.location.href = fileURL;
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          // swal("Oh!", err.response.data.message, "error");
          if (err.response.data) {
            swal("Oh!", err.response.data, "error");
          } else  if (err.response.data.message) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oop!", err.message, "error");
          }
        } else if (err.message) {
          swal("Oh!", err.message, "error");
        } else {
          swal("Oh!", "View Failed", "error");
        }
      });
  };

  const driftButton =
    selectedYear !== "" ? (
      <button
        id="job-data-hift"
        className="slide_from_left"
        onClick={viewPNine}
      >
        <i className="flaticon-381-enter"></i>
      </button>
    ) : (
      <button id="job-data-hift" className="slide_from_left d-none">
        <i className="flaticon-381-enter"></i>
      </button>
    );

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
  return (
    <>
      <div className="container">
        {/* Create new Card */}
        <div className="card rounded-0">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group w-75 ml-5 my-5">
                <label>Year</label>
                <Select
                  defaultValue={selectedYear}
                  onChange={setSelectedYear}
                  options={yearList}
                />
               
              </div>
            </div>
            <div className="col-md-6">
              <div className="job-data-direction-btn-div w-75 ml-5">
                {/* <button id="job-data-hift" className="slide_from_left"> 
                  <i className="flaticon-381-enter"></i>
                  </button> */}
                {driftButton}
              </div>
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-6"></div>
          </div>
        </div>
        {/* Requisition List */}
      </div>
    </>
  );
};
export default withRouter(PnineCard);
