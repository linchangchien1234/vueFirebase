/*------------------------------------------------------*/
//components
//cart component
import Cart from '../components/Cart.vue'
import CartDetail from '../components/CartDetail.vue'
import CartFrom from '../components/CartFrom.vue'
//person component
import Person from '../components/Person.vue'
import PersonDetail from '../components/PersonDetail.vue'
import PersonFrom from '../components/PersonFrom.vue'
//article component
import Article from '../components/Article.vue'
import ArticleDetail from '../components/ArticleDetail.vue'
import ArticleFrom from '../components/ArticleFrom.vue'

import Test from '../components/test.vue'
/*------------------------------------------------------*/

export default [
		{
			path:'/',
			component: Cart
		},
		{
			path:'/cart',
			component: Cart
		},
		{
			path:'/cart/detail/',
			component: CartDetail
		},
		{
			path:'/cart/detail/:id',
			component: CartDetail
		},
		{
			path:'/cart/create',
			component: CartFrom
		},
		{
			path:'/person',
			component: Person
		},
		{
			path:'/person/detail/:id',
			component: PersonDetail
		},
		{
			path:'/person/create',
			component: PersonFrom
		},
		{
			path:'/article',
			component: Article
		},
		{
			path:'/article/detail/:id',
			component: ArticleDetail
		},
		{
			path:'/article/create',
			component: ArticleFrom
		},
		{
			path:'/test',
			component: Test
		}		
]		



		/*
        
        */