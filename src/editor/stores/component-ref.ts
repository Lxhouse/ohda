const componentRefs = new Map();

export function getComponentRef(componentId: string) {
  return componentRefs.get(componentId);
}

export function setComponentRef(componentId: string, componentRef: any) {
  if (!componentRef) return;
  return componentRefs.set(componentId, componentRef);
}

export function clearComponentRef() {
  componentRefs.clear();
}
export function getAllRef() {
  return componentRefs;
}
