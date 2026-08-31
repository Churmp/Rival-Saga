// Visual prototype behavior only. The live V2 Action Phase should bind its existing
// hovered/selected destination state to the approved bar markup rather than duplicate gameplay state.
export function wireActionDestinationPrototype(root = document) {
  const slots = Array.from(root.querySelectorAll('.rs-action-slot:not([data-hidden="true"])'));
  for (const slot of slots) {
    slot.addEventListener('click', () => {
      for (const peer of slots) peer.setAttribute('aria-selected', 'false');
      slot.setAttribute('aria-selected', 'true');
    });
  }
}
