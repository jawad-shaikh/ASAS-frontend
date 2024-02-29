import React, { useState } from 'react';

interface CustomAgeFilterButtonProps {
  name: string;
  onChange: (selectedAges: any[]) => void;
}

const CustomAgeFilterButton: React.FC<CustomAgeFilterButtonProps> = ({ name, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedMonths, setTempSelectedMonths] = useState<string[]>([]);
  const [tempSelectedYears, setTempSelectedYears] = useState<number[]>([]);
  const ageRanges = ["0-3", "3-6", "6-9", "9-12", "12-18", "18-24"];
  const maxAge = 16;

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMonthSelect = (value: string) => {
    if (tempSelectedMonths.includes(value)) {
      // If month is already selected, remove it
      setTempSelectedMonths(tempSelectedMonths.filter(selectedMonth => selectedMonth !== value));
    } else {
      // If month is not selected, add it
      setTempSelectedMonths([...tempSelectedMonths, value]);
    }
  };

  const handleYearSelect = (value: number) => {
    if (tempSelectedYears.includes(value)) {
      // If year is already selected, remove it
      setTempSelectedYears(tempSelectedYears.filter(selectedYear => selectedYear !== value));
    } else {
      // If year is not selected, add it
      setTempSelectedYears([...tempSelectedYears, value]);
    }
  };

  const handleApplyFilter = () => {
    const selectedAges = [...tempSelectedYears, ...tempSelectedMonths];
    onChange(selectedAges);
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setTempSelectedMonths([]);
    setTempSelectedYears([]);
    onChange([]);
    setIsOpen(false);
  };

  return (
    <div className="custom-filter-button relative">
      <button onClick={handleToggleDropdown} className={`px-6 py-2 text-sm font-medium rounded-full border ${isOpen || tempSelectedMonths.length > 0 || tempSelectedYears.length > 0 ? "border-primary text-primary" : "border-black text-black"}`}>{name}</button>
      {isOpen && (
        <div className="absolute top-12 left-0 z-10 bg-white rounded-xl border p-4 max-w-max">
          <div className='grid grid-cols-2 gap-4'>
            {ageRanges.map((range) => (
              <button
                key={range}
                className={`px-4 py-2 text-sm font-medium rounded-md border ${
                  tempSelectedMonths.includes(range) ? "border-primary text-primary" : "border-black text-black"
                } ${tempSelectedMonths.includes(range) ? "bg-primary text-white" : "bg-white"} border-gray-300`}
                onClick={() => handleMonthSelect(range)}
              >
                {range}
              </button>
            ))}
          </div>
          <div className='grid grid-cols-5 gap-4 mt-4'>
            {Array.from({ length: maxAge }, (_, i) => i + 2).map((age) => (
              <button
                key={age}
                className={`py-2 px-5 flex items-center justify-center text-sm font-medium rounded-md border ${
                  tempSelectedYears.includes(age) ? "bg-primary text-white" : "bg-white border-gray-300"
                }`}
                onClick={() => handleYearSelect(age)}
              >
                {age}
              </button>
            ))}
            <button
              className={`py-2 px-5 flex items-center justify-center text-sm font-medium rounded-md border ${
                tempSelectedYears.includes(18) ? "bg-primary text-white" : "bg-white border-gray-300"
              }`}
              onClick={() => handleYearSelect(18)}
            >
              18+
            </button>
          </div>
          <div className='flex items-center gap-4 mt-4'>
            <button className="w-full rounded-full px-8 py-2" onClick={handleClearFilter}>Clear</button>
            <button className="bg-primary text-white w-full rounded-full px-8 py-2" onClick={handleApplyFilter}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomAgeFilterButton;
