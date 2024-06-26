import PubSub from "pubsub-js";

const on = (eventName, cb) => {
  return PubSub.subscribe(eventName, cb)
}

const off = (handle) => {
  PubSub.unsubscribe(handle)
}

const publish = (name, value) => {
  PubSub.publish(name, value)
}

export {on, off, publish}