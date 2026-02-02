# Voice to Text - Decky Plugin for Steam Deck

[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
[![Steam Deck](https://img.shields.io/badge/Steam-Deck-1e1e1e?logo=steam)](https://www.steamdeck.com/)
[![Decky Plugin](https://img.shields.io/badge/Decky-Plugin-5c7e10)](https://decky.xyz/)

A quick voice-to-text plugin for Steam Deck that lets you dictate text instead of using the on-screen keyboard. Perfect for WoW and other games where quick typing is needed!

![Voice to Text Demo](https://via.placeholder.com/800x450.png?text=Voice+to+Text+Plugin+Demo)

> **Note:** Add a screenshot or demo GIF here once you have the plugin running!

## Features

- 🎤 One-click voice recording (max 10 seconds)
- 🔄 Automatic transcription using offline speech recognition (Vosk)
- ⌨️ Auto-types transcribed text into your game
- 🚀 Quick Access Menu integration for easy in-game use
- 🔒 Works completely offline (no internet needed)

## Installation

### Option 1: Install from GitHub (Recommended)

```bash
# In Desktop Mode, open Konsole and run:
cd ~/homebrew/plugins
git clone https://github.com/chelbig695/voice-to-text-decky.git
cd voice-to-text-decky
chmod +x install.sh
./install.sh
```

### Option 2: Manual Installation

### Prerequisites

Your Steam Deck should have:
- Decky Loader installed
- Desktop mode access for initial setup

### Step 1: Install the Plugin

1. Download or clone this plugin to your Steam Deck
2. Copy the `voice-to-text-decky` folder to:
   ```
   ~/homebrew/plugins/
   ```

### Step 2: Install Dependencies

Open a terminal in Desktop Mode and run:

```bash
# Install system dependencies
sudo steamos-readonly disable
sudo pacman -S --noconfirm alsa-utils xdotool python-pip

# Install Python dependencies
cd ~/homebrew/plugins/voice-to-text-decky
pip install -r requirements.txt --user

# Install Node dependencies
npm install
# or
pnpm install
```

### Step 3: Download Vosk Language Model

Download a Vosk speech recognition model:

```bash
# Create directory for the model
mkdir -p ~/.local/share

# Download small English model (~40MB)
cd ~/.local/share
wget https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip
unzip vosk-model-small-en-us-0.15.zip
rm vosk-model-small-en-us-0.15.zip
```

For better accuracy, you can download the larger model (~1.8GB):
```bash
wget https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip
```

If using the larger model, update the model path in `main.py` line 58:
```python
model_path = "/home/deck/.local/share/vosk-model-en-us-0.22"
```

### Step 4: Build the Plugin

```bash
cd ~/homebrew/plugins/voice-to-text-decky
npm run build
```

### Step 5: Restart Decky Loader

1. Open the Quick Access Menu (... button)
2. Go to Decky settings
3. Restart Decky Loader
4. The Voice to Text plugin should now appear!

## Usage

### Method 1: Quick Access Menu (Recommended for Gaming)

1. While in WoW (or any game), press the **...** button to open Quick Access
2. Navigate to the **Voice to Text** plugin
3. Click **"Start Voice Input"**
4. Speak your message (you have 10 seconds max)
5. Click **"Stop & Transcribe"** or wait for auto-stop
6. The text will automatically be typed into your game!

### Method 2: Quick Access Tile

You can also add Voice to Text as a Quick Access tile for even faster access:
1. Go to Decky settings
2. Pin Voice to Text to Quick Access
3. Now you can trigger it with one tap!

## Tips for Best Results

1. **Speak clearly** and at a moderate pace
2. **Minimize background noise** when recording
3. **Test your microphone** - make sure Steam Deck's mic is working
4. **Keep messages under 10 seconds** - longer messages may be cut off
5. **Position your cursor** where you want text before recording

## Troubleshooting

### "Vosk model not found" error
- Make sure you downloaded the Vosk model to the correct location
- Check the path in `main.py` matches your model's location

### No audio being recorded
```bash
# Test microphone
arecord -f cd -d 5 test.wav
aplay test.wav
```

### Text not typing into game
- Make sure WoW has keyboard focus
- Try clicking in the chat box before using voice input
- Check that `xdotool` is installed: `which xdotool`

### Plugin not showing in Decky
- Check Decky logs: `~/homebrew/logs/`
- Make sure plugin.json is in the root of the plugin folder
- Restart Decky Loader completely

### Poor transcription accuracy
- Use the larger Vosk model (1.8GB) for better accuracy
- Speak more clearly and reduce background noise
- Make sure your microphone is working properly

## Technical Details

### How it Works

1. **Recording**: Uses `arecord` (ALSA) to capture audio from Steam Deck's microphone
2. **Transcription**: Uses Vosk (offline speech recognition) to convert audio to text
3. **Input**: Uses `xdotool` to simulate keyboard typing

### Files Structure

```
voice-to-text-decky/
├── main.py              # Python backend (recording & transcription)
├── src/
│   └── index.tsx        # React frontend UI
├── plugin.json          # Plugin metadata
├── package.json         # Node dependencies
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Performance Notes

- **First transcription** may take 2-3 seconds (model loading)
- **Subsequent transcriptions** are faster (1-2 seconds)
- **Recording** is real-time with no delay
- **Offline operation** means no latency from internet

## Limitations

- Maximum 10 seconds per recording
- English only (can add other languages by downloading different Vosk models)
- Requires microphone access
- Accuracy depends on audio quality and speaking clarity

## Future Improvements

Potential enhancements:
- [ ] Multiple language support
- [ ] Custom hotkey binding
- [ ] Longer recording time option
- [ ] Voice command shortcuts (e.g., "new line", "delete")
- [ ] Cloud-based transcription fallback option
- [ ] Punctuation commands

## Credits

- Built for Steam Deck using Decky Loader
- Uses Vosk for offline speech recognition
- Uses ALSA and xdotool for audio/input

## License

GPL-2.0

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Some areas where help is needed:
- Multi-language support
- Performance improvements
- Additional transcription backends
- Better UI/UX
- Documentation and examples

## Support

If you encounter issues:
1. Check the logs at `/tmp/voice-to-text.log`
2. Review Decky logs at `~/homebrew/logs/`
3. Ensure all dependencies are installed
4. Test microphone independently with `arecord`

---

**Enjoy hands-free typing in WoW!** 🎮🎤
