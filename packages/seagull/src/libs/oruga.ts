import '@fortawesome/fontawesome-free/css/all.css';
import 'virtual:windi.css';
import '~/styles/main.css';
import '~/styles/oruga-tailwindcss.css';

import Oruga from '@oruga-ui/oruga-next';
import { App } from 'vue';

export default function(app: App<Element>) {
  app.use(Oruga, {
    iconPack: 'fas',
    statusIcon: false,
    button: {
      rootClass: 'btn',
    },
    radio: {
      rootClass: 'radio',
      labelClass: 'radio-label',
      checkClass: 'radio-check',
      checkedClass: 'radio-checked',
    },
    field: {
      labelClass: 'field-label',
      messageClass: 'text-xs italic',
      variantClass: 'field-',
    },
    input: {
      inputClass: 'input focus:outline-none focus:shadow-outline',
      roundedClass: 'rounded',
      variantClass: 'input-',
    },
    dropdown: {
      menuClass: 'dropdown-menu',
      itemClass: 'dropdown-item',
      itemActiveClass: 'dropdown-item-active',
    },
    loading: {
      overlayClass: 'loading-background',
    },
    icon: {
      spinClass: 'fa-spin',
    },
    switch: {
      checkClass: 'switch',
      labelClass: 'switch-label',
    },
  });
}
