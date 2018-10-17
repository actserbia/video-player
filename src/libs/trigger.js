export default function(el, name, type = 'HTMLEvents') {
  if(typeof(window.Event) === 'function') {
      var event = new Event(name);
  }else{
      var event = document.createEvent(type);
      event.initEvent(name, true, true);
  }
  el.dispatchEvent(event);
}
