import MyComponent from "./MyComponent.svelte";

const myComponent = new MyComponent({
  target: document.body,
  props: {
    name: "world",
  },
});

export default myComponent;
