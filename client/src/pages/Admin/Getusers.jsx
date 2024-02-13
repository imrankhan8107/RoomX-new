import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Getusers() {
  const { org_name, org_code } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState({ name: "", email: "" });
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const authtoken = localStorage.getItem('authtoken');

    fetch('http://localhost:8001/api/admin/getusersorg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': authtoken,
      },
      body: JSON.stringify({ org_name, org_code }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error('Error:', data.error);
        } else {
          setUsers(data.usersPerOrg);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [org_name, org_code]);


  const deleteUser = (username, email) => {
    const authtoken = localStorage.getItem('authtoken');

    fetch('http://localhost:8001/api/admin/deleteuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': authtoken,
      },
      body: JSON.stringify({ username, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("user deleted successfully")
          const updatedUsers = users.filter(
            (user) => user.username !== username && user.email !== email
          );
          setUsers(updatedUsers);
        } else {
          console.error('Error deleting the user:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  const handleSearchInputChange = (event, field) => {
    setSearchQuery((prevSearch) => ({ ...prevSearch, [field]: event.target.value }));
  };


  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().startsWith(searchQuery.name.toLowerCase()) &&
    user.email.toLowerCase().startsWith(searchQuery.email.toLowerCase())
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Clear the message after 2 seconds
      })
      .catch(() => setCopySuccess('Failed to copy. Please copy manually.'));
  };


//   if (loading) {
//     return <div>Loading...</div>;
//   }

  return (
    <div className="p-4">
  <h2 className="text-3xl font-bold mb-5 text-center py-5 bg-green-100 rounded-md sm:py-10">Users for Organization: {org_name}</h2>

  <div className="flex flex-col items-center mb-5">
    <div className="relative mb-2 w-full">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery.name}
        onChange={(e) => handleSearchInputChange(e, "name")}
        className="p-2 mb-2 sm:mb-0 sm:ml-2 border rounded w-full sm:w-auto"
      />
      <input
        type="text"
        placeholder="Search by email"
        value={searchQuery.email}
        onChange={(e) => handleSearchInputChange(e, "email")}
        className="p-2 mb-2 sm:mb-0 sm:ml-2 border rounded w-full sm:w-auto"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {filteredUsers.map((user) => (
      <div
        key={user._id}
        className="bg-indigo-200 hover:bg-indigo-100 text-gray-800 rounded-lg shadow-md p-4 m-2 transition-transform transform hover:scale-105 cursor-pointer"
        onClick={() => copyToClipboard(user.email)}
      >
        <div>
          <p className="text-lg font-bold mb-1">Username: {user.username}</p>
          <p className="text-sm"><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="flex justify-between mt-2">
          <button
            className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700 hover:text-white mr-1"
            onClick={(e) => {
              e.stopPropagation();
              deleteUser(user.username, user.email);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
    {copySuccess && (
      <div className="fixed top-5 right-5 bg-yellow-500 text-white p-2 rounded">
        {copySuccess}
      </div>
    )}
  </div>
</div>

  );
}

export default Getusers;