/**
 * @file materials.js
 * @description Material and rendering options module for VRM Viewer.
 *   Provides wireframe view toggle, shadow casting/receiving controls, and material inspection.
 */

import * as THREE from 'three';

/**
 * Enable or disable wireframe mode on all mesh materials of a VRM model.
 * @param {import('@pixiv/three-vrm').VRM} vrm
 * @param {boolean} enabled
 */
export function setWireframeMode(vrm, enabled) {
	if (!vrm) return;
	vrm.scene.traverse((obj) => {
		if (obj.isMesh && obj.material) {
			const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
			mats.forEach((m) => {
				m.wireframe = Boolean(enabled);
			});
		}
	});
}

/**
 * Enable or disable shadow casting and receiving for scene lights and VRM meshes.
 * @param {THREE.WebGLRenderer} renderer
 * @param {THREE.Scene} scene
 * @param {import('@pixiv/three-vrm').VRM} vrm
 * @param {boolean} enabled
 */
export function setShadowsEnabled(renderer, scene, vrm, enabled) {
	if (renderer) {
		renderer.shadowMap.enabled = Boolean(enabled);
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}

	if (scene) {
		scene.traverse((obj) => {
			if (obj.isLight && obj.castShadow !== undefined) {
				obj.castShadow = Boolean(enabled);
				if (obj.shadow) {
					obj.shadow.mapSize.width = 1024;
					obj.shadow.mapSize.height = 1024;
				}
			}
		});
	}

	if (vrm) {
		vrm.scene.traverse((obj) => {
			if (obj.isMesh) {
				obj.castShadow = Boolean(enabled);
				obj.receiveShadow = Boolean(enabled);
			}
		});
	}
}
