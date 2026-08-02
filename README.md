# VRM Viewer with VRMA Animation

English | [日本語](README-jp.md)

A web-based VRM (Virtual Reality Model) viewer with VRMA (VRM Animation) support built using Three.js and the three-vrm library.

**[Try the Demo →](https://tk256ailab.github.io/vrm-viewer/)**

## Features

- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎭 **VRM Model Support**: Load and display VRM 1.0 models
- 🎬 **VRMA Animation**: Play custom VRMA animation files
- 🎮 **Interactive Controls**: Play, pause, and stop animations
- 🦴 **Pose Editing**: Rotate every humanoid bone (including fingers) with sliders, or click a bone handle in the 3D view and drag the rotation gizmo directly
- 😊 **Facial Expressions**: Control every expression the model defines (emotions, visemes, blinking, custom clips) with weight sliders
- 👀 **Gaze Control**: Aim the eyes with yaw/pitch sliders, or let them follow your mouse cursor
- 💡 **Lighting & Behaviors**: Adjust directional and ambient light, and toggle auto-blinking or standby motion
- 🎛️ **Collapsible UI**: Tabbed control panel (Features / Animation / Pose / Face) that can be hidden entirely with the ☰ toggle
- 🌐 **Automated Localization**: Automatically switches between English and Japanese UI based on browser preference (with manual override)
- ⚡ **Fast Performance**: Optimized rendering and animations
- 📂 **Drag & Drop**: Easily load .vrm and .vrma files by dragging them into the window

## Demo

Open `index.html` in a web browser to see the demo. The viewer includes:

- A sample VRM model (sample.vrm)
- Eleven VRMA animation examples:
  - **Angry**: Angry emotion animation
  - **Blush**: Blushing emotion animation
  - **Clapping**: Clapping hands animation
  - **Goodbye**: Waving goodbye animation
  - **Jump**: Jumping action animation
  - **LookAround**: Looking around animation
  - **Relax**: Relaxed pose animation
  - **Sad**: Sad emotion animation
  - **Sleepy**: Sleepy emotion animation
  - **Surprised**: Surprised emotion animation
  - **Thinking**: Thinking pose animation

## Project Structure

```text
vrm_viewer/
├── index.html              # Main viewer application (Dual Language)
├── VRM/
│   └── sample.vrm          # Sample VRM model
├── VRMA/
│   ├── Angry.vrma          # Angry emotion animation
│   ├── Blush.vrma          # Blushing emotion animation
│   ├── Clapping.vrma       # Clapping hands animation
│   ├── Goodbye.vrma        # Waving goodbye animation
│   ├── Jump.vrma           # Jumping action animation
│   ├── LookAround.vrma     # Looking around animation
│   ├── Relax.vrma          # Relaxed pose animation
│   ├── Sad.vrma            # Sad emotion animation
│   ├── Sleepy.vrma         # Sleepy emotion animation
│   ├── Surprised.vrma      # Surprised emotion animation
│   └── Thinking.vrma       # Thinking pose animation
├── README.md               # This file
└── README-jp.md            # Japanese documentation
```

## Quick Start

### Method 1: GitHub Pages (Recommended)

1. **Fork or upload** this repository to GitHub
2. **Enable GitHub Pages**:
   - Go to your repository's Settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
3. **Access your demo** at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

### Method 2: Local Development

1. **Clone or download** this repository
2. **Start a local web server** (required for loading files):

   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open your browser** and navigate to `http://localhost:8000`
4. **Load the VRM model** (automatically loads on page load)
5. **Select animations** using the VRMA buttons or upload your own files
6. **Control playback** with Play, Pause, and Stop buttons

## Usage

### Loading VRM Models

The viewer automatically loads the VRM model specified in `index.html`. To use your own model:

1. **Drag and Drop** your `.vrm` file into the window, OR
2. Click **Upload VRM** button to select a file from your computer.

### Playing VRMA Animations

1. Wait for the VRM model to load completely
2. **Drag and Drop** your `.vrma` file, OR
3. Click **Upload VRMA** to select a file, OR
4. Click any of the Sample VRMA animation buttons (Angry, Blush, etc.)
5. Use the playback controls to manage animation

### Camera Controls

- **Rotate**: Left-click and drag to rotate the camera around the model
- **Pan**: Right-click and drag to move the camera horizontally/vertically
- **Zoom**: Scroll with mouse wheel to zoom in/out

### UI Controls

- **VRMA Animation Buttons**: Select and load different animations
- **Play**: Start or resume animation playback
- **Pause**: Pause/unpause the current animation
- **Stop**: Stop animation and reset to default pose
- **Bone Handles**: In the Pose tab, click a bone handle to manipulate the model's limbs with the 3D gizmo.
- **Sliders**: Dynamically interact with bone rotations, facial expressions, look-at targets, and scene lighting.

## Technical Details

### Dependencies

- [Three.js](https://threejs.org/) - 3D graphics library
- [@pixiv/three-vrm](https://github.com/pixiv/three-vrm) - VRM model support
- [@pixiv/three-vrm-animation](https://github.com/pixiv/three-vrm-animation) - VRMA animation support

### Animation Specifications

- **Format**: VRMA (VRM Animation) files in glTF binary format
- **Humanoid Bones**: Compatible with VRM 1.0 humanoid specification
- **Frame Rate**: 60 FPS with linear interpolation
- **Duration**: Variable (4-12 seconds for included animations)

### Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 14+
- ✅ Edge 80+

## Customization

### Adding New Animations

1. Create or obtain VRMA animation files
2. Place them in the `VRMA/` directory
3. Update the `VRMA_ANIMATION_URLS` array in `index.html`
4. Add corresponding buttons in the HTML

### Styling

The interface uses CSS custom properties for easy theming. Key variables:

- Background colors and gradients
- Button styling and hover effects
- Control panel appearance
- Responsive breakpoints

## License

This project is for demonstration purposes. Please ensure you have appropriate rights for any VRM models and animations you use.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Acknowledgments

- [three-vrm](https://github.com/pixiv/three-vrm) - VRM support for Three.js
- [Three.js](https://threejs.org/) - 3D graphics foundation
- VRM Consortium - VRM format specification
