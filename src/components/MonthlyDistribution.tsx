
import { useSelector } from 'react-redux';
import { selectMonthlyDistribution } from '@/slices/linkSlice';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyDistribution = () => {
  const monthlyDistribution = useSelector(selectMonthlyDistribution);

  // Extract labels and data from the Redux state object
  const labels = Object.keys(monthlyDistribution);
  const dataValues = Object.values(monthlyDistribution);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Comments',
        data: dataValues,
        backgroundColor: '#3b82f6', // A Tailwind blue color
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MonthlyDistribution;
