import React, { useEffect, useState } from "react";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { CircularProgress, CircularProgressLabel, Spinner, Center } from "@chakra-ui/react";
import { useProjectContext } from "context/ProjectContext";
import axios from "axios";
import ClockIcon from "components/icons/ClockIcon";
import DollarIcon from "components/icons/WidgetIcon/DollarIcon";
import Widget from "components/widget/Widget";
import ComplexTable from "views/admin/default/components/ComplexTable";
import TaskCard from "views/admin/default/components/TaskCard";
import { columnsDataComplex } from "./variables/columnsData";
import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {
  const [project, setProject] = useState(null);
  const [taskCount, setTaskCount] = useState({ pending: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { projectId } = useProjectContext();

  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const fetchCount = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/tasks/count/${projectId}`);
      setTaskCount(response.data);
    } catch (error) {
      console.error("Error fetching task counts:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchProject();
      await fetchCount();
      setIsLoading(false);
    };
    fetchData();
  }, [projectId]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const calculateDaysLeft = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const calculateBudgetUtilization = () => {
    if (project?.budget?.total && project.budget_spent >= 0) {
      const totalBudget = project.budget.total;
      const spent = project.budget_spent;
      return Math.min((spent / totalBudget) * 100, 100); 
    }
    return 0;
  };

  const daysLeft = calculateDaysLeft(project.deadline);
  const budgetUtilization = calculateBudgetUtilization();

  return (
    <div>
      {/* Widgets */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Progress"}
          subtitle={`${budgetUtilization.toFixed(2)}%`}
          progress={budgetUtilization}
        />
        <Widget
          icon={<ClockIcon className="h-7 w-7" />}
          title={"Time Left"}
          subtitle={`${daysLeft} Days`}
          progress={(daysLeft / 30) * 100} 
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Tasks Pending"}
          subtitle={taskCount.pending || "N/A"}
          progress={80} 
        />
      </div>

      {/* Project Table */}
      <div className="mt-10 bg-white shadow-md px-4 py-2 rounded-md">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
          title="Project List"
        />
      </div>

      {/* Budget Utilization & TaskCard */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2 pt-2">
          <TaskCard />
          <div className="rounded-[20px] bg-white bg-clip-border">
            <div className="flex gap-2 justify-start pb-4 items-center ml-4 pt-4">
              <div className="pt-1">
                <DollarIcon className="h-7 w-7" />
              </div>
              <h1 className="text-start font-semibold font-sans text-xl pt-1 pl-1">Budget Utilization</h1>
            </div>
            <div className="flex justify-center pt-6">
              <CircularProgress value={budgetUtilization} color="#4318FF" size="120px">
                <CircularProgressLabel>{`${project.budget_spent} of ${project.budget.total}`}</CircularProgressLabel>
              </CircularProgress>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
