# Contributing to Voice to Text Decky Plugin

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your Steam Deck OS version
- Relevant log files (`/tmp/voice-to-text.log`)

### Suggesting Features

Feature requests are welcome! Please create an issue describing:
- The feature you'd like to see
- Why it would be useful
- How you envision it working

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Test thoroughly** on Steam Deck
5. **Commit with clear messages**: `git commit -m "Add feature: description"`
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Create a Pull Request**

### Development Setup

```bash
# Clone your fork
git clone https://github.com/chelbig695/voice-to-text-decky.git
cd voice-to-text-decky

# Install dependencies
pnpm install  # or npm install

# Build the plugin
npm run build

# For development with auto-rebuild
npm run watch
```

### Code Style

- **Python**: Follow PEP 8 style guide
- **TypeScript/React**: Use the existing code style
- **Comments**: Add comments for complex logic
- **Logging**: Use appropriate log levels (INFO, WARNING, ERROR)

### Testing

Before submitting a PR, please test:
- [ ] Plugin loads in Decky without errors
- [ ] Recording works properly
- [ ] Transcription produces accurate results
- [ ] Text types correctly into applications
- [ ] No console errors or warnings
- [ ] Tested in both Desktop and Game Mode

### Areas for Contribution

Here are some areas where contributions would be especially welcome:

#### High Priority
- [ ] Multi-language support (add more Vosk models)
- [ ] Custom keyboard shortcuts/hotkeys
- [ ] Better error handling and user feedback
- [ ] Performance optimizations

#### Medium Priority
- [ ] Configurable recording length
- [ ] Voice commands (punctuation, newline, etc.)
- [ ] History of recent transcriptions
- [ ] Alternative transcription backends (Whisper, etc.)

#### Nice to Have
- [ ] Custom wake word activation
- [ ] Cloud transcription fallback option
- [ ] Integration with Steam Input
- [ ] Visual waveform during recording
- [ ] Confidence scores for transcription

### Documentation

Improvements to documentation are always appreciated:
- Clarify installation steps
- Add screenshots/GIFs
- Expand troubleshooting guide
- Add use case examples
- Improve code comments

### Commit Message Guidelines

Use clear, descriptive commit messages:

```
feat: Add support for Spanish language model
fix: Resolve microphone permission issue on SteamOS 3.5
docs: Update installation instructions
refactor: Simplify audio recording logic
test: Add unit tests for transcription
```

Prefixes:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Code Review Process

1. All PRs require at least one review
2. Automated checks must pass
3. Changes should be tested on actual Steam Deck hardware
4. Maintainers may request changes or clarifications

### Questions?

If you have questions about contributing:
- Open an issue with the `question` label
- Check existing issues for similar questions
- Review the README and documentation first

## License

By contributing, you agree that your contributions will be licensed under the GPL-2.0 License.

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Any conduct that could be considered unprofessional

### Enforcement

Instances of unacceptable behavior may be reported to the project maintainers. All complaints will be reviewed and investigated promptly and fairly.

---

Thank you for contributing to make voice input on Steam Deck better for everyone! 🎮🎤
