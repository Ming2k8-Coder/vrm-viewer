import { test, expect } from '@playwright/test';

test.describe('VRM Viewer E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the page and initialize VRM model successfully', async ({ page }) => {
    await expect(page).toHaveTitle('VRM Viewer');

    // Check canvas exists
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Check status becomes loaded
    const status = page.locator('#status');
    await expect(status).toContainText(/VRM model loaded successfully|VRMモデルの読み込みが完了しました/, { timeout: 60000 });

    // Check model name
    const vrmName = page.locator('#vrmName');
    await expect(vrmName).toHaveText('sample.vrm');

    // Check model info values populated
    const infoPolygons = page.locator('#infoPolygons');
    await expect(infoPolygons).not.toHaveText('-');
    const infoBones = page.locator('#infoBones');
    await expect(infoBones).not.toHaveText('-');
  });

  test('should support tab navigation smoothly', async ({ page }) => {
    // Wait for model load
    await expect(page.locator('#status')).toContainText(/VRM model loaded successfully|VRMモデルの読み込みが完了しました/, { timeout: 60000 });

    // Switch to Features tab
    await page.locator('#tabFeaturesBtn').click();
    await expect(page.locator('#featuresPanel')).toBeVisible();
    await expect(page.locator('#animationPanel')).toBeHidden();

    // Switch to Pose tab
    await page.locator('#tabPoseBtn').click();
    await expect(page.locator('#posePanel')).toBeVisible();
    await expect(page.locator('#featuresPanel')).toBeHidden();

    // Switch to Face tab
    await page.locator('#tabFaceBtn').click();
    await expect(page.locator('#facePanel')).toBeVisible();
    await expect(page.locator('#posePanel')).toBeHidden();

    // Switch back to Animation tab
    await page.locator('#tabAnimationBtn').click();
    await expect(page.locator('#animationPanel')).toBeVisible();
  });

  test('should toggle UI language when language switch button is clicked', async ({ page }) => {
    const langSwitch = page.locator('.lang-switch');
    await expect(langSwitch).toBeVisible();

    // Get current lang
    const initialLang = await page.getAttribute('html', 'lang');

    // Click toggle
    await langSwitch.click();
    const newLang = await page.getAttribute('html', 'lang');
    expect(newLang).not.toBe(initialLang);

    // Toggle back
    await langSwitch.click();
    const finalLang = await page.getAttribute('html', 'lang');
    expect(finalLang).toBe(initialLang);
  });

  test('should collapse and expand controls panel using toggle button', async ({ page }) => {
    const toggleBtn = page.locator('#panelToggleBtn');
    const controlsPanel = page.locator('#controlsPanel');

    await expect(controlsPanel).toBeVisible();

    // Click collapse
    await toggleBtn.click();
    await expect(controlsPanel).toBeHidden();

    // Click expand
    await toggleBtn.click();
    await expect(controlsPanel).toBeVisible();
  });

  test('should allow selecting sample VRMA animation and enable playback buttons', async ({ page }) => {
    // Wait for model load
    await expect(page.locator('#status')).toContainText(/VRM model loaded successfully|VRMモデルの読み込みが完了しました/, { timeout: 60000 });

    // Click a sample VRMA button (e.g. Angry)
    const angryBtn = page.locator('#vrmaButtons button', { hasText: 'Angry' });
    await expect(angryBtn).toBeVisible();
    await angryBtn.click();

    // Wait for animation load status
    await expect(page.locator('#status')).toContainText(/Animation loaded successfully|アニメーションの読み込みが完了しました/, { timeout: 30000 });

    // Verify Play, Pause, Stop buttons are now enabled
    await expect(page.locator('#playBtn')).toBeEnabled();
    await expect(page.locator('#pauseBtn')).toBeEnabled();
    await expect(page.locator('#stopBtn')).toBeEnabled();
  });
});
