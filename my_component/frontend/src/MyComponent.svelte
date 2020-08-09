<script lang="ts">
  import { Streamlit, setStreamlitLifecycle } from "./streamlit";
  setStreamlitLifecycle();

  export let name: string;
  export let disabled: boolean;

  let numClicks: number = 0;

  /** Click handler for our "Click Me!" button. */
  const onClicked = (): void => {
    // Increment numClicks, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    numClicks += 1;
    Streamlit.setComponentValue(numClicks);
  };
</script>

<!-- 
Show a button and some text.
When the button is clicked, we'll increment our "numClicks" state
variable, and send its new value back to Streamlit, where it'll
be available to the Python program. 
-->
<span>
  Hello, {name}! &nbsp;
  <button on:click={onClicked} {disabled}>Click Me!</button>
</span>
