import loadable, {
  DefaultComponent,
  LoadableClassComponent,
  LoadableComponent,
  Options,
  OptionsWithoutResolver,
  OptionsWithResolver
} from '@loadable/component'
import { ComponentClass, ComponentProps } from 'react'

export function LoadedAleCore<Props, Module = DefaultComponent<Props>>(
  loadFn: (props: Props) => Promise<Module>,
  options: OptionsWithResolver<Props, Module>
): LoadableComponent<Props>

export function LoadedAleCore<Props>(
  loadFn: (props: Props) => Promise<DefaultComponent<Props>>,
  options?: OptionsWithoutResolver<Props>
): LoadableComponent<Props>

export function LoadedAleCore<Component extends ComponentClass<any>>(
  loadFn: (props: ComponentProps<Component>) => Promise<Component | { default: Component }>,
  options?: Options<ComponentProps<Component>, Component>
): LoadableClassComponent<Component>

export function LoadedAleCore(func: any, options: any) {
  const wrapFunc = () => func().then((mod: any) => mod.default ?? mod)
  return loadable(wrapFunc, {
    fallback: (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-200/50 backdrop-blur-sm dark:bg-gray-850/50'>
        <div className='flex-col gap-4 w-full flex items-center justify-center'>
          <div className='w-28 h-28 border-8 text-[#93dc12] text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#93dc12] rounded-full'>
            <img src='/images/logo.png ' alt='loading' className='w-8 h-8 animate-ping' />
          </div>
        </div>
      </div>
    ),
    ...(options || {})
  })
}
