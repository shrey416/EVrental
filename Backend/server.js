// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process'); // For running Python script

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/api/detect-face', (req, res) => {
    const base64Image = req.body.image;
    if (!base64Image) {
        return res.status(400).send({ error: 'No image data provided' });
    }

    const pythonProcess = spawn('python', ['./face_detector.py']); // Path to your Python script, no image argument here

    let pythonOutput = '';
    let pythonError = '';

    // Pipe the base64 image data to the Python script's stdin
    pythonProcess.stdin.write(base64Image);
    pythonProcess.stdin.end(); // Signal end of input

    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        pythonError += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}, error: ${pythonError}`);
            return res.status(500).send({ error: 'Face detection script failed', details: pythonError });
        }

        const output = pythonOutput.trim();
        let faceDetected = false;
        if (output === 'face_detected') {
            faceDetected = true;
        } else if (output === 'no_face_detected') {
            faceDetected = false;
        } else {
            console.warn(`Unexpected output from Python script: ${output}`);
        }

        res.json({ faceDetected: faceDetected });
    });
});


app.post('/api/kyc', (req, res) => {
    const kycData = req.body;
    console.log("Received KYC Data from Frontend:");
    console.log(kycData);
    res.json({ message: 'KYC data received successfully!', data: kycData });
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});