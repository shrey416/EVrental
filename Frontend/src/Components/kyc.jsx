import React, { useState, useRef, useEffect } from 'react';

const KYC = () => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dob: '',
        gender: '',
        currentAddressLine1: '',
        currentAddressLine2: '',
        currentCity: '',
        currentState: '',
        currentPincode: '',
        permanentAddressLine1: '',
        permanentAddressLine2: '',
        permanentCity: '',
        permanentState: '',
        permanentPincode: '',
        sameAsCurrentAddress: false,
        facePhoto: null,
        faceDetectedBackend: null,
        aadharCard: null,
        drivingLicense: null,
    });
    const [formErrors, setFormErrors] = useState({});
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [faceDetectionError, setFaceDetectionError] = useState('');
    const [processingFace, setProcessingFace] = useState(false);
    const [isKYCDone, setIsKYCDone] = useState(false); // State for KYC status - manually set for now

    // useEffect(() => {
        // Simulate fetching KYC status from MongoDB on component mount
        // In a real application, you would replace this with an API call.
        // fetchKYCStatus(); // Uncomment this in a real app

        // For demonstration purposes, you can manually set isKYCDone to true here to test the KYC done state.
        // setIsKYCDone(true); // Uncomment to simulate KYC already done
    // }, []);

    // Function to fetch KYC status from MongoDB (commented out - for future implementation)
    /*
    const fetchKYCStatus = async () => {
        // Assuming you have an API endpoint to check KYC status
        // Replace '/api/kyc-status' with your actual endpoint
        try {
            const response = await fetch('/api/kyc-status', { // Example API endpoint
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary authentication headers
                },
            });
            if (response.ok) {
                const data = await response.json();
                setIsKYCDone(data.isKYCDone); // Assuming the API returns { isKYCDone: boolean }
            } else {
                console.error('Failed to fetch KYC status:', response.status);
                // Handle error appropriately, maybe keep isKYCDone as false or show an error message
            }
        } catch (error) {
            console.error('Error fetching KYC status:', error);
            // Handle network errors or other exceptions
        }
    };
    */


    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value) error = `${name.replace(/([A-Z])/g, ' $1').trim()} is required`;
                break;
            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Invalid email format';
                }
                break;
            case 'phoneNumber':
                if (!value) {
                    error = 'Phone number is required';
                } else if (!/^\d{10}$/.test(value)) {
                    error = 'Invalid phone number format (10 digits)';
                }
                break;
            case 'dob':
                if (!value) error = 'Date of Birth is required';
                break;
            case 'gender':
                if (!value) error = 'Gender is required';
                break;
            case 'currentAddressLine1':
                if (!value) error = 'Current Address Line 1 is required';
                break;
            case 'currentCity':
                if (!value) error = 'Current City is required';
                break;
            case 'currentState':
                if (!value) error = 'Current State is required';
                break;
            case 'currentPincode':
                if (!value) {
                    error = 'Current Pincode is required';
                } else if (!/^\d{6}$/.test(value)) {
                    error = 'Invalid Pincode format (6 digits)';
                }
                break;
            case 'permanentAddressLine1':
                if (!formData.sameAsCurrentAddress && !value) error = 'Permanent Address Line 1 is required';
                break;
            case 'permanentCity':
                if (!formData.sameAsCurrentAddress && !value) error = 'Permanent City is required';
                break;
            case 'permanentState':
                if (!formData.sameAsCurrentAddress && !value) error = 'Permanent State is required';
                break;
            case 'permanentPincode':
                if (!formData.sameAsCurrentAddress) {
                    if (!value) {
                        error = 'Permanent Pincode is required';
                    } else if (!/^\d{6}$/.test(value)) {
                        error = 'Invalid Pincode format (6 digits)';
                    }
                }
                break;
            case 'facePhoto':
                if (currentSlide === 5 && !value) error = 'Face photo is required'; // Only validate on slide 5 if needed in future
                break;
            case 'aadharCard':
                if (currentSlide === 5 && !value) error = 'Aadhar Card is required';
                break;
            case 'drivingLicense':
                if (currentSlide === 5 && !value) error = 'Driving License is required';
                break;
            default:
                break;
        }
        return error;
    };


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let validationError = validateField(name, value);

        setFormErrors(prevState => ({
            ...prevState,
            [name]: validationError,
        }));

        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name === 'sameAsCurrentAddress') {
            setFormData(prevState => ({
                ...prevState,
                permanentAddressLine1: checked ? prevState.currentAddressLine1 : '',
                permanentAddressLine2: checked ? prevState.currentAddressLine2 : '',
                permanentCity: checked ? prevState.currentCity : '',
                permanentState: checked ? prevState.currentState : '',
                permanentPincode: checked ? prevState.currentPincode : '',
            }));
            setFormErrors(prevState => ({
                ...prevState,
                permanentAddressLine1: '',
                permanentAddressLine2: '',
                permanentCity: '',
                permanentState: '',
                permanentPincode: '',
            }));
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0],
        }));
        setFormErrors(prevState => ({
            ...prevState,
            [name]: '',
        }));
    };

    const nextSlide = () => {
        let isValidSlide = true;
        let currentSlideErrors = {};
        switch (currentSlide) {
            case 1:
                ['firstName', 'lastName', 'email', 'phoneNumber'].forEach(name => {
                    const error = validateField(name, formData[name]);
                    if (error) {
                        currentSlideErrors[name] = error;
                        isValidSlide = false;
                    }
                });
                break;
            case 2:
                ['dob', 'gender'].forEach(name => {
                    const error = validateField(name, formData[name]);
                    if (error) {
                        currentSlideErrors[name] = error;
                        isValidSlide = false;
                    }
                });
                break;
            case 3:
                ['currentAddressLine1', 'currentCity', 'currentState', 'currentPincode'].forEach(name => {
                    const error = validateField(name, formData[name]);
                    if (error) {
                        currentSlideErrors[name] = error;
                        isValidSlide = false;
                    }
                });
                if (!formData.sameAsCurrentAddress) {
                    ['permanentAddressLine1', 'permanentCity', 'permanentState', 'permanentPincode'].forEach(name => {
                        const error = validateField(name, formData[name]);
                        if (error) {
                            currentSlideErrors[name] = error;
                            isValidSlide = false;
                        }
                    });
                }
                break;
            case 4:
                if (formData.faceDetectedBackend !== true) {
                    isValidSlide = false;
                    alert("Face not detected. Please retake the photo again.");
                    return;
                }
                break;
            // Slide 5 validation is now only in handleSubmit
            default:
                break;
        }

        setFormErrors(prevState => ({ ...prevState, ...currentSlideErrors }));

        if (isValidSlide) {
            setCurrentSlide(currentSlide + 1);
        } else {
             alert("Please fix the errors in the form."); // Alert for errors in current slide
        }
    };


    const prevSlide = () => {
        setCurrentSlide(currentSlide - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValidForm = true;
        let allErrors = {};

        // Validate all fields before submit (including slide 5 fields)
        ['firstName', 'lastName', 'email', 'phoneNumber', 'dob', 'gender', 'currentAddressLine1', 'currentCity', 'currentState', 'currentPincode'].forEach(name => {
            const error = validateField(name, formData[name]);
            if (error) {
                allErrors[name] = error;
                isValidForm = false;
            }
        });
        if (!formData.sameAsCurrentAddress) {
            ['permanentAddressLine1', 'permanentCity', 'permanentState', 'permanentPincode'].forEach(name => {
                const error = validateField(name, formData[name]);
                if (error) {
                    allErrors[name] = error;
                    isValidForm = false;
                }
            });
        }
        ['aadharCard', 'drivingLicense'].forEach(name => {
            const error = validateField(name, formData[name]);
            if (error) {
                allErrors[name] = error;
                isValidForm = false;
            }
        });
        if (!formData.facePhoto) {
            allErrors['facePhoto'] = 'Face photo is required';
            isValidForm = false;
        }
        if (formData.faceDetectedBackend !== true) {
            allErrors['faceDetectedBackend'] = 'Face detection is required';
            isValidForm = false;
        }


        setFormErrors(allErrors);

        if (isValidForm) {
            console.log("Form Data (JSON format):", JSON.stringify(formData, null, 2));
            // Simulate updating KYC status to true in MongoDB after successful submission
            // In a real application, you would send a request to your backend to update KYC status in MongoDB.
            // updateKYCStatusInDB(); // Uncomment this in a real app

            setIsKYCDone(true); // Update local state to show KYC done message
        } else {
            alert("Please fix the errors in the form.");
        }
    };

    // Function to update KYC status in MongoDB (commented out - for future implementation)
    /*
    const updateKYCStatusInDB = async () => {
        // Assuming you have an API endpoint to update KYC status
        // Replace '/api/update-kyc-status' with your actual endpoint and user identification
        try {
            const response = await fetch('/api/update-kyc-status', { // Example API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary authentication headers and user identification
                },
                body: JSON.stringify({ userId: 'user123', isKYCDone: true }), // Example payload
            });
            if (!response.ok) {
                console.error('Failed to update KYC status in DB:', response.status);
                // Handle error appropriately
            }
        } catch (error) {
            console.error('Error updating KYC status in DB:', error);
            // Handle network errors or other exceptions
        }
    };
    */


    const startCamera = async () => {
        setCameraActive(true);
        setFaceDetectionError('');
        setFormData(prevState => ({ ...prevState, faceDetectedBackend: null }));
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            setCameraActive(false);
            setFaceDetectionError("Could not access camera. Please ensure permissions are granted.");
        }
    };

    const capturePhoto = async () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const photoDataUrl = canvas.toDataURL('image/png');
            setFormData(prevState => ({
                ...prevState,
                facePhoto: photoDataUrl,
                faceDetectedBackend: null
            }));
            stopCamera();
            sendPhotoForFaceDetection(photoDataUrl);
        }
    };

    const sendPhotoForFaceDetection = async (photoDataUrl) => {
        setProcessingFace(true);
        setFormData(prevState => ({ ...prevState, faceDetectedBackend: null }));
        const base64Image = photoDataUrl;

        try {
            const response = await fetch('http://localhost:5000/api/detect-face', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: base64Image }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.faceDetected) {
                setFormData(prevState => ({ ...prevState, faceDetectedBackend: true }));
            } else {
                setFormData(prevState => ({ ...prevState, faceDetectedBackend: false }));
                alert("Face not detected by backend. Please retake the photo.");
            }
        } catch (error) {
            console.error("Face detection request failed:", error);
            setFaceDetectionError("Face detection failed. Please try again.");
            setFormData(prevState => ({ ...prevState, faceDetectedBackend: false }));
        } finally {
            setProcessingFace(false);
        }
    };

    const stopCamera = () => {
        setCameraActive(false);
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
    };

    const retakePhoto = () => {
        setFormData(prevState => ({ ...prevState, facePhoto: null, faceDetectedBackend: null }));
    };


    const renderSlide = () => {
        switch (currentSlide) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Details (1/5)</h2>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.firstName ? 'border-red-500' : ''}`} placeholder="Enter First Name" required />
                            {formErrors.firstName && <p className="text-red-500 text-xs italic">{formErrors.firstName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.lastName ? 'border-red-500' : ''}`} placeholder="Enter Last Name" required />
                             {formErrors.lastName && <p className="text-red-500 text-xs italic">{formErrors.lastName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.email ? 'border-red-500' : ''}`} placeholder="Enter Email" required />
                             {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.phoneNumber ? 'border-red-500' : ''}`} placeholder="Enter Phone Number" required />
                             {formErrors.phoneNumber && <p className="text-red-500 text-xs italic">{formErrors.phoneNumber}</p>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Details (2/5)</h2>
                        <div className="mb-4">
                            <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.dob ? 'border-red-500' : ''}`} required />
                             {formErrors.dob && <p className="text-red-500 text-xs italic">{formErrors.dob}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.gender ? 'border-red-500' : ''}`} required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                             {formErrors.gender && <p className="text-red-500 text-xs italic">{formErrors.gender}</p>}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Address Details (3/5)</h2>
                        <div className="mb-4">
                            <label htmlFor="currentAddressLine1" className="block text-gray-700 text-sm font-bold mb-2">Current Address Line 1</label>
                            <input type="text" id="currentAddressLine1" name="currentAddressLine1" value={formData.currentAddressLine1} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.currentAddressLine1 ? 'border-red-500' : ''}`} placeholder="Address Line 1" required />
                             {formErrors.currentAddressLine1 && <p className="text-red-500 text-xs italic">{formErrors.currentAddressLine1}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="currentAddressLine2" className="block text-gray-700 text-sm font-bold mb-2">Current Address Line 2</label>
                            <input type="text" id="currentAddressLine2" name="currentAddressLine2" value={formData.currentAddressLine2} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Address Line 2" />
                        </div>
                        <div className="mb-4 grid grid-cols-3 gap-2">
                            <div>
                                <label htmlFor="currentCity" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                <input type="text" id="currentCity" name="currentCity" value={formData.currentCity} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.currentCity ? 'border-red-500' : ''}`} placeholder="City" required />
                                 {formErrors.currentCity && <p className="text-red-500 text-xs italic">{formErrors.currentCity}</p>}
                            </div>
                            <div>
                                <label htmlFor="currentState" className="block text-gray-700 text-sm font-bold mb-2">State</label>
                                <input type="text" id="currentState" name="currentState" value={formData.currentState} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.currentState ? 'border-red-500' : ''}`} placeholder="State" required />
                                 {formErrors.currentState && <p className="text-red-500 text-xs italic">{formErrors.currentState}</p>}
                            </div>
                            <div>
                                <label htmlFor="currentPincode" className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
                                <input type="text" id="currentPincode" name="currentPincode" value={formData.currentPincode} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.currentPincode ? 'border-red-500' : ''}`} placeholder="Pincode" required />
                                 {formErrors.currentPincode && <p className="text-red-500 text-xs italic">{formErrors.currentPincode}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center">
                                <input type="checkbox" id="sameAsCurrentAddress" name="sameAsCurrentAddress" checked={formData.sameAsCurrentAddress} onChange={handleInputChange} className="mr-2 leading-tight" />
                                <label htmlFor="sameAsCurrentAddress" className="text-sm text-gray-700">Permanent Address same as Current Address</label>
                            </div>
                        </div>
                        {!formData.sameAsCurrentAddress && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Permanent Address</h3>
                                <div className="mb-4">
                                    <label htmlFor="permanentAddressLine1" className="block text-gray-700 text-sm font-bold mb-2">Permanent Address Line 1</label>
                                    <input type="text" id="permanentAddressLine1" name="permanentAddressLine1" value={formData.permanentAddressLine1} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.permanentAddressLine1 ? 'border-red-500' : ''}`} placeholder="Address Line 1" required={!formData.sameAsCurrentAddress} />
                                     {formErrors.permanentAddressLine1 && <p className="text-red-500 text-xs italic">{formErrors.permanentAddressLine1}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="permanentAddressLine2" className="block text-gray-700 text-sm font-bold mb-2">Permanent Address Line 2</label>
                                    <input type="text" id="permanentAddressLine2" name="permanentAddressLine2" value={formData.permanentAddressLine2} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Address Line 2" />
                                </div>
                                <div className="mb-4 grid grid-cols-3 gap-2">
                                    <div>
                                        <label htmlFor="permanentCity" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                        <input type="text" id="permanentCity" name="permanentCity" value={formData.permanentCity} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.permanentCity ? 'border-red-500' : ''}`} placeholder="City" required={!formData.sameAsCurrentAddress} />
                                         {formErrors.permanentCity && <p className="text-red-500 text-xs italic">{formErrors.permanentCity}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="permanentState" className="block text-gray-700 text-sm font-bold mb-2">State</label>
                                        <input type="text" id="permanentState" name="permanentState" value={formData.permanentState} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.permanentState ? 'border-red-500' : ''}`} placeholder="State" required={!formData.sameAsCurrentAddress} />
                                         {formErrors.permanentState && <p className="text-red-500 text-xs italic">{formErrors.permanentState}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="permanentPincode" className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
                                        <input type="text" id="permanentPincode" name="permanentPincode" value={formData.permanentPincode} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.permanentPincode ? 'border-red-500' : ''}`} placeholder="Pincode" required={!formData.sameAsCurrentAddress} />
                                         {formErrors.permanentPincode && <p className="text-red-500 text-xs italic">{formErrors.permanentPincode}</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Face Detection (4/5)</h2>
                        <p className="text-gray-700 mb-2">Please enable camera and position your face in the circle.</p>
                        {faceDetectionError && <p className="text-red-500 mb-2">{faceDetectionError}</p>}
                        <div className="relative w-64 h-64 mx-auto mb-4">
                            <video ref={videoRef} className={`absolute inset-0 w-full h-full ${cameraActive ? '' : 'hidden'}`} autoPlay playsInline muted></video>
                            <canvas ref={canvasRef} className="hidden"></canvas>
                            <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-400 flex items-center justify-center">
                                {/* Face detection circle */}
                            </div>
                            {!cameraActive && <button onClick={startCamera} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Start Camera</button>}
                            {cameraActive && <button onClick={stopCamera} className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full text-sm focus:outline-none focus:shadow-outline"><i className="fas fa-times"></i> Stop</button>}
                        </div>

                        {formData.facePhoto ? (
                            <div className="mb-4">
                                <img src={formData.facePhoto} alt="Captured Face" className="max-w-xs h-auto mx-auto rounded" />
                                <div className="flex justify-center space-x-4 mt-2">
                                    <button onClick={retakePhoto} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Retake Photo</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {cameraActive && (
                                    <button onClick={capturePhoto} disabled={processingFace || formData.faceDetectedBackend === false} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        {processingFace ? <i className="fas fa-spinner fa-spin"></i> : 'Capture Photo'}
                                    </button>
                                )}
                            </>
                        )}


                        {formData.faceDetectedBackend === true && <p className="text-green-600 font-semibold bg-green-100 p-2 rounded">Face Detected by Backend!</p>}
                        {formData.faceDetectedBackend === false && cameraActive && !faceDetectionError && !processingFace && <p className="text-yellow-600 font-semibold">Face not detected by Backend. Please try again or Retake.</p>}
                        {(formData.faceDetectedBackend === null && cameraActive && !processingFace) && <p className="text-gray-600 font-semibold">Waiting for Face Detection...</p>}
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Document Upload (5/5)</h2>
                        <div className="mb-4">
                            <label htmlFor="aadharCard" className="block text-gray-700 text-sm font-bold mb-2">Aadhar Card</label>
                            <input type="file" id="aadharCard" name="aadharCard" onChange={handleFileChange} accept="image/*,application/pdf" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.aadharCard ? 'border-red-500' : ''}`} required />
                             {formErrors.aadharCard && <p className="text-red-500 text-xs italic">{formErrors.aadharCard}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="drivingLicense" className="block text-gray-700 text-sm font-bold mb-2">Driving License</label>
                            <input type="file" id="drivingLicense" name="drivingLicense" onChange={handleFileChange} accept="image/*,application/pdf" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.drivingLicense ? 'border-red-500' : ''}`} required />
                             {formErrors.drivingLicense && <p className="text-red-500 text-xs italic">{formErrors.drivingLicense}</p>}
                        </div>
                    </div>
                );
            default:
                return <div>Slide not found</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="max-w-7xl mx-auto w-full px-0 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl border shadow-md overflow-hidden">
                    <div className="px-4 py-8 sm:px-8 sm:py-10">
                        <div className="max-w-md mx-auto w-full">
                            <div>
                                <h1 className="text-3xl font-semibold text-center text-gray-800">KYC Verification Form</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    {isKYCDone ? (
                                        <div className="text-center">
                                            <div className="flex items-center justify-center h-48">
                                                <svg className="w-24 h-24 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                            <p className="text-xl font-semibold text-green-600">KYC Verification Completed!</p>
                                            <p className="text-gray-600 mt-2">Thank you for completing your KYC verification.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {renderSlide()}

                                            <div className="flex justify-between mt-6">
                                                {currentSlide > 1 && (
                                                    <button type="button" onClick={prevSlide} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
                                                        <i className="fas fa-arrow-left mr-2"></i> Back
                                                    </button>
                                                )}
                                                {currentSlide < 5 ? (
                                                    <button type="button" onClick={nextSlide} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
                                                        Next <i className="fas fa-arrow-right ml-2"></i>
                                                    </button>
                                                ) : (
                                                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
                                                        Submit <i className="fas fa-check ml-2"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KYC;