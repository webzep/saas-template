<!-- Input.svelte -->
<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements"

  type Props = {
    error?: string
    label?: string
    value?: string
  } & HTMLInputAttributes

  let { error = "", label = "", value = $bindable(), ...rest }: Props = $props()
</script>

<div class="input-group">
  {#if label}
    <label for="input-field" class="input-label">{label}</label>
  {/if}
  <input
    id="input-field"
    class="input-field {error ? 'has-error' : ''}"
    bind:value
    {...rest}
  />
  {#if error}
    <div class="error-message">{error}</div>
  {/if}
</div>

<style>
  .input-group {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .input-label {
    font-size: 0.875rem;
    margin-bottom: var(--spacing-1);
    color: var(--on-surface-1);
  }

  .input-field {
    background-color: var(--surface-3);
    border-radius: var(--radius-field);
    border: none;
    color: var(--on-surface-3);
    font-size: 1rem;
    height: 2.5rem;
    padding: 0 var(--spacing-4);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .input-field:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
  }

  .input-field.has-error {
    border-color: var(--danger);
  }

  .error-message {
    color: var(--danger);
    font-size: 0.75rem;
    margin-top: var(--spacing-1);
  }
</style>
