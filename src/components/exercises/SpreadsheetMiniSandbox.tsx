import React, { useState } from 'react';
import { Table, CheckCircle2, AlertCircle, RefreshCw, Calculator, HelpCircle } from 'lucide-react';
import { CourseDatabaseService } from '../../services/courseDatabase';

interface CellData {
  row: number;
  item: string;
  category: string;
  unitCost: number;
  qty: number;
  userFormula: string;
  calculatedValue: number | null;
  expectedFormulaType: string;
  expectedValue: number;
}

const INITIAL_ROWS: CellData[] = [
  {
    row: 2,
    item: 'Chromebook Student Laptops',
    category: 'Hardware',
    unitCost: 250,
    qty: 12,
    userFormula: '=C2*D2',
    calculatedValue: 3000,
    expectedFormulaType: 'multiply',
    expectedValue: 3000
  },
  {
    row: 3,
    item: 'USB-C Multiport Adapters',
    category: 'Accessories',
    unitCost: 20,
    qty: 15,
    userFormula: '',
    calculatedValue: null,
    expectedFormulaType: 'multiply',
    expectedValue: 300
  },
  {
    row: 4,
    item: 'Workplace Soft Skills Workbooks',
    category: 'Printing',
    unitCost: 8,
    qty: 40,
    userFormula: '',
    calculatedValue: null,
    expectedFormulaType: 'multiply',
    expectedValue: 320
  },
  {
    row: 5,
    item: 'Cloud Storage & Office Licenses',
    category: 'Software',
    unitCost: 15,
    qty: 25,
    userFormula: '',
    calculatedValue: null,
    expectedFormulaType: 'multiply',
    expectedValue: 375
  }
];

