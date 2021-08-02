import React from 'react'

import { ConfigProvider, message } from 'antd'
import { observer } from 'mobx-react-lite'

import antdLocaleZhHans from 'antd/es/locale/zh_CN'
import antdLocaleZhHant from 'antd/es/locale/zh_HK'
import antdLocaleEn from 'antd/es/locale/en_US' // antd i18n zh_CN ConfigProvider
import { useEnvStore } from '@/modules/common/env-store'
import type { Lang } from '@/modules/common/env-store'

message.config({ maxCount: 1, top: 110 })

export const getAntdLocale = (lang: Lang) => {
  return {
    'zh-hans': antdLocaleZhHans,
    'zh-hant': antdLocaleZhHant,
    en: antdLocaleEn,
  }[lang]
}

export const AntdConfigProvider = observer(({ children }) => {
  const envStore = useEnvStore()

  const locale = getAntdLocale(envStore.lang)

  return (
    <ConfigProvider
      locale={locale}
      form={{ requiredMark: false }}
      getPopupContainer={(triggerNode) =>
        triggerNode ? triggerNode : document.body
      }
    >
      {children}
    </ConfigProvider>
  )
})