import { expect } from '@playwright/test'

import enMessages from '@/locales/en/main.json' with { type: 'json' }

import { agentTest as test } from '@e2e/tests/agent/agentPanelMocks'

test.describe('Agent attachment cancellation', { tag: '@cloud' }, () => {
  test('closing the panel removes a pending upload and preserves a sendable draft', async ({
    comfyPage,
    agentPanel
  }) => {
    const page = comfyPage.page
    let releaseUpload = () => {}
    const uploadHeld = new Promise<void>((resolve) => {
      releaseUpload = resolve
    })
    await page.route('**/api/upload/image', async (route) => {
      await uploadHeld
      await route.abort()
    })

    try {
      const openButton = page.getByRole('button', {
        name: enMessages.agent.entryButton,
        exact: true
      })
      await agentPanel.open()
      await agentPanel.selectWorkflow()
      const panel = page.locator('#agent-panel-root')
      const composer = panel.getByRole('textbox', { name: /^Describe ideas/ })
      const send = panel.getByRole('button', { name: 'Send', exact: true })
      await composer.fill('Keep this draft')
      await expect(send).toBeEnabled()

      const uploadReceived = page.waitForRequest('**/api/upload/image')
      await panel.getByTestId('agent-file-input').setInputFiles({
        name: 'pending.mp4',
        mimeType: 'video/mp4',
        buffer: Buffer.from([0, 0, 0, 0, 0x66, 0x74, 0x79, 0x70])
      })
      await uploadReceived
      await expect(
        panel
          .getByTestId('composer-asset-section')
          .getByRole('group', { name: 'pending.mp4' })
      ).toBeVisible()
      await expect(send).toBeDisabled()

      await panel
        .getByRole('button', { name: enMessages.g.close, exact: true })
        .click()
      await expect(panel).toHaveCount(0)
      await openButton.click()

      await expect(composer).toHaveText('Keep this draft')
      await expect(
        panel.getByRole('group', { name: 'pending.mp4' })
      ).toHaveCount(0)
      await expect(send).toBeEnabled()
    } finally {
      releaseUpload()
      await page.unrouteAll({ behavior: 'wait' })
    }
  })
})

// Regression: https://linear.app/comfyorg/issue/PM-1514
test.describe('Agent attachment validation', { tag: ['@cloud', '@ui'] }, () => {
  test('rejects text renamed as video from the file picker', async ({
    comfyPage,
    agentPanel
  }) => {
    await agentPanel.open()
    await agentPanel.fileInput.setInputFiles({
      name: 'renamed.mp4',
      mimeType: 'video/mp4',
      buffer: Buffer.from('plain text')
    })

    await expect(agentPanel.attachmentChip('renamed.mp4')).toHaveCount(0)
    await expect(
      comfyPage.toast.withText(enMessages.agent.assetNotAttachable)
    ).toBeVisible()
  })

  test('rejects text renamed as video from drag and drop', async ({
    comfyPage,
    agentPanel
  }) => {
    const page = comfyPage.page
    await agentPanel.open()
    const dataTransfer = await page.evaluateHandle(() => {
      const transfer = new DataTransfer()
      transfer.items.add(
        new File(['plain text'], 'renamed.mp4', { type: 'video/mp4' })
      )
      return transfer
    })
    try {
      await agentPanel.root.dispatchEvent('drop', { dataTransfer })
    } finally {
      await dataTransfer.dispose()
    }

    await expect(agentPanel.attachmentChip('renamed.mp4')).toHaveCount(0)
    await expect(
      comfyPage.toast.withText(enMessages.agent.assetNotAttachable)
    ).toBeVisible()
  })
})
