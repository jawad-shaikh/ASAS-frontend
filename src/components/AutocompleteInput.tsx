import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useDebounce = <T extends unknown>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface Place {
  id: string;
  name: string;
  // Add more properties as needed
}

const AutocompleteInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const debouncedInputValue = useDebounce(inputValue, 300); // Debounce delay: 300ms

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get<{ results: Place[] }>(
          `${process.env.NEXT_PUBLIC_URL}/places?query=${debouncedInputValue}`
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    if (debouncedInputValue) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedInputValue]);

  const handleSelectPlace = (place: Place) => {
    setInputValue(place.name);
    // You can handle the selected place as needed
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type to search..."
      />
      <ul>
        {/* {suggestions.map((place) => (
          <li key={place.id} onClick={() => handleSelectPlace(place)}>
            {place.name}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default AutocompleteInput;
