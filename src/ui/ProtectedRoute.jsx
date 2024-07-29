import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  //1.Load the authenticated user
  const { isLoading, isAuthenticated, fetchStatus } = useUser();
  const navigate = useNavigate();

  //2.IF NO authenticated user , REDERICT to Login Page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== 'fetching')
        navigate('/login');
    },
    [isAuthenticated, isLoading, navigate, fetchStatus]
  );

  //3.IF loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
