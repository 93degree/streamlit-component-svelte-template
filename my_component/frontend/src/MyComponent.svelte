<script lang="ts">
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { Streamlit } from "./streamlit/streamlit";
  import type { RenderData } from "./streamlit/streamlit";

  let name: string;
  let numClicks: number = 0;
  let disabled: boolean;

  /** Click handler for our "Click Me!" button. */
  const onClicked = (): void => {
    // Increment numClicks, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    numClicks += 1;
    Streamlit.setComponentValue(numClicks);
  };

  /**
   * The component's render function. This will be called immediately after
   * the component is initially loaded, and then again every time the
   * component gets new data from Python.
   */
  const onRender = (event: Event): void => {
    // Get the RenderData from the event
    const data = (event as CustomEvent<RenderData>).detail;

    // Disable our button if necessary.
    disabled = data.disabled;

    // RenderData.args is the JSON dictionary of arguments sent from the
    // Python script.
    name = data.args["name"];
  };

  onMount((): void => {
    // Attach our `onRender` handler to Streamlit's render event.
    Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);

    // Tell Streamlit we're ready to start receiving data. We won't get our
    // first RENDER_EVENT until we call this function.
    Streamlit.setComponentReady();

    // Finally, tell Streamlit to update our initial height. We omit the
    // `height` parameter here to have it default to our scrollHeight.
    Streamlit.setFrameHeight();
  });

  afterUpdate((): void => {
    // We tell Streamlit to update our frameHeight after each update, in
    // case it has changed. (This isn't strictly necessary for the example
    // because our height stays fixed, but this is a low-cost function, so
    // there's no harm in doing it redundantly.)
    Streamlit.setFrameHeight();
  });

  onDestroy((): void => {
    // Remove our `onRender` handler to Streamlit's render event.
    Streamlit.events.removeEventListener(Streamlit.RENDER_EVENT, onRender);
  });
</script>

<!-- Add text and a button to the DOM. -->
<span>
  Hello, {name}! &nbsp;
  <button on:click={onClicked} {disabled}>Click Me!</button>
</span>
