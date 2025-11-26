import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { ReportItem, CategoryGroup } from '../types';

interface ChartsProps {
  items: ReportItem[];
}

export const Charts: React.FC<ChartsProps> = ({ items }) => {
  const connectedItems = items.filter(i => i.group === CategoryGroup.CONNECTED);
  const nonConnectedItems = items.filter(i => i.group === CategoryGroup.NON_CONNECTED);

  const totalConnected = connectedItems.reduce((sum, item) => sum + item.count, 0);
  const totalNonConnected = nonConnectedItems.reduce((sum, item) => sum + item.count, 0);

  const summaryData = [
    { name: 'Connected', value: totalConnected },
    { name: 'Non-Connected', value: totalNonConnected },
  ];

  const activeItems = items.filter(i => i.count > 0);

  const COLORS = ['#4ade80', '#fb923c', '#60a5fa', '#facc15', '#a78bfa', '#f472b6'];

  if (totalConnected === 0 && totalNonConnected === 0) {
      return (
          <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-slate-200 text-slate-400">
              Start entering data to see analytics
          </div>
      )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Summary Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-600 mb-4">Performance Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summaryData}>
              <XAxis dataKey="name" tick={{fontSize: 12}} />
              <YAxis allowDecimals={false} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Connected' ? '#86efac' : '#fdba74'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-600 mb-4">Disposition Breakdown</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activeItems}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {activeItems.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
