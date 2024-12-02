import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  }
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-lg">
      <h1 className="font-bold text-xl mb-4">Filter Jobs</h1>
      <hr className="mb-4" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h1 className="font-semibold text-lg mb-2">{data.filterType}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={item} className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="text-sm">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
