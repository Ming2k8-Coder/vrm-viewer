# VRM Viewer with VRMA Animation

[English](README.md) | [日本語](README-jp.md)

A web-based VRM (Virtual Reality Model) viewer with VRMA (VRM Animation) support built using Three.js and the three-vrm library.

## 🎮 Live Demo

**[Try the Demo →](https://tk256ailab.github.io/vrm-viewer/)**


## Features

- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎭 **VRM Model Support**: Load and display VRM 1.0 models
- 🎬 **VRMA Animation**: Play custom VRMA animation files
- 📂 **Drag & Drop**: Load your own `.vrm`/`.vrma` files by dropping them onto the page or using the file picker
- 🎮 **Interactive Controls**: Play, pause, and stop animations with smooth crossfades between clips
- 🦴 **Pose Editing**: Rotate every humanoid bone (including fingers) with sliders, or click a bone handle in the 3D view and drag the rotation gizmo directly
- 😊 **Facial Expressions**: Control every expression the model defines (emotions, visemes, blinking, custom clips) with weight sliders
- 👀 **Gaze Control**: Aim the eyes with yaw/pitch sliders, or let them follow your mouse cursor
- 🎛️ **Collapsible UI**: Tabbed control panel (Animation / Pose / Face) that can be hidden entirely with the ☰ toggle
- ⚡ **Fast Performance**: Optimized rendering and animations

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

```
vrm_viewer/
├── index.html              # Main viewer application
├── VRM/
│   └── sample.vrm     # Sample VRM model
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
└── README-jp.md           # Japanese documentation
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
5. **Select animations** using the VRMA buttons
6. **Control playback** with Play, Pause, and Stop buttons

## Usage

### Loading VRM Models

The viewer automatically loads the bundled `sample.vrm` on startup. To use your own model, either:

- **Drag and drop** a `.vrm` file anywhere onto the page, or
- Click **"Open .vrm / .vrma…"** and pick a `.vrm` file

The new model replaces the current one immediately; any previously loaded VRMA buttons stay available and can be re-selected to build a clip against the new model.

### Playing VRMA Animations

1. Wait for the VRM model to load completely
2. Click any of the VRMA animation buttons to select an animation (Angry, Blush, Clapping, Goodbye, Jump, LookAround, Relax, Sad, Sleepy, Surprised, or Thinking) — or drag and drop your own `.vrma` file / use the file picker to add it as a new button
3. Use the playback controls to manage animation; switching to a new clip while one is already playing crossfades smoothly instead of snapping to the default pose

### Editing Poses (Pose Tab)

Switch to the **Pose** tab to sculpt the model's pose by hand:

- Every humanoid bone has X/Y/Z rotation sliders (in degrees); finger and other detail bones are tucked into a collapsible section
- With **3D Bone Handles** enabled, click a sphere on the model to select that bone, then drag the rotation gizmo directly in the viewport — the sliders and gizmo stay in sync both ways
- **Reset Pose** returns every bone to the rest pose
- Opening the Pose tab while an animation is playing freezes the current frame so you can edit from it; pressing Play later hands the skeleton back to the animation (edits are not blended)

### Editing Expressions & Gaze (Face Tab)

Switch to the **Face** tab to control the model's face:

- Expression sliders (0–1 weight) are generated from whatever the loaded model defines: emotion presets, mouth visemes, blinking, and any custom expressions
- **Look At** yaw/pitch sliders aim the eyes manually, or enable **Follow Mouse** to have the gaze track your cursor (works even while an animation plays)
- **Reset Face** zeroes all expressions and re-centers the gaze
- Like the Pose tab, opening it mid-animation freezes the current facial state for editing

### Camera Controls

- **Rotate**: Left-click and drag to rotate the camera around the model
- **Pan**: Right-click and drag to move the camera horizontally/vertically
- **Zoom**: Scroll with mouse wheel to zoom in/out

### Controls

- **☰ Toggle**: Show or hide the whole control panel (animations, pose edits, and gaze tracking keep running while it's hidden)
- **Animation / Pose / Face Tabs**: Switch between playback, bone posing, and facial controls
- **VRMA Animation Buttons**: Select and load different animations
- **Play**: Start or resume animation playback
- **Pause**: Pause/unpause the current animation
- **Stop**: Stop animation and reset pose, expressions, and gaze to default

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
3. Add a `{ name, url }` entry to the `VRMA_ANIMATIONS` array in `index.html` — its button is generated automatically, no HTML changes needed

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
