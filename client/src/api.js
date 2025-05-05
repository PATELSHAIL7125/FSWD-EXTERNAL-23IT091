
const API_URL = 'http://localhost:5000/api/events';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};


export const fetchEvents = async (query = '') => {
  try {
    const response = await fetch(`${API_URL}?search=${encodeURIComponent(query)}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Fetch single event by ID
export const fetchEvent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

// Create new event
export const createEvent = async (eventData) => {
  try {
    const formData = new FormData();
    
    // Append all event data to FormData
    Object.keys(eventData).forEach(key => {
      if (key === 'image' && eventData[key]) {
        formData.append('image', eventData[key]);
      } else {
        formData.append(key, eventData[key]);
      }
    });

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Update existing event
export const updateEvent = async (id, eventData) => {
  try {
    const formData = new FormData();
    
    // Append all event data to FormData
    Object.keys(eventData).forEach(key => {
      if (key === 'image' && eventData[key]) {
        formData.append('image', eventData[key]);
      } else {
        formData.append(key, eventData[key]);
      }
    });

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Delete event
export const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Upload event image
export const uploadEventImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};