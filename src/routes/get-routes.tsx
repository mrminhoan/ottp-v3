import { Navigate, Route, Routes } from 'react-router-dom'
import { TMenu } from '@/models/types'

// export function renderRouter(routes: Partial<TMenu>[]): ReactNode {
//     function renderRoutes(routes: Partial<TMenu>[]): ReactNode[] {
//         return routes.map((route, index) => {
//             const { path, element, children, to } = route;

//             if (to) {
//                 return <Route key={index} path={path} element={<Navigate to={to} replace />} />;
//             }

//             return (
//                 <Route key={index} path={path} element={element}>
//                     {children && children.length > 0 && renderRoutes(children)}
//                 </Route>
//             );
//         });
//     }

//     return <Routes>{renderRoutes(routes)}</Routes>;
// }

export const renderRouter = (paths: Partial<TMenu>[]) => {
  const ItemRoute = (item: Partial<TMenu>, index: number) => {
    const { path, element, children, to } = item

    if (to) {
      return <Route path={path} element={<Navigate to={to} replace />} key={index} />
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
