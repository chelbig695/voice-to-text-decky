# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Multi-language support
- Configurable hotkeys
- Voice command support (punctuation, formatting)
- Cloud transcription fallback option
- Recording history

## [1.0.0] - 2025-02-01

### Added
- Initial release
- Voice recording up to 10 seconds
- Offline speech recognition using Vosk
- Automatic text typing with xdotool
- Quick Access Menu integration
- Real-time status display
- Error handling and logging
- Installation script for easy setup
- Comprehensive documentation
- Troubleshooting guide

### Features
- Works completely offline
- No latency from internet connectivity
- Supports WoW and other games
- Microphone recording via ALSA
- TypeScript/React frontend
- Python backend

### Known Issues
- First transcription may take 2-3 seconds (model loading)
- Limited to English by default
- Fullscreen games may block input in some cases

[Unreleased]: https://github.com/chelbig695/voice-to-text-decky/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/chelbig695/voice-to-text-decky/releases/tag/v1.0.0
