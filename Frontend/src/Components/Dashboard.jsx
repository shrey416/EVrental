import React from 'react';

// EVMapComponent (extracted from previous response)
const EVMapComponent = () => {
  // Replace with your actual Google Maps API Key
  const googleMapsApiKey = 'YOUR_API_KEY'; // **REPLACE THIS WITH YOUR ACTUAL API KEY**

  // Hardcoded coordinates for demonstration - replace with dynamic data
  const userLocation = { lat: 37.7749, lng: -122.4194 }; // San Francisco example
  const evLocations = [
    { lat: 37.7949, lng: -122.4094 }, // Example EV 1
    { lat: 37.7549, lng: -122.4294 }, // Example EV 2
  ];

  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/view?key=${googleMapsApiKey}¢er=${userLocation.lat},${userLocation.lng}&zoom=13`;

  // Function to generate markers URL parameter - Embed API is limited in marker customization
  const generateMarkersUrl = () => {
    let markersUrl = '';

    // User marker (using default red marker - Embed API has limited custom marker options)
    markersUrl += `markers=color:blue%7Clabel:U%7C${userLocation.lat},${userLocation.lng}`;

    // EV markers (using default red markers - Embed API has limited custom marker options)
    evLocations.forEach((ev, index) => {
      markersUrl += `&markers=color:green%7Clabel:E${index + 1}%7C${ev.lat},${ev.lng}`;
    });
    return markersUrl;
  };

  const mapEmbedUrlWithMarkers = `${mapEmbedUrl}&${generateMarkersUrl()}`;


  const handleExpandMap = () => {
    // You can implement your "Expand Map" functionality here.
    // For example, open a new window with a larger Google Map,
    // or use a modal to display a larger map.
    alert("Expand Map functionality to be implemented!"); // Placeholder
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Find Nearby Electric Vehicles</h2> {/* Text white for dark theme */}
          <span
            className="text-green-500 text-sm cursor-pointer hover:underline"
            onClick={handleExpandMap}
          >
            Expand Map
          </span>
        </div>
        <div className="bg-gray-900 rounded-lg p-6"> {/* Darker background */}
          <div className="relative h-96 rounded-lg overflow-hidden mb-4">
            {/* Google Map Embed */}
            <iframe
              title="Nearby EVs Map"
              width="100%" // Take full width of container
              height="100%" // Take full height of container
              frameBorder="0"
              style={{ border: 0 }}
              src={mapEmbedUrlWithMarkers}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>


            {/* Map Overlay (remains the same - positioned relative to iframe container) */}
            <div className="absolute top-4 left-4 bg-gray-900/80 p-4 rounded-lg max-w-xs">
              <div className="font-semibold mb-2 text-white">Nearest Available EVs</div> {/* Text white */}

              <div className="bg-green-500/10 border-l-4 border-green-500 rounded-r p-3 mb-3">
                <div className="font-semibold text-white">Tesla Model 3</div> {/* Text white */}
                <div className="text-gray-300 text-sm">0.7 miles away • 97% charged</div>
                <button className="mt-2 bg-green-500 text-gray-900 font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                  Get Directions
                </button>
              </div>

              <div className="bg-green-500/10 border-l-4 border-green-500 rounded-r p-3">
                <div className="font-semibold text-white">Volkswagen ID.4</div> {/* Text white */}
                <div className="text-gray-300 text-sm">1.2 miles away • 85% charged</div>
                <button className="mt-2 bg-green-500 text-gray-900 font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap gap-3">
              <button className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 hover:border-green-600 transition-colors"> {/* Green hover effect */}
                <i className="fa-solid fa-car"></i> All EVs
              </button>
              <button className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:border-green-500 transition-colors">
                <i className="fa-solid fa-battery-full"></i> Charging Stations
              </button>
              <button className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:border-green-500 transition-colors">
                <i className="fa-solid fa-bolt"></i> Fast Charging Only
              </button>
            </div>
            <button className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:border-green-500 transition-colors">
              <i className="fa-solid fa-ruler"></i> Distance: 5 miles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Dashboard = () => {
  return (
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-900 text-white"> {/* Main background dark, text white */}
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-700 transition-colors"> {/* Darker background, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">8</div>
                  <div className="text-gray-400 text-sm">Available Vehicles</div>
                </div>
                <div className="w-10 h-10 rounded bg-green-500/20 flex items-center justify-center text-green-500">
                  <i className="fa-solid fa-car"></i>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-700 transition-colors"> {/* Darker background, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">3</div>
                  <div className="text-gray-400 text-sm">Active Rentals</div>
                </div>
                <div className="w-10 h-10 rounded bg-green-500/20 flex items-center justify-center text-green-500">
                  <i className="fa-solid fa-key"></i>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-700 transition-colors"> {/* Darker background, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">85%</div>
                  <div className="text-gray-400 text-sm">KYC Completion</div>
                </div>
                <div className="w-10 h-10 rounded bg-green-500/20 flex items-center justify-center text-green-500">
                  <i className="fa-solid fa-clipboard-check"></i>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-700 transition-colors"> {/* Darker background, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">420</div>
                  <div className="text-gray-400 text-sm">CO₂ Kg Saved</div>
                </div>
                <div className="w-10 h-10 rounded bg-green-500/20 flex items-center justify-center text-green-500">
                  <i className="fa-solid fa-leaf"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <EVMapComponent /> {/* Integrate EVMapComponent here */}


          {/* Available EVs */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Available Electric Vehicles</h2> {/* Text white */}
              <span className="text-green-500 text-sm cursor-pointer hover:underline">View All</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:-translate-y-1 transition-transform hover:bg-gray-700"> {/* Darker background, hover effect */}
                <div className="relative h-40">
                  <img src="/api/placeholder/300/160" alt="Tesla Model 3" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-green-500 text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                    PREMIUM
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-2 text-white">Tesla Model 3</div> {/* Text white */}
                  <div className="flex gap-4 mb-3 text-gray-300 text-sm">
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-bolt"></i> 358 km range
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-battery-three-quarters"></i> 75 kWh
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-green-500 font-semibold">$89/day</div>
                    <button className="bg-green-500 text-gray-900 font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:-translate-y-1 transition-transform hover:bg-gray-700"> {/* Darker background, hover effect */}
                <div className="relative h-40">
                  <img src="/api/placeholder/300/160" alt="Nissan Leaf" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-green-500 text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                    ECO
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-2 text-white">Nissan Leaf</div> {/* Text white */}
                  <div className="flex gap-4 mb-3 text-gray-300 text-sm">
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-bolt"></i> 270 km range
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-battery-three-quarters"></i> 62 kWh
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-green-500 font-semibold">$59/day</div>
                    <button className="bg-green-500 text-gray-900 font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:-translate-y-1 transition-transform hover:bg-gray-700"> {/* Darker background, hover effect */}
                <div className="relative h-40">
                  <img src="/api/placeholder/300/160" alt="Volkswagen ID.4" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-green-500 text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                    SUV
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-2 text-white">Volkswagen ID.4</div> {/* Text white */}
                  <div className="flex gap-4 mb-3 text-gray-300 text-sm">
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-bolt"></i> 320 km range
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-battery-three-quarters"></i> 77 kWh
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-green-500 font-semibold">$72/day</div>
                    <button className="bg-green-500 text-gray-900 font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose EcoRide */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Why Choose EcoRide?</h2> {/* Text white */}
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"> {/* Darker background, hover effect */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-2xl mx-auto mb-4">
                    <i className="fa-solid fa-battery-full"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Carbon Offset Program</h3> {/* Text white */}
                  <p className="text-gray-300 text-sm">Every km you drive contributes to our tree planting initiative. Track your positive impact in real-time.</p>
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-2xl mx-auto mb-4">
                    <i className="fa-solid fa-rotate"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Flexible Swap</h3> {/* Text white */}
                  <p className="text-gray-300 text-sm">Change to a different EV model mid-rental if your needs change, at no extra cost.</p>
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-2xl mx-auto mb-4">
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Free Charging</h3> {/* Text white */}
                  <p className="text-gray-300 text-sm">Unlimited access to our network of 500+ charging stations across the country.</p>
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-2xl mx-auto mb-4">
                    <i className="fa-solid fa-mobile-screen"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Keyless Experience</h3> {/* Text white */}
                  <p className="text-gray-300 text-sm">Unlock and start your EV with just your smartphone. No keys needed.</p>
                </div>
              </div>
            </div>
          </div>

          {/* KYC Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Complete Your Verification</h2> {/* Text white */}
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"> {/* Darker background, hover effect */}
              <div className="flex flex-wrap justify-between mb-6 relative">
                {/* Progress line */}
                <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-700 hidden md:block"></div>

                {/* Steps */}
                <div className="flex flex-col items-center relative z-10 mb-4 md:mb-0">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-gray-900 font-semibold text-lg mb-2">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="text-white">Basic Info</div> {/* Text white */}
                </div>

                <div className="flex flex-col items-center relative z-10 mb-4 md:mb-0">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-gray-900 font-semibold text-lg mb-2">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="text-white">Identity</div> {/* Text white */}
                </div>

                <div className="flex flex-col items-center relative z-10 mb-4 md:mb-0">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-gray-900 font-semibold text-lg mb-2">
                    3
                  </div>
                  <div className="text-white">License</div> {/* Text white */}
                </div>

                <div className="flex flex-col items-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center text-white font-semibold text-lg mb-2">
                    4
                  </div>
                  <div className="text-white">Payment</div> {/* Text white */}
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-white">Step 3: Driving License Verification</h3> {/* Text white */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-300">License Number</label> {/* Light text for labels */}
                    <input
                      type="text"
                      placeholder="Enter license number"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-300">Expiration Date</label> {/* Light text for labels */}
                    <input
                      type="date"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2 text-gray-300">Issuing Authority</label> {/* Light text for labels */}
                  <input
                    type="text"
                    placeholder="Enter issuing authority"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm mb-2 text-gray-300">Upload License (Front & Back)</label> {/* Light text for labels */}
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition-colors hover:bg-gray-800"> {/* Green hover, background hover */}
                    <i className="fa-solid fa-folder-open text-2xl text-green-500 mb-2"></i>
                    <div>Drag & Drop your files here or <span className="text-green-500">Browse</span></div>
                    <div className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, PDF (Max 5MB)</div>
                  </div>
                </div>

                <button className="bg-green-500 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        </main>
  );
};

export default Dashboard;