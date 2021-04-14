import Cleave from 'cleave.js';
import { DirectiveBinding } from 'vue';

type CleaveInput = HTMLInputElement & {
  _vCleave: Cleave;
};

const cleave = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding): void {
    const input = el.querySelector('input') as CleaveInput;
    if (input) {
      input._vCleave = new Cleave(input, binding.value);
    }
  },

  unmounted(el: HTMLElement): void {
    const input = el.querySelector('input') as CleaveInput;
    if (input) {
      input._vCleave.destroy();
    }
  },
};

export default cleave;
