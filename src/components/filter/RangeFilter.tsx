import React, { useState, useCallback, useEffect, useRef } from "react";
import classnames from "classnames";
import  "@/styles/time.css"
const CustomAgeFilterButton: React.FC<any> = ({ name, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<{ startTime: string, endTime: string }>({ startTime: "00:00:00", endTime: "24:00:00" });
  const min = 0; // Minimum value for time slider
  const max = 24; // Maximum value for time slider
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(+selectedTimeRange.startTime.split(":")[0]);
      const maxPercent = getPercent(+selectedTimeRange.endTime.split(":")[0]);
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [selectedTimeRange, getPercent]);

  useEffect(() => {
    onChange(selectedTimeRange);
  }, [selectedTimeRange, onChange]);

  const handleClearFilter = () => {
    setSelectedTimeRange({ startTime: "00:00:00", endTime: "24:00:00" });
    setIsOpen(false);
  };

  return (
    <div className="custom-filter-button relative">
      <button onClick={handleToggleDropdown} className={`px-6 py-2 text-sm font-medium rounded-full border ${isOpen ? "border-primary text-primary" : "border-black text-black"}`}>{name}</button>
      {isOpen && (
        <div className="absolute top-12 left-0 z-10 bg-white rounded-xl border p-4 max-w-max">
          <div className="w-full">
            <input
              type="range"
              min={min}
              max={max}
              value={selectedTimeRange.startTime.split(":")[0]}
              ref={minValRef}
              onChange={(event) => {
                const value = Math.min(+event.target.value, +selectedTimeRange.endTime.split(":")[0] - 1);
                setSelectedTimeRange({ ...selectedTimeRange, startTime: `${value < 10 ? "0" + value : value}:00:00` });
              }}
              className={classnames("thumb thumb--zindex-3", {
                "thumb--zindex-5": +selectedTimeRange.startTime.split(":")[0] > max - 4
              })}
            />
            <input
              type="range"
              min={min}
              max={max}
              value={selectedTimeRange.endTime.split(":")[0]}
              ref={maxValRef}
              onChange={(event) => {
                const value = Math.max(+event.target.value, +selectedTimeRange.startTime.split(":")[0] + 1);
                setSelectedTimeRange({ ...selectedTimeRange, endTime: `${value < 10 ? "0" + value : value}:00:00` });
              }}
              className="thumb thumb--zindex-4"
            />
            <div className="slider">
              <div className="slider__track" />
              <div ref={range} className="slider__range !bg-primary" />
              <div className="slider__left-value">{selectedTimeRange.startTime}</div>
              <div className="slider__right-value">{selectedTimeRange.endTime}</div>
            </div>
          </div>
          <div className='flex items-center gap-4 mt-12'>
            <button className="w-full rounded-full px-8 py-2" onClick={handleClearFilter}>Clear</button>
            <button className="bg-primary text-white w-full rounded-full px-8 py-2" onClick={() => setIsOpen(false)}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomAgeFilterButton;
