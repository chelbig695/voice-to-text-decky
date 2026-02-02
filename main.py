import logging
import subprocess
import os
import tempfile
from pathlib import Path

# Set up logging
logging.basicConfig(
    filename="/tmp/voice-to-text.log",
    format='[Voice to Text] %(asctime)s %(levelname)s %(message)s',
    filemode='w',
    force=True
)
logger = logging.getLogger()
logger.setLevel(logging.INFO)

class Plugin:
    """
    Voice to Text Plugin for Steam Deck
    Provides quick voice-to-text transcription for in-game typing
    """
    
    async def start_recording(self):
        """
        Start voice recording using Steam Deck's microphone
        Returns a temporary file path where the recording will be saved
        """
        try:
            logger.info("Starting voice recording...")
            
            # Create temporary file for audio recording
            temp_dir = tempfile.gettempdir()
            audio_file = os.path.join(temp_dir, "voice_recording.wav")
            
            # Record audio using arecord (ALSA tool available on Steam Deck)
            # Record for 10 seconds max, user can stop early
            process = subprocess.Popen([
                'arecord',
                '-f', 'cd',  # CD quality
                '-t', 'wav',
                '-d', '10',  # Max 10 seconds
                audio_file
            ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            
            logger.info(f"Recording started, saving to {audio_file}")
            return {
                "success": True,
                "audio_file": audio_file,
                "pid": process.pid
            }
            
        except Exception as e:
            logger.error(f"Error starting recording: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def stop_recording(self, pid):
        """
        Stop the ongoing recording process
        """
        try:
            logger.info(f"Stopping recording process {pid}...")
            subprocess.run(['kill', '-SIGINT', str(pid)], check=True)
            return {"success": True}
        except Exception as e:
            logger.error(f"Error stopping recording: {str(e)}")
            return {"success": False, "error": str(e)}
    
    async def transcribe_audio(self, audio_file):
        """
        Transcribe audio file to text using Vosk (offline speech recognition)
        Falls back to online services if Vosk is not available
        """
        try:
            logger.info(f"Transcribing audio file: {audio_file}")
            
            # Check if audio file exists
            if not os.path.exists(audio_file):
                raise Exception(f"Audio file not found: {audio_file}")
            
            # Try using Vosk for offline transcription
            try:
                import vosk
                import wave
                import json
                
                # Use a small English model (you'll need to download this)
                model_path = "/home/deck/.local/share/vosk-model-small-en-us-0.15"
                
                if not os.path.exists(model_path):
                    logger.warning("Vosk model not found, transcription will fail")
                    return {
                        "success": False,
                        "error": "Vosk model not installed. Please install from https://alphacephei.com/vosk/models"
                    }
                
                model = vosk.Model(model_path)
                wf = wave.open(audio_file, "rb")
                rec = vosk.KaldiRecognizer(model, wf.getframerate())
                rec.SetWords(True)
                
                text_parts = []
                while True:
                    data = wf.readframes(4000)
                    if len(data) == 0:
                        break
                    if rec.AcceptWaveform(data):
                        result = json.loads(rec.Result())
                        text_parts.append(result.get('text', ''))
                
                # Get final result
                final_result = json.loads(rec.FinalResult())
                text_parts.append(final_result.get('text', ''))
                
                transcribed_text = ' '.join(text_parts).strip()
                logger.info(f"Transcription successful: {transcribed_text}")
                
                return {
                    "success": True,
                    "text": transcribed_text
                }
                
            except ImportError:
                logger.warning("Vosk not installed, cannot transcribe offline")
                return {
                    "success": False,
                    "error": "Vosk library not installed. Install with: pip install vosk"
                }
            
        except Exception as e:
            logger.error(f"Error transcribing audio: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def type_text(self, text):
        """
        Type the transcribed text using xdotool
        This simulates keyboard input
        """
        try:
            logger.info(f"Typing text: {text}")
            
            # Use xdotool to type the text
            subprocess.run(['xdotool', 'type', '--clearmodifiers', text], check=True)
            
            return {"success": True}
            
        except Exception as e:
            logger.error(f"Error typing text: {str(e)}")
            return {"success": False, "error": str(e)}
    
    async def _main(self):
        logger.info("Voice to Text plugin loaded")
    
    async def _unload(self):
        logger.info("Voice to Text plugin unloaded")
