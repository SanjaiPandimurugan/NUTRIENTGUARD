import React from 'react';

const About = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-emerald-800">About Fertile Future</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-emerald-800">Our Mission</h2>
        <p className="text-gray-700">
          At Fertile Future, we are committed to revolutionizing agriculture through smart technology. 
          Our goal is to empower farmers with real-time soil nutrient data, enabling them to make 
          informed decisions that optimize crop yield while minimizing environmental impact.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-emerald-800">How It Works</h2>
        <p className="text-gray-700">
          Our advanced sensors continuously monitor soil nutrient levels, providing accurate and 
          up-to-date information on nitrogen, phosphorus, potassium, and other key elements. 
          This data is then analyzed to provide personalized recommendations for fertilizer 
          application, ensuring that your crops receive exactly what they need, when they need it.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-emerald-800">Contact Us</h2>
        <p className="text-gray-700">
          Have questions or need support? We're here to help!
        </p>
        <p className="text-gray-700 mt-2">
          Email: support@fertilefuture.com<br />
          Phone: +1 (555) 123-4567<br />
          Address: 123 Green Street, Agriville, CA 98765
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-emerald-800">Version Information</h2>
        <p className="text-gray-700">
          Fertile Future Dashboard v1.0.0<br />
          © 2023 Fertile Future Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;