import axios from 'axios';

const API_URL = 'http://localhost:8080/kiddohealth';

// Register parent
export const registerParent = async (parentData) => {
  try {
    // Assuming your backend has an endpoint like POST /parent/create (adjust if different)
    const response = await axios.post(`${API_URL}/parent/create`, parentData);
    return response.data; // should include saved parent with an ID
  } catch (error) {
    console.error('Error registering parent:', error.response || error.message);
    throw error;
  }
};

// Register child
export const registerChild = async (parentId, childData) => {
  try {
    // Your backend expects POST /child/create, and child JSON includes parent with parentId
    const childPayload = {
      identityNumber: childData.identityNumber,
      name: childData.name,
      surname: childData.surname,
      age: parseInt(childData.age), // Convert to number if needed
      dateOfBirth: childData.dateOfBirth,
      gender: childData.gender,
      parent: { userId: parentId },  // Adjust "userId" if your Parent entity's ID field has a different name
    };

    const response = await axios.post(`${API_URL}/child/create`, childPayload);
    return response.data;
  } catch (error) {
    console.error('Error registering child:', error.response || error.message);
    throw error;
  }
};

//user login
/*export const loginUser = async (email, password , role) => {
  try {
     const response = await axios.post(`${API_URL}/parent/login`,  {
      email,
      password,
     role: role.toUpperCase(),
    });
    return response.data; // Should include user details + maybe children list
  } catch (error) {
    console.error('Login error:', error.response || error.message);
    throw error;
  }
};*/
export const loginUser = async (email, password, role) => {
  try {
    const endpoint = role.toLowerCase() === 'doctor' ? 'doctor/login' : 'parent/login';
    const response = await axios.post(`${API_URL}/${endpoint}`, {
      email,
      password,
      role: role.toUpperCase(),
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response || error.message);
    throw error;
  }
};


//doctor registration
export const registerDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${API_URL}/doctor/create`, doctorData);
    return response.data;
  } catch (error) {
    console.error('Doctor registration error:', error.response || error.message);
    throw error;
  }
};

// Get user by email
export const getUserByEmail = async (email, role) => {
  try {
    const endpoint = role.toLowerCase() === 'doctor' ? 'doctor/byEmail' : 'parent/byEmail';
    const response = await axios.get(`${API_URL}/${endpoint}/${email}`);
    return response.data;
  } catch (error) {
    console.error('Get user error:', error.response || error.message);
    throw error;
  }
};

// Update user password
export const updateUserPassword = async (userId, newPassword, role) => {
  try {
    const endpoint = role.toLowerCase() === 'doctor' ? 'doctor/updatePassword' : 'parent/updatePassword';
    const response = await axios.put(`${API_URL}/${endpoint}/${userId}`, { password: newPassword });
    return response.data;
  } catch (error) {
    console.error('Update password error:', error.response || error.message);
    throw error;
  }
};

// getchild name
export const getChildrenByParent = async (parentId) => {
  try {
    const response = await axios.get(`${API_URL}/child/byParent/${parentId}`);
    return response.data; // array of children
  } catch (error) {
    console.error("Error fetching children:", error.response || error.message);
    throw error;
  }
};




