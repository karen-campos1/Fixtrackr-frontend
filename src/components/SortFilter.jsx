import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import blueChevronIcon from '../assets/blue-chevron.png';

const SortFilter = ({units,sortParams,setSortParams,closeMenu}) => {
  const [filters,setFilters] = useState({...sortParams})
  const navigate = useNavigate()

  const handleSortChange = (e) => {
    setFilters({...filters,field:e.target.value})
  };

  const handlePriorityChange = (e) => {
    setFilters({...filters,priority:e.target.checked ? e.target.name : ""})
  };

  const handleUnitsChange = (e) => {
    setFilters({...filters,unit:e.target.checked ? e.target.name : ""})
  };

  const handleShowResults = () => {
    setSortParams({...filters})
    closeMenu()

  };

  return (
      <div className="px-8"  style = {{ marginTop: '24px' }}>
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
                checked={filters.field === 'most_recently_updated'}
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
                checked={filters.field === 'least_recently_updated'}
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
                checked={filters.field === 'highest_priority'}
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
                checked={filters.priority === "high"}
                onChange={handlePriorityChange}
                className="h-6 w-6 border-gray-300 text-[#333333]"
              />
              High Priority
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="low"
                checked={filters.priority === "low"}
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
            {[...units].map((unit,index)=>(
              <label className="flex items-center gap-3" key = {index}>
              <input
                type="checkbox"
                name= {unit.id}
                checked={Number(filters.unit) === unit.id}
                onChange={handleUnitsChange}
                className="h-6 w-6 border-gray-300 text-[#333333]"
              />
              {unit.title}
            </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleShowResults}
          className="w-full py-4 text-white bg-[#0466C8] rounded-[25px] text-[18px] font-[500] text-center"
        >
          Show Results
        </button>
      </div>
    // </div>
  );
};

SortFilter.propTypes = {
  units: PropTypes.array.isRequired,
  sortParams: PropTypes.object.isRequired,
  setSortParams: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default SortFilter;
