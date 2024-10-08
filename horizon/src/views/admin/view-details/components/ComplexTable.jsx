import React from 'react';
import Card from "components/card";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import {
  Button,
  Select,
} from "@chakra-ui/react";
import { MdDelete, MdEdit, MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import Progress from "components/progress";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modall } from "./Modall";
import { EditModal } from "./EditModal";

const ComplexTable = ({ columnsData, cust, id }) => {
  const columns = React.useMemo(() => [
    {
      Header: "TASK",
      accessor: "taskname",
    },
    {
      Header: "Start Date",
      accessor: "date",
    },
    {
      Header: "End Date",
      accessor: "endDate",
    },
    {
      Header: "STATUS",
      accessor: "status",
    },
    {
      Header: "ASSIGNED TO",
      accessor: "assignedTo",
    },
    {
      Header: "PROGRESS",
      accessor: "progress",
    },
    {
      Header: "ACTIONS",
      accessor: "actions",
    },
  ], []);

  const data = React.useMemo(() => cust, [cust]);

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

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/products/${taskId}`, { status: newStatus });
      window.location.reload();
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5001/products/${taskId}`);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Progress Report of Rachit
        </div>
        <Modall id={id} />
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
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
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, cellIndex) => {
                    let data = cell.render("Cell");
                    if (cell.column.Header === "STATUS") {
                      data = (
                        <Select
                          value={cell.value}
                          onChange={(e) => updateTaskStatus(row.original._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </Select>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = <Progress width="w-[108px]" value={cell.value} />;
                    } else if (cell.column.Header === "ACTIONS") {
                      data = (
                        <div className="flex items-center gap-2">
                          <EditModal data={row.original} />
                          <Button onClick={() => deleteTask(row.original._id)}>
                            <MdDelete size={18} />
                          </Button>
                        </div>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={cellIndex}
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