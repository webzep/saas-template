<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements"

  type Tick = { value: number; label?: string } & HTMLInputAttributes

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    label = "",
    color = "secondary",
    ticks = [] as Tick[],
    ...rest
  } = $props()

  // Compute filled percentage for the slider
  let percent = $derived(() => {
    return max > min ? ((value - min) / (max - min)) * 100 : 0
  })

  // Determine the thumb color explicitly.
  let thumbColor =
    color === "primary"
      ? "var(--primary)"
      : color === "secondary"
        ? "var(--secondary)"
        : `var(--${color})`
</script>

<div class="slider-wrapper">
  {#if label}
    <label class="slider-container">
      <span class="slider-label">{label}</span>
      <input
        type="range"
        bind:value
        {min}
        {max}
        {step}
        style={`--slider-thumb-color: ${thumbColor};
                background: linear-gradient(to right, ${thumbColor} ${percent()}%, var(--border-1) ${percent()}%, var(--border-1) 100%)`}
        {...rest}
      />
    </label>
  {:else}
    <input
      type="range"
      bind:value
      {min}
      {max}
      {step}
      aria-label="Slider"
      style={`--slider-thumb-color: ${thumbColor};
              background: linear-gradient(to right, ${thumbColor} ${percent()}%, var(--border-1) ${percent()}%, var(--border-1) 100%)`}
      {...rest}
    />
  {/if}

  {#if ticks.length}
    <div class="slider-ticks">
      {#each ticks as tick}
        <div
          class="slider-tick"
          style="left: {((tick.value - min) / (max - min)) * 100}%"
        >
          <span class="tick-marker"></span>
          {#if tick.label}
            <span class="tick-label">{tick.label}</span>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .slider-wrapper {
    position: relative;
    width: 100%;
  }

  .slider-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .slider-label {
    margin-bottom: var(--spacing-1);
    color: var(--on-surface-1);
    font-weight: 500;
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 100%;
    height: 6px;
    border-radius: var(--radius-box);
  }

  /* Track styling for WebKit/Blink */
  input[type="range"]::-webkit-slider-runnable-track {
    background: inherit;
    border-radius: var(--radius-box);
    height: 6px;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: var(--slider-thumb-color);
    border-radius: 50%;
    cursor: pointer;
    width: 1em;
    height: 1em;
    margin-top: -0.25em;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
  }

  input[type="range"]::-webkit-slider-thumb:active {
    transform: scale(1.2);
  }

  /* Track and thumb for Firefox */
  input[type="range"]::-moz-range-track {
    background: inherit;
    border-radius: var(--radius-box);
    height: 6px;
  }

  input[type="range"]::-moz-range-thumb {
    background: var(--slider-thumb-color);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    width: 1em;
    height: 1em;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
  }

  input[type="range"]::-moz-range-thumb:active {
    transform: scale(1.2);
  }

  input:focus::-webkit-slider-thumb,
  input:focus::-moz-range-thumb {
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
  }

  /* Tick marks & labels */
  .slider-ticks {
    position: relative;
    width: 100%;
    height: 1.5rem;
    margin-top: 0.5rem;
  }

  .slider-tick {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    text-align: center;
  }

  .tick-marker {
    display: block;
    width: 2px;
    height: 8px;
    background-color: var(--border-1);
    margin: 0 auto;
  }

  .tick-label {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: var(--on-surface-1);
  }
</style>
