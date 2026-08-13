import { describe, it, expect, beforeEach } from 'vitest';
import { setWireframeMode, setShadowsEnabled } from '../../src/materials.js';
import * as THREE from 'three';

describe('materials module', () => {
	let mesh;
	let mockVrm;

	beforeEach(() => {
		const geo = new THREE.BoxGeometry(1, 1, 1);
		const mat = new THREE.MeshBasicMaterial();
		mesh = new THREE.Mesh(geo, mat);
		mockVrm = {
			scene: new THREE.Group(),
		};
		mockVrm.scene.add(mesh);
	});

	it('setWireframeMode enables wireframe on vrm meshes', () => {
		setWireframeMode(mockVrm, true);
		expect(mesh.material.wireframe).toBe(true);

		setWireframeMode(mockVrm, false);
		expect(mesh.material.wireframe).toBe(false);
	});

	it('setShadowsEnabled sets castShadow and receiveShadow flags', () => {
		setShadowsEnabled(null, null, mockVrm, true);
		expect(mesh.castShadow).toBe(true);
		expect(mesh.receiveShadow).toBe(true);
	});
});
