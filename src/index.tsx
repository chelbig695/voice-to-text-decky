import {
ButtonItem,
PanelSection,
PanelSectionRow,
Router,
ServerAPI,
staticClasses,
} from “decky-frontend-lib”;
import { VFC, useState, useEffect } from “react”;
import { FaMicrophone, FaStop, FaKeyboard } from “react-icons/fa”;

interface VoiceToTextState {
isRecording: boolean;
isTranscribing: boolean;
recordingPid: number | null;
audioFile: string | null;
error: string | null;
lastTranscription: string;
status: string;
}

const Content: VFC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
const [state, setState] = useState<VoiceToTextState>({
isRecording: false,
isTranscribing: false,
recordingPid: null,
audioFile: null,
error: null,
lastTranscription: “”,
status: “Ready”
});

const startRecording = async () => {
setState(prev => ({ …prev, error: null, status: “Starting recording…” }));

```
const result = await serverAPI.callPluginMethod("start_recording", {});

if (result.success && result.result) {
  const data = result.result as any;
  if (data.success) {
    setState(prev => ({
      ...prev,
      isRecording: true,
      recordingPid: data.pid,
      audioFile: data.audio_file,
      status: "Recording... (10s max)"
    }));
    
    // Auto-stop after 10 seconds
    setTimeout(() => {
      if (state.isRecording) {
        stopAndTranscribe();
      }
    }, 10000);
  } else {
    setState(prev => ({ ...prev, error: data.error, status: "Error" }));
  }
}
```

};

const stopRecording = async () => {
if (!state.recordingPid) return;

```
setState(prev => ({ ...prev, status: "Stopping recording..." }));
await serverAPI.callPluginMethod("stop_recording", { pid: state.recordingPid });
setState(prev => ({ ...prev, isRecording: false }));
```

};

const transcribeAudio = async () => {
if (!state.audioFile) return;

```
setState(prev => ({ 
  ...prev, 
  isTranscribing: true, 
  status: "Transcribing..." 
}));

const result = await serverAPI.callPluginMethod("transcribe_audio", { 
  audio_file: state.audioFile 
});

if (result.success && result.result) {
  const data = result.result as any;
  if (data.success) {
    setState(prev => ({
      ...prev,
      isTranscribing: false,
      lastTranscription: data.text,
      status: "Transcribed! Typing..."
    }));
    
    // Type the text
    await typeText(data.text);
  } else {
    setState(prev => ({ 
      ...prev, 
      isTranscribing: false, 
      error: data.error,
      status: "Transcription failed" 
    }));
  }
}
```

};

const typeText = async (text: string) => {
const result = await serverAPI.callPluginMethod(“type_text”, { text });

```
if (result.success && result.result) {
  const data = result.result as any;
  if (data.success) {
    setState(prev => ({ ...prev, status: "Text typed successfully!" }));
    setTimeout(() => {
      setState(prev => ({ ...prev, status: "Ready" }));
    }, 2000);
  } else {
    setState(prev => ({ ...prev, error: data.error, status: "Typing failed" }));
  }
}
```

};

const stopAndTranscribe = async () => {
await stopRecording();
await transcribeAudio();
};

const quickVoiceToText = async () => {
await startRecording();
};

return (
<PanelSection title="Voice to Text">
<PanelSectionRow>
<div style={{
padding: “12px”,
background: “rgba(0,0,0,0.3)”,
borderRadius: “8px”,
marginBottom: “12px”
}}>
<div style={{
fontSize: “14px”,
color: “#dcdedf”,
marginBottom: “8px”,
fontWeight: 500
}}>
Status: {state.status}
</div>

```
      {state.error && (
        <div style={{ 
          fontSize: "12px", 
          color: "#ff6b6b",
          marginTop: "8px",
          padding: "8px",
          background: "rgba(255,0,0,0.1)",
          borderRadius: "4px"
        }}>
          Error: {state.error}
        </div>
      )}
      
      {state.lastTranscription && (
        <div style={{ 
          fontSize: "12px", 
          color: "#8b8d8f",
          marginTop: "8px",
          fontStyle: "italic"
        }}>
          Last: "{state.lastTranscription}"
        </div>
      )}
    </div>
  </PanelSectionRow>

  <PanelSectionRow>
    {!state.isRecording && !state.isTranscribing ? (
      <ButtonItem
        layout="below"
        onClick={quickVoiceToText}
      >
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          justifyContent: "center"
        }}>
          <FaMicrophone size={18} />
          <span style={{ fontSize: "15px", fontWeight: 500 }}>
            Start Voice Input
          </span>
        </div>
      </ButtonItem>
    ) : state.isRecording ? (
      <ButtonItem
        layout="below"
        onClick={stopAndTranscribe}
      >
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          justifyContent: "center",
          color: "#ff6b6b"
        }}>
          <FaStop size={18} />
          <span style={{ fontSize: "15px", fontWeight: 500 }}>
            Stop & Transcribe
          </span>
        </div>
      </ButtonItem>
    ) : (
      <div style={{ 
        padding: "16px",
        textAlign: "center",
        color: "#dcdedf"
      }}>
        <div className="spinner" style={{
          margin: "0 auto 8px",
          width: "24px",
          height: "24px",
          border: "3px solid rgba(255,255,255,0.2)",
          borderTopColor: "#1a9fff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        Processing...
      </div>
    )}
  </PanelSectionRow>

  <PanelSectionRow>
    <div style={{ 
      fontSize: "11px", 
      color: "#8b8d8f",
      marginTop: "12px",
      padding: "8px",
      background: "rgba(0,0,0,0.2)",
      borderRadius: "6px"
    }}>
      <div style={{ marginBottom: "4px", fontWeight: 500 }}>
        Quick Access (Recommended):
      </div>
      • Add this as Quick Access button<br/>
      • Use while in WoW to quickly dictate text<br/>
      • Max 10 seconds per recording<br/>
      • Text auto-types when ready
    </div>
  </PanelSectionRow>

  <style>{`
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `}</style>
</PanelSection>
```

);
};

export default definePlugin((serverApi: ServerAPI) => {
return {
title: <div className={staticClasses.Title}>Voice to Text</div>,
content: <Content serverAPI={serverApi} />,
icon: <FaMicrophone />,
onDismount() {},
};
});
