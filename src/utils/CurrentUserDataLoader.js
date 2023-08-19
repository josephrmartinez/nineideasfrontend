// // UserDataLoader.js
// import React from 'react';
// import { useAuth } from '../contexts/authContext';
// import { getUserData } from './user';

// function CurrentUserDataLoader({ children }) {
//   const { userId } = useAuth();
//   const { data: userData} = getUserData(userId);

//   // Pass the userData to the child components
//   return React.cloneElement(children, { userData });
// }

// export default CurrentUserDataLoader;
