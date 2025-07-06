import { createRouter, createWebHashHistory  } from 'vue-router';
import aboutme from '../page/AboutMe.vue';
import crampath from '../page/Educate.vue';
import experience from '../page/Experience.vue';
import skills from '../page/Skills.vue';



const routes = [
  { path: '/', component: aboutme },
  { path: '/Educate', component: crampath },
  { path: '/Experience', component: experience },
  { path: '/Skills', component: skills },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
