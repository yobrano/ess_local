import axios from "axios";
import { format } from "date-fns";
import React, { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { Container, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
// import { useTable, usePagination, useRowSelect } from "react-table";
import {
  useTable,
  usePagination,
  useRowSelect,
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { matchSorter } from "match-sorter";
import swal from "sweetalert";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";
// import { Badge } from "reactstrap";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

// Define a default UI for filtering
//Fix Global filter
// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      className="input-control w-100"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}


const DataTable = ({ columns, data ,setSelection}) => {
  // Use the state and functions returned from useTable to build your UI
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter, filters },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        ...columns,
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              {/* Action */}
              {/* <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} /> */}
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              {/* <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              <label className="ml-3">
                View
              </label> */}
            </div>
          ),
        },
        
      ]);
    }
  );

  useEffect(() => {
    // Bubble up the selection to the parent component
    setSelection(selectedFlatRows.map((row) => row.original));
  }, [setSelection, selectedFlatRows]);

  // Render the UI for your table
  return (
    <>
       {/* <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map(
                  d => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre> */}


      <table
        {...getTableProps()}
        id="example"
        className="display w-100 dataTable table table-responsive"
        role="grid"
        aria-describedby="example_info"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
  

      <div className="d-flex justify-content-between">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          {""}
        </span>
        <span className="table-index">
          Go to page :{" "}
          <input
            type="number"
            className="ml-2"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
          className="table-index"
        >
          {[5,10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="text-center">
        <div className="filter-pagination  mt-3">
          <button
            className=" previous-button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>

          <button
            className="previous-button"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <button
            className="next-button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
          <button
            className=" next-button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>

    </>
  );
};

function ViewApplications(props) {
  const [data, setData] = useState([]);
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
      .get(`${process.env.REACT_APP_API_S_LINK}/home/approvedapplicants`, config)
      .then((result) => {
        // =>console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const PushApplicantToEmployee = (Reqno)=>{

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Move the Applicant to Employee List",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.get(`${process.env.REACT_APP_API_S_LINK}/profile/moveapplicanttoemployee/${Reqno}`, config);
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          swal("Ok","Applicant Moved","success")
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if(err.response!==undefined){
          swal("Oh!", err.response.data.message, "error");
        }else{
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });



  }

  const columns = useMemo(
    () => [
      // {
      //   Header: "Application",
      //   accessor: "appNo",
      // },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Application Date",
        accessor: "appDate",
        Cell: ({ value }) => {return format(new Date(value), 'MM/dd/yyyy')},
      },
      {
        Header: "Employee",
        accessor: "empNo",
      },
      {
        Header: "Rejected",
        accessor: "reject",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Action",
        accessor: "appNo",
        Cell: ({ value }) => {return(
          <button className={"btn btn-success"} onClick={()=>PushApplicantToEmployee(value)}>
          <span className="action-btn">
        Move Application: {value}
          </span>
      </button>
        )},
      },
      
    
    ],
    []
  );
  const [selection, setSelection] = useState([]);
  // const selectionCallback = React.useCallback((ids) => setSelection(ids), [
  //     setSelection,
  //   ]);
  if(selection.length ===1){
      // // =>console.log(selection);
    props.history.push("/HRprofile",[{datum:selection}])
  }

  if (loading) {
    return (
      <>
        <Container>
          <div className="headerDiv">
            <input
              type="text"
              placeholder="Search Job Title"
              className="form-control w-25 my-3"
            />
            <h4 className=" my-3">Job List</h4>
          </div>
          {/* List */}
          <Row className="jobRow">
            <div id="preloader-home">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <DataTable columns={columns} data={data}  setSelection={setSelection}  />
    </>
  );
}
export default withRouter(ViewApplications);
