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

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyDistribution = () => {
  const monthlyDistribution = useSelector(selectMonthlyDistribution);

  // Extract labels and data from Redux state
  const labels = Object.keys(monthlyDistribution);
  const dataValues = Object.values(monthlyDistribution);

  // Professional Material Design-inspired palette
  const presetColors = [
    "#1E88E5", // Blue 600
    "#D32F2F", // Red 700
    "#388E3C", // Green 600
    "#FBC02D", // Yellow 700
    "#7B1FA2", // Purple 700
    "#F57C00", // Orange 700
    "#00796B", // Teal 700
    "#1976D2", // Blue 700
    "#C2185B", // Pink 700
    "#512DA8", // Deep Purple 700
    "#303F9F", // Indigo 700
    "#689F38", // Light Green 700
  ];

  // Map each month label to a color from the preset array.
  const backgroundColors = labels.map((_, index) => presetColors[index % presetColors.length]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Comments',
        data: dataValues,
        backgroundColor: backgroundColors,
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
