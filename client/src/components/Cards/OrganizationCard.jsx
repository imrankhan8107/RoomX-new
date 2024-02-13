import React from 'react';
import { Link } from 'react-router-dom';

function OrganizationCard({ org, handleSendCodeToEmail, handleDeleteOrganization }) {
  return (
    <div className="bg-indigo-200 hover:bg-indigo-100 text-gray-800 rounded-lg shadow-md p-4 m-4 transition-transform transform hover:scale-105 cursor-pointer">
      <Link to={`/admin/getusers/${org.org_name}/${org.org_code}`}>
        <h3 className="text-xl font-semibold">{org.org_name}</h3>
        <p>Email: {org.org_email}</p>
        <p>Code: {org.org_code}</p>
      </Link>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => handleSendCodeToEmail(org.org_name, org.org_email)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Send Mail
        </button>
        <button
          onClick={() => handleDeleteOrganization(org.org_name, org.org_email, org.org_code)}
          className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-gred-500 focus:ring-opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default OrganizationCard;