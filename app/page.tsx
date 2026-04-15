'use client';

import React, { useState, useEffect } from 'react';
import { Map, Utensils, Bell, Navigation, Clock, AlertTriangle, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function StadiaSyncApp() {
  const [activeTab, setActiveTab] = useState('routing');
  const [routeCalculated, setRouteCalculated] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'preparing' | 'ready'>('idle');
  const [progress, setProgress] = useState(0);

  // Simulate order progress
  useEffect(() => {
    if (orderStatus === 'preparing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setOrderStatus('ready');
            return 100;
          }
          return prev + 5;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [orderStatus]);

  const handleCalculateRoute = () => {
    setRouteCalculated(true);
    setTimeout(() => {
      alert("AI Route Calculated: 3 mins saved!");
      setRouteCalculated(false);
    }, 800);
  };

  const handleOrder = () => {
    setOrderStatus('preparing');
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-sans text-neutral-100">
      {/* Mobile App Container */}
      <div className="w-full max-w-[400px] h-[800px] max-h-[90vh] bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative border-[8px] border-neutral-800">
        
        {/* Status Bar (Simulated) */}
        <div className="h-7 w-full flex justify-between items-center px-6 pt-2 text-xs font-medium text-neutral-400 z-20">
          <span>9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-3 bg-neutral-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-neutral-400 rounded-full"></div>
            <div className="w-5 h-3 bg-neutral-400 rounded-sm"></div>
          </div>
        </div>

        {/* Header */}
        <header className="px-6 pt-6 pb-4 bg-neutral-900 z-10">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-[#4285F4]">Stadia</span>Sync <span className="text-xs px-2 py-0.5 bg-[#4285F4]/20 text-[#4285F4] rounded-full uppercase tracking-wider font-bold">AI</span>
          </h1>
          <p className="text-sm text-neutral-400 mt-1">MetLife Stadium • Event in progress</p>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
          <AnimatePresence mode="wait">
            {activeTab === 'routing' && (
              <motion.div
                key="routing"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-6 flex flex-col gap-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Smart Routing</h2>
                  <div className="flex items-center gap-2 text-xs bg-neutral-800 px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Live Updates
                  </div>
                </div>

                {/* Stadium Map Visualization */}
                <div className="bg-neutral-800 rounded-2xl p-4 border border-neutral-700/50 relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-neutral-900/80 backdrop-blur text-[10px] px-2 py-1 rounded text-neutral-300 flex items-center gap-1 z-20">
                    <Info className="w-3 h-3" /> Crowd Density
                  </div>
                  
                  <div className="aspect-square relative flex items-center justify-center p-4">
                    {/* Field */}
                    <div className="w-24 h-40 border-2 border-neutral-600 rounded-lg flex items-center justify-center relative z-10 bg-neutral-800">
                      <div className="w-full h-[1px] bg-neutral-600"></div>
                      <div className="absolute w-8 h-8 border-2 border-neutral-600 rounded-full"></div>
                    </div>

                    {/* Sections */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* North */}
                      <div className="absolute top-4 w-32 h-12 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center justify-center text-xs font-medium text-red-400">
                        Gate A (High)
                      </div>
                      {/* South */}
                      <div className="absolute bottom-4 w-32 h-12 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center justify-center text-xs font-medium text-green-400">
                        Gate C (Low)
                      </div>
                      {/* West */}
                      <div className="absolute left-4 w-12 h-32 bg-yellow-500/20 border border-yellow-500/50 rounded-lg flex items-center justify-center text-xs font-medium text-yellow-400 rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        Sec 112 (Med)
                      </div>
                      {/* East */}
                      <div className="absolute right-4 w-12 h-32 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center justify-center text-xs font-medium text-green-400" style={{ writingMode: 'vertical-rl' }}>
                        Sec 114 (Low)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500"></div> Low</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500"></div> Medium</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500"></div> High</div>
                </div>

                <button 
                  onClick={handleCalculateRoute}
                  disabled={routeCalculated}
                  className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                >
                  {routeCalculated ? (
                    <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Calculating...
                    </motion.div>
                  ) : (
                    <>
                      <Navigation className="w-5 h-5" />
                      Find Fastest Route to Seat
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {activeTab === 'concessions' && (
              <motion.div
                key="concessions"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-6 flex flex-col gap-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Zero-Wait Concessions</h2>
                  <Clock className="w-5 h-5 text-neutral-400" />
                </div>

                <div className="flex flex-col gap-4">
                  {/* Option 1 - Fastest */}
                  <div className="bg-neutral-800 rounded-2xl p-4 border border-[#4285F4]/30 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#4285F4]"></div>
                    <div className="flex justify-between items-start mb-3 pl-2">
                      <div>
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          Drinks Express
                          <span className="text-[10px] bg-[#4285F4]/20 text-[#4285F4] px-2 py-0.5 rounded-full">Fastest</span>
                        </h3>
                        <p className="text-xs text-neutral-400 mt-1">Section 114 • 200ft away</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#4285F4] font-bold text-lg">2 min</div>
                        <div className="text-[10px] text-neutral-500">Wait time</div>
                      </div>
                    </div>
                    
                    {orderStatus === 'idle' ? (
                      <button 
                        onClick={handleOrder}
                        className="w-full mt-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                      >
                        Order Now
                      </button>
                    ) : (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-[#4285F4] font-medium">
                            {orderStatus === 'preparing' ? 'Preparing order...' : 'Ready for pickup!'}
                          </span>
                          <span className="text-neutral-400">{progress}%</span>
                        </div>
                        <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className={`h-full ${orderStatus === 'ready' ? 'bg-green-500' : 'bg-[#4285F4]'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                          ></motion.div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option 2 */}
                  <div className="bg-neutral-800/50 rounded-2xl p-4 border border-neutral-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-neutral-200">Burger Stand</h3>
                        <p className="text-xs text-neutral-500 mt-1">Section 112 • 450ft away</p>
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-500 font-bold text-lg">12 min</div>
                        <div className="text-[10px] text-neutral-500">Wait time</div>
                      </div>
                    </div>
                  </div>

                  {/* Option 3 */}
                  <div className="bg-neutral-800/50 rounded-2xl p-4 border border-neutral-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-neutral-200">Stadium Pizza</h3>
                        <p className="text-xs text-neutral-500 mt-1">Gate A • 800ft away</p>
                      </div>
                      <div className="text-right">
                        <div className="text-red-500 font-bold text-lg">25 min</div>
                        <div className="text-[10px] text-neutral-500">Wait time</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'sync' && (
              <motion.div
                key="sync"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-6 flex flex-col gap-6 h-full"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Live Event Sync</h2>
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                </div>

                {/* Alert Feed */}
                <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 -mr-2">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-red-400">Gate Congestion</h4>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed">Gate C is currently congested with a 15-minute delay. Please use Gate D for faster entry.</p>
                      <span className="text-[10px] text-neutral-500 mt-2 block">Just now</span>
                    </div>
                  </div>

                  <div className="bg-[#4285F4]/10 border border-[#4285F4]/20 rounded-xl p-4 flex gap-3 items-start">
                    <Info className="w-5 h-5 text-[#4285F4] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#4285F4]">Halftime Show Prep</h4>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed">Restrooms near Section 110-120 will be closed in 10 minutes for halftime preparations.</p>
                      <span className="text-[10px] text-neutral-500 mt-2 block">5 mins ago</span>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-green-400">Weather Update</h4>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed">Rain has cleared. The roof will remain open for the remainder of the event.</p>
                      <span className="text-[10px] text-neutral-500 mt-2 block">12 mins ago</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors mt-auto">
                  <AlertCircle className="w-4 h-4" />
                  Report Issue
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-neutral-900 border-t border-neutral-800 px-6 py-4 pb-8 z-20">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setActiveTab('routing')}
              className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'routing' ? 'text-[#4285F4]' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <Map className="w-6 h-6" />
              <span className="text-[10px] font-medium">Routing</span>
            </button>
            <button 
              onClick={() => setActiveTab('concessions')}
              className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'concessions' ? 'text-[#4285F4]' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <Utensils className="w-6 h-6" />
              <span className="text-[10px] font-medium">Food</span>
            </button>
            <button 
              onClick={() => setActiveTab('sync')}
              className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'sync' ? 'text-[#4285F4]' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <Bell className="w-6 h-6" />
              <span className="text-[10px] font-medium">Live Sync</span>
            </button>
          </div>
        </nav>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-neutral-500 rounded-full z-30"></div>
      </div>
    </div>
  );
}
