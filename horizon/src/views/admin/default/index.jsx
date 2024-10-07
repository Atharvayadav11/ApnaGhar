import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import ClockIcon from "components/icons/ClockIcon";
import { Progress } from '@chakra-ui/react'
import PieChart from "components/charts/PieChart";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import DollarIcon from "components/icons/WidgetIcon/DollarIcon";

const Dashboard = () => {

  const count = JSON.parse(localStorage.getItem("countData"));
  console.log(count);

  const series = [44, 55, 41, 17, 15]; // Example data
  const options = {
    labels: ['Apples', 'Bananas', 'Oranges', 'Pears', 'Grapes'], // Labels for each section of the pie
    legend: {
      position: 'bottom'
    },
    colors: ['#1E90FF', '#00C49F', '#FFBB28', '#FF8042', '#FF4560'],
    chart: {
      background: 'white'
    }
  };

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Progress"}
          subtitle={"50%"}
          progress={50}
        />
        <Widget
          icon={<ClockIcon className="h-7 w-7" />}
          title={"Time Left"}
          subtitle={"30 Days"}
          progress={30} // Example progress bar
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Tasks Pending"}
          subtitle={"9"}
          progress={80}
        />
      </div>
      {/* Complex Table , Task & Calendar */}

      <div className="mt-10 ">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
          count={count}
          title="Project List"
        />

      </div>

      {/* Charts */}



      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">


        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="rounded-[20px] bg-red-200">
            <div className="flex gap-2 justify-start pb-4 items-center  ml-4 ">
            <div className="pt-1">
            <DollarIcon className = "h-7 w-7"/>
            </div>
            <h1 className="text-start font-bold font-sans text-2xl pt-1 pl-1">Budget Allocation</h1>
            </div>
            <div className="flex justify-center items-center ">
            <CircularProgress value={40} color='green.400'>
              <CircularProgressLabel>40%</CircularProgressLabel>
            </CircularProgress>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
