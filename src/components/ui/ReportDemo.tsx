"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Brain, RefreshCw, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SampleReport {
  id: string;
  name: string;
  type: string;
  summary: string;
  findings: string[];
  metrics: {
    name: string;
    value: string;
    range: string;
    status: "Normal" | "Needs Attention";
  }[];
  questions: string[];
}

const sampleReports: SampleReport[] = [
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    type: "Blood Test",
    summary: "Your CBC shows overall healthy blood cellular levels, with a slightly low Hemoglobin count indicating mild iron-deficiency anemia. White Blood Cell and Platelet counts are within ideal thresholds.",
    findings: [
      "Hemoglobin is slightly lower than normal, which may cause minor fatigue.",
      "White Blood Cells (WBC) are normal, showing no active infections.",
      "Platelets are at an optimal level for healthy clotting.",
    ],
    metrics: [
      { name: "Hemoglobin", value: "11.5 g/dL", range: "12.0 - 16.0", status: "Needs Attention" },
      { name: "White Blood Cells", value: "6.5 K/uL", range: "4.5 - 11.0", status: "Normal" },
      { name: "Platelets", value: "250 K/uL", range: "150 - 450", status: "Normal" },
      { name: "Red Blood Cells", value: "4.2 M/uL", range: "4.0 - 5.2", status: "Normal" },
    ],
    questions: [
      "Is my low hemoglobin level cause for concern, and do I need iron supplements?",
      "Are there dietary changes I should make to improve my red blood cell levels?",
      "When should I repeat this CBC test to monitor my response?",
    ],
  },
  {
    id: "lipid",
    name: "Lipid Profile (Cholesterol)",
    type: "Cardiovascular Panel",
    summary: "Your total cholesterol is slightly elevated, driven primarily by high LDL levels ('bad' cholesterol). Your HDL ('good' cholesterol) and Triglycerides are in the excellent range.",
    findings: [
      "Total Cholesterol is 215 mg/dL, which is borderline high.",
      "LDL Cholesterol is 135 mg/dL (optimal is < 100 mg/dL).",
      "HDL is excellent at 60 mg/dL, offering strong cardiovascular protection.",
    ],
    metrics: [
      { name: "Total Cholesterol", value: "215 mg/dL", range: "< 200", status: "Needs Attention" },
      { name: "LDL Cholesterol", value: "135 mg/dL", range: "< 100", status: "Needs Attention" },
      { name: "HDL Cholesterol", value: "60 mg/dL", range: "> 40", status: "Normal" },
      { name: "Triglycerides", value: "110 mg/dL", range: "< 150", status: "Normal" },
    ],
    questions: [
      "Given my high LDL of 135, what lifestyle or diet changes do you recommend first?",
      "Does my high HDL (60) offset the risk of my elevated LDL?",
      "Do we need to consider cholesterol-lowering medication, or can we wait and retest?",
    ],
  },
];

