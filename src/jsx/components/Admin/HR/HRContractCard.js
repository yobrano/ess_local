import React, { useEffect, useState } from "react";
import { Accordion, Button, Collapse } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./ExitForm.css";
import axios from "axios";
import swal from "sweetalert";
import Select from "react-select";
import { format } from "date-fns";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const HRContractCard = (props) => {
  const [loading, setLoading] = useState(true);

  const [outstanding, setOutstanding] = useState(false);
  const [aboveAverage, setAboveAverage] = useState(false);
  const [satisfactory, setSatisfactory] = useState(false);
  const [marginal, setMarginal] = useState(false);
  const [unsatisfactory, setUnsatisfactory] = useState(false);
  const [performanceComment, setPerformanceComment] = useState("");

  const [excellentAttendance, setExcellentAttendance] = useState(false);
  const [occasionalAbsence, setOccasionalAbsence] = useState(false);
  const [repeatedAbsence, setRepeatedAbsence] = useState(false);
  const [unjustifiedAbsence, setUnjustifiedAbsence] = useState(false);
  const [attendanceComment, setAttendanceComment] = useState("");

  const [alwaysInterested, setAlwaysInterested] = useState(false);
  const [reasonablyDevoted, setReasonablyDevoted] = useState(false);
  const [passiveAttitude, setPassiveAttitude] = useState(false);
  const [activeDislikeofWork, setActiveDislikeofWork] = useState(false);
  const [attitudeComment, setAttitudeComment] = useState("");

  const [alwaysNeat, setAlwaysNeat] = useState(false);
  const [generallyNeat, setGenerallyNeat] = useState(false);
  const [sometimesCareles, setSometimesCareles] = useState(false);
  const [attirenotSuitable, setAttirenotSuitable] = useState(false);
  const [appearanceComment, setAppearanceComment] = useState("");

  const [selfStarter, setSelfStarter] = useState(false);
  const [needsStimilus, setNeedsStimilus] = useState(false);
  const [needsCSupervision, setNeedsCSupervision] = useState(false);
  const [showNoInitiative, setShowNoInitiative] = useState(false);
  const [initiativeComment, setInitiativeComment] = useState("");

  const [alwayOnTime, setAlwayOnTime] = useState(false);
  const [occasionallyLate, setOccasionallyLate] = useState(false);
  const [repeatedLate, setRepeatedLate] = useState(false);
  const [rarelyOnTime, setRarelyOnTime] = useState(false);
  const [dependabilityComment, setDependabilityComment] = useState("");

  const [decisionLogical, setDecisionLogical] = useState(false);
  const [genSoundJudgment, setGenSoundJudgment] = useState(false);
  const [reqFreqCorrection, setReqFreqCorrection] = useState(false);
  const [judgmentOftenFaulty, setJudgmentOftenFaulty] = useState(false);
  const [judmentComment, setJudmentComment] = useState("");

  const [rarelyMakesErrs, setRarelyMakesErrs] = useState(false);
  const [fewErrThanMost, setFewErrThanMost] = useState(false);
  const [avgAccuracy, setAvgAccuracy] = useState(false);
  const [unacceptablyErratic, setUnacceptablyErratic] = useState(false);
  const [attentionToDetailComment, setAttentionToDetailComment] = useState("");

  const [friendlyOutgoing, setFriendlyOutgoing] = useState(false);
  const [somewhatBusinesslike, setSomewhatBusinesslike] = useState(false);
  const [gregariousToPoint, setGregariousToPoint] = useState(false);
  const [sullenAndWithdrawn, setSullenAndWithdrawn] = useState(false);
  const [interpersonalComment, setInterpersonalComment] = useState("");

  const [alwayscourteousTactful, setAlwayscourteousTactful] = useState(false);
  const [genCourteous, setGenCourteous] = useState(false);
  const [sometimesIncosiderate, setSometimesIncosiderate] = useState(false);
  const [arouseAntagonism, setArouseAntagonism] = useState(false);
  const [mannersComment, setMannersComment] = useState("");

  const [seeksAddResponsibility, setSeeksAddResponsibility] = useState(false);
  const [willinglyAcceptResp, setWillinglyAcceptResp] = useState(false);
  const [assumesWhenUnavoidable, setAssumesWhenUnavoidable] = useState(false);
  const [alwaysAvoidResponsibility, setAlwaysAvoidResponsibility] =
    useState(false);
  const [responsiblityComment, setResponsiblityComment] = useState("");

  const [graspImmediately, setGraspImmediately] = useState(false);
  const [quickerThanAvg, setQuickerThanAvg] = useState(false);
  const [avgLearning, setAvgLearning] = useState(false);
  const [slowLearner, setSlowLearner] = useState(false);
  const [unableToGraspNew, setUnableToGraspNew] = useState(false);
  const [learningCampacityComment, setLearningCampacityComment] = useState("");

  const [excepHighProductivity, setExcepHighProductivity] = useState(false);
  const [completeMoreThanAvg, setCompleteMoreThanAvg] = useState(false);
  const [adequatePerHr, setAdequatePerHr] = useState(false);
  const [inadequateOutput, setInadequateOutput] = useState(false);
  const [outputComment, setOutputComment] = useState("");

  const [assumesLeadershipInit, setAssumesLeadershipInit] = useState(false);
  const [willLeadEncouraged, setWillLeadEncouraged] = useState(false);
  const [canLeadifNecessary, setCanLeadifNecessary] = useState(false);
  const [refusesLeadership, setRefusesLeadership] = useState(false);
  const [attemptbutInefficient, setAttemptbutInefficient] = useState(false);
  const [leadershipComment, setLeadershipComment] = useState("");

  const [neverFalter, setNeverFalter] = useState(false);
  const [maintainPoise, setMaintainPoise] = useState(false);
  const [dependableExcUnderPress, setDependableExcUnderPress] = useState(false);
  const [cantTakePressure, setCantTakePressure] = useState(false);
  const [pressureComment, setPressureComment] = useState("");

  const [empStrongestpt, setEmpStrongestpt] = useState("");
  const [empWeakestPt, setEmpWeakestPt] = useState("");
  const [qualifiedPromo, setQualifiedPromo] = useState("");
  const [promoPstn, setPromoPstn] = useState("");
  const [promotable, setPromotable] = useState("");
  const [effectiveWithDifferent, setEffectiveWithDifferent] = useState("");
  const [differentAssingment, setDifferentAssingment] = useState("");
  const [recommendationSectionComment, setRecommendationSectionComment] =
    useState("");
  const [empRecConfirm, setEmpRecConfirm] = useState(false);
  const [empRecExtProb, setEmpRecExtProb] = useState(false);
  const [empRecTerminate, setEmpRecTerminate] = useState(false);

  const [hrRemark, setHRRemark] = useState("");
  const [MDFDRemark, setMDFDRemark] = useState("");

  const [selectedEmp, setSelectedEmp] = useState("");
  const [selectedMgr, setSelectedMgr] = useState("");
  const [skills, setSkills] = useState("");
  const [datax, setDatax] = useState({});
  const [disableBtn, setDisableBtn] = useState(false);

  //F=Flag
  const [renewalF, setRenewalF] = useState(false);
  const [nonRenewalF, setnonRenewalF] = useState(false);

  //Non Renewal Fields
  const [terminationDate, setTerminationDate] = useState(new Date());
  //Renewal Fields
  const [contractedDate, setContractedDate] = useState(new Date());
  const [renewalTime, setRenewalTime] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [newSalary, setNewSalary] = useState("");

  const [hodComment,setHODComment] = useState("");

  //Additional Fields
  const [jobTitle, setJobTitle] = useState("");
  const [branch, setBranch] = useState("");
  const [product, setProduct] = useState("");
  const [employmentYear, setEmploymentYear] = useState("");
  const [yearsOfService, setYearsOfService] = useState("");

  const [extensionF, setExtensionF] = useState(false);
  const [stage, setStage] = useState("");
  const [stageMessage, setStageMessage] = useState("");

  const [selectedNo, setSelectedNo] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [contractXpiry,setContractXpiry] = useState("")

  const numberList=[
    {value:"1",label:"1"},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},{value:"6",label:"6"},{value:"7",label:"7"},{value:"8",label:"9"},{value:"10",label:"10"},
    {value:"11",label:"11"},{value:"12",label:"12"},{value:"13",label:"13"},{value:"14",label:"14"},{value:"15",label:"15"},{value:"16",label:"16"},{value:"17",label:"17"},{value:"18",label:"19"},{value:"20",label:"20"},
    {value:"21",label:"21"},{value:"22",label:"22"},{value:"23",label:"23"},{value:"24",label:"24"},{value:"25",label:"25"},{value:"26",label:"26"},{value:"27",label:"27"},{value:"28",label:"29"},{value:"30",label:"30"},
    {value:"31",label:"31"},{value:"32",label:"32"},{value:"33",label:"33"},{value:"34",label:"34"},{value:"35",label:"35"},{value:"36",label:"36"},{value:"37",label:"37"},{value:"38",label:"39"},{value:"40",label:"40"},

  ]
  const durationList=[
    {value:"D",label:"Day(s)"},{value:"M",label:"Month(s)"},{value:"Y",label:"Year(s)"}
  ]

  const toggleCollapse = (from) => {
    switch (from) {
      case "renewal":
        setRenewalF(true);
        setnonRenewalF(false);
        break;
      case "nonrenewal":
        setRenewalF(false);
        setnonRenewalF(true);
        break;
      case "reversal":
        setExtensionF(!extensionF);
        break;
      default:
        setRenewalF(true);
        setnonRenewalF(false);
        break;
    }
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/contractcarddata/${props.location.state[0].datum[0].contractNo}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data.probationFirstList[0]);
          let cDArr = response.data.probationFirstList[0].contractstart.split('/');
          // =>console.log(response.data.probationFirstList[0].contractstart);

          setJobTitle(response.data.probationFirstList[0].jobtitle)
          setBranch(response.data.probationFirstList[0].branch)
          setProduct(response.data.probationFirstList[0].product)
          setEmploymentYear(response.data.probationFirstList[0].employmentyear)
          setYearsOfService(response.data.probationFirstList[0].tenureofservice)
          setContractXpiry(response.data.probationFirstList[0].contractexpiry)
          if(response.data.probationFirstList[0].contractstart!==""){
            setContractedDate(new Date(response.data.probationFirstList[0].contractstart))
          }
          
          setDatax(response.data.probationFirstList[0]);
          setSelectedEmp(response.data.probationFirstList[0].employeename);
          setSkills(response.data.probationFirstList[0].skill);
          setSelectedMgr(response.data.probationFirstList[0].managername);
          setHRRemark(response.data.probationFirstList[0].hRcomment);
          setMDFDRemark(response.data.probationFirstList[0].mDcomment);

          setOutstanding(response.data.probationFirstList[0].outstanding);
          setAboveAverage(response.data.probationFirstList[0].aboveAverage);
          setSatisfactory(response.data.probationFirstList[0].satisfactory);
          setMarginal(response.data.probationFirstList[0].marginal);
          setUnsatisfactory(response.data.probationFirstList[0].unsatisfactory);
          setPerformanceComment(
            response.data.probationFirstList[0].performanceComment
          );

          setExcellentAttendance(
            response.data.probationFirstList[0].excellentAttendance
          );
          setOccasionalAbsence(
            response.data.probationFirstList[0].occasionalAbsence
          );
          setRepeatedAbsence(
            response.data.probationFirstList[0].repeatedAbsence
          );
          setUnjustifiedAbsence(
            response.data.probationFirstList[0].unjustifiedAbsence
          );
          setAttendanceComment(
            response.data.probationFirstList[0].attendanceComment
          );

          setAlwaysInterested(
            response.data.probationFirstList[0].alwaysInterested
          );
          setReasonablyDevoted(
            response.data.probationFirstList[0].reasonablyDevoted
          );
          setPassiveAttitude(
            response.data.probationFirstList[0].passiveAttitude
          );
          setActiveDislikeofWork(
            response.data.probationFirstList[0].activeDislikeofWork
          );
          setAttitudeComment(
            response.data.probationFirstList[0].attitudeComment
          );

          setAlwaysNeat(response.data.probationFirstList[0].alwaysNeat);
          setGenerallyNeat(response.data.probationFirstList[0].generallyNeat);
          setSometimesCareles(
            response.data.probationFirstList[0].sometimesCareles
          );
          setAttirenotSuitable(
            response.data.probationFirstList[0].attirenotSuitable
          );
          setAppearanceComment(
            response.data.probationFirstList[0].appearanceComment
          );

          setSelfStarter(response.data.probationFirstList[0].selfStarter);
          setNeedsStimilus(response.data.probationFirstList[0].needsStimilus);
          setNeedsCSupervision(
            response.data.probationFirstList[0].needsCSupervision
          );
          setShowNoInitiative(
            response.data.probationFirstList[0].showNoInitiative
          );
          setInitiativeComment(
            response.data.probationFirstList[0].initiativeComment
          );

          setAlwayOnTime(response.data.probationFirstList[0].alwayOnTime);
          setOccasionallyLate(
            response.data.probationFirstList[0].occasionallyLate
          );
          setRepeatedLate(response.data.probationFirstList[0].repeatedLate);
          setRarelyOnTime(response.data.probationFirstList[0].rarelyOnTime);
          setDependabilityComment(
            response.data.probationFirstList[0].dependabilityComment
          );

          setDecisionLogical(
            response.data.probationFirstList[0].decisionLogical
          );
          setGenSoundJudgment(
            response.data.probationFirstList[0].genSoundJudgment
          );
          setReqFreqCorrection(
            response.data.probationFirstList[0].reqFreqCorrection
          );
          setJudgmentOftenFaulty(
            response.data.probationFirstList[0].judgmentOftenFaulty
          );
          setJudmentComment(response.data.probationFirstList[0].judmentComment);

          setRarelyMakesErrs(
            response.data.probationFirstList[0].rarelyMakesErrs
          );
          setFewErrThanMost(response.data.probationFirstList[0].fewErrThanMost);
          setAvgAccuracy(response.data.probationFirstList[0].avgAccuracy);
          setUnacceptablyErratic(
            response.data.probationFirstList[0].unacceptablyErratic
          );
          setAttentionToDetailComment(
            response.data.probationFirstList[0].attentionToDetailComment
          );

          setFriendlyOutgoing(
            response.data.probationFirstList[0].friendlyOutgoing
          );
          setSomewhatBusinesslike(
            response.data.probationFirstList[0].somewhatBusinesslike
          );
          setGregariousToPoint(
            response.data.probationFirstList[0].gregariousToPoint
          );
          setSullenAndWithdrawn(
            response.data.probationFirstList[0].sullenAndWithdrawn
          );
          setInterpersonalComment(
            response.data.probationFirstList[0].interpersonalComment
          );

          setAlwayscourteousTactful(
            response.data.probationFirstList[0].alwayscourteousTactful
          );
          setGenCourteous(response.data.probationFirstList[0].genCourteous);
          setSometimesIncosiderate(
            response.data.probationFirstList[0].sometimesIncosiderate
          );
          setArouseAntagonism(
            response.data.probationFirstList[0].arouseAntagonism
          );
          setMannersComment(response.data.probationFirstList[0].mannersComment);

          setSeeksAddResponsibility(
            response.data.probationFirstList[0].seeksAddResponsibility
          );
          setWillinglyAcceptResp(
            response.data.probationFirstList[0].willinglyAcceptResp
          );
          setAssumesWhenUnavoidable(
            response.data.probationFirstList[0].assumesWhenUnavoidable
          );
          setAlwaysAvoidResponsibility(
            response.data.probationFirstList[0].alwaysAvoidResponsibility
          );
          setResponsiblityComment(
            response.data.probationFirstList[0].responsiblityComment
          );

          setGraspImmediately(
            response.data.probationFirstList[0].graspImmediately
          );
          setQuickerThanAvg(response.data.probationFirstList[0].quickerThanAvg);
          setAvgLearning(response.data.probationFirstList[0].avgLearning);
          setSlowLearner(response.data.probationFirstList[0].slowLearner);
          setUnableToGraspNew(
            response.data.probationFirstList[0].unableToGraspNew
          );
          setLearningCampacityComment(
            response.data.probationFirstList[0].learningCampacityComment
          );

          setExcepHighProductivity(
            response.data.probationFirstList[0].excepHighProductivity
          );
          setCompleteMoreThanAvg(
            response.data.probationFirstList[0].completeMoreThanAvg
          );
          setAdequatePerHr(response.data.probationFirstList[0].adequatePerHr);
          setInadequateOutput(
            response.data.probationFirstList[0].inadequateOutput
          );
          setOutputComment(response.data.probationFirstList[0].outputComment);

          setAssumesLeadershipInit(
            response.data.probationFirstList[0].assumesLeadershipInit
          );
          setWillLeadEncouraged(
            response.data.probationFirstList[0].willLeadEncouraged
          );
          setCanLeadifNecessary(
            response.data.probationFirstList[0].canLeadifNecessary
          );
          setRefusesLeadership(
            response.data.probationFirstList[0].refusesLeadership
          );
          setAttemptbutInefficient(
            response.data.probationFirstList[0].attemptbutInefficient
          );
          setLeadershipComment(
            response.data.probationFirstList[0].leadershipComment
          );

          setNeverFalter(response.data.probationFirstList[0].neverFalter);
          setMaintainPoise(response.data.probationFirstList[0].maintainPoise);
          setDependableExcUnderPress(
            response.data.probationFirstList[0].dependableExcUnderPress
          );
          setCantTakePressure(
            response.data.probationFirstList[0].cantTakePressure
          );
          setPressureComment(
            response.data.probationFirstList[0].pressureComment
          );

          setEmpStrongestpt(response.data.probationFirstList[0].empStrongestpt);
          setEmpWeakestPt(response.data.probationFirstList[0].empWeakestPt);
          setQualifiedPromo(response.data.probationFirstList[0].qualifiedPromo);
          setPromoPstn(response.data.probationFirstList[0].promoPstn);
          setPromotable(response.data.probationFirstList[0].promotable);
          setEffectiveWithDifferent(
            response.data.probationFirstList[0].effectiveWithDifferent
          );
          setDifferentAssingment(
            response.data.probationFirstList[0].differentAssingment
          );
          setRecommendationSectionComment(
            response.data.probationFirstList[0].recommendationSectionComment
          );
          setEmpRecConfirm(response.data.probationFirstList[0].empRecConfirm);
          setEmpRecExtProb(response.data.probationFirstList[0].empRecExtProb);
          setEmpRecTerminate(
            response.data.probationFirstList[0].empRecTerminate
          );

          setHODComment(props.location.state[0].datum[0].hodComment)

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
  }, []);

  
  //Revesal
  const ReversalAction = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data = {
      ContractStatus: parseInt(stage),
      BackTrackingReason: stageMessage,
      ContractNo:props.location.state[0].datum[0].contractNo,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Reverse the Record?",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          setDisableBtn(true);
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/contractreversalfromhr`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setDisableBtn(false);
          swal("Success!", "Contract Record Reversed.", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        setDisableBtn(false);
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  };

  const pushToMDFD = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data = {
      HRcomment: hrRemark,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Push to MD/FD",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          setDisableBtn(true);
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/hrpushcontracttomdfd/${props.location.state[0].datum[0].contractNo}`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setDisableBtn(false);
          swal("Success!", "Contract Form Updated/Pushed", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  };

  const pushToHeadHR = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data = {
      HRcomment: hrRemark,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Push to Head HR.",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          setDisableBtn(true);
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/hrpushcontracttoheadhr/${props.location.state[0].datum[0].contractNo}`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setDisableBtn(false);
          swal("Success!", "Contract Form Updated/Pushed", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  };

  const pushToBucketHR =(e)=>{
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Push to Bucket.",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          setDisableBtn(true);
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/movecontracttobuckethr/${props.location.state[0].datum[0].contractNo}`,
            // data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setDisableBtn(false);
          swal("Success!", "Contract Pushed", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  }
 
  //Push first segment
  const uploadRecomSection = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data = {
      EmployeeStrongestPoint: empStrongestpt,
      EmployeeWeakestPoint: empWeakestPt,
      EmployeeQualifiedForPromo: qualifiedPromo,
      PromoPosition: promoPstn,
      PromotableInTheFuture: promotable,
      EffectiveDifferentAssignment: effectiveWithDifferent,
      WhichAssignment: differentAssingment,
      AdditionalComment: recommendationSectionComment,
      confirm: empRecConfirm,
      Extend: empRecExtProb,
      Terminate: empRecTerminate,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/uploadprobationrecommendation/${props.location.state[0].datum[0].probationNo}`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          swal("Success!", "Probation Card Updated", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  };

  const HRApprovedProbation = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    // let data={
    //   MDcomment:MDFDRemark
    // }

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Approve Contract",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          setDisableBtn(true);
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/hrapprovecontract/${props.location.state[0].datum[0].contractNo}`,
            // data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setDisableBtn(false);
          swal("Success!", "Contract Form Approved", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  };

  //View Attached Document
  const viewSupportingDoc = () => {
    const config = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/home/getmonitoring/${props.location.state[0].datum[0].contractNo}`,
        config
      )

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
        if (err !== undefined) {
          swal("Oops!", "Document Missing/Fetch Failed", "error");
        }

        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }

        console.log({ err: err });
      });
  };

  //NONRenewal
  const NONRenewal = () => {
    const config = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
      timeout: 60000,
    };

    let Data = {
      StaffNo: datax.employeeno,
      EocID: datax.probationno,
      TerminationDate: terminationDate,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Non Renew",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/nonrenewaleocontract`,
            Data,
            config
          );
        }
      })
      .then((response) => {

        // if (response.status === 200) {
        //   const file = new Blob([response.data], { type: "application/msword" });
        //   //Build a URL from the file
        //   const fileURL = URL.createObjectURL(file);
        //   //Open the URL on new Window
        //   //const pdfWindow = window.open();
        //   window.location.href = fileURL;
          
        // }

        var saveData = (function () {
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          return function (data, fileName) {
              //var json = JSON.stringify(data),
               var blob = new Blob([data.data], {type: "application/msword"}),
                  url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = fileName;
              a.click();
             window.URL.revokeObjectURL(url);
             swal("Success!", "The record has been Non Renewed!", "success");
          };
      }());
      let fileName = selectedEmp.replace(" ","")+"_NonRenewal.doc";
      saveData(response, fileName);


        // swal("Success!", json.data.message, "success");
        // // =>console.log(json.data);
        // swal("Success!", "Your record has been Non Renewed!", "success");
      })
      .catch((err) => {
        swal("Oh!", err.message, "error");
        // if (err.response !== undefined) {
        //   swal("Oh!", err.response.data.message, "error");
        // } else {
        //   swal("Oh!", err.message, "error");
        // }
        // console.log(err);
      });
  };

  //Renewal
  const EndofRenewal = () => {
    const config = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
      timeout: 60000,
    };

    let Data = {
      StaffNo: datax.employeeno,
      EocID: datax.probationno,
      RenewalTime: selectedNo.label+" "+selectedDuration.label,
      DateFormulae: selectedNo.value+selectedDuration.value,
      ContractedDate:  format(contractedDate, "yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
      StartDate: startDate,
      EndDate: endDate,
      NewSalary:  newSalary.toString(),
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Renew",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/renewaleocontract`,
            Data,
            config
          );
        }
      })
      .then((response) => {
        var saveData = (function () {
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          return function (data, fileName) {
              //var json = JSON.stringify(data),
               var blob = new Blob([data.data], {type: "application/msword"}),
                  url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = fileName;
              a.click();
             window.URL.revokeObjectURL(url);
             swal("Success!", "The record has been Renewed!", "success");
          };
      }());
      let fileName = selectedEmp.replace(" ","")+"_Renewal.doc";
      saveData(response, fileName);

        // swal("Success!", json.data.message, "success");
        // // =>console.log(json.data);
        // swal("Success!", "Your record has been Renewed!", "success");
      })
      .catch((err) => {
        // =>console.log({"i/o err":err.response});
        swal("Oh!", err.message, "error");
        // if (err.response !== undefined) {
        //   swal("Oh!", err.response.message, "error");
        // } else {
        //   swal("Oh!", err.message, "error");
        // }
        // console.log(err);
      });
  };

  let btnUP = "";
  let sectionOne = "";
  if (props.location.state[0].datum[0].status === "Open") {
    if (props.location.state[0].datum[0].contractStatus === 4) {
      btnUP = (
        // <button
        //   className="btn btn-success"
        //   onClick={HRApprovedProbation}
        //   disabled={disableBtn}
        // >
        //   Approve
        // </button>
        <>
          <Button
            className="btn btn-info rounded-0 w-100"
            onClick={pushToBucketHR}
            disabled={disableBtn}
          >
            Move To Bucket
          </Button>

          <Button
            className="btn btn-success rounded-0 w-100"
            onClick={() => toggleCollapse("renewal")}
            aria-controls="example-collapse-text"
            aria-expanded={renewalF}
          >
            Renewal <i className="fa fa-check"></i>
          </Button>
          <Button
            className="btn btn-danger rounded-0 w-100"
            onClick={() => toggleCollapse("nonrenewal")}
            aria-controls="example-collapse-text"
            aria-expanded={nonRenewalF}
          >
            Non-Renewal <i className="fa fa-times"></i>
          </Button>
        </>
      );
    } else {
      btnUP = (
        <>
          <button
          className="btn btn-primary rounded-0 w-100"
          onClick={pushToHeadHR}
          disabled={disableBtn}
        >
          Push to Head HR
        </button>
        <button
          className="btn btn-success rounded-0 w-100"
          onClick={pushToMDFD}
          disabled={disableBtn}
        >
          Push to MD/FD
        </button>
        <button
          className="btn btn-info rounded-0 w-100"
          onClick={pushToBucketHR}
          disabled={disableBtn}
        >
          Move To Bucket
        </button>
        </>
      
      );
    }

    // sectionOne=(
    //   <button className="btn btn-warning" onClick={uploadFirstSegmentCard}>
    //   Upload this section
    //  </button>
    // );
  } else if (props.location.state[0].datum[0].status === "Approved") {
    btnUP = (
      <button className="btn btn-secondary rounded-0 w-100">Form Approved Already</button>
    );
  }

  if (loading) {
    return (
      <>
        <div className="container">
          <div className="headerDiv2 text-center">
            <h4 className="">Contract Card Loading</h4>
          </div>
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
      <h4 className="text-center">END OF CONTRACT REPORT</h4>
      <div className="card">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                  Please tick next to the description which best applies to this
                  employee.
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-4 col-sm-4">
                    <div className="form-group">
                      <label htmlFor="">Employee</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedEmp}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={jobTitle}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Branch</label>
                    <input
                      type="text"
                      className="form-control"
                      value={branch}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Contract Expiry Date</label>
                    <input
                      type="text"
                      className="form-control"
                      value={contractXpiry}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Product</label>
                    <input
                      type="text"
                      className="form-control"
                      value={product}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Year of Employment</label>
                    <input
                      type="text"
                      className="form-control"
                      value={employmentYear}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Tenure of Service</label>
                    <input
                      type="text"
                      className="form-control"
                      value={yearsOfService}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-xl-4 col-sm-4">
                  <div className="form-group">
                    <label htmlFor="">Immediate Supervisor</label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedMgr}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-xl-3 col-sm-3">
                    <div className="form-group">
                      <label htmlFor="">Do we renew the contract?</label>
                      <select
                          name="qualifiedForPromo"
                          id=""
                          className="form-control"
                          disabled={true}
                        >
                          <option>{props.location.state[0].datum[0].doRenew}</option>
                        </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-3">
                    <div className="form-group">
                      <label htmlFor="">If yes, for how long?</label>
                      <select
                          name="qualifiedForPromo"
                          id=""
                          className="form-control"
                          disabled={true}
                        >
                          <option>{props.location.state[0].datum[0].howlong}</option>
                        </select>
                    </div>
                  </div>
                  <div className="col-xl-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="">Reason for renewal</label>
                      <input
                        type="text"
                        className="form-control"
                        name="probationTime"
                        placeholder="Reason(s) for renewal/non-renewal"
                        value={props.location.state[0].datum[0].renewReason}
                        disabled={true}
                      />
                    </div>

                  </div>
                  <div className="col-xl-12 col-sm-6">
                    <div className="form-group">
                      <label htmlFor=""> How long have you supervised</label>
                      <textarea
                        className="form-control"
                        cols="30"
                        rows="1"
                        name="Howlongs"
                        placeholder="How long have you been supervising this employee? (max 240 characters)"
                        value={props.location.state[0].datum[0].supervisionTime}
                        disabled={true}
                      ></textarea>
                    </div>
                  </div>


                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="" className="b-2">
                      Overall Performance
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Outstanding"
                        id="outstanding1"
                        value={outstanding}
                        onChange={(e) => setOutstanding(outstanding)}
                        checked={outstanding}
                      />
                      <label className="form-check-label" foo="outstanding1">
                        Outstanding
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Above Averange"
                        id="aboveAvg1"
                        value="true"
                        checked={aboveAverage}
                        onChange={(e) => setAboveAverage(!aboveAverage)}
                      />
                      <label className="form-check-label" foo="aboveAvg1">
                        Above Averange
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Satisfactory"
                        id="satisfactory1"
                        value="true"
                        checked={satisfactory}
                        onChange={(e) => setSatisfactory(!satisfactory)}
                      />
                      <label className="form-check-label" foo="satisfactory1">
                        Satisfactory
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Marginal"
                        id="marginal1"
                        value="true"
                        checked={marginal}
                        onChange={() => setMarginal(!marginal)}
                      />
                      <label className="form-check-label" foo="marginal1">
                        Marginal
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Unsatisfactory"
                        id="unsatisfactory"
                        checked={unsatisfactory}
                        onChange={() => setUnsatisfactory(!unsatisfactory)}
                      />
                      <label className="form-check-label" foo="unsatisfactory">
                        Unsatisfactory
                      </label>
                    </div>
                  </div>
                  {/* <div className="form-group">
                    <textarea
                      disabled
                      className="w-100 form-control"
                      name="performanceComment"
                      rows="2"
                      placeholder="Comment"
                      value={performanceComment}
                      onChange={(e) => setPerformanceComment(e.target.value)}
                    ></textarea>
                  </div> */}
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="" className="b-2">
                      Attendance
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="excellentAttendance"
                        id="excattance"
                        value={excellentAttendance}
                        checked={excellentAttendance}
                        onChange={(e) =>
                          setExcellentAttendance(!excellentAttendance)
                        }
                      />
                      <label className="form-check-label" foo="excattance">
                        Excellent attendance record
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attendane"
                        id="abjecjustice"
                        value={occasionalAbsence}
                        checked={occasionalAbsence}
                        onChange={(e) =>
                          setOccasionalAbsence(!occasionalAbsence)
                        }
                      />
                      <label className="form-check-label" foo="abjecjustice">
                        Occasional absence but justified
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attendane"
                        id="absjusticc"
                        checked={repeatedAbsence}
                        value={repeatedAbsence}
                        onChange={(e) => setRepeatedAbsence(!repeatedAbsence)}
                      />
                      <label className="form-check-label" foo="absjusticc">
                        Repeated absence but justified
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attendane"
                        id="unjustabsent"
                        value={unjustifiedAbsence}
                        checked={unjustifiedAbsence}
                        onChange={(e) =>
                          setUnjustifiedAbsence(!unjustifiedAbsence)
                        }
                      />
                      <label className="form-check-label" foo="unjustabsent">
                        Unjustified absences
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="w-100 form-control"
                      name="appearanceComment"
                      rows="2"
                      placeholder="Comment"
                      value={attendanceComment}
                      onChange={(e) => setAttendanceComment(e.target.value)}
                      disabled
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="" className="b-2">
                      Attitude
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="alwaysInterested"
                        id="intenthusiastic"
                        checked={alwaysInterested}
                        value={alwaysInterested}
                        onChange={(e) => setAlwaysInterested(!alwaysInterested)}
                      />
                      <label className="form-check-label" foo="intenthusiastic">
                        Always interested and enthusiastic
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="reasonablyDevoted"
                        id="deveotedwrk"
                        checked={reasonablyDevoted}
                        value={reasonablyDevoted}
                        onChange={(e) =>
                          setReasonablyDevoted(!reasonablyDevoted)
                        }
                      />
                      <label className="form-check-label" foo="deveotedwrk">
                        Reasonably devoted to work
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attitude"
                        id="passiveatt"
                        value={passiveAttitude}
                        checked={passiveAttitude}
                        onChange={(e) => setPassiveAttitude(!passiveAttitude)}
                      />
                      <label className="form-check-label" foo="passiveatt">
                        Passive attitude toward work
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attitude"
                        id="dislwork"
                        checked={activeDislikeofWork}
                        value={activeDislikeofWork}
                        onChange={(e) =>
                          setActiveDislikeofWork(!activeDislikeofWork)
                        }
                      />
                      <label className="form-check-label" foo="dislwork">
                        Shows active dislike of work
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      className="w-100 form-control"
                      name="attitudeComment"
                      rows="2"
                      placeholder="Comment"
                      value={attitudeComment}
                      onChange={(e) => setAttitudeComment(e.target.value)}
                      disabled
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="" className="b-2">
                      Appearance
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="appearance"
                        id="appropdressd"
                        value={alwaysNeat}
                        checked={alwaysNeat}
                        onChange={(e) => setAlwaysNeat(!alwaysNeat)}
                      />
                      <label className="form-check-label" foo="appropdressd">
                        Always neat and appropriately dressed
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="generallyNeat"
                        id="genapproderss"
                        value={generallyNeat}
                        checked={generallyNeat}
                        onChange={(e) => setGenerallyNeat(!generallyNeat)}
                      />
                      <label className="form-check-label" foo="genapproderss">
                        Generally neat appropriately dressed
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sometimesCareles"
                        id="somejtapp"
                        value={sometimesCareles}
                        checked={sometimesCareles}
                        onChange={(e) => setSometimesCareles(!sometimesCareles)}
                      />
                      <label className="form-check-label" foo="somejtapp">
                        Sometimes careless about appearance
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attirenotSuitable"
                        id="ErPosition"
                        value={attirenotSuitable}
                        checked={attirenotSuitable}
                        onChange={(e) =>
                          setAttirenotSuitable(!attirenotSuitable)
                        }
                      />
                      <label className="form-check-label" foo="ErPosition">
                        Attire not suitable for position
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="w-100 form-control"
                      name="appearanceComment"
                      rows="2"
                      placeholder="Comment"
                      value={appearanceComment}
                      onChange={(e) => setAppearanceComment(e.target.value)}
                      disabled
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">{/* {sectionOne} */}</div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                  Recommendations
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">
                      What do you consider to be the employee’s strongest
                      points?
                    </label>
                    <textarea
                      className="w-100 form-control"
                      name="empStrongestpt"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={empStrongestpt}
                      onChange={(e) => setEmpStrongestpt(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">
                      What do you consider to be the employee’s weakest points?
                    </label>
                    <textarea
                      className="w-100 form-control"
                      name="empWeakestPt"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={empWeakestPt}
                      onChange={(e) => setEmpWeakestPt(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">
                      Do you consider the employee to be qualified for promotion
                      at the present time?{" "}
                    </label>
                    <select
                      name="qualifiedForPromo"
                      id=""
                      className="form-control"
                      onChange={(e) => setQualifiedPromo(e.target.value)}
                      value={qualifiedPromo}
                    >
                      <option>Choose</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">If yes, to what position? </label>
                    <input
                      type="text"
                      className="form-control"
                      name="promoPstn"
                      value={promoPstn}
                      onChange={(e) => setPromoPstn(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label foo="">
                      If no, do you think the employee may be promotable at a
                      future date?
                    </label>
                    <select
                      name="promotable"
                      id=""
                      className="form-control"
                      onChange={(e) => setPromotable(e.target.value)}
                      value={promotable}
                    >
                      <option>Choose</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label foo="">
                      Do you think the employee would be more effective with a
                      different assignment than the present one?
                    </label>
                    <select
                      name="promotable"
                      id=""
                      className="form-control"
                      onChange={(e) =>
                        setEffectiveWithDifferent(e.target.value)
                      }
                      value={effectiveWithDifferent}
                    >
                      <option>Choose</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label foo="">If yes, which one? </label>
                    <input
                      type="text"
                      className="form-control"
                      name="differentAssingment"
                      value={differentAssingment}
                      onChange={(e) => setDifferentAssingment(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                  <label foo=""><b>Immediate Supervisor Comment</b> </label>
                    <textarea
                      className="w-100 form-control"
                      name="recommendationSectionComment"
                      rows="2"
                      placeholder="Comment (max 240 characters)"
                      value={recommendationSectionComment}
                      onChange={(e) =>
                        setRecommendationSectionComment(e.target.value)
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  {/* <button className="btn btn-warning" onClick={uploadRecomSection}>
                    upload this Section
                  </button> */}
                  {/* <div className="form-group">
                    <label htmlFor=""> Action</label>
                    <button
                      className="form-control btn btn-info rounded-0"
                      onClick={viewSupportingDoc}
                    >
                      View Supporting Doc <i className="fa fa-file-pdf-o"></i>
                    </button>
                  </div> */}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                 HOD, Human Resource and MD/FD Section
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">HOD Remark</label>
                    <textarea
                      className="w-100 form-control"
                      name="hrRemark"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={hodComment}
                      disabled={true}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">HR Remarks</label>
                    <textarea
                      className="w-100 form-control"
                      name="hrRemark"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={hrRemark}
                      onChange={(e) => setHRRemark(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">MD/FD Remarks</label>
                    <textarea
                      className="w-100 form-control"
                      name="MDFDRemark"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={MDFDRemark}
                      onChange={(e) => setMDFDRemark(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor=""> Action</label>
                    <button
                      className="form-control btn btn-info rounded-0"
                      onClick={viewSupportingDoc}
                    >
                      View Supporting Doc <i className="fa fa-file-pdf-o"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="card-footer">
          <div className="row">
            {/* <div className="col-md-3"></div> */}
            <div className="col-md-12">
              <div className="d-flex">

              {btnUP}
              <button
              // className="btn btn-danger mx-2"
              // onClick={() => toggleCollapse("reversal")}
              // aria-controls="example-collapse-text"
              // aria-expanded={extensionF}
              // disabled={disableBtn}
              className="btn btn-warning rounded-0 w-100"
              onClick={() => toggleCollapse("reversal")}
              aria-controls="example-collapse-text"
              aria-expanded={extensionF}
              disabled={disableBtn}

            >
              <i className="fa fa-repeat px-1"></i>
              Re-verse
            </button>

              </div>
            </div>
            <div className="col-md-12 mt-3">
              <Collapse in={nonRenewalF}>
                <div id="example-collapse-text">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="">Termination Date</label>
                        <DatePicker
                          name="terminationDate"
                          selected={terminationDate}
                          onChange={(date) => setTerminationDate(date)}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-danger rounded-0 w-100"
                        onClick={NONRenewal}
                      >
                        Non Renewal <i className="fa fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Collapse>

              <Collapse in={renewalF}>
                <div id="example-collapse-text">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="">Renewal Time</label>
                      {/* Duration Representative */}
                      <div className="d-flex">
                      <Select
                        defaultValue={selectedNo}
                        onChange={setSelectedNo}
                        options={numberList}
                      />
                       <Select
                        defaultValue={selectedDuration}
                        onChange={setSelectedDuration}
                        options={durationList}
                      />
                    
                      </div>
                    
                      {/*End  Duration Representative */}

                      {/* <input
                        type="text"
                        className="form-control"
                        name="renewalTime"
                        value={renewalTime}
                        onChange={(e) => setRenewalTime(e.target.value)}
                        placeholder="1 Year"
                      /> */}
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Commencement Date</label>
                        {/* <label htmlFor="">Contracted Date</label> */}
                        {/* <input
                        type="text"
                        className="form-control"
                        name="contractedDate" 
                        value={contractedDate}
                        disabled={true}
                        />  */}
                        <DatePicker
                          name="contractedDate"
                          selected={contractedDate}
                          onChange={(date) => setContractedDate(date)}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Start Date</label>
                        <DatePicker
                          name="startDate"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>
                    </div>

                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">End Date</label>
                        <DatePicker
                          name="endDate"
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                        />
                      </div>
                    </div> */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">New Salary <span className="text-danger">!! Incase of a Pay Raise !!</span> </label>
                        <input
                        type="number"
                        className="form-control"
                        name="newSalary"
                        value={newSalary}
                        onChange={(e) => setNewSalary(e.target.value)}
                        placeholder="New Salary"
                      />
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-success rounded-0 w-100"
                        onClick={EndofRenewal}
                      >
                        Renew <i className="fa fa-check"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Collapse>
              <Collapse in={extensionF}>
              <div id="example-collapse-text">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Select Reversal Stage</label>
                      <select name="stage" id=""  onChange={(e) => setStage(e.target.value)} className="form-control">
                        <option value="">Choose Level</option>
                        <option value="0">Immediate Supervisor</option>
                        <option value="1">HOD</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-8">
                  <label foo="">Reversal Reason</label>
                    <textarea
                      className="w-100 form-control"
                      name="stageMessage"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={stageMessage}
                      onChange={(e) => setStageMessage(e.target.value)}
                      disabled={false}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-danger rounded-0 w-100 mt-2"
                      onClick={ReversalAction}
                    >
                      Re-verse <i className="fa fa-repeat"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Collapse>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HRContractCard);
