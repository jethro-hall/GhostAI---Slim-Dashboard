import React from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { StagedFile } from '../types';

interface UploadAreaProps {
  stagedFiles: StagedFile[];
  onRemove: (id: string) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ stagedFiles, onRemove }) => {
  return (
    <div className="max-w-[700px] mb-6">
      <h3 className="text-[0.9rem] font-semibold mb-2">Dashboard Upload</h3>
      <div className="bg-white/60 border-2 border-dashed border-[#CBD5E1] rounded-lg p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 hover:border-accent-neon hover:bg-accent-neon/5">
        <Upload size={32} strokeWidth={1.5} className="text-[#94A3B8]" />
        <p className="text-[0.8rem] text-text-muted">
          Drag and drop files and folders here, or choose{' '}
          <strong className="text-text-main font-semibold">Add files</strong>, or{' '}
          <strong className="text-text-main font-semibold">Add folders</strong>.
        </p>
        <div className="flex gap-2">
          <button className="bg-transparent border border-[#CBD5E1] px-3.5 py-1.5 rounded font-semibold text-[0.75rem] cursor-pointer transition-all duration-200 hover:border-accent-neon hover:text-accent-neon">
            Add files
          </button>
          <button className="bg-transparent border border-[#CBD5E1] px-3.5 py-1.5 rounded font-semibold text-[0.75rem] cursor-pointer transition-all duration-200 hover:border-accent-neon hover:text-accent-neon">
            Add folder
          </button>
        </div>
      </div>

      {stagedFiles.length > 0 && (
        <table className="w-full text-[0.8rem] border-collapse mt-2.5 bg-white border border-[#E2E8F0] rounded-md overflow-hidden">
          <thead>
            <tr className="bg-[#F8FAFC] text-text-muted uppercase text-[0.65rem] font-bold tracking-wider border-b border-[#E2E8F0]">
              <th className="px-2.5 py-1 text-left">Name</th>
              <th className="px-2.5 py-1 text-left">Requested lane</th>
              <th className="px-2.5 py-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stagedFiles.map((file) => (
              <tr key={file.id} className="text-text-main border-b border-[#F1F5F9] last:border-0">
                <td className="px-2.5 py-1 truncate max-w-[300px]">{file.name} ({file.size})</td>
                <td className="px-2.5 py-1">{file.lane}</td>
                <td className="px-2.5 py-1">
                  <button
                    onClick={() => onRemove(file.id)}
                    className="text-text-muted hover:text-danger transition-colors duration-150"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
