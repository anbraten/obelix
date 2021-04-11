import '@fortawesome/fontawesome-free/css/all.css';
import '@oruga-ui/oruga-next/dist/oruga-full.css';
import 'virtual:windi.css';
import 'virtual:windi-devtools';
import '~/styles/main.css';
import '~/styles/oruga-tailwindcss.css';

import Oruga from '@oruga-ui/oruga-next';
import { App } from 'vue';

export default (app: App<Element>) => {
  app.use(Oruga, {
    iconPack: 'fas',
    statusIcon: false,
    button: {
      rootClass: 'btn',
      variantClass: 'btn-',
      roundedClass: 'btn-rounded',
      outlinedClass: 'btn-outlined-',
      disabledClass: 'btn-disabled',
    },
    radio: {
      rootClass: 'radio',
      labelClass: 'radio-label',
      checkClass: 'radio-check',
      checkedClass: 'radio-checked',
    },
    field: {
      rootClass: 'field',
      labelClass: 'field-label',
      messageClass: 'text-xs italic',
      variantClass: 'field-',
    },
    input: {
      inputClass: 'input',
      roundedClass: 'rounded',
      variantClass: 'input-',
      iconRightClass: 'input-icon-right',
    },
    dropdown: {
      rootClass: 'dropdown',
      menuClass: 'dropdown-menu',
      itemClass: 'dropdown-item',
      itemActiveClass: 'dropdown-item-active',
    },
    loading: {
      overlayClass: 'loading-background',
    },
    icon: {
      spinClass: 'fa-spin',
      variantClass: 'input-icon-',
    },
    switch: {
      checkClass: 'switch',
      labelClass: 'switch-label',
    },
    checkbox: {
      checkClass: 'checkbox',
      checkCheckedClass: 'checkbox-checked',
      labelClass: 'checkbox-label',
    },
    steps: {
      itemHeaderActiveClass: 'steps-nav-item-active',
      itemHeaderPreviousClass: 'steps-nav-item-previous',
      stepMarkerClass: 'step-marker',
      stepDividerClass: 'step-divider',
    },
  });
};
