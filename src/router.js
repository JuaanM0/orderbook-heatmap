import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/HomeView.vue';
import Map from './components/MapComponent.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { name: 'Home', path: '/', component: Home, meta: { hideNavbar: true } },
        { name: 'Heat Map', path: '/map', component: Map }    
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

