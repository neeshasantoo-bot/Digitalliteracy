import React, { useState, useMemo } from 'react';
import { ExternalLink, Search, BookmarkCheck, Globe, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';
import { PROFESSIONAL_RESOURCES } from '../data/courseData';
import { ProfessionalResourceLink } from '../types/curriculum';

export const ProfessionalResourcesHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  const allTopics = useMemo(() => {
    const set = new Set<string>();
    PROFESSIONAL_RESOURCES.forEach((r) => r.topics.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PROFESSIONAL_RESOURCES.filter((res) => {
      if (selectedTopic !== 'all' && !res.topics.includes(selectedTopic)) return false;
      if (!q) return true;
      return (
        res.title.toLowerCase().includes(q) ||
        res.organization.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.topics.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedTopic]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mb-1">
              <BookmarkCheck className="w-4 h-4" />
              <span>Verified OER & Industry Curriculum</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Professional External Learning Resources & Standards
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Curated repository of accredited digital literacy initiatives, open educational resources (OER), and industry-standard competency frameworks.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="font-bold text-slate-800">{filtered.length}</span> Verified Portals
          </div>
        </div>

        {/* Search & Topic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-5">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, organization (e.g. Google, UNESCO, DOL, Mozilla)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Learning Competencies</option>
              {allTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-800 font-mono truncate max-w-[200px]">{item.organization}</span>
                <span className="font-mono text-[11px] text-emerald-700 font-semibold">{item.freeStatus}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.topics.map((t) => (
                  <span key={t} className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {t}
                  </span>
                ))}
              </div>

              {item.accreditedBy && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Standard Aligned: {item.accreditedBy}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono text-[11px] text-slate-400">{item.domain}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 hover:bg-sky-50 rounded-md transition-colors"
              >
                <span>Visit Learning Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
