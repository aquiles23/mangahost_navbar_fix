
let extensionEnabled = false;
let classWatcher;
chrome.extension.sendMessage({type:'getToggleState'} , function(response){
    extensionEnabled = response;    
    // watch for a specific class change
    if(extensionEnabled){
        classWatcher = new ClassWatcher(
            targetNode,
            'fixed-top',
            workOnClassAdd,
            workOnClassRemoval
        );
    }
});


class ClassWatcher {

  constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
      this.targetNode = targetNode
      this.classToWatch = classToWatch
      this.classAddedCallback = classAddedCallback
      this.classRemovedCallback = classRemovedCallback
      this.observer = null
      this.lastClassState = targetNode.classList.contains(this.classToWatch)

      this.init()
  }

  init() {
      this.observer = new MutationObserver(this.mutationCallback)
      this.observe()
  }

  observe() {
      this.observer.observe(this.targetNode, { attributes: true })
  }

  disconnect() {
      this.observer.disconnect()
  }

  mutationCallback = mutationsList => {
      for(let mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              let currentClassState = mutation.target.classList.contains(this.classToWatch)
              if(this.lastClassState !== currentClassState) {
                  this.lastClassState = currentClassState
                  if(currentClassState) {
                      this.classAddedCallback()
                  }
                  else {
                      this.classRemovedCallback()
                  }
              }
          }
      }
  }
}

////////////main///////////////
let targetNode = document.getElementById('navigation');

function workOnClassAdd() {
  targetNode.classList.remove("fixed-top");
}

function workOnClassRemoval() {
  // do nothing. don't know what to do for now.
  return;
}

