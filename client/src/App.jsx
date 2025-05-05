import React, { useEffect, useState } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from './api';
import EventForm from './pages/eventform';
import EventDetailsModal from './pages/EventDetailsModal';
import EventList from './pages/EventList';


const EVENT_TYPES = [
  { name: 'Seminar', color: 'blue', icon: 'M18 11c0 0.56-.06 1.11-.14 1.64l-2.34-.73c.04-.31.08-.63.08-.95 0-.8-.24-1.55-.65-2.18L17 7.43c.61.93 1 2.04 1 3.24zm-3.31 4.8l1.41 4.47c.09.3.03.64-.16.89-.19.26-.49.41-.81.41-.16 0-.31-.04-.46-.11l-3.19-1.22c-1.43.66-3 1.03-4.65 1.03-1.83 0-3.53-.47-5.03-1.29l-.2-.1 3.37-3.37c.58.29 1.23.44 1.92.44 2.39 0 4.31-1.92 4.31-4.31 0-.7-.16-1.36-.45-1.94l3.02-3.02.1.2c.82 1.5 1.29 3.2 1.29 5.03 0 1.65-.36 3.22-1.03 4.65l1.22 3.2zm-11.91-3.03c-.8 0-1.55-.24-2.18-.65l-1.34 2.3c.93.61 2.04 1 3.24 1 .21 0 .42-.02.63-.06l.73 2.34c-.56.08-1.1.14-1.66.14-2.58 0-4.89-1.2-6.39-3.07L2.83 16c-.34.3-.77.46-1.23.46-.39 0-.77-.12-1.08-.35-.48-.35-.77-.91-.77-1.5V4.77c0-.8.65-1.45 1.45-1.45.33 0 .64.11.9.31l1.31 1.02C4.9 3.08 6.99 2 9.31 2c5.51 0 10 4.49 10 10 0 2.32-1.08 4.41-2.65 5.9l1.02 1.31c.2.26.31.57.31.9 0 .8-.65 1.45-1.45 1.45h-9.77c-.59 0-1.15-.29-1.5-.77-.23-.31-.35-.69-.35-1.08 0-.46.16-.89.46-1.23l1.05-1.18c-1.13-.58-1.93-1.65-2.18-2.9h-3.73c-.35 0-.62-.28-.62-.62 0-.35.28-.62.62-.62h3.72c.17-.9.63-1.7 1.29-2.31L5.82 9.31l.76-.76 6.59 6.59c-.19.09-.39.14-.61.14z' },
  { name: 'Workshop', color: 'emerald', icon: 'M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6zM20.25 10.332v8.918a.75.75 0 01-.75.75H4.5a.75.75 0 01-.75-.75v-8.918l.416.277c.194.13.43.202.677.202.41 0 .802-.165 1.15-.475.363-.324.525-.721.525-1.094 0-.287-.09-.533-.268-.745l.268-.179v.201c.331.214.582.547.582.976 0 .598-.409 1.082-.775 1.385-.366.303-.89.546-1.534.546a2.144 2.144 0 01-1.24-.386L3.35 10.332v8.918a.75.75 0 00.75.75h15a.75.75 0 00.75-.75v-8.918l-.274.183c-.306.204-.669.316-1.031.316-.639 0-1.25-.37-1.623-.89-.373-.52-.376-1.19-.376-1.617 0-.19.033-.383.1-.556l.274-.182v.184c.367.13.602.483.602.909 0 .428-.155.775-.389.975-.234.2-.56.341-.986.341a1.66 1.66 0 01-.943-.297l-.274-.182z' },
  { name: 'Competition', color: 'amber', icon: 'M16.403 12.652a3 3 0 000-5.304 3 3 0 00-5.304 0 3 3 0 00-5.304 0 3 3 0 000 5.304 3 3 0 005.304 0 3 3 0 005.304 0z' },
  { name: 'Other', color: 'gray', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h-1.5m-15 0v11.25A2.25 2.25 0 006 16.5h12a2.25 2.25 0 002.25-2.25V3m-15 0v11.25A2.25 2.25 0 006 16.5h12a2.25 2.25 0 002.25-2.25V3M6 7.5h.75m-.75 3h.75m5.25-3H18m-5.25 3H18' }
];

function App() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [detailsEvent, setDetailsEvent] = useState(null);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);


  async function loadEvents(query = '') {
    try {
      const data = await fetchEvents(query);
      setEvents(data);
    } catch (error) {
      console.error("Failed to load events:", error);
      // In a real app, you'd show a toast notification here
    }
  }

  useEffect(() => {
    loadEvents();
    
    // Check for user preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  function handleAdd() {
    setEditingEvent(null);
    setShowForm(true);
  }

  function handleEdit(event) {
    setEditingEvent(event);
    setShowForm(true);
  }

  function handleViewDetails(event) {
    setDetailsEvent(event);
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        loadEvents(search);
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    }
  }

  async function handleSave(form) {
    try {
      if (editingEvent) {
        await updateEvent(editingEvent._id, form);
      } else {
        await createEvent(form);
      }
      setShowForm(false);
      setEditingEvent(null);
      loadEvents(search);
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  }

  function handleCancelForm() {
    setShowForm(false);
    setEditingEvent(null);
  }

  function handleSearch(query) {
    setSearch(query);
    loadEvents(query);
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${darkMode ? 'bg-purple-700' : 'bg-purple-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {/* <h1 className={`ml-3 text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Event<span className="text-purple-600">Pulse</span>
              </h1> */}
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              {/* <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button> */}
              
              {/* Add Event Button (only shown when not in form view) */}
              {!showForm && (
                <button
                  onClick={handleAdd}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium text-white ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Event
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Event Categories */}
          {!showForm && (
            <div className="mb-8">
              <h2 className={`text-lg font-medium mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Event Categories</h2>
              <div className="flex flex-wrap gap-3">
                {EVENT_TYPES.map((type) => (
                  <div 
                    key={type.name}
                    className={`flex items-center px-4 py-2 rounded-full ${
                      darkMode 
                        ? `bg-${type.color}-900 bg-opacity-30 text-${type.color}-300` 
                        : `bg-${type.color}-100 text-${type.color}-800`
                    } cursor-pointer hover:shadow-md transition-shadow duration-200`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={type.icon} />
                    </svg>
                    <span className="text-sm font-medium">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form or Event List */}
          {showForm ? (
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform`}>
              <div className={`px-6 py-4 ${darkMode ? 'bg-purple-900' : 'bg-purple-600'} flex justify-between items-center`}>
                <h2 className="text-xl font-semibold text-white">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h2>
                <button 
                  onClick={handleCancelForm}
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <EventForm
                  onSave={handleSave}
                  onCancel={handleCancelForm}
                  initialData={editingEvent}
                  types={EVENT_TYPES.map(type => type.name)}
                  darkMode={darkMode}
                />
              </div>
            </div>
          ) : (
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg overflow-hidden transition-all duration-300`}>
              <div className={`px-6 py-4 ${darkMode ? 'bg-gradient-to-r from-purple-900 to-indigo-900' : 'bg-gradient-to-r from-purple-600 to-indigo-600'} flex justify-between items-center`}>
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  All Events
                </h2>
                <div className="text-white text-sm">
                  {events.length} {events.length === 1 ? 'event' : 'events'} found
                </div>
              </div>
              <div className="p-6">
                <EventList
                  events={events}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onViewDetails={handleViewDetails}
                  onAdd={handleAdd}
                  onSearch={handleSearch}
                  eventTypes={EVENT_TYPES}
                  darkMode={darkMode}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-auto`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${darkMode ? 'bg-purple-700' : 'bg-purple-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                EventPulse &copy; {new Date().getFullYear()}
              </span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>About</a>
              <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>Privacy</a>
              <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>Terms</a>
              <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={detailsEvent}
        onClose={() => setDetailsEvent(null)}
        eventTypes={EVENT_TYPES}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;

