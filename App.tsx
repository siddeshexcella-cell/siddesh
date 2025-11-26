import React, { useState, useEffect } from 'react';
import { Phone, Download, User } from 'lucide-react';
import { INITIAL_REPORT_ITEMS, DEFAULT_AGENT_NAME, getFormattedDate } from './constants';
import { ReportItem } from './types';
import { InputSection } from './components/InputSection';
import { ReportTable } from './components/ReportTable';
import { Charts } from './components/Charts';

const App: React.FC = () => {
  const [items, setItems] = useState<ReportItem[]>(() => {
    // Try to load from localStorage to persist data on refresh
    const saved = localStorage.getItem('callReportItems');
    return saved ? JSON.parse(saved) : INITIAL_REPORT_ITEMS;
  });

  const [agentName, setAgentName] = useState(DEFAULT_AGENT_NAME);
  const [reportDate] = useState(getFormattedDate());
  const [isEditingName, setIsEditingName] = useState(false);

  // Auto-save to local storage whenever items change
  useEffect(() => {
    localStorage.setItem('callReportItems', JSON.stringify(items));
  }, [items]);

  const handleIncrement = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, count: item.count + 1 } : item
    ));
  };

  const handleDecrement = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item
    ));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      setItems(INITIAL_REPORT_ITEMS);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Phone size={24} />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                Quick Call Reporter
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
               {/* Editable Agent Name */}
               <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                  <User size={16} className="text-slate-500" />
                  {isEditingName ? (
                    <input 
                      autoFocus
                      type="text" 
                      value={agentName} 
                      onChange={(e) => setAgentName(e.target.value)}
                      onBlur={() => setIsEditingName(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                      className="bg-transparent border-none focus:ring-0 text-sm font-medium w-32 outline-none"
                    />
                  ) : (
                    <span 
                      className="text-sm font-medium cursor-pointer hover:text-blue-600"
                      onClick={() => setIsEditingName(true)}
                      title="Click to edit name"
                    >
                      {agentName}
                    </span>
                  )}
               </div>

               <button 
                onClick={handlePrint}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors print:hidden"
               >
                 <Download size={16} />
                 <span className="hidden sm:inline">Export PDF</span>
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Inputs */}
          <div className="xl:col-span-7 space-y-8 print:hidden">
            <InputSection 
              items={items}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onReset={handleReset}
            />
            
            {/* Charts Section - Visible only on screen */}
            <Charts items={items} />
          </div>

          {/* Right Column: The Report Table (Sticky on Desktop) */}
          <div className="xl:col-span-5">
            <div className="sticky top-24 space-y-4">
              <div className="flex justify-between items-end mb-2 xl:hidden">
                <h2 className="text-xl font-bold text-slate-800">Preview</h2>
              </div>
              
              <div className="print:block print:w-full print:absolute print:top-0 print:left-0">
                <ReportTable 
                  items={items} 
                  agentName={agentName}
                  reportDate={reportDate}
                />
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md print:hidden">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Tip:</strong> Click any category box on the left to add counts instantly. 
                      Click the name at the top to change the agent name.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
