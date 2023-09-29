import { userAction } from "./UserSlice";

export const onUpdate =(data)=>{
     return async(dispatch)=>{
        const updateProfile = async()=>{
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCh0DdNizJKJ2QcnYd7Kf4Y4k5AuOQPffE",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    idToken: data.token,
                    displayName: data.name,
                    photoUrl: data.profile,
                    returnSecureToken: true,
                  }),
                }
              );
              if (!response.ok) {
                throw new Error('updating user Data failed');
              }
              const profileData = await response.json();
              return profileData;
            }
            
            try {
                const data = await updateProfile();
                console.log(data);
                dispatch(userAction.updateProfileData({
                  userName : data.displayName,
                  profilePicture: data.photoUrl,
                }))
                
              }catch(error) {
                console.error("Error updating profile:", error);
              }
     }
}

export const fetchUserData =(token)=>{
  return async(dispatch)=>{
    const fetchData = async()=>{
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCh0DdNizJKJ2QcnYd7Kf4Y4k5AuOQPffE',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
        }),
      }
    );
    const data = await response.json();

    return data;
  };
  try {
    const userData = await fetchData();
    dispatch(
      userAction.userLoginDetails({
        email: userData.users[0].email,
        displayName: userData.users[0].displayName,
        token: token,
        emailVerified : userData.users[0].emailVerified,
        profilePicture : userData.users[0].photoUrl
      })
    );
  } catch (error) {
    console.log(error);
  }
};
};


export const logOut = () => {
  return async (dispatch) => {
    console.log('logout recieved');
    console.log('logoutCalled');
    dispatch(userAction.logOutMethod())
  }
}