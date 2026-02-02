# Quick Start Guide

Get up and running with Voice to Text plugin in under 5 minutes!

## Prerequisites

- Steam Deck with Decky Loader installed ([Get Decky](https://decky.xyz))
- Desktop Mode access for initial setup

## Installation (Fast Track)

### 1. Clone the Repository

Open Konsole in Desktop Mode:

```bash
cd ~/homebrew/plugins
git clone https://github.com/YOUR-USERNAME/voice-to-text-decky.git
cd voice-to-text-decky
```

### 2. Run the Installation Script

```bash
chmod +x install.sh
./install.sh
```

The script will:
- ✅ Install system dependencies (alsa-utils, xdotool)
- ✅ Install Python dependencies (vosk)
- ✅ Download the speech recognition model (~40MB)
- ✅ Install Node dependencies
- ✅ Build the plugin
- ✅ Test your microphone

**Enter your password when prompted (this is your Steam Deck password)**

### 3. Restart Decky

1. Press the **...** button (Quick Access)
2. Scroll to **Decky** settings (the plug icon)
3. Select **Reload** or restart Decky Loader
4. Look for **Voice to Text** in your plugins!

### 4. Test It Out

1. Open any game or text field
2. Press **...** to open Quick Access
3. Navigate to **Voice to Text**
4. Click **"Start Voice Input"**
5. Say something!
6. Click **"Stop & Transcribe"**
7. Watch it type automatically! 🎉

## First-Time Tips

### Testing Outside of Games

Before using in WoW, test it somewhere simple:

```bash
# Open a text editor in Desktop Mode
kate test.txt

# Use the plugin to dictate text
# This helps verify everything works
```

### In WoW

1. Press **Enter** to open chat
2. Press **...** for Quick Access
3. Use **Voice to Text**
4. Speak your message
5. It'll type directly into chat!

### Getting Better Results

- **Speak clearly** at a normal pace
- **Reduce background noise** (pause music/game sounds)
- **Keep messages short** (under 10 seconds)
- **Use punctuation commands** (say "period", "comma", "question mark")

## What If Something Goes Wrong?

### Plugin Not Showing?

```bash
# Check if it's in the right place
ls ~/homebrew/plugins/voice-to-text-decky/

# Rebuild and restart
cd ~/homebrew/plugins/voice-to-text-decky
npm run build
# Then restart Decky from Quick Access
```

### Microphone Not Working?

```bash
# Test microphone
arecord -f cd -d 3 test.wav
aplay test.wav

# If you hear your voice, the mic works!
# If not, check audio settings in System Settings
```

### Text Not Typing?

1. Make sure the text field has focus (click it first)
2. Try windowed mode instead of fullscreen
3. Press Enter to open chat in WoW before using voice input

### Poor Transcription?

Download the larger, more accurate model:

```bash
cd ~/.local/share
wget https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip
unzip vosk-model-en-us-0.22.zip
```

Then edit `main.py` line 58 to use the new model path.

## More Help

- 📖 Full documentation: [README.md](README.md)
- 🔧 Detailed troubleshooting: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- 🐛 Report issues: [GitHub Issues](https://github.com/YOUR-USERNAME/voice-to-text-decky/issues)
- 💬 Ask questions: [GitHub Discussions](https://github.com/YOUR-USERNAME/voice-to-text-decky/discussions)

## Upgrade to Better Accuracy

For the best transcription quality:

```bash
# Download large model (~1.8GB)
cd ~/.local/share
wget https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip
unzip vosk-model-en-us-0.22.zip
rm vosk-model-en-us-0.22.zip
```

Edit `~/homebrew/plugins/voice-to-text-decky/main.py`:

```python
# Change line 58 from:
model_path = "/home/deck/.local/share/vosk-model-small-en-us-0.15"

# To:
model_path = "/home/deck/.local/share/vosk-model-en-us-0.22"
```

Restart Decky and enjoy better accuracy!

---

**That's it! You're ready to use voice input in your games!** 🎮🎤

For WoW players: This plugin is a game-changer for dungeon/raid communication, guild chat, and quick trading messages. No more fumbling with the on-screen keyboard!
