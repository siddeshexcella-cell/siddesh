import React from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { ReportItem, CategoryGroup } from '../types';

interface InputSectionProps {
  items: ReportItem[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onReset: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ items, onIncrement, onDecrement, onReset }) => {
  
  const connectedItems = items.filter(i => i.group === CategoryGroup.CONNECTED);
  const nonConnectedItems = items.filter(i => i.group === CategoryGroup.NON_CONNECTED);

  const renderButtonGrid = (groupItems: ReportItem[], title: string, headerColor: string) => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className={`${headerColor} px-4 py-3 border-b border-slate-200`}>
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {groupItems.map((item) => (
          <div 
            key={item.id} 
            className={`
              relative flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer
              ${item.count > 0 ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-300'}
            `}
            onClick={() => onIncrement(item.id)}
          >
            <div className="flex flex-col">
                <span className="font-medium text-slate-700 text-sm">{item.label}</span>
                <span className="text-xs text-slate-400">Click to add +1</span>
            </div>
            
            <div className="flex items-center gap-2">
                 {item.count > 0 && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDecrement(item.id);
                        }}
                        className="p-1 rounded-full hover:bg-red-100 text-red-500 transition-colors"
                        aria-label="Decrement"
                    >
                        <Minus size={16} />
                    </button>
                )}
                <div className={`
                    w-8 h-8 flex items-center justify-center rounded-full font-bold
                    ${item.count > 0 ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}
                `}>
                    {item.count}
                </div>
            </div>
           
            {/* Click ripple effect helper could go here, but using basic CSS transitions for now */}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">Data Entry</h2>
        <button 
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
            <RotateCcw size={16} />
            Reset All
        </button>
      </div>

      {renderButtonGrid(connectedItems, "Connected Calls", "bg-green-100")}
      {renderButtonGrid(nonConnectedItems, "Non-Connected Calls", "bg-orange-50")}
    </div>
  );
};
