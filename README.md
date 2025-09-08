# 🎙️ OBS Studio Profile Generator

A professional web application that generates OBS Studio configuration files with an intuitive, broadcast-themed interface. Perfect for streamers and content creators who need reliable, customizable OBS profiles.

![OBS Studio Profile Generator](https://img.shields.io/badge/OBS-Studio-orange?style=for-the-badge&logo=obs-studio&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-white?style=for-the-badge&logo=vercel&logoColor=black)

## 🌟 Features

### 🎨 Professional Broadcast UI
- **Orange Gradient Theme**: Professional color scheme from light to dark orange
- **Dark Mode Optimized**: Perfect for broadcast studio environments
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Elements**: Smooth animations and professional styling

### ⚙️ Comprehensive Configuration System
- **Basic Settings**: Profile name, filename formatting, delay/reconnection options
- **Service Settings**: Stream server URL, stream key, authentication configuration
- **Encoder Settings**: Bitrate, buffer size, H.264 profile, tuning options
- **Audio/Video Settings**: Resolution, FPS, sample rate, channel configuration

### 📄 Three-File Generation
Automatically generates all required OBS Studio configuration files:

1. **`basic.ini`** - Main OBS configuration containing:
   - General settings and output modes
   - Recording and streaming parameters
   - Video and audio base configurations
   - Panel and interface settings

2. **`service.json`** - Stream service settings including:
   - Server URL and connection details
   - Authentication parameters
   - Stream key configuration

3. **`streamEncoder.json`** - Encoder configuration with:
   - Bitrate and buffer settings
   - H.264 profile and tuning options
   - Keyframe interval configuration

### 🚀 Advanced Features
- **Real-time Preview**: Live stream information display
- **One-Click Download**: Download all configuration files simultaneously
- **API Endpoints**: Programmatic access for automation
- **Production Ready**: Optimized for Vercel deployment

## 🛠️ Technology Stack

### Core Framework
- **⚡ Next.js 15** - React framework with App Router
- **📘 TypeScript 5** - Type-safe development
- **🎨 Tailwind CSS 4** - Utility-first styling

### UI Components
- **🧩 shadcn/ui** - High-quality accessible components
- **🎯 Lucide React** - Beautiful icon library
- **🌈 Framer Motion** - Smooth animations

### Development Tools
- **🔧 ESLint** - Code quality and consistency
- **📦 Prisma** - Database ORM (ready for future features)
- **🔐 NextAuth.js** - Authentication (ready for user accounts)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shihan84/obs-profile-generator.git

# Navigate to project directory
cd obs-profile-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

1. **Open Application**: Navigate to [http://localhost:3000](http://localhost:3000)
2. **Configure Settings**: Use the intuitive tabbed interface:
   - **Basic**: Profile name, delay settings, reconnection options
   - **Service**: Stream server URL and authentication
   - **Encoder**: Bitrate, buffer size, H.264 settings
   - **A/V**: Resolution, FPS, audio configuration
3. **Preview**: Check real-time stream information
4. **Download**: Click "Download All Files" to get your configuration

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 API Endpoints

The application provides REST API endpoints for programmatic access:

### Generate Configuration Files

```bash
# Generate basic.ini
curl -X POST http://localhost:3000/api/obs/basic \
  -H "Content-Type: application/json" \
  -d '{
    "basic": {
      "name": "My Profile",
      "filenameFormatting": "%CCYY-%MM-%DD %hh-%mm-%ss",
      "delayEnable": false,
      "delaySec": 20,
      "reconnect": true,
      "retryDelay": 2,
      "maxRetries": 25
    },
    "video": {
      "baseCX": 1920,
      "baseCY": 1080,
      "outputCX": 1280,
      "outputCY": 720,
      "fpsType": 0,
      "fpsCommon": 30,
      "scaleType": "bicubic"
    },
    "audio": {
      "sampleRate": 48000,
      "channelSetup": "Stereo",
      "bitrate": 160
    }
  }'

# Generate service.json
curl -X POST http://localhost:3000/api/obs/service \
  -H "Content-Type: application/json" \
  -d '{
    "type": "rtmp_custom",
    "server": "srt://your-server:port",
    "useAuth": false,
    "key": "your-stream-key"
  }'

# Generate streamEncoder.json
curl -X POST http://localhost:3000/api/obs/encoder \
  -H "Content-Type: application/json" \
  -d '{
    "bitrate": 8000,
    "useBufsize": true,
    "bufferSize": 2000,
    "keyintSec": 2,
    "profile": "main",
    "tune": "zerolatency"
  }'
```

## 🌤️ Vercel Deployment

This application is optimized for deployment on Vercel:

### Automated Deployment

1. **Push to GitHub**: 
   ```bash
   git add .
   git commit -m "Update OBS Profile Generator"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import `shihan84/obs-profile-generator` repository

3. **Deploy**: 
   - Vercel automatically detects Next.js
   - Builds and deploys your application
   - Provides a live URL (e.g., `obs-profile-generator.vercel.app`)

### Manual Configuration

If you need custom settings, create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "env": {
    "NEXT_TELEMETRY_DISABLED": "1"
  }
}
```

## 📋 Configuration Guide

### Basic Settings
- **Profile Name**: Display name in OBS
- **Filename Format**: Recording file naming pattern
- **Stream Delay**: Add delay to prevent accidental content leaks
- **Auto Reconnect**: Automatically reconnect if connection drops
- **Max Retries**: Number of reconnection attempts

### Service Settings
- **Server URL**: Your streaming server address (e.g., `srt://server:port`)
- **Stream Key**: Authentication key for your streaming service
- **Authentication**: Enable if your server requires authentication

### Encoder Settings
- **Bitrate**: Video bitrate in kbps (8000 recommended for 1080p)
- **Buffer Size**: Buffer size in kbps (2000 recommended)
- **Profile**: H.264 profile (baseline, main, high)
- **Tuning**: Encoder tuning (zerolatency, fastdecode, film)

### Audio/Video Settings
- **Base Resolution**: Your monitor/capture resolution
- **Output Resolution**: Stream output resolution
- **FPS**: Frames per second (30, 60 recommended)
- **Sample Rate**: Audio quality (48kHz recommended)

## 🎯 Use Cases

### For Streamers
- **Quick Setup**: Generate OBS profiles in seconds
- **Multiple Profiles**: Create different profiles for different platforms
- **Backup Configurations**: Save and share your OBS settings
- **Team Collaboration**: Standardize settings across team members

### For Content Creators
- **Professional Quality**: Ensure optimal streaming settings
- **Platform Optimization**: Different settings for YouTube, Twitch, etc.
- **Testing**: Quickly test different configuration options
- **Documentation**: Keep track of your preferred settings

### For Broadcasters
- **Studio Integration**: Professional-grade configuration
- **Reliability**: Tested and proven settings
- **Compliance**: Meet platform requirements
- **Scalability**: From small streams to large broadcasts

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use the existing orange color scheme
- Maintain responsive design
- Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OBS Studio** - The amazing open-source streaming software
- **Next.js** - The React framework for production
- **shadcn/ui** - Beautiful UI components
- **Vercel** - Seamless deployment platform

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/shihan84/obs-profile-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/shihan84/obs-profile-generator/discussions)
- **Email**: Create an issue for private communication

---

**Built with ❤️ for the streaming community**  
**Made possible by modern web technologies and open-source software**
