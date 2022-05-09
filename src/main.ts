import App from './App.svelte'

import '@/services/firebase';
import '@/services/i18n';
import '@/stores';

const app = new App({
  target: document.getElementById('app')
})

export default app
