import React from 'react';
import { ReportItem, CategoryGroup } from '../types';

interface ReportTableProps {
  items: ReportItem[];
  agentName: string;
  reportDate: string;
}

export const ReportTable: React.FC<ReportTableProps> = ({ items, agentName, reportDate }) => {
  const connectedItems = items.filter(i => i.group === CategoryGroup.CONNECTED);
  const nonConnectedItems = items.filter(i => i.group === CategoryGroup.NON_CONNECTED);

  const totalConnected = connectedItems.reduce((sum, item) => sum + item.count, 0);
  const totalNonConnected = nonConnectedItems.reduce((sum, item) => sum + item.count, 0);
  const grandTotal = totalConnected + totalNonConnected;

  return (
    <div className="w-full bg-white shadow-lg overflow-hidden border border-slate-300 text-sm">
      {/* Excel Header */}
      <div className="grid grid-cols-2 border-b border-slate-400">
        <div className="bg-green-300 p-2 font-bold text-center border-r border-slate-400 text-slate-900">
          {agentName}
        </div>
        <div className="bg-green-300 p-2 font-bold text-center text-slate-900">
          {reportDate} calling report
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr_1fr]">
        
        {/* Connected Section */}
        <div className="row-span-[14] flex items-center justify-center font-bold italic bg-white border-b border-r border-slate-300 p-2">
          CONNECTED
        </div>

        {connectedItems.map((item) => (
            <React.Fragment key={item.id}>
                <div className={`p-1.5 px-3 border-b border-r border-slate-300 ${item.color || 'bg-white'}`}>
                    {item.label}
                </div>
                <div className={`p-1.5 text-center font-semibold border-b border-slate-300 ${item.color || 'bg-white'}`}>
                    {item.count > 0 ? item.count : ''}
                </div>
            </React.Fragment>
        ))}

        {/* Total Connected */}
        <div className="col-span-2 bg-blue-300 font-bold border-b border-r border-slate-400 text-center p-2 text-slate-900">
          Total Connected
        </div>
        <div className="bg-blue-300 font-bold border-b border-slate-400 text-center p-2 text-slate-900">
          {totalConnected}
        </div>

        {/* Non-Connected Section */}
        <div className="row-span-[6] flex items-center justify-center font-bold italic bg-white border-b border-r border-slate-300 p-2">
          NON-CONNECTED
        </div>

        {nonConnectedItems.map((item) => (
             <React.Fragment key={item.id}>
                <div className="p-1.5 px-3 border-b border-r border-slate-300 bg-white">
                    {item.label}
                </div>
                <div className="p-1.5 text-center font-semibold border-b border-slate-300 bg-white">
                    {item.count > 0 ? item.count : ''}
                </div>
            </React.Fragment>
        ))}

        {/* Total Non-Connected */}
        <div className="col-span-2 bg-blue-300 font-bold border-b border-r border-slate-400 text-center p-2 text-slate-900">
          Total Non-Connected
        </div>
        <div className="bg-blue-300 font-bold border-b border-slate-400 text-center p-2 text-slate-900">
          {totalNonConnected}
        </div>

        {/* Grand Total */}
        <div className="col-span-2 bg-sky-700 text-white font-bold p-3 text-center border-r border-slate-400">
          GRAND TOTAL
        </div>
        <div className="bg-sky-700 text-white font-bold p-3 text-center text-lg">
          {grandTotal}
        </div>

      </div>
    </div>
  );
};