export default function ReportDemo() {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<"idle" | "scanning" | "completed">("idle");
  const [activeStep, setActiveStep] = useState(0);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSelectReport = async (id: string) => {
    setSelectedReportId(id);
    setProcessingState("scanning");
    setActiveStep(0);
    setErrorMsg(null);
    setAnalysisData(null);

    // Simulate progress scanning steps
    const timer1 = setTimeout(() => setActiveStep(1), 800);
    const timer2 = setTimeout(() => setActiveStep(2), 1600);

    try {
      const res = await fetch("/api/demo-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report_id: id }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to analyze the report");
      }

      const resJson = await res.json();
      const apiResponse = resJson.data;

      // Format response to match the expected UI schema
      const formattedReport = {
        name: id === "cbc" ? "Complete Blood Count (CBC)" : "Lipid Profile (Cholesterol)",
        type: id === "cbc" ? "Blood Test" : "Cardiovascular Panel",
        summary: apiResponse.summary,
        findings: apiResponse.key_findings || [],
        metrics: (apiResponse.markers || []).map((m: any) => ({
          name: m.marker_name || m.name,
          value: typeof m.value === "number" ? `${m.value} ${m.unit || ""}`.trim() : `${m.value}`,
          range: m.reference_range || "N/A",
          status: m.is_abnormal ? "Needs Attention" : "Normal"
        })),
        questions: apiResponse.doctor_questions || []
      };

      // Transition to completed state once simulation finishes
      setTimeout(() => {
        setAnalysisData(formattedReport);
        setProcessingState("completed");
      }, 2400);

    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setErrorMsg(err.message || "An error occurred during AI analysis. Please check your backend.");
      setProcessingState("idle");
      setSelectedReportId(null);
    }
  };

  const resetDemo = () => {
    setSelectedReportId(null);
    setProcessingState("idle");
    setAnalysisData(null);
    setErrorMsg(null);
  };


  return (
    <div className="w-full max-w-4xl mx-auto rounded-[28px] border border-border-pale bg-white shadow-premium overflow-hidden">
      {/* Demo Header */}
      <div className="px-6 py-5 bg-bg-pale/80 border-b border-border-pale/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary-blue animate-ping" />
          <span className="text-xs font-bold text-primary-blue uppercase tracking-wider">Interactive Demo</span>
        </div>
        <span className="text-xs text-text-secondary">
          Click a sample report below to see how HealthLens simplifies medical data.
        </span>
      </div>

      <div className="p-6 md:p-8">
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-150 text-red-600 flex items-center justify-between text-xs sm:text-sm animate-pulse-slow">
            <span>{errorMsg}</span>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-xs font-bold text-red-500 hover:text-red-700 underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* IDLE STATE */}
          {processingState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary-blue/5 border border-primary-blue/10 flex items-center justify-center text-primary-blue mb-6">
                <Upload size={28} />
              </div>
              <h3 className="text-2xl font-bold text-deep-blue mb-2">Upload a Medical Report</h3>
              <p className="text-text-secondary max-w-md mb-8 text-sm sm:text-base leading-relaxed">
                Drag and drop your medical report PDF or image here, or select one of our preloaded samples to experience the analysis instantly.
              </p>

              {/* Sample Selector Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                {sampleReports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => handleSelectReport(report.id)}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-border-pale bg-white text-left hover:border-primary-blue hover:shadow-premium transition-all duration-300 group cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-bg-pale text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-deep-blue text-sm group-hover:text-primary-blue transition-colors">
                        {report.name}
                      </h4>
                      <span className="text-[11px] text-text-secondary">{report.type}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCANNING / PROCESSING STATE */}
          {processingState === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="relative w-20 h-20 mb-8">
                {/* Rotating scanner circles */}
                <div className="absolute inset-0 rounded-full border-4 border-primary-blue/10 border-t-primary-blue animate-spin" />
                <div className="absolute inset-2.5 rounded-full border-4 border-health-green/10 border-b-health-green animate-spin duration-1500" />
                <div className="absolute inset-5 rounded-full bg-bg-pale flex items-center justify-center text-primary-blue">
                  <Brain size={24} className="animate-pulse" />
                </div>
              </div>

              <h4 className="text-lg font-bold text-deep-blue mb-4">AI HealthLens Engine Processing</h4>

              {/* Stepper progress indicator */}
              <div className="flex flex-col gap-3.5 max-w-xs w-full text-left mx-auto">
                <div className="flex items-center gap-3">
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border", activeStep >= 0 ? "bg-primary-blue text-white border-primary-blue" : "border-border-pale text-text-secondary")}>✓</div>
                  <span className={cn("text-xs font-semibold", activeStep >= 0 ? "text-deep-blue" : "text-text-secondary")}>Extracting text values using OCR...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border", activeStep >= 1 ? "bg-primary-blue text-white border-primary-blue" : "border-border-pale text-text-secondary")}>{activeStep > 1 ? "✓" : "2"}</div>
                  <span className={cn("text-xs font-semibold", activeStep >= 1 ? "text-deep-blue" : "text-text-secondary")}>Correlating data with clinical markers...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border", activeStep >= 2 ? "bg-primary-blue text-white border-primary-blue" : "border-border-pale text-text-secondary")}>3</div>
                  <span className={cn("text-xs font-semibold", activeStep >= 2 ? "text-deep-blue animate-pulse" : "text-text-secondary")}>Generating simplified recommendations...</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* COMPLETED RESULTS STATE */}
          {processingState === "completed" && analysisData && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Reset Bar */}
              <div className="flex justify-between items-center bg-bg-pale p-3 rounded-2xl border border-border-pale">
                <span className="text-xs font-bold text-deep-blue flex items-center gap-1.5">
                  <FileText size={16} className="text-primary-blue" />
                  {analysisData.name} Analysis
                </span>
                <button
                  onClick={resetDemo}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary-blue hover:text-deep-blue cursor-pointer"
                >
                  <RefreshCw size={13} />
                  Analyze Another Report
                </button>
              </div>

              {/* AI Summary */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-blue/5 to-health-green/5 border border-primary-blue/15">
                <div className="flex items-center gap-2 text-primary-blue mb-3">
                  <Brain size={20} className="fill-primary-blue/10" />
                  <h4 className="font-extrabold text-sm uppercase tracking-wider">AI Medical Summary</h4>
                </div>
                <p className="text-deep-blue font-medium text-sm sm:text-base leading-relaxed">
                  {analysisData.summary}
                </p>
              </div>

              {/* Grid: Metrics and Bullet Findings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Findings Column */}
                <div className="space-y-4">
                  <h4 className="font-bold text-deep-blue text-sm uppercase tracking-wider">Key Findings</h4>
                  <ul className="space-y-3">
                    {analysisData.findings.map((finding: string, idx: number) => (
                      <li key={idx} className="flex gap-2.5 text-sm text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-blue mt-2 shrink-0" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Table Column */}
                <div className="space-y-4">
                  <h4 className="font-bold text-deep-blue text-sm uppercase tracking-wider">Lab Report Values</h4>
                  <div className="border border-border-pale rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-bg-pale text-text-secondary border-b border-border-pale">
                          <th className="px-4 py-3 font-semibold">Test Name</th>
                          <th className="px-4 py-3 font-semibold">Result</th>
                          <th className="px-4 py-3 font-semibold text-right">Normal Range</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysisData.metrics.map((metric: any, idx: number) => (
                          <tr key={idx} className="border-b border-border-pale/50 last:border-0 hover:bg-bg-pale/30">
                            <td className="px-4 py-3 font-semibold text-deep-blue">{metric.name}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-deep-blue">{metric.value}</span>
                                <span
                                  className={cn(
                                    "text-[9px] px-1.5 py-0.5 rounded-full border font-bold shrink-0",
                                    metric.status === "Normal"
                                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                      : "bg-red-50 text-red-500 border-red-100"
                                  )}
                                >
                                  {metric.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right text-text-secondary font-medium">{metric.range}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Questions for Doctor */}
              <div className="border-t border-border-pale/60 pt-5 space-y-3.5">
                <h4 className="font-bold text-deep-blue text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle size={16} className="text-primary-blue" />
                  Prepared Questions for Your Doctor
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {analysisData.questions.map((q: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-bg-pale/60 border border-border-pale rounded-xl flex items-center justify-between text-xs sm:text-sm text-deep-blue hover:border-primary-blue hover:bg-white transition-all group"
                    >
                      <span className="font-medium">{q}</span>
                      <ArrowRight size={14} className="text-primary-blue group-hover:translate-x-0.5 transition-transform shrink-0 ml-3" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
