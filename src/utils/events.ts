/**
 * @description Event listener
 * @param eventType - the name of the event
 * @param listener - the callback
 */
function on(eventType: string, listener: { (event: any): void; (this: Document, ev: any): any; }) {
  document.addEventListener(eventType, listener);
}

/**
 * @description Triggers an event
 * @param eventType - the name of the event
 * @param data - the data
 */
function trigger(eventType: string, data: any) {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

export { on, trigger };
