import React from 'react';
import map from '../assets/map.jpg';
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
          <h2 className="text-xl font-semibold text-gray-800">Find Nearby Electric Vehicles</h2> {/* Dark text */}
          <span
            className="text-green-600 text-sm cursor-pointer hover:underline" // Darker green for better visibility
            onClick={handleExpandMap}
          >
            Expand Map
          </span>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md"> {/* White background, shadow */}
          <div className="relative h-96 rounded-lg overflow-hidden mb-4">
            {/* Google Map Embed */}
            {/* <iframe
              title="Nearby EVs Map"
              width="100%" // Take full width of container
              height="100%" // Take full height of container
              frameBorder="0"
              style={{ border: 0 }}
              src={mapEmbedUrlWithMarkers}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
            <img src={map} alt="map" className="w-full h-full object-cover" />


            {/* Map Overlay  */}
            <div className="absolute top-4 left-4 bg-white/80 p-4 rounded-lg max-w-xs shadow-md">  {/* White background, shadow */}
              <div className="font-semibold mb-2 text-gray-800">Nearest Available EVs</div> {/* Dark text */}

              <div className="bg-green-100 border-l-4 border-green-500 rounded-r p-3 mb-3"> {/* Lighter green background */}
                <div className="font-semibold text-gray-800">Tesla Model 3</div> {/* Dark text */}
                <div className="text-gray-600 text-sm">0.7 miles away • 97% charged</div> {/* Slightly lighter text */}
                <button className="mt-2 bg-green-500 text-white font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                  Get Directions
                </button>
              </div>

              <div className="bg-green-100 border-l-4 border-green-500 rounded-r p-3"> {/* Lighter green background */}
                <div className="font-semibold text-gray-800">Volkswagen ID.4</div> {/* Dark text */}
                <div className="text-gray-600 text-sm">1.2 miles away • 85% charged</div> {/* Slightly lighter text */}
                <button className="mt-2 bg-green-500 text-white font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap gap-3">
              <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition-colors">
                <i className="fa-solid fa-car"></i> All EVs
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100 transition-colors">  {/* Light hover */}
                <i className="fa-solid fa-battery-full"></i> Charging Stations
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100 transition-colors"> {/* Light hover */}
                <i className="fa-solid fa-bolt"></i> Fast Charging Only
              </button>
            </div>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100 transition-colors">  {/* Light hover */}
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
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 text-gray-800"> {/* Light background, dark text */}
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">8</div>
                  <div className="text-gray-600 text-sm">Available Vehicles</div> {/* Slightly lighter text */}
                </div>
                <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600"> {/* Lighter green */}
                  <i className="fa-solid fa-car"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">3</div>
                  <div className="text-gray-600 text-sm">Active Rentals</div> {/* Slightly lighter text */}
                </div>
                <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600">  {/* Lighter green */}
                  <i className="fa-solid fa-key"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow"> {/* White background, shadow, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">85%</div>
                  <div className="text-gray-600 text-sm">KYC Completion</div> {/* Slightly lighter text */}
                </div>
                <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600">  {/* Lighter green */}
                  <i className="fa-solid fa-clipboard-check"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow"> {/* White background, shadow, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">420</div>
                  <div className="text-gray-600 text-sm">CO₂ Kg Saved</div> {/* Slightly lighter text */}
                </div>
                <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600">  {/* Lighter green */}
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
              <h2 className="text-xl font-semibold text-gray-800">Available Electric Vehicles</h2> {/* Dark text */}
              <span className="text-green-600 text-sm cursor-pointer hover:underline">View All</span> {/* Darker green */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
                <div className="relative h-40">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlp9F0o3d4Da9A_yHBYre4o0qtPZdEF09K5w&s" alt="Tesla Model 3" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">  {/* White text */}
                    PREMIUM
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-2 text-gray-800">OLA Bike</div> {/* Dark text */}
                  <div className="flex gap-4 mb-3 text-gray-600 text-sm"> {/* Slightly lighter text */}
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-bolt"></i> 358 km range
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-battery-three-quarters"></i> 75 kWh
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-green-600 font-semibold">$89/day</div> {/* Darker green */}
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
                <div className="relative h-40">
                  <img src="/api/placeholder/300/160" alt="Nissan Leaf" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold"> {/* White text */}
                    ECO
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-2 text-gray-800">Nissan Leaf</div> {/* Dark text */}
                  <div className="flex gap-4 mb-3 text-gray-600 text-sm"> {/* Slightly lighter text */}
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-bolt"></i> 270 km range
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-battery-three-quarters"></i> 62 kWh
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-green-600 font-semibold">$59/day</div> {/* Darker green */}
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
                <div className="relative h-40">
                  <img src="/api/placeholder/300/160" alt="Volkswagen ID.4" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold"> {/* White text */}
                    SUV
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-2 text-gray-800">Volkswagen ID.4</div> {/* Dark text */}
                  <div className="flex gap-4 mb-3 text-gray-600 text-sm"> {/* Slightly lighter text */}
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-bolt"></i> 320 km range
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-battery-three-quarters"></i> 77 kWh
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-green-600 font-semibold">$72/day</div> {/* Darker green */}
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose EcoRide */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Why Choose EcoRide?</h2> {/* Dark text */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">  {/* Lighter green */}
                    <i className="fa-solid fa-battery-full"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-800">Carbon Offset Program</h3> {/* Dark text */}
                  <p className="text-gray-600 text-sm">Every km you drive contributes to our tree planting initiative. Track your positive impact in real-time.</p> {/* Slightly lighter text */}
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">  {/* Lighter green */}
                    <i className="fa-solid fa-rotate"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-800">Flexible Swap</h3> {/* Dark text */}
                  <p className="text-gray-600 text-sm">Change to a different EV model mid-rental if your needs change, at no extra cost.</p> {/* Slightly lighter text */}
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">  {/* Lighter green */}
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-800">Free Charging</h3> {/* Dark text */}
                  <p className="text-gray-600 text-sm">Unlimited access to our network of 500+ charging stations across the country.</p> {/* Slightly lighter text */}
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">  {/* Lighter green */}
                    <i className="fa-solid fa-mobile-screen"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-800">Keyless Experience</h3> {/* Dark text */}
                  <p className="text-gray-600 text-sm">Unlock and start your EV with just your smartphone. No keys needed.</p> {/* Slightly lighter text */}
                </div>
              </div>
            </div>
          </div>
        </main>
  );
};

export default Dashboard;