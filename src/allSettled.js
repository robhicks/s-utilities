export default function(promises) {
  return Promise.all(promises.map((promise) =>
      promise
        .then((value) => ({state: 'fulfilled', value}))
        .catch((reason) => ({state: 'rejected', reason}))
    ));
  }
