import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { TMenu } from '@/models/types'

export const renderRouter = (paths: Partial<TMenu>[]) => {
  const ItemRoute = (item: Partial<TMenu>, index: number) => {
    const location = useLocation()

    const { path, element, children, to } = item

    if (to) {
      const search = location.search
      const finalTo = `${to}${search}`
      
      return <Route path={path} element={<Navigate to={finalTo} replace />} key={index} />
    }

    return (
      <Route path={path} element={element} key={index}>
        {children && Array.isArray(children) && ListRoute(children)}
      </Route>
    )
  }

  function ListRoute(items: Partial<TMenu>[]) {
    return items.map((item, index) => ItemRoute(item, index))
  }

  return <Routes>{ListRoute(paths)}</Routes>
}
