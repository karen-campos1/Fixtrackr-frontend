import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import accountIcon from '../assets/account-icon.png';
import notificationIcon from '../assets/notification-icon.png';
import blueChevronIcon from '../assets/blue-chevron.png';

const SortFilter = () => {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState('most_recently_updated');
  const [priority, setPriority] = useState({
    high: false,
    low: false,
  });
  const [units, setUnits] = useState({
    unitA: false,
    unitB: false,
    unitC: false,
  });

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority({
      ...priority,
      [e.target.name]: e.target.checked,
    });
  };

  const handleUnitsChange = (e) => {
    setUnits({
      ...units,
      [e.target.name]: e.target.checked,
    });
  };

  const handleShowResults = () => {
    // Pass the selected filters and sorting to the TaskCardList component via state
    navigate('/task-list', {
      state: {
        sortBy,
        priority,
        units,
      },
    });
  };

  return (
    <div className="bg-[#F3F5F9] min-h-screen">
      {/* Header Section */}
      <header className="w-full h-[96px] bg-[#0466c8] flex items-center justify-between px-8 fixed top-0 left-0 z-10">
        <img
          src={accountIcon}
          alt="Account"
          className="cursor-pointer"
          onClick={() => navigate('/account')}
        />
        <img
          src={notificationIcon}
          alt="Notifications"
          className="cursor-pointer"
          onClick={() => navigate('/notifications')}
        />
      </header>

      {/* Main Content */}
      <div className="pt-[120px] px-8">
        <div className="flex items-center mb-8">
          <img
            src={blueChevronIcon}
            alt="Back"
            className="cursor-pointer"
            onClick={() => navigate('/task-list')}
            style={{ marginRight: '16px', marginTop: '14px' }}
          />
          <h1 className="text-[24px] font-[600] text-[#333333]">Sort & Filter</h1>
        </div>

        {/* Sort By Section */}
        <div className="mb-6">
          <h2 className="text-[24px] font-[600] text-[#333333] mb-4">Sort By</h2>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                value="most_recently_updated"
                checked={sortBy === 'most_recently_updated'}
                onChange={handleSortChange}
                className="h-6 w-6 border-gray-300 text-[#333333]"
              />
              Most Recently Updated
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                value="least_recently_updated"
                checked={sortBy === 'least_recently_updated'}
                onChange={handleSortChange}
                className="h-6 w-6 border-gray-300 text-[#333333]"
              />
              Least Recently Updated
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                value="highest_priority"
                checked={sortBy === 'highest_priority'}
                onChange={handleSortChange}
                className="h-6 w-6 border-gray-300 text-[#333333]"
              />
              Highest Priority
            </label>
          </div>
        </div>

        {/* Priority Section */}
        <div className="border-t border-[#D9D9D9] mb-6 pt-6">
          <h2 className="text-[24px] font-[600] text-[#333333] mb-4">Priority</h2>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="high"
                checked={priority.high}
                onChange={handlePriorityChange}
                className="h-6 w-6 border-gray-300 text-[#333333]"
              />
              High Priority
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="low"
                checked={priority.low}
                onChange={handlePriorityChange}
                className="h-6 w-6 border-gray-300 text-[#333333]"
              />
              Low Priority
            </label>
          </div>
        </div>

        {/* Units Section */}
        <div className="border-t border-[#D9D9D9] mb-6 pt-6">
          <h2 className="text-[24px] font-[600] text-[#333333] mb-4">Units</h2>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="unitA"
                checked={units.unitA}
                onChange={handleUnitsChange}
                className="h-6 w-6 border-gray-300 text-[#333333]"
              />
              123 Main St, unit 100
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="unitB"
                checked={units.unitB}
                onChange={handleUnitsChange}
                className="h-6 w-6 border-gray-300 text-[#333333]"
              />
              555 Dallas St, Lemon House
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="unitC"
                checked={units.unitC}
                onChange={handleUnitsChange}
                className="h-6 w-6 border-gray-300 text-[#333333]"
              />
              321 Yellow St, Chainey Duplex #A
            </label>
          </div>
        </div>

        <button
          onClick={handleShowResults}
          className="w-full py-4 text-white bg-[#0466C8] rounded-[25px] text-[18px] font-[500] text-center"
        >
          Show Results
        </button>
      </div>
    </div>
  );
};

export default SortFilter;
