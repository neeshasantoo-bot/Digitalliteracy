import React, { useState } from 'react';
import {
  Lightbulb,
  Server,
  Smartphone,
  Award,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Terminal,
  FileCode,
  Globe,
  Zap,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { IMPROVEMENT_RECOMMENDATIONS } from '../data/courseData';

export const ModernizationRecommendations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'cloudflare_guide' | 'matrix'>('recommendations');

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold mb-1">
              <Lightbulb className="w-4 h-4" />
              <span>Architectural & Curriculum Modernization Audit</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Recommendations for Upgrading the Google Sites Curriculum
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Transitioning from <span className="font-mono text-slate-800">sites.google.com/view/youth-training-and-employment-</span> to a modern, high-performance web platform hosted on Cloudflare Pages.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'recommendations' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Strategic Recommendations
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'matrix' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Google Sites vs Cloudflare Matrix
            </button>
            <button
              onClick={() => setActiveTab('cloudflare_guide')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'cloudflare_guide' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cloudflare Deployment Guide
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Strategic Recommendations */}
      {activeTab === 'recommendations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {IMPROVEMENT_RECOMMENDATIONS.map((rec) => {
            const impactColor =
              rec.impactScore === 'Critical'
                ? 'text-rose-700 bg-rose-50 border-rose-200'
                : rec.impactScore === 'High'
                ? 'text-amber-700 bg-amber-50 border-amber-200'
                : 'text-sky-700 bg-sky-50 border-sky-200';

            return (
              <div
                key={rec.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs text-slate-500 font-mono">{rec.category}</span>
                    <span className={`text-[11px] font-semibold font-mono px-2 py-0.5 rounded border ${impactColor}`}>
                      {rec.impactScore} Priority
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{rec.title}</h3>

                  <div className="space-y-3 text-xs mt-3">
                    <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-lg">
                      <div className="font-semibold text-rose-800 flex items-center gap-1.5 mb-0.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        Current Google Sites Limitation:
                      </div>
                      <p className="text-slate-600 leading-relaxed">{rec.googleSitesLimitation}</p>
                    </div>

                    <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                      <div className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Recommended Modern Solution:
                      </div>
                      <p className="text-slate-600 leading-relaxed">{rec.recommendedSolution}</p>
                    </div>

                    <div className="pt-2">
                      <span className="font-semibold text-slate-800 block mb-1">Architecture Implementation:</span>
                      <p className="text-slate-600 font-mono text-[11px] bg-slate-50 p-2 rounded border border-slate-200">
                        {rec.technicalArchitecture}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                    Action Roadmap:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {rec.actionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Comparison Matrix */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-200 bg-slate-50">
            <h3 className="text-sm font-bold text-slate-900">
              Comparative Analysis: Google Sites vs Modern Cloudflare Architecture
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed assessment across performance, interactivity, file distribution, and student data integrity.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="py-3 px-4 w-44">Platform Dimension</th>
                  <th className="py-3 px-4 w-72 text-rose-900 bg-rose-50/50">Current Google Sites Setup</th>
                  <th className="py-3 px-4 text-emerald-900 bg-emerald-50/50">Cloudflare Edge Architecture</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Interactive Sandboxes</td>
                  <td className="py-3 px-4 text-rose-700 bg-rose-50/20">
                    None; purely static markdown/text. Embedded iframes fail on mobile viewports.
                  </td>
                  <td className="py-3 px-4 text-emerald-800 bg-emerald-50/20">
                    Built-in interactive simulations (phishing inbox, spreadsheet formulas, file organizer, ATS scanner).
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Course File Repository</td>
                  <td className="py-3 px-4 text-rose-700 bg-rose-50/20">
                    Unstructured Google Drive links with frequent permission errors ("Request Access").
                  </td>
                  <td className="py-3 px-4 text-emerald-800 bg-emerald-50/20">
                    Typed database schema stored in Cloudflare R2 object storage with zero egress fees and SHA-256 verification.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Global Edge Latency</td>
                  <td className="py-3 px-4 text-rose-700 bg-rose-50/20">
                    Subject to centralized Google Sites rendering delays (1.2s - 2.8s TTFB on slow cellular).
                  </td>
                  <td className="py-3 px-4 text-emerald-800 bg-emerald-50/20">
                    Distributed across 300+ Cloudflare edge locations (&lt;50ms response anywhere in the world).
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Student Progress Tracking</td>
                  <td className="py-3 px-4 text-rose-700 bg-rose-50/20">
                    No persistence; relies on manual paper sign-in sheets or external Google Forms.
                  </td>
                  <td className="py-3 px-4 text-emerald-800 bg-emerald-50/20">
                    Real-time local state + Cloudflare D1 serverless SQL database storing exercise scores and quiz completions.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Mobile & Low-Bandwidth</td>
                  <td className="py-3 px-4 text-rose-700 bg-rose-50/20">
                    Clunky table wrappers on small screens; heavy script payload from Google Drive viewers.
                  </td>
                  <td className="py-3 px-4 text-emerald-800 bg-emerald-50/20">
                    Optimized responsive layout with &gt;=44px touch targets and offline Service Worker caching.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Custom Domain & Branding</td>
                  <td className="py-3 px-4 text-rose-700 bg-rose-50/20">
                    Tied to long <code className="text-[10px]">sites.google.com/view/...</code> URL; limited branding.
                  </td>
                  <td className="py-3 px-4 text-emerald-800 bg-emerald-50/20">
                    Instant custom domain with automatic SSL/TLS certificate managed at Cloudflare DNS.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Cloudflare Deployment Guide */}
      {activeTab === 'cloudflare_guide' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-sky-700 font-semibold text-xs mb-1">
              <Cloud className="w-4 h-4" />
              <span>Hosting Blueprint</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              How to Deploy this Application to Cloudflare Pages
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              This repository is built as a single-page application (SPA) optimized for zero-configuration Cloudflare Pages deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Connect GitHub Repository</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Log into the Cloudflare Dashboard, navigate to <strong>Compute (Workers & Pages)</strong> &gt; <strong>Create Application</strong> &gt; <strong>Pages</strong>, and link your Git repository.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Configure Build Settings</span>
              </div>
              <div className="font-mono text-[11px] space-y-1 bg-white p-2 rounded border border-slate-200 mt-1">
                <div>Framework: <strong>Vite</strong></div>
                <div>Build command: <strong>npm run build</strong></div>
                <div>Output directory: <strong>dist</strong></div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Client-Side Routing (_redirects)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We have provided a <code className="font-mono">public/_redirects</code> file with <code className="font-mono">/* /index.html 200</code> so all dynamic module URLs resolve seamlessly on Cloudflare edge servers.
              </p>
            </div>
          </div>

          {/* Wrangler CLI Instructions */}
          <div className="p-5 bg-slate-900 rounded-lg text-slate-100 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 mb-3 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                Alternative: Deploy via Wrangler CLI in 1 Command
              </span>
              <span className="text-[11px]">Terminal / Shell</span>
            </div>
            <pre className="text-sky-300 leading-loose">
              # 1. Install Wrangler CLI globally or locally{'\n'}
              npm install -g wrangler{'\n\n'}
              # 2. Build the production bundle{'\n'}
              npm run build{'\n\n'}
              # 3. Deploy directly to Cloudflare Pages{'\n'}
              wrangler pages deploy dist --project-name=youth-digital-literacy
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
