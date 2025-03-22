<!-- Message.svelte -->
<script lang="ts">
  import { snackbar } from "./snackbar"
  import { flip } from "svelte/animate"
  import { derived } from "svelte/store"
  import { fly } from "svelte/transition"
  import Icon from "./Icon.svelte"
  import type { IconName } from "./IconName"

  // Maximum number of messages to display at once
  export let limit: number = 3
  export let position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right" = "bottom-center"

  // Compute container style based on the chosen position
  let containerStyle = ""
  if (position === "bottom-center") {
    containerStyle = "bottom: 1rem; left: 50%; transform: translateX(-50%);"
  } else if (position === "top-center") {
    containerStyle = "top: 1rem; left: 50%; transform: translateX(-50%);"
  } else if (position === "top-left") {
    containerStyle = "top: 1rem; left: 1rem;"
  } else if (position === "top-right") {
    containerStyle = "top: 1rem; right: 1rem;"
  } else if (position === "bottom-left") {
    containerStyle = "bottom: 1rem; left: 1rem;"
  } else if (position === "bottom-right") {
    containerStyle = "bottom: 1rem; right: 1rem;"
  }

  // Set fly transition parameters: slide from offscreen from the top or bottom.
  let flyParams = { y: 50, duration: 300 }
  if (position.startsWith("top")) {
    flyParams = { y: -50, duration: 300 }
  }

  // Limit the messages to the most recent ones up to the specified limit.
  const limitedMessages = derived(snackbar, ($messages) => {
    return $messages.length > limit ? $messages.slice(-limit) : $messages
  })

  // Map message types to phosphor icon names
  const iconMapping: Record<string, IconName> = {
    info: "info",
    success: "check",
    error: "x-circle",
    warning: "warning",
  }
</script>

<div class="snackbar-container" style={containerStyle}>
  {#each $limitedMessages as msg (msg.id)}
    <div animate:flip transition:fly={flyParams} class="snackbar {msg.type}">
      <div class="content">
        <Icon bold name={iconMapping[msg.type]} size="md" />
        <span class="text">{msg.text}</span>
      </div>
      <button on:click={() => snackbar.remove(msg.id)} class="close">✕</button>
    </div>
  {/each}
</div>

<style>
  .snackbar-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
    max-width: 300px;
    position: fixed;
    z-index: 1000;
  }

  .snackbar {
    align-items: center;
    border-radius: var(--radius-box);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-between;
    min-width: 250px;
    padding: var(--spacing-3) var(--spacing-4);
  }

  .content {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
  }

  /* Type-based styling */
  .snackbar.info {
    background-color: var(--info);
    color: var(--on-info);
  }

  .snackbar.success {
    background-color: var(--success);
    color: var(--on-success);
  }

  .snackbar.error {
    background-color: var(--danger);
    color: var(--on-danger);
  }

  .snackbar.warning {
    background-color: var(--warning);
    color: var(--on-warning);
  }

  .close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 1.2rem;
  }
</style>
