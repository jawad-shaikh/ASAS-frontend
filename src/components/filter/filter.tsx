import React, { useState } from 'react';

interface Option {
  name: string;
  value: string;
}

interface CustomFilterButtonProps {
  options: Option[];
  name:string;
  onChange: (selectedOptions: Option[]) => void;
}

const CustomFilterButton: React.FC<CustomFilterButtonProps> = ({ name, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [tempSelectedOptions, setTempSelectedOptions] = useState<Option[]>([]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTempSelectedOptions(selectedOptions);
    }
  };

  const handleOptionChange = (option: Option) => {
    const updatedOptions = tempSelectedOptions.includes(option)
      ? tempSelectedOptions.filter((item) => item !== option)
      : [...tempSelectedOptions, option];
    setTempSelectedOptions(updatedOptions);
  };

  const handleApplyFilter = () => {
    setSelectedOptions(tempSelectedOptions);
    onChange(tempSelectedOptions);
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setTempSelectedOptions([]);
    setSelectedOptions([]);
    onChange([]);
    setIsOpen(false);
  };

  return (
    <div className="custom-filter-button relative">
      <button onClick={handleToggleDropdown} className={`px-6 py-2 text-sm font-medium rounded-full border ${isOpen ? "border-primary text-primary": "border-black text-black"}`}>{name}</button>
      {isOpen && (
        <div className="absolute top-12 left-0 z-10 bg-white rounded-xl border p-4 max-w-max">
          <div className='grid grid-cols-2 gap-4'>
          {options.map((option) => (
            <div key={option.value} className="checkboxes__item">
            <label className="checkbox style-c">
              <input type="checkbox" value={option.value}
                checked={tempSelectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}/>
              <div className="checkbox__checkmark"></div>
              <div className="text-sm">{option.name}</div>
            </label>
          </div>
          ))}
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

export default CustomFilterButton;
