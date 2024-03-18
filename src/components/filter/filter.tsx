  import React, { useState, useEffect, useRef } from 'react';

  interface Option {
    name: string;
    value: string;
  }

  interface CustomFilterButtonProps {
    options: Option[];
    name: string;
    onChange: (selectedOptions: Option[]) => void;
    active? :string | null;
  }

  const CustomFilterButton: React.FC<CustomFilterButtonProps> = ({ name, options, onChange, active }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempSelectedOptions, setTempSelectedOptions] = useState<Option[]>([]);

    const handleToggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleOptionChange = (option: Option) => {
      const isOptionSelected = tempSelectedOptions.some(
        (selectedOption) => selectedOption.value === option.value
      );
      const updatedOptions = isOptionSelected
        ? tempSelectedOptions.filter((item) => item.value !== option.value)
        : [...tempSelectedOptions, option];
      setTempSelectedOptions(updatedOptions);
    };

    const handleApplyFilter = () => {
      onChange(tempSelectedOptions);
      setIsOpen(false);
    };

    const handleClearFilter = () => {
      setTempSelectedOptions([]);
      onChange([]);
      setIsOpen(false);
    };

    useEffect(() => {
      if(active){
        setTempSelectedOptions([{name:active, value:active.toUpperCase()}]);
      }
    }, [])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const current = document.getElementById(name);
        console.log(current)
        if (current && !current.contains(event.target as Node)) {
          handleApplyFilter();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    
    return (
      <div className="custom-filter-button relative" id={name}>
        <button onClick={handleToggleDropdown} className={`px-6 py-2 text-sm font-medium rounded-full border ${isOpen || tempSelectedOptions.length > 0 ? "border-primary text-primary" : "border-black text-black"}`}>{name}</button>
        {isOpen && (
          <div className="absolute top-12 left-0 z-10 bg-white rounded-xl border p-4 max-w-max">
            <div className='grid grid-cols-2 gap-4'>
              {options.map((option) => (
                <div key={option.value} className="checkboxes__item">
                  <label className="checkbox style-c">
                    <input type="checkbox" value={option.value}
                      checked={tempSelectedOptions.some(
                        (selectedOption) => selectedOption.value === option.value
                      )}
                      onChange={() => {handleOptionChange(option)
                      }}/>
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
