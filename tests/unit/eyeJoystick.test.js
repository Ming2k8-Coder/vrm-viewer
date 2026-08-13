import { describe, it, expect, beforeEach } from 'vitest';
import { initEyeJoystick } from '../../src/eyeJoystick.js';

describe('eyeJoystick module', () => {
	let container;
	let dot;

	beforeEach(() => {
		container = document.createElement('div');
		dot = document.createElement('div');
		container.appendChild(dot);
	});

	it('initializes without error', () => {
		expect(() => initEyeJoystick(container, dot, () => {})).not.toThrow();
	});

	it('safely handles null arguments', () => {
		expect(() => initEyeJoystick(null, null, null)).not.toThrow();
	});
});
