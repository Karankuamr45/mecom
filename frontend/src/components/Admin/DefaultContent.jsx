import React from 'react'

function DefaultContent() {
  return (
    <div className="flex-1 bg-gray-200 p-8">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
       
     
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Sample cards */}
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Total Users</h2>
      <p className="text-gray-600">1,234</p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
      <p className="text-gray-600">567</p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Revenue</h2>
      <p className="text-gray-600">$12,345</p>
    </div>
  </div>
  </div>
  )
}

export default DefaultContent
