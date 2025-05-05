import React from 'react';

function EventItem({ event, onEdit, onDelete, onViewDetails }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt="event"
          className="w-16 h-16 object-cover rounded-md"
        />
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {event.type}
          </span>
          <span>{event.date}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(event)}
          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
        >
          Details
        </button>
        <button
          onClick={() => onEdit(event)}
          className="px-3 py-1 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(event._id)}
          className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventItem;