import { LoadedAleCore } from './lib/loaded-ale-core'
import { WrapperConfig } from './wrapper-config/wrapper-config'
const AppLoadCore = LoadedAleCore(() => import('./App'))
try {
  ;(async () => {
    await WrapperConfig({
      children: <AppLoadCore />
    })
  })()
} catch (error) {
  console.error(error)
}
