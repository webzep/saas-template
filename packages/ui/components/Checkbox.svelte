<script lang="ts">
  export type Props = {
    checked?: boolean
    label?: string
  }
  let { checked = false, label = "" }: Props = $props()
</script>

<label class="checkbox">
  <input
    type="checkbox"
    bind:checked
    aria-label={label ? undefined : "Checkbox"}
  />
  <span class="checkmark" aria-hidden="true"></span>
  {#if label}
    <span class="label-text">{label}</span>
  {/if}
</label>

<style>
  .checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }
  .checkbox input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  .checkmark {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid var(--border-3);
    border-radius: var(--radius-field);
    /* background: var(--surface-1, #fff); */
    position: relative;
    margin-right: var(--spacing-2, 0.5em);
  }
  .checkbox input:checked + .checkmark {
    background: var(--primary, #ff9900);
    border-color: var(--primary, #ff9900);
  }
  .checkmark:after {
    border: solid var(--surface-1);
    border-width: 0 0.15em 0.15em 0;
    content: "";
    height: 0.7em;
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 42%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 0.4em;
  }
  input:checked + .checkmark:after {
    opacity: 1;
  }
  .checkbox:focus-within .checkmark {
    outline: var(--focus-outline);
    outline-offset: 2px;
  }
  .label-text {
    color: var(--on-surface-1);
    font-size: 0.85rem;
  }
  input:focus + .checkmark {
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
  }
  input:focus:not(:focus-visible) + .checkmark {
    outline: none;
  }
</style>
