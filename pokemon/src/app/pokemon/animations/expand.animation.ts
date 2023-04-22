import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const expandAnimation = trigger('expandAnimation', [
  state(
    'close',
    style({
      transform: 'scale(0) ',
    })
  ),
  state(
    'open',
    style({
      transform: 'scale(1) translateX(0)',
    })
  ),
  transition('close => open', [animate('250ms ease-in')]),
  transition('open => close', [animate('250ms ease-in')]),
]);
