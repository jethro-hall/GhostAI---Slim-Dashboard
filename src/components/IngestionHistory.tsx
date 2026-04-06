import React from 'react';
import { FileText, MoreHorizontal, Trash2 } from 'lucide-react';
import { IngestionHistoryItem } from '../types';

interface IngestionHistoryProps {
  history: IngestionHistoryItem[];
}

export const IngestionHistory: React.FC<IngestionHistoryProps> = ({ history }) => {
  return (
    <div className="max-w-[650px]">
      <div className="flex justify-between items-center mb-2 pb-1 border-b border-[#E2E8F0]">
        <h2 className="text-[0.9rem] font-semibold">Ingestion Status History</h2>
      </div>

      <div className="flex flex-col gap-1">
        {history.map((item) => (
          <div
            key={item.id}
            className="group flex justify-between items-center px-3 py-1.5 bg-white/70 border border-[#E2E8F0] rounded-md glass transition-all duration-200 cursor-pointer hover:bg-white hover:border-[#CBD5E1] hover:shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-[22px] h-[22px] bg-[#F1F5F9] rounded border border-[#E2E8F0] flex items-center justify-center text-[0.7rem] font-bold text-text-main">
                <FileText size={12} />
              </div>
              <div>
                <h3 className="text-[0.8rem] font-semibold text-text-main truncate max-w-[400px]">
                  {item.name}
                </h3>
                <p className="text-[0.7rem] text-text-muted mt-0.5">
                  default | {item.lane} lane
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex gap-1 opacity-0 translate-x-[10px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                <button className="bg-[#F8FAFC] border border-transparent w-[22px] h-[22px] rounded flex items-center justify-center cursor-pointer text-text-muted transition-all duration-150 hover:bg-white hover:border-[#E2E8F0] hover:shadow-sm hover:text-text-main">
                  <FileText size={12} />
                </button>
                <button className="bg-[#F8FAFC] border border-transparent w-[22px] h-[22px] rounded flex items-center justify-center cursor-pointer text-text-muted transition-all duration-150 hover:bg-white hover:border-[#E2E8F0] hover:shadow-sm hover:text-danger">
                  <Trash2 size={12} />
                </button>
              </div>
              <div
                className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(255,80,0,0.5)] ${
                  item.status === 'ready' ? 'bg-accent-neon' : 'bg-warning'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
