import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import axios from 'axios';
import { columnsData } from "./variables/columns";
import { Button, Flex, Progress } from "@chakra-ui/react";
import B01 from "../../assets/B-01.jpg";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import PieChart from "../components/PieChart";

const Progresss = () => {
  const [task, setTask] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const getTask = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5001/products/65ba7b3340c147cba08948c4'
      );

      res.data.progress = res.data.status;

    
       console.log(res.data);

      const updatedData = res.data.map((item) => ({
        ...item,
        progress:
          item.status === "completed"
            ? 100
            : item.status === "ongoing"
            ? 66
            : 10,
      }));

      setTask(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTask();
     console.log(count);
  }, [count]);

  console.log(task);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => task, [task]);

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
  initialState.pageSize = 11;
  return (
    <>
      <Header />
      <div className="h-full w-full'">
        <div className="mt-10 w-full flex flex-col items-center r h-max p-5 rounded-lg shadow-lg">
          <h2 className="text-6xl font-bold mb-5">Progress Chart</h2>
          <PieChart progress={task} />
        </div>
        <div className="mt-8 w-full overflow-x-scroll xl:overflow-x-hidden">
          <table
            {...getTableProps()}
            className="w-full"
            variant="simple"
            color="white"
            mb="24px"
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                      key={index}
                    >
                      <div className="text-xl font-bold tracking-wide text-white lg:text-lg">
                        {column.render("Header")}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data = "";
                      if (cell.column.Header === "TaskName") {
                        data = (
                          <div className="flex items-center gap-2">
                            {/* <Checkbox /> */}
                            <p className="text-base font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "Status") {
                        data = (
                          <div className="flex items-center">
                            <p className="text-base font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "Progress") {
                        data = (
                          <div className="h-2 w-1/2 bg-gray-200 rounded-full">
                            <div
                              className="h-full text-center text-xs text-white bg-[#bc5090] rounded-full"
                              style={{ width: `${cell.value}%` }}
                            ></div>
                          </div>
                        );
                      } else if (cell.column.Header === "Image") {
                        data = (
                          <Button
                            className="bg-purple-600 p-2 rounded-lg"
                            onClick={() => window.open(B01, "_blank")}
                          >
                            View Image
                          </Button>
                        );
                      } else if (cell.column.Header === "DATE") {
                        let dateObject = new Date(cell.value);
                        let formattedDate =
                          dateObject.toLocaleDateString("en-US"); // format: MM/DD/YYYY
                        data = (
                          <p className="text-base font-bold text-navy-700 dark:text-white">
                            {formattedDate}
                          </p>
                        );
                      }
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={index}
                          className="pt-[14px] pb-[16px] sm:text-[14px]"
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
      </div>
    </>
  );
};

export default Progresss;
