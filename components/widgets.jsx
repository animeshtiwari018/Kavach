"use client";

import { useState, useEffect } from "react";
import { CloudSun, Droplets, Wind, ShieldCheck } from "lucide-react";

export default function DesktopWidgets() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const todayDate = currentDate.getDate();

  const monthNames = [
    "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST"
  ];

  // Dynamic Month Title
  const actualMonthName = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ][monthIndex];

  // Calculate days for current month grid
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();

  const calendarDays = [];

  // Previous month trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({ day: d, isCurrentMonth: true, isToday: d === todayDate });
  }

  // Next month leading days to complete 35 cells
  const remaining = 35 - calendarDays.length;
  for (let d = 1; d <= (remaining >= 0 ? remaining : remaining + 7); d++) {
    calendarDays.push({ day: d, isCurrentMonth: false });
  }

  return (
    <div className="absolute top-[60px] right-6 z-20 flex gap-4 select-none pointer-events-auto">
      {/* Calendar Widget with Army Tactical Touch */}
      <div className="w-[210px] h-[220px] rounded-2xl bg-[#0b0e0a]/90 backdrop-blur-xl border border-[#3A4034] p-3.5 shadow-[0_12px_35px_rgba(0,0,0,0.85)] flex flex-col justify-between font-mono relative overflow-hidden group hover:border-[#8E9B72] transition-colors">
        {/* Top Tactical Label */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] font-bold tracking-widest text-[#EF4444] uppercase">
            {actualMonthName}
          </span>
          <span className="text-[8px] tracking-wider text-[#73786B] font-semibold border border-[#24291F] px-1 rounded">
            CALENDAR
          </span>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center text-[9px] font-bold text-[#73786B] mb-1">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-y-1 text-center text-[10.5px] font-semibold">
          {calendarDays.slice(0, 35).map((item, idx) => (
            <div key={idx} className="flex items-center justify-center h-4.5">
              {item.isToday ? (
                <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center font-bold text-[10px] shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                  {item.day}
                </span>
              ) : (
                <span
                  className={
                    item.isCurrentMonth
                      ? "text-[#D4D5C8]"
                      : "text-[#4A5042]/50 text-[9.5px]"
                  }
                >
                  {item.day}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Corner riveted crosshair accents */}
        <span className="absolute top-1 left-1.5 text-[7px] text-[#3A4034] font-bold">+</span>
        <span className="absolute top-1 right-1.5 text-[7px] text-[#3A4034] font-bold">+</span>
        <span className="absolute bottom-1 left-1.5 text-[7px] text-[#3A4034] font-bold">+</span>
        <span className="absolute bottom-1 right-1.5 text-[7px] text-[#3A4034] font-bold">+</span>
      </div>

      {/* Weather / Tactical Atmospherics Widget */}
      <div className="w-[220px] h-[220px] rounded-2xl bg-[#0b0e0a]/90 backdrop-blur-xl border border-[#3A4034] p-3.5 shadow-[0_12px_35px_rgba(0,0,0,0.85)] flex flex-col justify-between font-mono relative overflow-hidden group hover:border-[#8E9B72] transition-colors">
        {/* Top Location & Icon Header */}
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide font-sans">
              Memphis
            </h4>
            <span className="text-[9px] text-[#73786B] tracking-wider font-bold block uppercase mt-0.5">
              SECTOR 01 // CLEAR
            </span>
          </div>
          <CloudSun className="w-8 h-8 text-amber-400 flex-shrink-0" />
        </div>

        {/* Main Temperature Display */}
        <div className="my-0.5">
          <div className="text-4xl font-extrabold text-white tracking-tight flex items-start font-sans leading-none">
            79<span className="text-xl font-normal text-[#8E9B72] ml-0.5">°</span>
          </div>
          <div className="text-[10.5px] text-[#8E9B72] font-semibold tracking-wider uppercase mt-1">
            Mostly Clear
          </div>
        </div>

        {/* High/Low & Humidity/Wind Row */}
        <div className="border-t border-[#24291F] pt-2 grid grid-cols-3 gap-1 text-[10px] text-[#D4D5C8] font-semibold">
          <div>
            <span className="text-[8px] text-[#73786B] block">H:84° L:62°</span>
          </div>
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3 text-blue-400 flex-shrink-0" />
            <span>52%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span>8km/h</span>
          </div>
        </div>

        {/* Footer Alert Status Bar */}
        <div className="border-t border-[#24291F] pt-1.5 flex items-center gap-1.5 text-[9.5px] text-[#8E9B72] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          <span className="uppercase tracking-wider">Air quality alert</span>
        </div>

        {/* Tactical Corner accents */}
        <span className="absolute top-1 left-1.5 text-[7px] text-[#3A4034] font-bold">+</span>
        <span className="absolute top-1 right-1.5 text-[7px] text-[#3A4034] font-bold">+</span>
        <span className="absolute bottom-1 left-1.5 text-[7px] text-[#3A4034] font-bold">+</span>
        <span className="absolute bottom-1 right-1.5 text-[7px] text-[#3A4034] font-bold">+</span>
      </div>
    </div>
  );
}
