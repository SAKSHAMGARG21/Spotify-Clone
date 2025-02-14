import { useChatStore } from '@/services/operations/useChatStore';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);
  const { initSocket, disconnectSocket } = useChatStore();
  // console.log(user._id);
  useEffect(() => {
    if (token) {
      if (user?._id)
        initSocket(user?._id);
    }
    return () => disconnectSocket();
  }, [token, user?._id]);
  if (token == null) {
    return <Navigate to='/login' />;
  } else {
    return children;
  }
}

export default PrivateRoute;