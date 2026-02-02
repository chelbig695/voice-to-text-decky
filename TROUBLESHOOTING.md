# Troubleshooting Guide - Voice to Text Plugin

## Common Issues and Solutions

### Issue: "Vosk model not found" Error

**Cause:** The speech recognition model hasn't been downloaded or is in the wrong location.

**Solution:**
```bash
# Download the model
cd ~/.local/share
wget https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip
unzip vosk-model-small-en-us-0.15.zip
rm vosk-model-small-en-us-0.15.zip
```

Verify the model exists:
```bash
ls -la ~/.local/share/vosk-model-small-en-us-0.15
```

---

### Issue: No Audio Being Recorded

**Diagnosis:**
```bash
# Test if microphone works
arecord -f cd -d 5 test.wav
aplay test.wav
```

**Solutions:**
1. Check if microphone is muted in system settings
2. Verify audio device:
   ```bash
   arecord -l  # List recording devices
   ```
3. Set default microphone if needed:
   ```bash
   # Edit ~/.asoundrc
   echo "defaults.pcm.card 0" >> ~/.asoundrc
   echo "defaults.pcm.device 0" >> ~/.asoundrc
   ```

---

### Issue: Text Not Typing Into Game

**Possible Causes:**
- Game doesn't have keyboard focus
- xdotool not working properly
- Text field not active

**Solutions:**
1. Click in WoW's chat box before using voice input
2. Test xdotool manually:
   ```bash
   xdotool type "test message"
   ```
3. Make sure game is in windowed or borderless mode (fullscreen can block input)
4. Try pressing Enter before using voice input to open chat

---

### Issue: Plugin Not Appearing in Decky

**Checklist:**
- [ ] Plugin folder is in `~/homebrew/plugins/voice-to-text-decky`
- [ ] `plugin.json` exists in the root folder
- [ ] Decky Loader has been restarted
- [ ] Check Decky logs for errors

**Check Logs:**
```bash
# View Decky logs
tail -f ~/homebrew/logs/loader.log

# View plugin-specific logs
tail -f /tmp/voice-to-text.log
```

**Solution:**
```bash
# Rebuild the plugin
cd ~/homebrew/plugins/voice-to-text-decky
npm run build

# Restart Decky (from Quick Access Menu or):
systemctl --user restart plugin_loader
```

---

### Issue: Poor Transcription Accuracy

**Improvements:**

1. **Use larger model** (better accuracy):
   ```bash
   cd ~/.local/share
   wget https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip
   unzip vosk-model-en-us-0.22.zip
   ```
   
   Update `main.py` line 58:
   ```python
   model_path = "/home/deck/.local/share/vosk-model-en-us-0.22"
   ```

2. **Recording tips:**
   - Speak clearly and at moderate pace
   - Reduce background noise (pause game music)
   - Hold Steam Deck closer to your mouth
   - Use short, clear phrases

3. **Test microphone quality:**
   ```bash
   arecord -f cd -d 5 test.wav
   aplay test.wav
   ```

---

### Issue: Transcription Takes Too Long

**Causes:**
- First transcription loads the model (2-3 seconds)
- Large model takes longer than small model
- Low system resources

**Solutions:**
1. Use small model for faster results
2. Close background apps to free resources
3. Pre-load model by using plugin once after boot

---

### Issue: Plugin Crashes or Freezes

**Diagnosis:**
```bash
# Check for errors in logs
cat /tmp/voice-to-text.log
cat ~/homebrew/logs/loader.log
```

**Solutions:**
1. Restart Decky Loader
2. Reinstall dependencies:
   ```bash
   pip install --force-reinstall vosk --user
   ```
3. Check for conflicting plugins
4. Verify all system packages are installed:
   ```bash
   pacman -Q alsa-utils xdotool python-pip
   ```

---

### Issue: "Vosk library not installed" Error

**Solution:**
```bash
# Reinstall Vosk
pip install vosk --user --force-reinstall

# Verify installation
python -c "import vosk; print(vosk.__version__)"
```

---

### Issue: Permission Denied Errors

**Solution:**
```bash
# Make sure plugin files have correct permissions
chmod -R 755 ~/homebrew/plugins/voice-to-text-decky
chmod +x ~/homebrew/plugins/voice-to-text-decky/install.sh

# Make sure log file is writable
touch /tmp/voice-to-text.log
chmod 666 /tmp/voice-to-text.log
```

---

### Issue: Works in Desktop Mode but Not Game Mode

**Cause:** Some system services may behave differently in Game Mode.

**Solutions:**
1. Verify audio device is available in Game Mode:
   ```bash
   # In Game Mode console
   arecord -l
   ```
2. Check that xdotool works in Game Mode
3. Ensure game accepts simulated keyboard input
4. Try different WoW window modes (windowed vs fullscreen)

---

## Performance Optimization

### Reduce Latency
```bash
# Use small model
cd ~/.local/share
# Keep vosk-model-small-en-us-0.15
```

### Improve Accuracy
```bash
# Use large model
cd ~/.local/share
wget https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip
unzip vosk-model-en-us-0.22.zip
```

### Balance (Medium Model)
```bash
# Use medium model (~1GB)
cd ~/.local/share
wget https://alphacephei.com/vosk/models/vosk-model-en-us-0.42.zip
```

---

## Getting Help

If none of these solutions work:

1. **Check logs thoroughly:**
   ```bash
   cat /tmp/voice-to-text.log
   cat ~/homebrew/logs/loader.log
   ```

2. **Test each component separately:**
   - Audio recording: `arecord -f cd -d 3 test.wav && aplay test.wav`
   - Vosk: `python -c "import vosk; print('OK')"`
   - xdotool: `xdotool type "test"`

3. **Gather system info:**
   ```bash
   uname -a
   python --version
   pip list | grep vosk
   pacman -Q | grep -E "alsa|xdotool"
   ```

4. **Report the issue:**
   - Include logs
   - Describe exact steps to reproduce
   - Note your Steam Deck OS version
   - Mention which WoW version (Classic/Retail)

---

## WoW-Specific Tips

### For WoW Classic:
- Use `/say`, `/party`, `/guild` commands
- Open chat with Enter before using voice input
- Short messages work best (under 10 seconds)

### For WoW Retail:
- Same as Classic
- Works with Quick Join and whispers
- Can use for auction house searches

### General WoW Tips:
- Don't use voice input during intense gameplay
- Best for:
  - Party/raid communication
  - Guild chat
  - Trading messages
  - Auction house searches
  - Quest item searches
- Set up macros for common phrases to combine with voice input

---

## Advanced Configuration

### Adjust Recording Quality
Edit `main.py` line 42-47 to change audio settings:
```python
# Higher quality (more processing time)
'-f', 'dat',  # DAT quality instead of 'cd'
'-r', '48000',  # 48kHz sample rate
```

### Change Max Recording Time
Edit `main.py` line 46:
```python
'-d', '15',  # Allow 15 seconds instead of 10
```

Also update `src/index.tsx` line 46:
```typescript
}, 15000);  // Match the timeout to your setting
```

---

## Clean Reinstall

If all else fails, completely reinstall:

```bash
# Remove plugin
rm -rf ~/homebrew/plugins/voice-to-text-decky

# Remove models
rm -rf ~/.local/share/vosk-model-*

# Remove Python package
pip uninstall vosk -y

# Start fresh with installation
# [Copy plugin files again and run install.sh]
```
