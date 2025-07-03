import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(data) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Registration error:", err?.response?.data?.message || err.message);
    throw err;
  }
}

export async function loginUser(data) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Registration error:", err?.response?.data?.message || err.message);
    throw err;
  }
}

export async function getAllAdmin() {
  try {
    const response = await axios.get(
        `${API_BASE_URL}/api/auth/admin`);
    return response.data; 
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function getAllSubjects(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
   `${API_BASE_URL}/api/subject/get-all-subject`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function addNewCourses(token, data) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      API_BASE_URL + `/api/course/create`,
      data,
      { headers }
    );  

    console.log(response, "errrrrrrrrr");
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function getCourseFilter(token, page, searchInput, createdByFilter, subjectFilter) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const params = new URLSearchParams({
    page: page || 1,
    courseName: searchInput || "",
    createdBy: createdByFilter || "",
    subjectId: subjectFilter || "",
  });

  try {
    const response = await axios.get(`${API_BASE_URL}/api/course/get-courses?${params}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}


export async function getLectureFilter(token, page, searchInput, createdByFilter, subjectFilter,courseFilter) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const params = new URLSearchParams({
    page: page || 1,
    lectureName: searchInput || "",
    createdBy: createdByFilter || "",
    subjectId: subjectFilter || "",
    courseId: courseFilter || "",
  });

  try {
    const response = await axios.get(`${API_BASE_URL}/api/lecture/get-lectures?${params}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}

export const updateCourseDetails = async (token, courseId, data) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/course/update/${courseId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating course:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Update failed",
    };
  }
};

export async function getSubjectsFilter(token, page, searchInput, createdByFilter) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const params = new URLSearchParams({
    page: page || 1,
    subjectName: searchInput || "",
    createdBy: createdByFilter || "",
  });
  try {
    const response = await axios.get(
 `${API_BASE_URL}/api/subject/get-sujects?${params}`, { headers });
 console.log("res::",response.data)
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}



export async function getAllUsers(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
 `${API_BASE_URL}/api/auth/get-all-users`,
      { headers }
    );
    return response.data; 
  } catch (error) {
    console.log(error.message);
    throw error; 
  }
}





export const updateSubjectDetails = async (id, payload, token) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/subject/update/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};
export async function createSubject(token, data) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      API_BASE_URL + `/api/subject/create`,
      data,
      { headers }
    );

    console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export async function craeteLecture(token, formData) {
  try {
    const response = await axios.post(
      API_BASE_URL + `/api/lecture/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}


export async function getListOfCourses(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
     `${API_BASE_URL}/api/course/get-all-courses`,
      { headers }
    );
    // console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export const updateUserDeatilss = async (id, formData, token) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/auth/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

export async function getDashboardstats(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
     `${API_BASE_URL}/api/dashboard/stats`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
