"use client"
import ConfirmationDialog from '@/components/ConfirmationDialog';
import ResourcesTable from '@/components/Resourcetable';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
 // Adjust the import path as needed

const Page: React.FC = () => {
  const { user } = useUser();
  const [showDialog, setShowDialog] = useState(!user);

  const handleConfirm = () => {
    window.location.href = '/sign-in'; // Redirect to the sign-in page
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  if (showDialog) {
    return (
      <ConfirmationDialog
        message="You need to be logged in to use this feature."
        confirmText="Sign In"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div>
      <ResourcesTable />
    </div>
  );
};

export default Page;
