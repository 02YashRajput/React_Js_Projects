import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin,CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import only `toast` for notifications

const GoogleButton: React.FC = () => {
  const navigate = useNavigate();

  const onSuccess = async (credentialResponse:CredentialResponse  ) => {
    try {
      const credential = 'credential' in credentialResponse ? credentialResponse.credential : '';
      const res = await axios.post('/api/auth/google', { credential });
      const data = res.data;

      if (res.status === 200 || res.status === 201) {
        toast.success(data.msg); // Display success toast
        navigate('/dashboard'); // Redirect to another route after successful login
      } else {
        toast.error(data.msg); // Display error toast
      }
    } catch (error) {
      toast.error('Login failed'); // Display error toast
      console.error('Login failed', error);
    }
  };

  const onError = () => {
    toast.error('Login Failed'); // Display error toast
  };

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
    />
  );
};

export default GoogleButton;
