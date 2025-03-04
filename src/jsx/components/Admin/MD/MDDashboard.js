import React, { Fragment, useEffect, useState } from "react";

//** Import Image */

import { Sparklines, SparklinesLine } from "react-sparklines";

// import ApexchartsNegPost from './ApexNagetivePosative';
// import ApexchartsNegPost1 from './ApexNagetivePosative1';
import axios from "axios";
import { Link } from "react-router-dom";
import DashboardUI from "../GlobalComponents/DashboardUI";
import LeaveStatistic from "../GlobalComponents/LeaveStatistic";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

// const sampleData1 = [8, 7, 6, 3, 2, 4, 6, 8, 12, 6, 12, 13, 10, 18, 14, 24, 16, 12, 19, 21, 16, 14, 24, 21, 13, 15, 27, 29, 21, 11, 14, 19, 21, 17,];
const sampleData2 = [
  19, 21, 16, 14, 24, 21, 13, 15, 27, 29, 21, 11, 14, 19, 21, 17, 12, 6, 12, 13,
  10, 18, 14, 24, 16, 12, 8, 7, 6, 3, 2, 7, 6, 8,
];
// const sampleData3 = [8, 7, 6, 3, 2, 4, 6, 8, 10, 6, 12, 15, 13, 15, 14, 13, 21, 11, 14, 10, 21, 10, 13, 10, 12, 14, 16, 14, 12, 10, 9, 8, 4, 1,];
// const sampleData4 = [20, 18, 16, 12, 8, 10, 13, 15, 12, 6, 12, 13, 10, 18, 14, 16, 17, 15, 19, 16, 16, 14, 18, 21, 13, 15, 18, 17, 21, 11, 14, 19, 21, 17,];

