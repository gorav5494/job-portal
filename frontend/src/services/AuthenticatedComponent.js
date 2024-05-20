import React, { useEffect } from 'react';

const AuthenticatedComponent = () => {
    
  const TOKEN_EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

  useEffect(() => {
    let inactivityTimer;

    // Set up event listeners
    window.addEventListener('beforeunload', handleWindowClose);
    // document.addEventListener('mousemove', resetInactivityTimer);
    // document.addEventListener('keydown', resetInactivityTimer);

    // Start the inactivity timer
    resetInactivityTimer();

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    //   document.removeEventListener('mousemove', resetInactivityTimer);
    //   document.removeEventListener('keydown', resetInactivityTimer);
      clearTimeout(inactivityTimer);
    };
  }, []);

  const handleWindowClose = () => {
    // Remove tokens from storage when the window is closed
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const resetInactivityTimer = () => {
    // Clear the existing inactivity timer
    clearTimeout(inactivityTimer);

    // Set a new inactivity timer
    inactivityTimer = setTimeout(() => {
      // Remove tokens from storage when the user is inactive
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Redirect to the login page or perform other logout actions
      window.location.href = '/login';
    }, TOKEN_EXPIRATION_TIME);
  };

  return (
    <div>
      {/* Your authenticated component content */}
    </div>
  );
};

export default AuthenticatedComponent;