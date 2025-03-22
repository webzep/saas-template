<script lang="ts">
  type Props = {
    checked?: boolean
    label?: string
  }

  let { checked = false, label = "" }: Props = $props()
</script>

<label class="switch">
  <input type="checkbox" bind:checked aria-label={label ? null : "Switch"} />
  <span class="slider" aria-hidden="true"></span>
  {#if label}
    <span class="switch-label">{label}</span>
  {/if}
</label>

<style>
  .switch {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }
  .switch input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: relative;
    width: 2.5em;
    height: 1.4em;
    border-radius: var(--radius-box);
    margin-right: 0.5em;
    transition: background 0.3s;
  }
  .slider:before {
    background: var(--surface-3);
    border-radius: var(--radius-box);
    content: "";
    height: 1em;
    left: 0.2em;
    position: absolute;
    top: 0.2em;
    transition: transform 0.3s;
    width: 1em;
  }
  input + .slider {
    background: var(--border-2);
  }
  input:checked + .slider {
    background: var(--primary);
  }
  input:checked + .slider:before {
    transform: translateX(1.1em);
  }
  .switch-label {
    color: var(--on-surface-1);
  }
  /* Focus only on keyboard navigation */
  input:focus + .slider {
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
  }
  input:focus:not(:focus-visible) + .slider {
    outline: none;
  }
</style>
