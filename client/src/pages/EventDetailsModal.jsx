import React from 'react';

function EventDetailsModal({ event, onClose }) {
  if (!event) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h2>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">Date:</span>
            <span className="text-gray-900">{event.date}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">Type:</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {event.type}
            </span>
          </div>
          
          <div>
            <span className="text-gray-600 font-medium block mb-1">Description:</span>
            <p className="text-gray-900">{event.description}</p>
          </div>

          {event.imageUrl && (
            <div className="mt-4">
              <img
                src={event.imageUrl}
                alt="event"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailsModal;