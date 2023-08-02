import { createI18n } from 'vue-i18n'
/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/unplugin-vue-i18n/messages'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'pt',
  messages
})
