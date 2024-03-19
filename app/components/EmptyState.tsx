import React from "react";

const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-gray-100">
      <div className="max-w-lg mx-auto space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Welcome to Chat Buddy
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Get started by searching for a user or creating a new chat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
