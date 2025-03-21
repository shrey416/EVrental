import React, { useState, useRef } from 'react';

const KYCComponent = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [faceImage, setFaceImage] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [captureStatus, setCaptureStatus] = useState('');
    const [documentStatus, setDocumentStatus] = useState({
        aadhar_card: '',
        driving_license: '',
        address_proof_permanent: '',
        address_proof_current: ''
    });

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraActive(true);
                setCaptureStatus('Camera is active. Capture your face.');
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            setCaptureStatus('Error accessing camera. Please check permissions.');
            setCameraActive(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setCameraActive(false);
            setCaptureStatus('Camera stopped.');
        }
    };

    const captureFace = () => {
        if (videoRef.current && canvasRef.current && cameraActive) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageDataURL = canvas.toDataURL('image/jpeg'); // Or 'image/png'
            setFaceImage(imageDataURL);
            setCaptureStatus('Face captured. You can now submit KYC.');
        } else {
            setCaptureStatus('Camera not active or no video stream.');
        }
    };

    const handleDocumentChange = (event, docType) => {
        setDocumentStatus(prevStatus => ({
            ...prevStatus,
            [docType]: event.target.files[0]
        }));
    };

    const handleSubmitKYC = async (event) => {
        event.preventDefault();
        setCaptureStatus('Submitting KYC...');

        const formData = new FormData();
        if (faceImage) {
            const blob = await fetch(faceImage).then(res => res.blob());
            formData.append('face_image', blob, 'face_image.jpg'); // Or .png
        }

        for (const docType in documentStatus) {
            if (documentStatus[docType]) {
                formData.append(docType, documentStatus[docType]);
            }
        }

        try {
            const response = await fetch('/kyc/submit', { // Adjust URL if needed
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                setCaptureStatus(`KYC Submitted Successfully! Face Detection: ${data.face_detection.message}. Documents: ${Object.values(data.documents).join(', ')}`);
                // Handle success - redirect, show confirmation, etc.
            } else {
                setCaptureStatus(`KYC Submission Failed: ${data.message}. Face Detection: ${data.face_detection.message}. Documents: ${Object.values(data.documents).join(', ')}`);
                // Handle failure - show error messages, retry options, etc.
            }
            console.log("KYC Response:", data); // Log the full response for debugging
        } catch (error) {
            console.error("Error submitting KYC:", error);
            setCaptureStatus('Error submitting KYC. Please try again later.');
        }
    };


    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">KYC Verification</h2>

            {/* Camera and Face Capture Section */}
            <div className="border p-4 rounded shadow-md">
                <h3 className="font-semibold mb-2">Face Capture</h3>
                <div className="mb-2">
                    <button onClick={startCamera} disabled={cameraActive} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" type="button">
                        <i className="fas fa-camera mr-2"></i> Start Camera
                    </button>
                    <button onClick={stopCamera} disabled={!cameraActive} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" type="button">
                        <i className="fas fa-stop-circle mr-2"></i> Stop Camera
                    </button>
                    <button onClick={captureFace} disabled={!cameraActive} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="button">
                        <i className="fas fa-user-check mr-2"></i> Capture Face
                    </button>
                </div>

                <div className="relative w-full aspect-video overflow-hidden rounded-md mb-2">
                    <video ref={videoRef} autoPlay className={`absolute top-0 left-0 w-full h-full object-cover ${!cameraActive ? 'hidden' : ''}`} />
                    <canvas ref={canvasRef} className="hidden absolute top-0 left-0 w-full h-full" /> {/* Hidden canvas for capturing */}
                    {!cameraActive && <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 italic">Camera Feed Preview</div>}
                </div>

                {faceImage && (
                    <div className="mb-2">
                        <h4 className="font-semibold">Captured Face Preview:</h4>
                        <img src={faceImage} alt="Captured Face" className="max-w-xs rounded-md" />
                    </div>
                )}
                <p className="text-sm text-gray-600">{captureStatus}</p>
            </div>


            {/* Document Upload Section */}
            <div className="border p-4 rounded shadow-md">
                <h3 className="font-semibold mb-2">Document Upload</h3>
                <form onSubmit={handleSubmitKYC} className="space-y-4">
                    <div>
                        <label htmlFor="aadhar_card" className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card:</label>
                        <input type="file" id="aadhar_card" accept="image/*,application/pdf" onChange={(e) => handleDocumentChange(e, 'aadhar_card')} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="driving_license" className="block text-sm font-medium text-gray-700 mb-1">Driving License:</label>
                        <input type="file" id="driving_license" accept="image/*,application/pdf" onChange={(e) => handleDocumentChange(e, 'driving_license')} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="address_proof_permanent" className="block text-sm font-medium text-gray-700 mb-1">Permanent Address Proof:</label>
                        <input type="file" id="address_proof_permanent" accept="image/*,application/pdf" onChange={(e) => handleDocumentChange(e, 'address_proof_permanent')} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="address_proof_current" className="block text-sm font-medium text-gray-700 mb-1">Current Address Proof:</label>
                        <input type="file" id="address_proof_current" accept="image/*,application/pdf" onChange={(e) => handleDocumentChange(e, 'address_proof_current')} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
                            <i className="fas fa-upload mr-2"></i> Submit KYC
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default KYCComponent;