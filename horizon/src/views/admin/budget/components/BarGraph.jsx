import React from "react";
import Chart from "react-apexcharts";

const BarGraph = ({taskExpenses,project}) => {
  //   const mode = useSelector((state) => state.config.mode);
  const categories = ["Flooring", "Plumbing", "Wiring","Painting", "Furniture"];
  console.log(project);
  
  // Fixed values for Expected Investment
  const budget = project.budget;
  const expectedInvestment = Object.keys(budget)
    .filter(key => key !== 'total')
    .map(key => budget[key]);

  const series = [
    {
      name: "Expected Investment",
      data: expectedInvestment,
    },
    {
      name: "Actual Invested",
      data: categories.map((category) =>
        taskExpenses[category.toLowerCase()]
          .reduce((total, expense) => total + parseFloat(expense.amount), 0)
      ),
    },
  ];


  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    // theme: {
    //   mode: mode === "light" ? 'light' : 'dark',
    // },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      
      categories: ["Flooring", "Plumbing", "Wiring","Painting", "Furniture"],
    },
    yaxis: {
      title: {
        text: "₹ (thousands)",
      },
    },
    colors: ["#868CFF", "#432CF3"],

    tooltip: {
      y: {
        formatter: function (val) {
          return "₹ " + val + " thousands";
        },
      },
    },
  };

  return (
    <div className="object-contain" id="monthly-investment">
      <Chart options={options} series={series} type="bar" height={380} />
    </div>
  );
};

export default BarGraph;
