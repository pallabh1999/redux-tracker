import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userName: null,
    token: null,
    email: '',
    isLoggedIn: false,
    emailVerify: false,
    premium: false,
    profilePicture: null,
  },
  reducers: {
    setToken(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = !!state.token;
    },
    logOutMethod(state) {
      localStorage.removeItem('userDetails');
      state.email = '';
      state.token = null;
      state.isLoggedIn = false;
    },
    setPremium(state) {
      state.premium = true;
    },
    updateProfileData(state, action) {
      const { userName, profilePicture } = action.payload;
      state.userName = userName;
      state.profilePicture = profilePicture;
    },
    setLogin(state) {
      const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
      state.token = storedUserDetails ? storedUserDetails.token : null;
      state.email = storedUserDetails ? storedUserDetails.email : '';
      state.isLoggedIn = !!state.token;
    },
    userLoginDetails(state, action) {
      const { email, token, displayName, profilePicture, emailVerified } = action.payload;
      state.email = email.replace(/[@.]/g, '');
      state.token = token;
      state.userName = displayName;
      state.profilePicture = profilePicture;
      state.isLoggedIn = true;
      state.emailVerify = emailVerified;
    }
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
