import React from 'react';
import { X, Download, FileText, CheckCircle, Table as TableIcon, Hash, Calendar, Tag } from 'lucide-react';
import { CourseFile } from '../types/curriculum';
import { CourseDatabaseService } from '../services/courseDatabase';

export const FileViewerModal: React.FC<{
  file: CourseFile | null;
  onClose: () => void;
}> = ({ file, onClose }) => {
  if (!file) return null;

  const handleDownload = () => {
    CourseDatabaseService.triggerFileDownload(file);
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-lg shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                <span className="font-mono">{file.id}</span>
                <span>·</span>
                <span>{file.category}</span>
                <span>·</span>
                <span className="uppercase font-mono font-semibold text-slate-700">{file.fileType}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">{file.title}</h3>
              <p className="text-xs text-slate-600 mt-1">{file.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File Metadata Strip */}
        <div className="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-y-2">
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {file.dateAdded}
            </span>
            <span>Size: {formatSize(file.sizeBytes)}</span>
            <span>v{file.version}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono truncate max-w-[280px]">
            <Hash className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate" title={file.checksum}>SHA256: {file.checksum}</span>
          </div>
        </div>

        {/* Modal Body: Document / Data Content Preview */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Document In-Browser Preview</h4>
            <span className="text-[11px] text-slate-400">Live data representation</span>
          </div>

          {file.previewContent.type === 'text' && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {file.previewContent.data}
            </div>
          )}

          {file.previewContent.type === 'table' && file.previewContent.data?.headers && (
            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    {file.previewContent.data.headers.map((h: string, idx: number) => (
                      <th key={idx} className="p-2.5 border-r border-slate-200 last:border-0 font-mono text-[11px]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {file.previewContent.data.rows.map((row: string[], rIdx: number) => (
                    <tr key={rIdx} className="hover:bg-slate-50/70">
                      {row.map((cell: string, cIdx: number) => (
                        <td key={cIdx} className="p-2.5 border-r border-slate-200 last:border-0">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {file.previewContent.type === 'checklist' && Array.isArray(file.previewContent.data) && (
            <div className="space-y-2.5">
              {file.previewContent.data.map((item: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{item.label}</h5>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span>Associated Tags:</span>
            <div className="flex flex-wrap gap-1.5">
              {file.tags.map((t) => (
                <span key={t} className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Target Module: <span className="font-semibold text-slate-700">{file.moduleTitle}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              Download {file.filename}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
