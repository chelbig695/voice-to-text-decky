# How to Upload This Plugin to GitHub

Follow these steps to get your plugin on GitHub and share it with the community!

## Step 1: Create a GitHub Account

If you don't have one already:
1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Follow the registration process

## Step 2: Create a New Repository

1. Log into GitHub
2. Click the **+** icon in the top right
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `voice-to-text-decky`
   - **Description**: "Voice-to-text plugin for Steam Deck - Quick dictation for WoW and gaming"
   - **Visibility**: Choose **Public** (so others can use it)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 3: Prepare Your Files

On your computer (or Steam Deck in Desktop Mode):

```bash
# Navigate to the plugin directory
cd /path/to/voice-to-text-decky

# Initialize git if not already done
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Voice to Text Decky Plugin v1.0.0"
```

## Step 4: Connect to GitHub

Replace `YOUR-USERNAME` with your actual GitHub username:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR-USERNAME/voice-to-text-decky.git

# Push to GitHub
git branch -M main
git push -u origin main
```

You'll be prompted for your GitHub credentials. If using 2FA, you'll need to create a Personal Access Token:

### Creating a Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Steam Deck Plugin Upload"
4. Select scopes: Check **repo** (all sub-options)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

## Step 5: Update Repository Links

Now that you know your GitHub username, update these files:

### 1. README.md

Replace `YOUR-USERNAME` with your actual username:
- Installation URLs
- Badge links
- Issue tracker links

### 2. package.json

Update the repository URLs:
```json
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR-ACTUAL-USERNAME/voice-to-text-decky.git"
},
```

### 3. CHANGELOG.md

Update the version links at the bottom.

### 4. All .md files

Search for `YOUR-USERNAME` and replace with your actual username.

Then commit and push the changes:
```bash
git add .
git commit -m "docs: Update repository URLs"
git push
```

## Step 6: Add Topics/Tags

On GitHub repository page:

1. Click the ⚙️ gear icon next to "About"
2. Add topics: `steam-deck`, `decky-plugin`, `voice-to-text`, `gaming`, `accessibility`
3. Add a description
4. Add the website: (leave blank or add docs site)
5. Save changes

## Step 7: Create Your First Release

1. Go to your repository on GitHub
2. Click **"Releases"** → **"Create a new release"**
3. Click **"Choose a tag"** → Type `v1.0.0` → Click **"Create new tag"**
4. **Release title**: `v1.0.0 - Initial Release`
5. **Description**: Copy from CHANGELOG.md or write:

```markdown
## 🎉 Initial Release

Voice to Text plugin for Steam Deck - Quickly dictate text in WoW and other games!

### Features
- 🎤 Voice recording (up to 10 seconds)
- 🔄 Offline transcription using Vosk
- ⌨️ Automatic text typing
- 🚀 Quick Access Menu integration

### Installation
See [QUICKSTART.md](QUICKSTART.md) for installation instructions.

### Requirements
- Steam Deck with Decky Loader
- ~40MB free space for speech model

### Known Issues
- First transcription may take 2-3 seconds
- English language only (can add more models)
```

6. Check **"Set as the latest release"**
7. Click **"Publish release"**

## Step 8: Add a Nice README Badge

You can add a downloads badge once your plugin gains traction:

```markdown
![GitHub Downloads](https://img.shields.io/github/downloads/YOUR-USERNAME/voice-to-text-decky/total)
```

## Step 9: Submit to Decky Plugin Store (Optional)

To make your plugin discoverable in the Decky store:

1. Fork the [Decky Plugin Database](https://github.com/SteamDeckHomebrew/decky-plugin-database)
2. Add your plugin to the database
3. Create a pull request
4. Wait for review and approval

See [Decky Plugin Database docs](https://github.com/SteamDeckHomebrew/decky-plugin-database) for details.

## Step 10: Spread the Word!

Share your plugin:

- 🎮 **Reddit**: r/SteamDeck, r/SteamDeck_Homebrew
- 💬 **Discord**: Steam Deck Discord, Decky Loader Discord
- 🐦 **Twitter/X**: Tweet with #SteamDeck #DeckyPlugin
- 🎥 **YouTube**: Make a demo video
- 📝 **Blog**: Write about your development experience

## Maintaining Your Repository

### Handling Issues

When someone reports a bug:
1. Thank them for reporting
2. Ask for logs and details (use the issue template)
3. Try to reproduce the issue
4. Fix it and reference the issue in your commit: `fix: resolve mic issue (#5)`
5. Close the issue when fixed

### Accepting Pull Requests

When someone contributes:
1. Review the code
2. Test on your Steam Deck
3. Request changes if needed
4. Merge when ready
5. Thank the contributor!

### Creating New Releases

When you add features or fix bugs:

```bash
# Update version in package.json
# Update CHANGELOG.md

git add .
git commit -m "chore: bump version to 1.1.0"
git tag v1.1.0
git push && git push --tags

# Then create a new release on GitHub
```

## Git Cheat Sheet

Common commands you'll use:

```bash
# Check status
git status

# Pull latest changes
git pull

# Create a branch for a new feature
git checkout -b feature/new-feature

# Stage changes
git add .

# Commit changes
git commit -m "feat: add new feature"

# Push changes
git push

# Switch branches
git checkout main

# Merge a branch
git merge feature/new-feature

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

## Troubleshooting

### "Permission denied" when pushing

Use a Personal Access Token as your password (see Step 4).

### "Remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/voice-to-text-decky.git
```

### Large files rejected

```bash
# Add to .gitignore
echo "vosk-model*/" >> .gitignore
echo "*.zip" >> .gitignore
git rm -r --cached vosk-model-*
git commit -m "Remove large model files"
git push
```

### Wrong username in files

```bash
# Use find and replace
find . -type f -name "*.md" -exec sed -i 's/YOUR-USERNAME/actual-username/g' {} +
git add .
git commit -m "docs: update username in documentation"
git push
```

## Need Help?

- 📖 [GitHub Docs](https://docs.github.com)
- 💬 [GitHub Community](https://github.community)
- 🎓 [Git Handbook](https://guides.github.com/introduction/git-handbook/)

---

**Congratulations! Your plugin is now on GitHub!** 🎉

Now the Steam Deck community can benefit from your work, contribute improvements, and help make voice input even better!
