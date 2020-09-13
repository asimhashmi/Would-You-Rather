export default function logger(store) {
  return (next) => (action) => {
    console.group(action.type);
    console.log("Action:");
    console.dir(action);
    const returnValue = next(action);
    console.log("New State:");
    console.dir(store.getState());
    console.groupEnd();

    return returnValue;
  };
}
