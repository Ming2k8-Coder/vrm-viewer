/**
 * @file cameraPresets.js
 * @description Camera view presets, First Person WASD positional movement, FOV,
 *   pointer-lock mouse look, and smooth ease-in-out camera reset module.
 */

import * as THREE from 'three';

/** @typedef {'head'|'upperBody'|'fullBody'|'reset'} CameraPreset */
/** @typedef {'orbital'|'positional'} CameraMode */

const PRESETS = {
	head:      { position: [0.0, 1.4, 0.8], target: [0.0, 1.4, 0.0] },
	upperBody: { position: [0.0, 1.15, 1.8], target: [0.0, 1.0, 0.0] },
	fullBody:  { position: [0.0, 0.85, 3.5], target: [0.0, 0.85, 0.0] },
	reset:     { position: [0.0, 1.0, 5.0], target: [0.0, 1.0, 0.0] },
};

const DEFAULT_CAMERA_POSITION = new THREE.Vector3(0.0, 1.0, 5.0);
const DEFAULT_CONTROLS_TARGET = new THREE.Vector3(0.0, 1.0, 0.0);

let currentMode = 'orbital';
let cameraYaw = 0;
let cameraPitch = 0;
let isPointerLocked = false;

const moveKeys = { w: false, a: false, s: false, d: false, space: false, shift: false };
const moveSpeed = 2.5; // units per second
const lookSpeed = 0.002;

/**
 * Switch camera movement mode between OrbitControls ('orbital') and WASD First-Person ('positional').
 * @param {THREE.PerspectiveCamera} camera
 * @param {import('three/addons/controls/OrbitControls.js').OrbitControls} controls
 * @param {CameraMode} mode
 */
export function setCameraMode(camera, controls, mode) {
	currentMode = mode;
	if (controls) {
		controls.enabled = mode === 'orbital';
	}
	if (mode === 'orbital' && document.pointerLockElement) {
		document.exitPointerLock();
	}
}

/** @returns {CameraMode} */
export function getCameraMode() {
	return currentMode;
}

/**
 * Handle First Person WASD + Space/Shift position updates inside frame render loop.
 * @param {THREE.PerspectiveCamera} camera
 * @param {number} deltaTime
 */
export function updatePositionalCamera(camera, deltaTime) {
	if (currentMode !== 'positional' || !camera) return;

	const speed = moveSpeed * deltaTime;
	const forward = new THREE.Vector3();
	camera.getWorldDirection(forward);
	forward.y = 0;
	forward.normalize();

	const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
	const move = new THREE.Vector3();

	if (moveKeys.w) move.add(forward);
	if (moveKeys.s) move.sub(forward);
	if (moveKeys.a) move.sub(right);
	if (moveKeys.d) move.add(right);

	if (move.lengthSq() > 0) {
		move.normalize();
		camera.position.addScaledVector(move, speed);
	}

	if (moveKeys.space) camera.position.y += speed;
	if (moveKeys.shift) camera.position.y -= speed;
}

/**
 * Handle mouse move events for pointer-lock first person camera rotation.
 * @param {THREE.PerspectiveCamera} camera
 * @param {MouseEvent} event
 */
export function handlePointerLockMouseMove(camera, event) {
	if (currentMode !== 'positional' || !isPointerLocked || !camera) return;

	cameraYaw -= event.movementX * lookSpeed;
	cameraPitch -= event.movementY * lookSpeed;

	cameraPitch = THREE.MathUtils.clamp(
		cameraPitch,
		-Math.PI / 2 + 0.01,
		Math.PI / 2 - 0.01
	);

	camera.rotation.order = 'YXZ';
	camera.rotation.y = cameraYaw;
	camera.rotation.x = cameraPitch;
}

/**
 * Register keyboard WASD & pointer lock event listeners for positional camera mode.
 * @param {THREE.WebGLRenderer} renderer
 * @param {THREE.PerspectiveCamera} camera
 */
export function initPositionalCameraEvents(renderer, camera) {
	if (!renderer || !camera) return;

	renderer.domElement.addEventListener('click', () => {
		if (currentMode === 'positional' && document.pointerLockElement !== renderer.domElement) {
			renderer.domElement.requestPointerLock();
		}
	});

	document.addEventListener('pointerlockchange', () => {
		isPointerLocked = document.pointerLockElement === renderer.domElement;
	});

	document.addEventListener('mousemove', (e) => handlePointerLockMouseMove(camera, e));

	window.addEventListener('keydown', (e) => {
		const tag = document.activeElement?.tagName?.toLowerCase();
		if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

		switch (e.code) {
			case 'KeyW': moveKeys.w = true; break;
			case 'KeyA': moveKeys.a = true; break;
			case 'KeyS': moveKeys.s = true; break;
			case 'KeyD': moveKeys.d = true; break;
			case 'Space': moveKeys.space = true; break;
			case 'ShiftLeft':
			case 'ShiftRight': moveKeys.shift = true; break;
		}
	});

	window.addEventListener('keyup', (e) => {
		switch (e.code) {
			case 'KeyW': moveKeys.w = false; break;
			case 'KeyA': moveKeys.a = false; break;
			case 'KeyS': moveKeys.s = false; break;
			case 'KeyD': moveKeys.d = false; break;
			case 'Space': moveKeys.space = false; break;
			case 'ShiftLeft':
			case 'ShiftRight': moveKeys.shift = false; break;
		}
	});
}

/**
 * Apply a camera framing preset position and target.
 * @param {THREE.PerspectiveCamera} camera
 * @param {import('three/addons/controls/OrbitControls.js').OrbitControls} controls
 * @param {CameraPreset} preset
 */
export function applyCameraPreset(camera, controls, preset) {
	const cfg = PRESETS[preset] ?? PRESETS.reset;
	if (!camera || !controls) return;

	camera.position.set(...cfg.position);
	controls.target.set(...cfg.target);
	controls.update();
}

/**
 * Smoothly reset camera to default position & orientation with quadratic ease-in-out animation.
 * @param {THREE.PerspectiveCamera} camera
 * @param {import('three/addons/controls/OrbitControls.js').OrbitControls} controls
 * @param {number} [duration=600] - Duration in ms
 * @returns {Promise<void>}
 */
export function smoothResetCamera(camera, controls, duration = 600) {
	return new Promise((resolve) => {
		if (!camera || !controls) { resolve(); return; }

		const startPos = camera.position.clone();
		const endPos = DEFAULT_CAMERA_POSITION.clone();
		const startTarget = controls.target.clone();
		const endTarget = DEFAULT_CONTROLS_TARGET.clone();
		const startTime = performance.now();

		function easeInOutQuad(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		}

		function step(now) {
			const elapsed = now - startTime;
			const t = Math.min(1, elapsed / duration);
			const e = easeInOutQuad(t);

			camera.position.lerpVectors(startPos, endPos, e);
			controls.target.lerpVectors(startTarget, endTarget, e);
			controls.update();

			if (t < 1) {
				requestAnimationFrame(step);
			} else {
				cameraYaw = 0;
				cameraPitch = 0;
				resolve();
			}
		}

		requestAnimationFrame(step);
	});
}

/**
 * Set camera Field of View (FOV in degrees) and update projection matrix.
 * @param {THREE.PerspectiveCamera} camera
 * @param {number} fov - Field of view in degrees (10 to 120)
 */
export function setCameraFOV(camera, fov) {
	if (!camera) return;
	camera.fov = Math.max(10, Math.min(120, fov));
	camera.updateProjectionMatrix();
}
