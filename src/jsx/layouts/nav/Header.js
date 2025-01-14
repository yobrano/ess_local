import React from "react";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../AppUtility"; import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import LogoutPage from './Logout';
/// Image
import profile from "../../../images/profile/mbusi.png";
import avatar from "../../../images/avatar/1.jpg";

const Header = ({ onNote, toggle, onProfile, onActivity, onNotification}) => {
   var path = window.location.pathname.split("/");
   var name = path[path.length - 1].split("-");
   var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
   var finalName = filterName.includes("app")
      ? filterName.filter((f) => f !== "app")
      // : filterName.includes("ui")
      // ? filterName.filter((f) => f !== "ui")
      // : filterName.includes("uc")
      // ? filterName.filter((f) => f !== "uc")
      // : filterName.includes("basic")
      // ? filterName.filter((f) => f !== "basic")
      // : filterName.includes("form")
      // ? filterName.filter((f) => f !== "form")
      // : filterName.includes("table")
      // ? filterName.filter((f) => f !== "table")
      // : filterName.includes("page")
      // ? filterName.filter((f) => f !== "page")
      // : filterName.includes("email")
      // ? filterName.filter((f) => f !== "email")
      // : filterName.includes("ecom")
      // ? filterName.filter((f) => f !== "ecom")
      // : filterName.includes("chart")
      // ? filterName.filter((f) => f !== "chart")
      // : filterName.includes("editor")
      // ? filterName.filter((f) => f !== "editor")
      : filterName;
	
	var page_name = (finalName.join(" ") === ' ')?'Dashboard':finalName.join(" ");	
	  
   return (
      <div className="header">
         <div className="header-content">
            <nav className="navbar navbar-expand">
               <div className="collapse navbar-collapse justify-content-between">
                  <div className="header-left">
                     <div
                        className="dashboard_bar"
                        style={{ textTransform: "capitalize" }}
                     >
                        {page_name}
                     </div>
                  </div>

                  <ul className="navbar-nav header-right">
                     <li className="nav-item">
						 {/* <div className="input-group search-area d-lg-inline-flex d-none">
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Search something here..."
                           />
                           <div className="input-group-append">
                              <span className="input-group-text">
                                 <i className="flaticon-381-search-2"></i>
                              </span>
                           </div>
                        </div> */}
                     </li>
					  
                     {/* <li className="nav-item dropdown notification_dropdown">
                        <Link to={"#"}
                           className="nav-link bell bell-link"
                           onClick={() => onNote()}
                        >
                          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M20.4604 0.848846H3.31682C2.64742 0.849582 2.00565 1.11583 1.53231 1.58916C1.05897 2.0625 0.792727 2.70427 0.791992 3.37367V15.1562C0.792727 15.8256 1.05897 16.4674 1.53231 16.9407C2.00565 17.414 2.64742 17.6803 3.31682 17.681C3.53999 17.6812 3.75398 17.7699 3.91178 17.9277C4.06958 18.0855 4.15829 18.2995 4.15843 18.5226V20.3168C4.15843 20.6214 4.24112 20.9204 4.39768 21.1817C4.55423 21.4431 4.77879 21.6571 5.04741 21.8008C5.31602 21.9446 5.61861 22.0127 5.92292 21.998C6.22723 21.9833 6.52183 21.8863 6.77533 21.7173L12.6173 17.8224C12.7554 17.7299 12.9179 17.6807 13.0841 17.681H17.187C17.7383 17.68 18.2742 17.4993 18.7136 17.1664C19.1531 16.8334 19.472 16.3664 19.6222 15.8359L22.8965 4.05007C22.9998 3.67478 23.0152 3.28071 22.9413 2.89853C22.8674 2.51634 22.7064 2.15636 22.4707 1.8466C22.2349 1.53684 21.9309 1.28565 21.5822 1.1126C21.2336 0.93954 20.8497 0.849282 20.4604 0.848846ZM21.2732 3.60301L18.0005 15.3847C17.9499 15.5614 17.8432 15.7168 17.6964 15.8274C17.5496 15.938 17.3708 15.9979 17.187 15.9978H13.0841C12.5855 15.9972 12.098 16.1448 11.6836 16.4219L5.84165 20.3168V18.5226C5.84091 17.8532 5.57467 17.2115 5.10133 16.7381C4.62799 16.2648 3.98622 15.9985 3.31682 15.9978C3.09365 15.9977 2.87966 15.909 2.72186 15.7512C2.56406 15.5934 2.47534 15.3794 2.47521 15.1562V3.37367C2.47534 3.15051 2.56406 2.93652 2.72186 2.77871C2.87966 2.62091 3.09365 2.5322 3.31682 2.53206H20.4604C20.5905 2.53239 20.7187 2.56274 20.8352 2.62073C20.9516 2.67872 21.0531 2.7628 21.1318 2.86643C21.2104 2.97005 21.2641 3.09042 21.2886 3.21818C21.3132 3.34594 21.3079 3.47763 21.2732 3.60301Z" fill="#3E4954"/>
								<path d="M5.84161 8.42333H10.0497C10.2729 8.42333 10.4869 8.33466 10.6448 8.17683C10.8026 8.019 10.8913 7.80493 10.8913 7.58172C10.8913 7.35851 10.8026 7.14445 10.6448 6.98661C10.4869 6.82878 10.2729 6.74011 10.0497 6.74011H5.84161C5.6184 6.74011 5.40433 6.82878 5.2465 6.98661C5.08867 7.14445 5 7.35851 5 7.58172C5 7.80493 5.08867 8.019 5.2465 8.17683C5.40433 8.33466 5.6184 8.42333 5.84161 8.42333Z" fill="#3E4954"/>
								<path d="M13.4161 10.1065H5.84161C5.6184 10.1065 5.40433 10.1952 5.2465 10.353C5.08867 10.5109 5 10.7249 5 10.9481C5 11.1714 5.08867 11.3854 5.2465 11.5433C5.40433 11.7011 5.6184 11.7898 5.84161 11.7898H13.4161C13.6393 11.7898 13.8534 11.7011 14.0112 11.5433C14.169 11.3854 14.2577 11.1714 14.2577 10.9481C14.2577 10.7249 14.169 10.5109 14.0112 10.353C13.8534 10.1952 13.6393 10.1065 13.4161 10.1065Z" fill="#3E4954"/>
							</svg>
                           <span className="badge light text-white bg-primary">5 </span>
                        </Link>
                     </li> */}
                  
                     <li
                        className={`nav-item dropdown header-profile ${
                           toggle === "profile" ? "show" : ""
                        }`}
                        onClick={() => onProfile()}
                     >
                        <a
                           className="nav-link"
                           role="button"
                           data-toggle="dropdown"
                        >
                   
                        {/* <div className="nav-link"> */}
                        <div className="header-info">
								<small>Hi</small>
                        <span>{jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Name}</span>
                           </div>
                           <img src={profile} width="20" alt="" />
                        {/* </div> */}
                        
                          
                        </a>
                     
                        <div
                           className={`dropdown-menu dropdown-menu-right ${
                              toggle === "profile" ? "show" : ""
                           }`}
                        >
                           {/* <Link
                              to="/app-profile"
                              className="dropdown-item ai-icon"
                           >
                              <svg
                                 id="icon-user1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-primary"
                                 width="18"
                                 height="18"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              >
                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                 <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                              <span className="ml-2">Profile </span>
                           </Link> */}
                           {/* <Link
                              to="/"
                              className="dropdown-item ai-icon"
                           >
                              <svg
                                 id="icon-inbox"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-success"
                                 width="18"
                                 height="18"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              >
                                 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                 <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                              <span className="ml-2">Inbox </span>
                           </Link> */}
                           <LogoutPage />
                        </div>
                     </li>
					 
                  </ul>
               </div>
            </nav>
         </div>
      </div>
   );
};

export default Header;
