import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const StatsChart = ({ data }) => {
  const { t } = useTranslation();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="sales" 
          stroke="#f97316" 
          strokeWidth={2}
          name="Sales"
        />
        <Line 
          type="monotone" 
          dataKey="orders" 
          stroke="#3b82f6" 
          strokeWidth={2}
          name="Orders"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
