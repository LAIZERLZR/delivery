const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
  user: null,
  role: null,
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case "user/signup/pending":
      return {
        ...state,
        loading: true,
      };
    case "user/signup/rejected":
      return {
        ...state,
        error: action.payload.error,
      };
    case "user/signup/fulfilled":
      return {
        ...state,
        loading: false,
        message: action.payload,
        role: action.payload.role,
      };
    case "user/signIn/pending":
      return {
        ...state,
        loading: true,
      };
    case "user/signIn/rejected":
      return {
        ...state,
        error: action.payload.error,
      };
    case "user/signIn/fulfilled":
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        error: null,
      };
    default:
      return state;
  }
};
export const register = ({
  login,
  password,
  email,
  name,
  role,
  lastName,
  business,
}) => {
  return async (dispatch) => {
    dispatch({ type: "user/signup/pending" });
    const response = await fetch("http://localhost:7777/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
        name,
        email,
        role,
        lastName,
        business,
      }),
    });
    const json = await response.json();
    if (json.error) {
      dispatch({ type: "user/signup/rejected", payload: json });
    } else {
      dispatch({ type: "user/signup/fulfilled", payload: json });
    }
  };
};

export const auth = ({ login, password, role }) => {
  return async (dispatch) => {
    dispatch({ type: "user/signIn/pending" });
    const response = await fetch("http://localhost:7777/user/auth", {
      method: "POST",
      body: JSON.stringify({ login, password, role }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (json.error) {
      dispatch({ type: "user/signIn/rejected", payload: json });
      throw new Error(json.error);
    } else {
      dispatch({ type: "user/signIn/fulfilled", payload: json });
    }
    localStorage.setItem("token", json.token);
    localStorage.setItem("role", role);
  };
};


