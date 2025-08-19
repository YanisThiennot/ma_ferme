import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createApp, h } from 'vue'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'

// PrimeVue
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Services utiles (toast & confirm)
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

// Composants PrimeVue que tu veux en global
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })

    // Plugins
    app.use(plugin)
    app.use(ZiggyVue)
    app.use(PrimeVue, { ripple: true })
    app.use(ToastService)
    app.use(ConfirmationService)

    // Enregistrement GLOBAL des composants PrimeVue (tu peux en ajouter/retirer)
    app.component('Button', Button)
    app.component('InputText', InputText)
    app.component('Textarea', Textarea)
    app.component('Dropdown', Dropdown)
    app.component('Calendar', Calendar)
    app.component('DataTable', DataTable)
    app.component('Column', Column)
    app.component('Toast', Toast)
    app.component('ConfirmDialog', ConfirmDialog)

    // (Optionnel) auto-register de tes composants maison depuis resources/js/Components
    const modules = import.meta.glob('./Components/**/*.vue', { eager: true })
    for (const path in modules) {
      const component = modules[path].default
      // Nom basé sur le fichier (ex: Components/Form/MyField.vue => MyField)
      const name = path.split('/').pop().replace('.vue', '')
      app.component(name, component)
    }

    return app.mount(el)
  },
  progress: { color: '#4B5563' }
})