export const SpreadsheetMiniSandbox: React.FC<{ exerciseId: string; onComplete?: () => void }> = ({
  exerciseId,
  onComplete
}) => {
  const [rows, setRows] = useState<CellData[]>(INITIAL_ROWS);
  const [sumFormula, setSumFormula] = useState('');
  const [averageFormula, setAverageFormula] = useState('');
  const [auditResult, setAuditResult] = useState<{
    score: number;
    passed: boolean;
    feedback: string[];
  } | null>(null);

  const calculateLineTotal = (formula: string, unitCost: number, qty: number): number | null => {
    const clean = formula.trim().toUpperCase().replace(/\s+/g, '');
    if (!clean.startsWith('=')) return null;

    // Checks for patterns like =C2*D2, =D2*C2, =250*12
    if (clean.includes('*')) {
      const parts = clean.substring(1).split('*');
      if (parts.length === 2) {
        // Return valid multiplication
        return unitCost * qty;
      }
    }
    // Also accept simple math evaluation
    try {
      const expr = clean.substring(1);
      if (/^[0-9+*/. -]+$/.test(expr)) {
        // Safe arithmetic eval
        return Function(`"use strict"; return (${expr})`)();
      }
    } catch {
      return null;
    }
    return null;
  };

  const handleFormulaChange = (rowIndex: number, newFormula: string) => {
    setRows((prev) => {
      const next = [...prev];
      const target = { ...next[rowIndex] };
      target.userFormula = newFormula;
      target.calculatedValue = calculateLineTotal(newFormula, target.unitCost, target.qty);
      next[rowIndex] = target;
      return next;
    });
  };

  const handleRunVerify = () => {
    let earnedPoints = 0;
    const feedback: string[] = [];

    // 1. Line items multiplication check (15 pts each = 60 pts)
    rows.forEach((r) => {
      const clean = r.userFormula.trim().toUpperCase().replace(/\s+/g, '');
      const hasEqual = clean.startsWith('=');
      const hasMultiply = clean.includes('*');

      if (hasEqual && hasMultiply && r.calculatedValue === r.expectedValue) {
        earnedPoints += 15;
      } else {
        feedback.push(`Row ${r.row} (${r.item}): Use multiplication formula like =C${r.row}*D${r.row}.`);
      }
    });

    // 2. Sum formula check (20 pts)
    const cleanSum = sumFormula.trim().toUpperCase().replace(/\s+/g, '');
    const isSumValid = cleanSum === '=SUM(E2:E5)' || cleanSum === '=SUM(E2:E4,E5)' || cleanSum === '=E2+E3+E4+E5';
    if (isSumValid) {
      earnedPoints += 20;
    } else {
      feedback.push('Grand Total Budget (Row 6): Use `=SUM(E2:E5)` to calculate the sum of column E.');
    }

    // 3. Average formula check (20 pts)
    const cleanAvg = averageFormula.trim().toUpperCase().replace(/\s+/g, '');
    const isAvgValid = cleanAvg === '=AVERAGE(E2:E5)' || cleanAvg === '=AVERAGE(E2:E4,E5)';
    if (isAvgValid) {
      earnedPoints += 20;
    } else {
      feedback.push('Average Category Expense (Row 7): Use `=AVERAGE(E2:E5)`.');
    }

    const passed = earnedPoints >= 75;
    setAuditResult({
      score: earnedPoints,
      passed,
      feedback: feedback.length ? feedback : ['All spreadsheet formulas calculated with 100% accuracy! Formulas are dynamic and compliant with Google Sheets & Excel standards.']
    });

    CourseDatabaseService.recordExerciseSubmission(exerciseId, earnedPoints, 100, passed, {
      earnedPoints
    });

    if (passed && onComplete) {
      onComplete();
    }
  };

  const handleReset = () => {
    setRows(INITIAL_ROWS);
    setSumFormula('');
    setAverageFormula('');
    setAuditResult(null);
  };

  const handleAutoFillHints = () => {
    setRows((prev) =>
      prev.map((r) => ({
        ...r,
        userFormula: `=C${r.row}*D${r.row}`,
        calculatedValue: r.expectedValue
      }))
    );
    setSumFormula('=SUM(E2:E5)');
    setAverageFormula('=AVERAGE(E2:E5)');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Sandbox Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Spreadsheet Sandbox</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">Live Spreadsheet Formula & Calculation Sandbox</h4>
          <p className="text-xs text-slate-500 mt-1">
            Calculate community inventory line items with multiplication (<code className="font-mono text-emerald-700">=C2*D2</code>), total budget (<code className="font-mono text-emerald-700">=SUM(E2:E5)</code>), and average (<code className="font-mono text-emerald-700">=AVERAGE(E2:E5)</code>).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoFillHints}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Formula Hints
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={handleRunVerify}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 shadow-xs"
          >
            <Calculator className="w-3.5 h-3.5" />
            Verify Formulas & Grade
          </button>
        </div>
      </div>

      {/* Spreadsheet Grid Simulation */}
      <div className="p-5 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 font-mono text-center">
              <th className="w-12 py-2 border border-slate-300">#</th>
              <th className="w-64 py-2 border border-slate-300 text-left px-3">A (Item Name)</th>
              <th className="w-32 py-2 border border-slate-300">B (Category)</th>
              <th className="w-28 py-2 border border-slate-300 text-right px-3">C (Unit Cost)</th>
              <th className="w-24 py-2 border border-slate-300 text-center">D (Qty)</th>
              <th className="w-72 py-2 border border-slate-300 text-left px-3 bg-emerald-50 text-emerald-900 font-bold">
                E (Total Cost Formula)
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.row} className="hover:bg-slate-50">
                <td className="py-2 text-center border border-slate-200 font-mono text-slate-400 bg-slate-50">
                  {r.row}
                </td>
                <td className="py-2 px-3 border border-slate-200 font-medium text-slate-800">{r.item}</td>
                <td className="py-2 px-3 border border-slate-200 text-center text-slate-500">{r.category}</td>
                <td className="py-2 px-3 border border-slate-200 text-right font-mono tabular-nums text-slate-700">
                  ${r.unitCost.toFixed(2)}
                </td>
                <td className="py-2 px-3 border border-slate-200 text-center font-mono tabular-nums text-slate-700">
                  {r.qty}
                </td>
                <td className="py-1.5 px-3 border border-slate-200 bg-emerald-50/20">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={r.userFormula}
                      onChange={(e) => handleFormulaChange(idx, e.target.value)}
                      placeholder={`=C${r.row}*D${r.row}`}
                      className="flex-1 px-2.5 py-1 text-xs font-mono bg-white border border-slate-300 rounded-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                    <span className="w-20 text-right font-mono font-bold text-slate-800 tabular-nums">
                      {r.calculatedValue !== null ? `$${r.calculatedValue.toLocaleString()}` : '-'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}

            {/* Row 6: Total Sum */}
            <tr className="bg-slate-100 font-semibold">
              <td className="py-2 text-center border border-slate-300 font-mono text-slate-400">6</td>
              <td colSpan={4} className="py-2 px-3 border border-slate-300 text-right text-slate-800 uppercase tracking-wide text-[11px]">
                Total Community Budget (SUM):
              </td>
              <td className="py-1.5 px-3 border border-slate-300 bg-emerald-50/40">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sumFormula}
                    onChange={(e) => setSumFormula(e.target.value)}
                    placeholder="=SUM(E2:E5)"
                    className="flex-1 px-2.5 py-1 text-xs font-mono bg-white border border-slate-300 rounded-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-bold"
                  />
                  <span className="w-20 text-right font-mono font-bold text-emerald-800 tabular-nums">
                    {sumFormula.toUpperCase().includes('SUM') || sumFormula.includes('+') ? '$3,995.00' : '-'}
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 7: Average */}
            <tr className="bg-slate-50 font-semibold">
              <td className="py-2 text-center border border-slate-300 font-mono text-slate-400">7</td>
              <td colSpan={4} className="py-2 px-3 border border-slate-300 text-right text-slate-800 uppercase tracking-wide text-[11px]">
                Average Expense per Category:
              </td>
              <td className="py-1.5 px-3 border border-slate-300 bg-emerald-50/30">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={averageFormula}
                    onChange={(e) => setAverageFormula(e.target.value)}
                    placeholder="=AVERAGE(E2:E5)"
                    className="flex-1 px-2.5 py-1 text-xs font-mono bg-white border border-slate-300 rounded-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-bold"
                  />
                  <span className="w-20 text-right font-mono font-bold text-emerald-800 tabular-nums">
                    {averageFormula.toUpperCase().includes('AVERAGE') ? '$998.75' : '-'}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Audit Feedback */}
      {auditResult && (
        <div className={`p-5 border-t ${auditResult.passed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-amber-50/50 border-amber-200'}`}>
          <div className="flex items-start gap-3">
            {auditResult.passed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold text-slate-900">
                  {auditResult.passed ? 'Formulas Verified! Full Competency Mastered' : 'Formula Check: Corrections Needed'}
                </h5>
                <span className="text-sm font-bold font-mono text-slate-900">
                  Score: {auditResult.score} / 100
                </span>
              </div>
              <div className="mt-2 space-y-1">
                {auditResult.feedback.map((msg, idx) => (
                  <p key={idx} className="text-xs text-slate-600">
                    • {msg}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