const MDDashboard = () => {
  const [pending, setPending] = useState(0);
  const [viewed, setViewed] = useState(0);
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(secureLocalStorage.getItem("userDetails"))
      }`,
    },
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/staffrequision/mddashboard`,
        config
      )
      .then((result) => {
        // =>console.log(result.data);
        setViewed(result.data.viewedCount);
        setPending(result.data.pendingCount);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  return (
    <Fragment>
      <div className="row d-none">
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="card overflow-hidden">
            <div className="card-header media border-0 pb-0">
              <div className="media-body">
                <h2 className="text-black">
                  {pending}
                  <span className="text-success fs-14">+</span>
                </h2>
                <p className="mb-0 text-black">Pending Requisition</p>
              </div>
              <svg
                width="55"
                height="53"
                viewBox="0 0 55 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.9353 33.9221C37.2174 33.2492 38.6849 32.8662 40.2478 32.8662H40.2531C40.412 32.8662 40.4862 32.6799 40.3696 32.5764C38.7443 31.1514 36.8877 30.0004 34.8758 29.1707C34.8546 29.1604 34.8334 29.1552 34.8122 29.1448C38.1022 26.8105 40.2425 23.0167 40.2425 18.7363C40.2425 11.6455 34.3725 5.90039 27.1303 5.90039C19.8881 5.90039 14.0234 11.6455 14.0234 18.7363C14.0234 23.0167 16.1638 26.8105 19.459 29.1448C19.4378 29.1552 19.4166 29.1604 19.3954 29.1707C17.0273 30.1489 14.9029 31.5516 13.0751 33.3424C11.2579 35.1145 9.81117 37.2152 8.81563 39.5274C7.83613 41.7916 7.3075 44.2175 7.25807 46.6752C7.25665 46.7304 7.26657 46.7854 7.28724 46.8368C7.3079 46.8883 7.3389 46.9351 7.37839 46.9747C7.41789 47.0142 7.46509 47.0457 7.51722 47.0671C7.56934 47.0886 7.62533 47.0996 7.6819 47.0996H10.8553C11.0831 47.0996 11.2738 46.9185 11.2791 46.6959C11.3851 42.7002 13.0221 38.9581 15.9201 36.1218C18.9133 33.1871 22.8973 31.5723 27.1356 31.5723C30.1395 31.5723 33.0215 32.3849 35.5062 33.9065C35.57 33.9457 35.6433 33.9678 35.7186 33.9705C35.794 33.9732 35.8687 33.9565 35.9353 33.9221V33.9221ZM27.1356 27.6387C24.7092 27.6387 22.4258 26.7122 20.704 25.0301C19.8569 24.2046 19.1853 23.2235 18.7279 22.1433C18.2706 21.0632 18.0365 19.9053 18.0392 18.7363C18.0392 16.3606 18.9875 14.1247 20.704 12.4426C22.4205 10.7604 24.7039 9.83398 27.1356 9.83398C29.5673 9.83398 31.8454 10.7604 33.5672 12.4426C34.4143 13.2681 35.0859 14.2492 35.5433 15.3293C36.0006 16.4095 36.2347 17.5674 36.232 18.7363C36.232 21.112 35.2837 23.3479 33.5672 25.0301C31.8454 26.7122 29.562 27.6387 27.1356 27.6387ZM46.6211 39.957H33.9063C33.6732 39.957 33.4824 40.1434 33.4824 40.3711V43.2695C33.4824 43.4973 33.6732 43.6836 33.9063 43.6836H46.6211C46.8542 43.6836 47.0449 43.4973 47.0449 43.2695V40.3711C47.0449 40.1434 46.8542 39.957 46.6211 39.957Z"
                  fill="#3F9AE0"
                />
              </svg>
            </div>
            <div className="card-body pt-4 p-0">
              {/* Sparkline Chart  */}
              <Sparklines data={sampleData2}>
                <SparklinesLine style={{ strokeWidth: 2 }} color="#3f9ae0" />
              </Sparklines>
              {/* Sparkline Chart End */}
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="card overflow-hidden">
            <div className="card-header media border-0 pb-0">
              <div className="media-body">
                <h2 className="text-black">
                  {viewed} <span className="text-success fs-14">+</span>
                </h2>
                <p className="mb-0 text-black">Viewed Requisition</p>
              </div>
              <svg
                width="55"
                height="53"
                viewBox="0 0 55 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.6838 33.2492C37.966 32.5764 39.4336 32.1934 40.9966 32.1934H41.0019C41.1609 32.1934 41.235 32.007 41.1185 31.9035C39.493 30.4785 37.6362 29.3276 35.6241 28.4979C35.603 28.4875 35.5818 28.4823 35.5606 28.472C38.8508 26.1377 40.9913 22.3438 40.9913 18.0635C40.9913 10.9727 35.1208 5.22754 27.8781 5.22754C20.6353 5.22754 14.7701 10.9727 14.7701 18.0635C14.7701 22.3438 16.9106 26.1377 20.2061 28.472C20.1849 28.4823 20.1638 28.4875 20.1426 28.4979C17.7742 29.4761 15.6496 30.8787 13.8217 32.6695C12.0044 34.4416 10.5575 36.5424 9.56189 38.8546C8.5823 41.1188 8.05363 43.5447 8.00419 46.0023C8.00278 46.0576 8.0127 46.1125 8.03336 46.164C8.05403 46.2154 8.08503 46.2623 8.12453 46.3018C8.16403 46.3414 8.21123 46.3728 8.26336 46.3943C8.31549 46.4157 8.37149 46.4268 8.42805 46.4268H11.6017C11.8296 46.4268 12.0203 46.2456 12.0256 46.023C12.1316 42.0273 13.7687 38.2853 16.6669 35.4489C19.6604 32.5143 23.6447 30.8994 27.8834 30.8994C30.8875 30.8994 33.7698 31.712 36.2546 33.2337C36.3185 33.2729 36.3918 33.2949 36.4671 33.2977C36.5424 33.3004 36.6172 33.2837 36.6838 33.2492V33.2492ZM27.8834 26.9658C25.4567 26.9658 23.1732 26.0394 21.4512 24.3572C20.604 23.5317 19.9324 22.5506 19.475 21.4705C19.0176 20.3903 18.7835 19.2324 18.7862 18.0635C18.7862 15.6878 19.7346 13.4519 21.4512 11.7697C23.1679 10.0876 25.4514 9.16113 27.8834 9.16113C30.3153 9.16113 32.5935 10.0876 34.3155 11.7697C35.1627 12.5952 35.8343 13.5763 36.2917 14.6565C36.7491 15.7366 36.9832 16.8945 36.9805 18.0635C36.9805 20.4392 36.0321 22.6751 34.3155 24.3572C32.5935 26.0394 30.31 26.9658 27.8834 26.9658ZM47.3704 39.2842H42.9199V34.9365C42.9199 34.7088 42.7292 34.5225 42.496 34.5225H39.529C39.2959 34.5225 39.1051 34.7088 39.1051 34.9365V39.2842H34.6546C34.4214 39.2842 34.2307 39.4705 34.2307 39.6982V42.5967C34.2307 42.8244 34.4214 43.0107 34.6546 43.0107H39.1051V47.3584C39.1051 47.5861 39.2959 47.7725 39.529 47.7725H42.496C42.7292 47.7725 42.9199 47.5861 42.9199 47.3584V43.0107H47.3704C47.6036 43.0107 47.7943 42.8244 47.7943 42.5967V39.6982C47.7943 39.4705 47.6036 39.2842 47.3704 39.2842Z"
                  fill="#3F9AE0"
                />
              </svg>
            </div>
            <div className="card-body pt-4 p-0">
              {/* Sparkline Chart  */}
              <Sparklines data={sampleData2}>
                <SparklinesLine style={{ strokeWidth: 2 }} color="#3f9ae0" />
              </Sparklines>
              {/* Sparkline Chart End */}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <div className="d-md-flex align-items-start flex-wrap gap-1"><DashboardUI/></div>
        </div>
        <div className="col-md-3"><LeaveStatistic/></div>
        
      </div>
    </Fragment>
  );
};

export default MDDashboard;
