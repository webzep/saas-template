<script lang="ts">
  import Button from "./Button.svelte"

  let {
    open = false,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Yes",
    cancelText = "Cancel",
    onConfirm = () => {},
    onCancel = () => {},
  } = $props()
</script>

{#if open}
  <div class="overlay">
    <div class="dialog">
      <h2>{title}</h2>
      <p>{message}</p>
      <div class="buttons">
        <Button variant="ghost" onclick={() => onCancel()}>{cancelText}</Button>
        <Button variant="primary" onclick={() => onConfirm()}
          >{confirmText}</Button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .dialog {
    background: var(--surface-1);
    padding: 1.5rem;
    border-radius: var(--radius-box, 8px);
    max-width: 90%;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  .dialog h2 {
    margin: 0 0 1rem;
  }
  .dialog p {
    margin: 0 0 1.5rem;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
</style>
