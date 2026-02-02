#!/bin/bash

# Voice to Text Decky Plugin - Installation Script
# Run this in Desktop Mode on your Steam Deck

echo "======================================"
echo "Voice to Text Plugin - Installation"
echo "======================================"
echo ""

# Check if running on Steam Deck
if [ ! -d "/home/deck" ]; then
    echo "Warning: This script is designed for Steam Deck"
    echo "Continue anyway? (y/n)"
    read -r response
    if [ "$response" != "y" ]; then
        exit 1
    fi
fi

# Check if Decky is installed
if [ ! -d "$HOME/homebrew" ]; then
    echo "ERROR: Decky Loader is not installed!"
    echo "Please install Decky Loader first: https://decky.xyz"
    exit 1
fi

echo "Step 1: Installing system dependencies..."
echo "This requires sudo password (your Steam Deck password)"
echo ""

# Disable read-only filesystem
sudo steamos-readonly disable

# Install required packages
echo "Installing alsa-utils, xdotool, and python-pip..."
sudo pacman -S --noconfirm alsa-utils xdotool python-pip

echo ""
echo "Step 2: Installing Python dependencies..."
pip install vosk --user

echo ""
echo "Step 3: Downloading Vosk speech model..."
mkdir -p ~/.local/share
cd ~/.local/share

if [ -d "vosk-model-small-en-us-0.15" ]; then
    echo "Model already exists, skipping download..."
else
    echo "Downloading small English model (~40MB)..."
    wget -q --show-progress https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip
    
    if [ $? -eq 0 ]; then
        echo "Extracting model..."
        unzip -q vosk-model-small-en-us-0.15.zip
        rm vosk-model-small-en-us-0.15.zip
        echo "Model installed successfully!"
    else
        echo "ERROR: Failed to download model"
        echo "Please download manually from: https://alphacephei.com/vosk/models"
        exit 1
    fi
fi

echo ""
echo "Step 4: Installing Node dependencies..."
cd ~/homebrew/plugins/voice-to-text-decky

if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install
else
    echo "Using npm..."
    npm install
fi

echo ""
echo "Step 5: Building plugin..."
npm run build

echo ""
echo "Step 6: Testing microphone..."
echo "Recording 3 second test..."
arecord -f cd -d 3 /tmp/mic_test.wav 2>&1 | grep -q "Recording WAVE"
if [ $? -eq 0 ]; then
    echo "✓ Microphone is working!"
    rm -f /tmp/mic_test.wav
else
    echo "⚠ Warning: Microphone test failed"
    echo "You may need to configure audio settings"
fi

echo ""
echo "======================================"
echo "Installation Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Restart Decky Loader from Quick Access Menu"
echo "2. Look for 'Voice to Text' in the plugin list"
echo "3. Test it out in Game Mode!"
echo ""
echo "For better accuracy, you can install the larger model:"
echo "  cd ~/.local/share"
echo "  wget https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip"
echo "  unzip vosk-model-en-us-0.22.zip"
echo ""
echo "Then update main.py to use: vosk-model-en-us-0.22"
echo ""
