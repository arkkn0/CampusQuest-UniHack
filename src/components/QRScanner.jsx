import { useEffect, useRef, useState } from "react";
import "./QRScanner.css";

// UniMelb campus locations list (from Python backend)
const UNIMELB_PLACES = [
  "Baillieu Library",
  "Redmond Barry Building",
  "Old Arts Building",
  "Old Quadrangle",
  "Wilson Hall",
  "Sidney Myer Asia Centre",
  "1888 Building",
  "Market Hall",
  "Arts West",
  "Babel Building",
  "Elisabeth Murdoch Building",
  "John Medley Building",
  "Eastern Resource Centre Library",
  "Giblin Eunson Library",
  "Law Library",
  "Chemistry Building",
  "Old Physics Building",
  "Old Geology Building",
  "Old Microbiology Building",
  "Old Metallurgy Building",
  "Biosciences 1",
  "Biosciences 2",
  "Biosciences 3",
  "Mechanical Engineering Building",
  "Electrical and Electronic Engineering Building",
  "Infrastructure Engineering Building",
  "Chemical Engineering Building",
  "Engineering Workshops",
  "Walter Boas Building",
  "Medical Building",
  "Doherty Institute",
  "Bio21 Institute",
  "Ian Potter Museum of Art",
  "Grainger Museum",
  "Science Gallery Melbourne",
  "Melba Hall",
  "Student Pavilion",
  "Union House",
  "The Spot",
  "Stop 1",
  "South Lawn",
  "System Garden",
  "University Square",
  "Lincoln Square",
  "Argyle Square",
  "Nona Lee Sports Centre",
  "University Oval",
  "Melbourne School of Design",
];

// Generate reward badge name based on place (same logic as Python backend)
function generateRewardBadge(placeName) {
  const badgeMap = {
    "Baillieu Library": "Quiet Study Badge",
    "Arts West": "Creative Arts Badge",
    "Arts West Building": "Creative Arts Badge",
    "Old Quadrangle": "Historic Explorer Badge",
    "Student Pavilion": "Social Hub Badge",
    "South Lawn": "Green Space Explorer Badge",
    "Melbourne School of Design": "Design Master Badge",
    "Union House": "Student Life Badge",
    "The Spot": "Campus Navigator Badge",
  };

  // Check exact match first
  if (placeName in badgeMap) {
    return badgeMap[placeName];
  }

  // Check partial matches
  for (const [key, badge] of Object.entries(badgeMap)) {
    if (key.toLowerCase().includes(placeName.toLowerCase()) || 
        placeName.toLowerCase().includes(key.toLowerCase())) {
      return badge;
    }
  }

  // Default: generate badge name from place
  return `${placeName} Explorer Badge`;
}

// Helper function to convert image file to base64
function convertImageToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Extract place name from Gemini text response
function extractPlaceName(text) {
  if (!text) return "unknown";
  
  // Try to find a place name from the UNIMELB_PLACES list in the response
  const normalizedText = text.toLowerCase();
  
  for (const place of UNIMELB_PLACES) {
    if (normalizedText.includes(place.toLowerCase())) {
      return place;
    }
  }
  
  // If no exact match, try to extract the first mentioned place-like word
  // This is a fallback - ideally Gemini should return a clear place name
  const words = text.split(/\s+/);
  for (const word of words) {
    const cleanWord = word.replace(/[.,!?;:]/g, '');
    if (UNIMELB_PLACES.some(place => place.toLowerCase().includes(cleanWord.toLowerCase()))) {
      return UNIMELB_PLACES.find(place => place.toLowerCase().includes(cleanWord.toLowerCase()));
    }
  }
  
  return "unknown";
}

// Call Gemini API directly
async function callGeminiAPI(base64Image) {
  // Read API key from environment variable
  // In Vercel: set GEMINI_API_KEY (vite.config.js will map it to VITE_GEMINI_API_KEY during build)
  // For local dev: can use either GEMINI_API_KEY or VITE_GEMINI_API_KEY
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  // Debug: log if API key is missing (only in development)
  if (import.meta.env.DEV && !apiKey) {
    console.warn("⚠️ GEMINI_API_KEY not found. Check your .env file or Vercel environment variables.");
  }
  
  if (!apiKey || apiKey === '') {
    throw new Error("GEMINI_API_KEY not found. Please set GEMINI_API_KEY in Vercel environment variables and redeploy.");
  }

  const requestBody = {
    contents: [{
      parts: [
        { 
          text: "Identify the University of Melbourne campus location in this image." 
        },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image
          }
        }
      ]
    }]
  };

  // Model configurations: which models are available in which API versions
  // v1beta has newer models, v1 has stable models only
  const modelConfigs = [
    // v1beta models (newer, including gemini-2.5-flash)
    { model: 'gemini-2.5-flash', apiVersion: 'v1beta', priority: 1 },
    { model: 'gemini-2.0-flash-exp', apiVersion: 'v1beta', priority: 2 },
    { model: 'gemini-1.5-flash-latest', apiVersion: 'v1beta', priority: 3 },
    { model: 'gemini-1.5-flash', apiVersion: 'v1beta', priority: 4 },
    // v1 models (stable only, no gemini-2.5 or experimental models)
    { model: 'gemini-1.5-flash-latest', apiVersion: 'v1', priority: 5 },
    { model: 'gemini-1.5-flash', apiVersion: 'v1', priority: 6 },
  ];

  // Sort by priority
  modelConfigs.sort((a, b) => a.priority - b.priority);

  let lastError = null;
  
  for (const config of modelConfigs) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/${config.apiVersion}/models/${config.model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        lastError = new Error(`Gemini API error (${config.apiVersion}/${config.model}): ${response.status} - ${errorText}`);
        
        // If it's a 404, try next model
        if (response.status === 404) {
          continue;
        }
        
        // For other errors, throw immediately
        throw lastError;
      }

      const data = await response.json();
      
      // Parse Gemini response: data.candidates[0].content.parts[0].text
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (!text) {
        // Check if there's an error in the response
        if (data.error) {
          throw new Error(`Gemini API error: ${data.error.message || JSON.stringify(data.error)}`);
        }
        throw new Error("No text in Gemini API response. Response: " + JSON.stringify(data));
      }

      // Extract place name from text response
      const placeName = extractPlaceName(text);
      
      return { identified_place: placeName };
    } catch (err) {
      // If it's the last model config, throw the error
      if (config === modelConfigs[modelConfigs.length - 1]) {
        throw err;
      }
      // Otherwise, continue to next model
      lastError = err;
      continue;
    }
  }
  
  // If all models failed, throw the last error
  throw lastError || new Error("Failed to call Gemini API with all available models");
}

