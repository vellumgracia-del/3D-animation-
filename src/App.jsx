import { useRef, useState } from 'react';
import { useMediaPipe } from './hooks/useMediaPipe';
import SplashScreen from './components/SplashScreen';
import CanvasLayer from './components/CanvasLayer';
import HudOverlay from './components/HudOverlay';
import ToolLegend from './components/ToolLegend';
import BrushControls from './components/BrushControls';

function App() {
  const videoRef = useRef(null);
  const canvasLayerRef = useRef(null);
  
  const { landmarks, fingerCount, isLoading, error } = useMediaPipe(videoRef);
  
  const [modeData, setModeData] = useState({ 
    name: "SYSTEM BOOT", 
    color: "#64748b",
    icon: "help" 
  });

  const [brushSettings, setBrushSettings] = useState({
    size: 6,
    color: '#f43f5e', // Default rose
    opacity: 1
  });

  return (
    <div className="container-outer">
      <SplashScreen isVisible={isLoading} />
      
      {error && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 text-rose-500">
          <div className="panel p-6 max-w-md text-center">
            <h2 className="text-xl font-bold mb-2">System Error</h2>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Main UI */}
      <HudOverlay modeData={modeData} fingerCount={fingerCount} />
      
      <ToolLegend currentModeName={modeData.name} />
      
      <BrushControls 
        activeMode={modeData.name}
        brushSettings={brushSettings}
        setBrushSettings={setBrushSettings}
      />

      <CanvasLayer 
        ref={canvasLayerRef}
        videoRef={videoRef}
        landmarks={landmarks}
        fingerCount={fingerCount}
        onModeChange={setModeData}
        brushSettings={brushSettings}
      />
    </div>
  );
}

export default App;
