import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '71r40jz5',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