export default function QRScanner({ onScan, onError, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const hasCapturedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Start camera stream
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' } // Use back camera on mobile
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Unable to access camera. Please check permissions.");
        if (onError) onError(err);
      }
    };

    startCamera();

    return () => {
      // Cleanup: stop camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (hasCapturedRef.current) return; // Prevent multiple captures
    if (!videoRef.current || !canvasRef.current) return;

    hasCapturedRef.current = true;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0);

    // Convert canvas to blob, then to base64 for Gemini API
    canvas.toBlob(async (blob) => {
      if (!blob) {
        setError("Failed to capture image");
        hasCapturedRef.current = false; // Allow retry on error
        return;
      }

      setIsLoading(true);
      setError(null);
      setApiResponse(null);

      try {
        // Convert image file to base64 using helper function
        const base64 = await convertImageToBase64(blob);

        // Call Gemini API directly
        const geminiResponse = await callGeminiAPI(base64);
        
        // Generate reward badge based on place name
        const reward = generateRewardBadge(geminiResponse.identified_place);
        
        // Format response in same shape as before
        const data = {
          place: geminiResponse.identified_place,
          reward: reward
        };
        
        setApiResponse(data);
        
        // Call onScan with the API response
        if (onScan) {
          onScan(data);
        }
      } catch (err) {
        console.error("Error processing image:", err);
        
        // Provide more specific error messages
        let errorMessage = "Failed to process image. Please try again.";
        
        if (err.message) {
          if (err.message.includes("GEMINI_API_KEY not found")) {
            errorMessage = "API key not configured. Please check environment variables.";
          } else if (err.message.includes("Gemini API error: 400")) {
            errorMessage = "Invalid API request. Please check your API key.";
          } else if (err.message.includes("Gemini API error: 403")) {
            errorMessage = "API key is invalid or doesn't have permission.";
          } else if (err.message.includes("Gemini API error: 429")) {
            errorMessage = "API quota exceeded. Please try again later.";
          } else if (err.message.includes("Gemini API error")) {
            errorMessage = `API Error: ${err.message}`;
          } else {
            errorMessage = err.message;
          }
        }
        
        setError(errorMessage);
        hasCapturedRef.current = false; // Allow retry on error
        if (onError) onError(err);
      } finally {
        setIsLoading(false);
      }
    }, 'image/jpeg', 0.9);
  };

  // Auto-capture when video is ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasCapturedRef.current) return;

    let timer = null;

    const handleVideoReady = () => {
      // Clear any existing timer
      if (timer) clearTimeout(timer);
      
      // Wait a moment for camera to focus, then auto-capture
      timer = setTimeout(() => {
        if (videoRef.current && !hasCapturedRef.current) {
          capturePhoto();
        }
      }, 1500); // 1.5 second delay for camera to focus
    };

    video.addEventListener('loadedmetadata', handleVideoReady);
    
    // Also check if video is already ready
    if (video.readyState >= 2) {
      handleVideoReady();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleVideoReady);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="scanner-overlay">
      <div className="scanner-modal">
        <div className="scanner-header">
          <h3 className="scanner-title">📷 Take Photo</h3>
          <button className="scanner-close" onClick={onClose}>✕</button>
        </div>

        <p className="scanner-hint">Point your camera at the location. Photo will be captured automatically...</p>

        <div className="camera-preview-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-preview"
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="loading-indicator">
            <span className="loading-spinner">⏳</span>
            <span>Processing image...</span>
          </div>
        )}

        {apiResponse && (
          <div className="api-response">
            <h4 className="response-title">🎉 Recognition Result</h4>
            <div className="response-content">
              <div className="response-item">
                <span className="response-label">Place:</span>
                <span className="response-value">{apiResponse.place}</span>
              </div>
              <div className="response-item">
                <span className="response-label">Reward:</span>
                <span className="response-value">{apiResponse.reward}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
