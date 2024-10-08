import React from 'react'
import ComplexTable from "views/admin/default/components/ComplexTable";
import { columnsDataComplex } from './default/variables/columnsData';
import tableDataComplex from './default/variables/tableDataComplex.json';
import { MdBarChart, MdDashboard, MdPending } from 'react-icons/md';
import ClockIcon from 'components/icons/ClockIcon';
import { BsCheck2Circle } from 'react-icons/bs';
import Widget from 'components/widget/Widget';
import CustomTable from './TaskTable';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Modall } from './default/components/Modal';

function PaintWall() {

  const count = JSON.parse(localStorage.getItem("countData"));
  console.log(count);

  const data = [
    { title: "Task 1", status: "completed", deadline: "2023-06-30", workerName: "John Doe" },
    { title: "Task 2", status: "pending", deadline: "2023-07-15", workerName: "Jane Smith" },
    { title: "Task 3", status: "incomplete", deadline: "2023-07-01", workerName: "Bob Johnson" },
  ];
  return (
    <>
  
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 pb-4">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total"}
          subtitle={"50%"}
          progress={50}
        />
        <Widget
          icon={<MdPending className='h-6 w-6' />}
          title={"Pending"}
          subtitle={"30 Days"}
          progress={30} 
        />
        <Widget
           icon={<BsCheck2Circle className="h-6 w-6" />}
          title={"Done"}
          subtitle={"9"}
          progress={80}
        />
      </div>
      
      <div className='mt-4'>
      <CustomTable initialData={data} />
      </div>
    </>
  )
}

export default PaintWall
