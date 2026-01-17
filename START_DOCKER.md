# How to Start Docker Desktop on macOS

## Quick Start

Docker Desktop needs to be running before you can use `docker-compose`. Here's how to start it:

### Method 1: Using Spotlight (Easiest)

1. Press `Cmd + Space` to open Spotlight
2. Type "Docker" and press Enter
3. Wait for Docker Desktop to start (you'll see a whale icon in the menu bar)
4. Wait until the icon stops animating (usually 30-60 seconds)

### Method 2: Using Applications Folder

1. Open Finder
2. Go to Applications
3. Find "Docker" application
4. Double-click to launch
5. Wait for Docker Desktop to start

### Method 3: Using Terminal

```bash
open -a Docker
```

## Verify Docker is Running

After starting Docker Desktop, verify it's running:

```bash
# Check Docker daemon is accessible
docker info

# Or check version
docker --version

# Check if Docker daemon is responding
docker ps
```

If these commands work without errors, Docker is running!

## Common Issues

### Issue 1: "Docker Desktop" not found

**Solution**: Install Docker Desktop from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)

### Issue 2: Docker starts but commands still fail

**Solution**: Wait a bit longer (30-60 seconds) for Docker to fully initialize. Check the menu bar icon - it should be steady (not animating).

### Issue 3: Permission denied errors

**Solution**: Make sure Docker Desktop has proper permissions:
1. Go to System Settings → Privacy & Security
2. Allow Docker Desktop if prompted

## After Docker is Running

Once Docker Desktop is running, you can start your services:

```bash
cd /Users/zumar/Projects/careerix
docker-compose up
```

## Check Docker Status

You can check if Docker is running by looking for:
- **Menu bar icon**: Docker whale icon in the top-right menu bar
- **Docker Desktop window**: Should show "Docker Desktop is running"
- **Terminal command**: `docker ps` should work without errors

## Auto-start Docker (Optional)

To make Docker start automatically when you log in:

1. Open Docker Desktop
2. Go to Settings (gear icon)
3. Check "Start Docker Desktop when you log in"

## Troubleshooting

If Docker Desktop won't start:

1. **Restart Docker Desktop**:
   - Click the Docker icon in menu bar
   - Select "Quit Docker Desktop"
   - Wait a few seconds
   - Start it again

2. **Restart your Mac** (if needed)

3. **Check system requirements**:
   - macOS 10.15 or later
   - At least 4GB RAM
   - VirtualBox prior to version 4.3.30 must NOT be installed

4. **Reinstall Docker Desktop** (last resort)

