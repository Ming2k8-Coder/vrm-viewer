/**
 * @file eyeJoystick.js
 * @description 2D touchpad joystick control for aiming VRM avatar eyes.
 *   Directly matches Flarom's 2D eye aiming touchpad box.
 */

import * as THREE from 'three';

let joystickBox = null;
let joystickDot = null;
let isDragging = false;

/**
 * Initialize 2D eye joystick touchpad events.
 * @param {HTMLElement} container - Joystick container element
 * @param {HTMLElement} dot - Joystick inner dot element
 * @param {Function} onAim - Callback (yawDeg, pitchDeg) => void
 */
export function initEyeJoystick(container, dot, onAim) {
	if (!container || !dot) return;
	joystickBox = container;
	joystickDot = dot;

	function handleMove(clientX, clientY) {
		const rect = joystickBox.getBoundingClientRect();
		const radiusX = rect.width / 2;
		const radiusY = rect.height / 2;
		const centerX = rect.left + radiusX;
		const centerY = rect.top + radiusY;

		let dx = clientX - centerX;
		let dy = clientY - centerY;

		// Clamp inside circular/rectangular radius
		const dist = Math.hypot(dx, dy);
		const maxDist = radiusX - 12;
		if (dist > maxDist) {
			dx = (dx / dist) * maxDist;
			dy = (dy / dist) * maxDist;
		}

		// Position dot
		joystickDot.style.transform = `translate(${dx}px, ${dy}px)`;

		// Normalized -1 to 1 values
		const normX = dx / maxDist; // yaw (-1 = left, +1 = right)
		const normY = dy / maxDist; // pitch (-1 = up, +1 = down)

		const yawDeg = normX * 30.0;
		const pitchDeg = -normY * 20.0;

		if (onAim) onAim(yawDeg, pitchDeg);
	}

	function resetDot() {
		joystickDot.style.transform = 'translate(0px, 0px)';
	}

	container.addEventListener('mousedown', (e) => {
		isDragging = true;
		handleMove(e.clientX, e.clientY);
	});

	window.addEventListener('mousemove', (e) => {
		if (isDragging) handleMove(e.clientX, e.clientY);
	});

	window.addEventListener('mouseup', () => {
		if (isDragging) {
			isDragging = false;
		}
	});

	// Touch support
	container.addEventListener('touchstart', (e) => {
		if (e.touches.length > 0) {
			isDragging = true;
			handleMove(e.touches[0].clientX, e.touches[0].clientY);
		}
	});

	window.addEventListener('touchmove', (e) => {
		if (isDragging && e.touches.length > 0) {
			handleMove(e.touches[0].clientX, e.touches[0].clientY);
		}
	});

	window.addEventListener('touchend', () => {
		isDragging = false;
	});
}
