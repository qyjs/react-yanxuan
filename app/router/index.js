import App from '@components/App'
import AsyncApp from '@containers/AsyncApp'
import Detail from '@components/pages/Detail/index'
import Topic from '@components/pages/Topic/index'
import Cate from '@components/pages/Cate/index'
import Cart from '@components/pages/Cart/index'
import Person from '@components/pages/Person/index'
 
const routes = [
    {
        component : App,
        routes : [
            {
                path : '/',
                exact : true,
                component : AsyncApp
            },
            {
                path : '/channel/:id',
                component : AsyncApp,
            },
            {
                path : '/detail/:id',
                component : Detail,
            },
            {
                path : '/cart',
                component : Cart
            },
            {
                path : '/cate',
                component : Cate
            },
            {
                path : '/topic',
                component : Topic
            },
            {
                path : '/person',
                component : Person
            },
        ]
    },
]

export default routes;
