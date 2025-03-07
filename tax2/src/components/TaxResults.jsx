import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function TaxResults({ data, suggestions }) {
  const chartData = [
    { name: '80C Investments', value: data.investment80c },
    { name: 'Health Insurance', value: data.healthInsurance },
    { name: 'HRA', value: data.rentPaid },
    { name: 'Remaining Taxable', value: data.income - (data.investment80c + data.healthInsurance + data.rentPaid) }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Tax Optimization Opportunities</h2>
        {suggestions.map(([section, text, limit]) => (
          <div
            key={section}
            className="p-4 bg-white dark:bg-[#101936] rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h4 className="font-semibold text-lg mb-2">💡{section}</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{text}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Limit: {limit}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#101936] p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Current Tax Breakdown</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}