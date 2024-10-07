import React from 'react';
import Chart from 'react-apexcharts';

const PieGraph = () => {
  // Define categories and static values
  const categories = ["Flooring", "Painting", "Plumbing", "Wiring", "Furniture"];
  const staticValues = [660, 440, 550, 570, 560]; // Example static values for each category

  // Calculate total expenses
  const totalExpenses = staticValues.reduce((acc, expense) => acc + expense, 0);

  // Calculate percentage of total expenses for each category
  const series = staticValues.map(expense => (totalExpenses > 0 ? Math.floor((expense / totalExpenses) * 100) : 0));

  const options = {
    chart: {
      type: 'donut',
    },
    labels: categories,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'bottom', // Position legends at the bottom
      horizontalAlign: 'center',
      floating: false,
    },
    plotOptions: {
      pie: {
        size: '70%', // Adjust size of the pie chart
        donut: {
          size: '80%',
        },
      },
    },
    tooltip: {
      enabled: true,
      formatter: (val, { seriesIndex }) => {
        const percentage = series[seriesIndex];
        return `${categories[seriesIndex]}: ${percentage}%`; // Show category name and percentage
      },
    },
    annotations: {
      position: 'front',
      points: [
        {
          x: '50%',
          y: '50%',
          marker: {
            size: 0,
          },
          label: {
            text: 'Total Expenses',
            offsetY: 0,
            style: {
              fontSize: '18px',
              color: '#000',
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="donut" height={400} /> {/* Increased height */}
    </div>
  );
}

export default PieGraph;