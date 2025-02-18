import { useChatStore } from '@/services/operations/useChatStore';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../common/Loader';

function AuthProvider({ children }) {
  const { token, user } = useSelector((state) => state.auth);
  const { initSocket, disconnectSocket } = useChatStore();
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (token) {
          // console.log(user?._id);
          if (user?._id) {
            initSocket(user?._id);
          }
        }
      } catch (error) {
        console.log("Error in auth provider", error);
      }
    }
    initAuth();
    // clean up
    return () => disconnectSocket();
  }, [token, user?._id]);

  //   if (loading) return (
  //     <div>
  //         <Loader />
  //     </div>
  //   );
  return <>{children}</>
}

export default AuthProvider;