import React, { useState } from 'react';
import EventItem from './EventItem';

function EventList({ events, onEdit, onDelete, onViewDetails, onAdd, onSearch }) {
  const [search, setSearch] = useState('');

  function handleSearch(e) {
    setSearch(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Event
        </button>
      </div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No events found.
          </div>
        ) : (
          events.map(event => (
            <EventItem
              key={event._id}
              event={event}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default EventList;