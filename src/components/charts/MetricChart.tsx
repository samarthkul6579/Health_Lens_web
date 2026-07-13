"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartDataPoint {
  label: string;
  value: number;
}

interface MetricChartProps {
  type: "hemoglobin" | "glucose" | "cholesterol";
  className?: string;
}

const metricConfigs = {
  hemoglobin: {
    title: "Hemoglobin",
    unit: "g/dL",
    normalRange: "12.0 - 16.0",
    currentValue: 14.2,
    prevValue: 13.8,
    status: "Normal",
    color: "#0B6EF3",
    data3m: [
      { label: "May", value: 13.5 },
      { label: "Jun", value: 13.8 },
      { label: "Jul", value: 14.2 },
    ],
    data6m: [
      { label: "Feb", value: 13.0 },
      { label: "Mar", value: 13.2 },
      { label: "Apr", value: 13.4 },
      { label: "May", value: 13.5 },
      { label: "Jun", value: 13.8 },
      { label: "Jul", value: 14.2 },
    ],
  },
  glucose: {
    title: "Fasting Blood Sugar",
    unit: "mg/dL",
    normalRange: "70 - 100",
    currentValue: 95,
    prevValue: 108,
    status: "Normal",
    color: "#18B981",
    data3m: [
      { label: "May", value: 108 },
      { label: "Jun", value: 102 },
      { label: "Jul", value: 95 },
    ],
    data6m: [
      { label: "Feb", value: 115 },
      { label: "Mar", value: 112 },
      { label: "Apr", value: 110 },
      { label: "May", value: 108 },
      { label: "Jun", value: 102 },
      { label: "Jul", value: 95 },
    ],
  },
  cholesterol: {
    title: "Total Cholesterol",
    unit: "mg/dL",
    normalRange: "120 - 200",
    currentValue: 215,
    prevValue: 230,
    status: "Needs Attention",
    color: "#EF4444",
    data3m: [
      { label: "May", value: 230 },
      { label: "Jun", value: 224 },
      { label: "Jul", value: 215 },
    ],
    data6m: [
      { label: "Feb", value: 245 },
      { label: "Mar", value: 240 },
      { label: "Apr", value: 235 },
      { label: "May", value: 230 },
      { label: "Jun", value: 224 },
      { label: "Jul", value: 215 },
    ],
  },
};

export default function MetricChart({ type, className }: MetricChartProps) {
  const config = metricConfigs[type];
  const [timeFilter, setTimeFilter] = useState<"3M" | "6M">("6M");

  const activeData = timeFilter === "3M" ? config.data3m : config.data6m;
  const isUp = config.currentValue > config.prevValue;
  const diff = Math.abs(config.currentValue - config.prevValue).toFixed(1);
  const percentChange = ((Math.abs(config.currentValue - config.prevValue) / config.prevValue) * 100).toFixed(1);

  // SVG Chart rendering calculations
  const width = 500;
  const height = 180;
  const padding = 30;

  const values = activeData.map((d) => d.value);
  const minVal = Math.min(...values) * 0.95;
  const maxVal = Math.max(...values) * 1.05;

  const points = activeData.map((d, index) => {
    const x = padding + (index / (activeData.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - minVal) / (maxVal - minVal)) * (height - padding * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ""
  );

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className={cn("p-6 rounded-3xl bg-white border border-border-pale shadow-premium hover:shadow-premium-lg transition-all duration-300", className)}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Health Tracker</span>
          <h3 className="text-xl font-bold text-deep-blue">{config.title}</h3>
        </div>

        {/* Filters */}
        <div className="flex gap-1 p-1 bg-bg-pale rounded-full border border-border-pale">
          {(["3M", "6M"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer",
                timeFilter === filter
                  ? "bg-white text-primary-blue shadow-sm"
                  : "text-text-secondary hover:text-deep-blue"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stat Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 border-b border-border-pale/40 pb-5">
        <div>
          <span className="text-xs text-text-secondary">Current Value</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-extrabold text-deep-blue">{config.currentValue}</span>
            <span className="text-xs text-text-secondary font-semibold">{config.unit}</span>
          </div>
        </div>

        <div>
          <span className="text-xs text-text-secondary">Trend Direction</span>
          <div className={cn("flex items-center gap-1 mt-1 font-bold text-sm", isUp ? "text-emerald-500" : "text-red-500")}>
            {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span>
              {diff} {config.unit} ({percentChange}%)
            </span>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <span className="text-xs text-text-secondary">Normal Range</span>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-bold text-deep-blue">{config.normalRange}</span>
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                config.status === "Normal"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : "bg-red-50 text-red-500 border-red-100 animate-pulse"
              )}
            >
              {config.status}
            </span>
          </div>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative h-[180px] w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={config.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={config.color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#E4ECF7" strokeDasharray="3 3" />
          <line x1={padding} y1={(height - padding * 2) / 2 + padding} x2={width - padding} y2={(height - padding * 2) / 2 + padding} stroke="#E4ECF7" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#E4ECF7" />

          {/* Area under curve */}
          <motion.path
            d={areaD}
            fill={`url(#gradient-${type})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* Line path */}
          <motion.path
            d={pathD}
            fill="none"
            stroke={config.color}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Data Points */}
          {points.map((p, i) => (
            <g key={i}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="5"
                fill="white"
                stroke={config.color}
                strokeWidth="3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                whileHover={{ r: 7 }}
              />
              {/* Text labels for values */}
              <text
                x={p.x}
                y={p.y - 12}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#0B1739"
                className="select-none pointer-events-none font-sans"
              >
                {p.value}
              </text>
              {/* X Axis Labels */}
              <text
                x={p.x}
                y={height - 8}
                textAnchor="middle"
                fontSize="11"
                fill="#5B6780"
                className="select-none pointer-events-none font-sans"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="text-[10px] text-center text-text-secondary mt-3 italic">
        Fictional demo data for representation only.
      </p>
    </div>
  );
}
