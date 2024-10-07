import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  Button,
  
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { useMemo, useState } from "react";
import Progress from "components/progress";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { Modall } from "./Modal";
const ComplexTable = (props) => {
  const { columnsData,count } = props;
  const [name,setName] = useState("");
  const [cust,setCust] = useState([]);

  const getCust = async () => {
    
    try{
      const res = await axios.get("http://localhost:5001/customer/");
      console.log(res.data);
      
      setCust(res.data);
    }
    catch(err){
      console.log(err);
    }
   
  };
  const delCust = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5001/customer/${id}`);
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

    const editCust = async (id) => {
      try {
        const res = await axios.put(`http://localhost:5001/customer/${id}`,
        {
          progress : count.count/count.total*100
        });
        console.log(res.data);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };


  useEffect(() => {
    getCust();
    console.log(count)
  }, []);
// useEffect(() => {
//   editCust(count.id);
 
// }, [])


  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => cust, [cust]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {props.title}
        </div>
      
        <Modall/>
      </div>

      <div className="mt-8 overflow-x-scroll ">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              console.log(row);
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "CUSTOMER NAME") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "STATUS") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full text-xl`}>
                            {cell.value === "completed" ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : cell.value === "pending" ? (
                              <MdCancel className="text-red-500" />
                            ) : cell.value === "ongoing" ? (
                              <MdOutlineError className="text-orange-500" />
                            ) : null}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "DATE") {
                      let dateObject = new Date(cell.value);
                      let formattedDate =
                        dateObject.toLocaleDateString("en-US"); // format: MM/DD/YYYY

                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {formattedDate}
                        </p>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = <Progress width="w-[108px]" value={cell.value} />;
                    } else if (cell.column.Header === "VIEW DETAILS") {
                      data = (
                        <Link
                          to={`/admin/view-details/${cell.row.original._id}`}
                          className="text-sm font-bold text-navy-700 dark:text-white"
                        >
                          <Button
                            fontFamily={"heading"}
                            w={"70%"}
                            bgGradient="linear(to-r, blue.400,blue.700)"
                            color={"white"}
                            _hover={{
                              bgGradient: "linear(to-r, blue.400,blue.700)",
                              boxShadow: "xl",
                            }}
                          >
                            View Details
                          </Button>
                        </Link>
                      );
                    } else if (cell.column.Header === " ") {
                      data = (
                        <Button>
                          <MdDelete
                            onClick={() => delCust(cell.row.original._id)}
                            size={18}
                          />
                        </Button>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTable;
