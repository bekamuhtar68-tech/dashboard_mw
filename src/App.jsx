import React, { useState } from 'react';
import { Shield, Target, Activity, Users, Crosshair, Zap, BarChart3, Radio, ChevronRight, Award, Skull, Info, Lock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SQUAD_DATA = [
  {
    id: '141',
    name: 'Task Force 141',
    operators: [
      { callsign: 'PRICE', name: 'John Price', role: 'Captain / Commander', kdr: '3.45', status: 'OPERATIONAL', missions: 412, stats: [{h:'00',v:40},{h:'06',v:90},{h:'12',v:60},{h:'18',v:95}], bio: 'Legendary SAS leader. Specialized in unconventional warfare.' },
      { callsign: 'GHOST', name: 'Simon Riley', role: 'Lieutenant / Recon', kdr: '3.12', status: 'ACTIVE', missions: 285, stats: [{h:'00',v:90},{h:'06',v:20},{h:'12',v:80},{h:'18',v:40}], bio: 'Lone wolf specialist. Expert in stealth and infiltration.' },
      { callsign: 'SOAP', name: 'John MacTavish', role: 'Sergeant / Demo', kdr: '2.56', status: 'ACTIVE', missions: 198, stats: [{h:'00',v:30},{h:'06',v:60},{h:'12',v:90},{h:'18',v:70}], bio: 'Explosives expert and sniper. Former SAS recruit.' },
      { callsign: 'GAZ', name: 'Kyle Garrick', role: 'Sergeant / SAS', kdr: '2.34', status: 'OPERATIONAL', missions: 112, stats: [{h:'00',v:50},{h:'06',v:50},{h:'12',v:50},{h:'18',v:50}], bio: 'Specialized in urban counter-terrorism and tactical support.' }
    ]
  },
  {
    id: 'shadow',
    name: 'Shadow Company',
    operators: [
      { callsign: 'GRAVES', name: 'Philip Graves', role: 'CEO / Commander', kdr: '2.95', status: 'COMMAND', missions: 340, stats: [{h:'00',v:80},{h:'06',v:80},{h:'12',v:90},{h:'18',v:90}], bio: 'Leader of PMC Shadow Co. Authorizes high-risk contracts.' },
      { callsign: 'VELIKAN', name: 'Classified', role: 'Heavy Support', kdr: '4.20', status: 'ENGAGED', missions: 512, stats: [{h:'00',v:10},{h:'06',v:40},{h:'12',v:100},{h:'18',v:100}], bio: 'Silent juggernaut. Identity and origin are state secrets.' },
      { callsign: 'SHEPHERD', name: 'General', role: 'Top Authority', kdr: '1.80', status: 'REDACTED', missions: 620, stats: [{h:'00',v:100},{h:'06',v:100},{h:'12',v:100},{h:'18',v:100}], bio: 'Former General of the US Army. Operates from the shadows.' }
    ]
  },
  {
    id: 'konni',
    name: 'Konni Group',
    operators: [
      { callsign: 'MAKAROV', name: 'Vladimir Makarov', role: 'HVI / Leader', kdr: '5.10', status: 'MOST WANTED', missions: 120, stats: [{h:'00',v:100},{h:'06',v:100},{h:'12',v:20},{h:'18',v:10}], bio: 'Global terrorist and mastermind. Target Number One.' },
      { callsign: 'NOLAN', name: 'Ivan Nolan', role: 'Field Commander', kdr: '2.15', status: 'OPERATIONAL', missions: 85, stats: [{h:'00',v:40},{h:'06',v:70},{h:'12',v:30},{h:'18',v:90}], bio: 'Loyal Konni commander. Executed raids across Europe.' }
    ]
  }
];

export default function App() {
  const [activeSquad, setActiveSquad] = useState(SQUAD_DATA[0]);
  const [activeOp, setActiveOp] = useState(SQUAD_DATA[0].operators[0]);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-red-600 p-4 lg:p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-10 border-b border-red-900/40 pb-6 mb-10 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="h-10 w-10 border-2 border-red-600 flex items-center justify-center rotate-45 text-red-600"><Skull size={20} className="-rotate-45" /></div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter italic">Tactical <span className="text-red-600">Database</span></h1>
        </div>
        <div className="text-right font-mono text-[9px] text-gray-700 uppercase tracking-[0.2em]">
          User: Mukhtar // Access: Level 10 <br/>
          <span className="text-red-900 animate-pulse">Connection: Secure_AES_256</span>
        </div>
      </header>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* NAV: MULTI-SQUAD SELECTOR */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 px-2">Operator Selection</p>
          {SQUAD_DATA.map((squad) => (
            <div key={squad.id} className="border-l border-white/5">
              <button 
                onClick={() => {setActiveSquad(squad); setActiveOp(squad.operators[0]);}}
                className={`w-full text-left px-4 py-2 text-xs font-black italic uppercase transition-all ${activeSquad.id === squad.id ? 'text-red-600' : 'text-gray-600 hover:text-white'}`}
              >
                {squad.name}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${activeSquad.id === squad.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-6 space-y-1 py-3">
                  {squad.operators.map((op) => (
                    <button
                      key={op.callsign}
                      onMouseEnter={() => setActiveOp(op)}
                      className={`w-full text-left p-2 text-[10px] font-bold uppercase transition-all flex justify-between items-center group ${activeOp.callsign === op.callsign ? 'text-red-500 bg-red-600/5' : 'text-gray-500 hover:text-red-400'}`}
                    >
                      <span>{op.callsign}</span>
                      <ChevronRight size={10} className={activeOp.callsign === op.callsign ? 'opacity-100' : 'opacity-0'} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN DASHBOARD BLOCK */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* PERSONAL INTEL CARD */}
          <div className="md:col-span-5 bg-white/5 border border-white/10 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Target size={120} /></div>
            <p className="text-red-600 text-[10px] font-black tracking-[0.3em] uppercase mb-1">Codename // HVI</p>
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">{activeOp.callsign}</h2>
            
            <div className="space-y-6 pt-6 border-t border-white/10 font-mono text-[10px]">
               <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">Real Name</span>
                  <span className="text-white uppercase font-bold">{activeOp.name}</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">Specialization</span>
                  <span className="text-white uppercase font-bold">{activeOp.role}</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">Operational Status</span>
                  <span className="text-red-500 font-bold uppercase animate-pulse">{activeOp.status}</span>
               </div>
               <div className="pt-4">
                  <p className="text-gray-600 uppercase mb-2">Dossier Summary:</p>
                  <p className="text-gray-400 italic leading-relaxed uppercase">{activeOp.bio}</p>
               </div>
            </div>
          </div>

          {/* PERFORMANCE GRAPHS */}
          <div className="md:col-span-7 space-y-6">
            <div className="grid grid-cols-3 gap-4">
               {[
                 { l: 'K/D RATIO', v: activeOp.kdr },
                 { l: 'TOTAL MISSIONS', v: activeOp.missions },
                 { l: 'RANK', v: 'LVL 155' }
               ].map((s, i) => (
                 <div key={i} className="bg-white/5 border border-white/10 p-4">
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">{s.l}</p>
                    <h3 className="text-2xl font-black italic text-red-600">{s.v}</h3>
                 </div>
               ))}
            </div>

            {/* CHART */}
            <div className="bg-white/5 border border-white/10 p-6 h-60 relative">
               <p className="text-[10px] font-black uppercase text-gray-500 mb-6 flex items-center gap-2 tracking-[0.2em]">
                  <Activity size={14} className="text-red-600" /> Operational Efficiency // Live Feed
               </p>
               <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={activeOp.stats}>
                    <defs>
                      <linearGradient id="opColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="h" stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #dc2626', color: '#fff', fontSize: '10px'}} />
                    <Area type="monotone" dataKey="v" stroke="#dc2626" fill="url(#opColor)" strokeWidth={3} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>

            {/* QUICK ACTIONS / ALERTS */}
            <div className="bg-red-600/10 border border-red-600/30 p-4 flex justify-between items-center group cursor-pointer hover:bg-red-600/20 transition-all">
               <div className="flex items-center gap-4">
                  <Lock size={18} className="text-red-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">Decrypt Classified Files</span>
               </div>
               <ChevronRight size={14} className="text-red-600" />
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full bg-black/95 border-t border-red-900/30 p-3 px-10 flex justify-between text-[8px] font-mono text-gray-700 uppercase tracking-[0.3em]">
         <div>COMMS: ACTIVE // SIGNAL: 100%</div>
         <div className="text-red-900 font-bold italic">[ No Loose Ends ]</div>
      </footer>
    </div>
  );
}