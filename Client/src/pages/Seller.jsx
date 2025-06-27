import React from 'react'
import BecomeSeller from './BecomeSeller'
import UploadForm from './UploadForm' 
import { useLoadUserQuery } from '@/features/auth/authApi';
import SellerDashboard from './SellerDashboard';

const Seller = () => {
  const { data, isLoading } = useLoadUserQuery();
  const user = data?.user;

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <div className="text-xl font-bold text-center my-4">Seller Panel</div>

      {user?.role === "seller" ? (
        <>
          <p className="text-green-600 text-center">You are a verified seller.</p>
         { /*<UploadForm />*/} {/* UploadForm ya jo bhi seller ka component ho */}
         <SellerDashboard/>
        </>
      ) : (
        <BecomeSeller />
      )}
    </>
  );
};

export default Seller;
