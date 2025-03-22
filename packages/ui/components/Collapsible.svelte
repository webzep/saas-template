<script lang="ts">
  import { tick } from "svelte"
  import Icon from "./Icon.svelte"

  type Props = {
    children?: () => any
    open?: boolean
    title?: string
  }

  let { title = "", open: openProp = $bindable(), children }: Props = $props()

  const uid = Math.floor(Math.random() * 100000)
  const panelId = `collapsible-panel-${uid}`
  const buttonId = `collapsible-button-${uid}`

  let panelEl: HTMLDivElement
  let panelHeight = $state(0)

  $effect(() => {
    if (panelEl) {
      panelHeight = panelEl.scrollHeight
    }
  })

  let internalOpen = $state(false)
  let currentOpen = $derived(openProp === undefined ? internalOpen : openProp)

  function toggle() {
    if (openProp === undefined) {
      internalOpen = !internalOpen
    } else {
      openProp = !openProp
    }
    tick()
  }
</script>

<div class="collapsible">
  <button
    aria-controls={panelId}
    aria-expanded={currentOpen}
    class="collapsible-header"
    id={buttonId}
    onclick={toggle}
  >
    <span class="title">{title}</span>
    <div
      aria-expanded={currentOpen}
      class={currentOpen ? "arrow" : "arrow collapsed"}
    >
      <Icon bold name="caret-down" size="xs" />
    </div>
  </button>
  <div
    id={panelId}
    aria-labelledby={buttonId}
    class="panel {currentOpen ? 'open' : 'closed'}"
    role="region"
    bind:this={panelEl}
    style="max-height: {currentOpen
      ? panelHeight + 'px'
      : '0px'}; opacity: {currentOpen ? 1 : 0};"
  >
    <div class="panel-content">
      {@render children?.()}
    </div>
  </div>
</div>

<style>
  .collapsible {
    border-radius: var(--radius-box);
    border: 1px solid var(--surface-3);
    margin: var(--spacing-2) 0;
    overflow: hidden;
    transition: outline 0.2s;
  }
  .collapsible:has(.collapsible-header:focus-visible) {
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
  }
  .collapsible-header {
    align-items: center;
    background: var(--surface-2);
    border: none;
    color: var(--on-surface-1, #333);
    cursor: pointer;
    display: flex;
    font-weight: bold;
    justify-content: space-between;
    padding: var(--spacing-4) var(--spacing-4);
    text-align: left;
    transition: background 0.3s ease;
    width: 100%;
  }
  .collapsible-header:focus {
    outline: none;
  }
  .collapsible .arrow {
    transition: transform 0.3s ease;
  }
  .collapsible-header[aria-expanded="true"] .arrow {
    transform: rotate(180deg);
  }
  .title {
    font-size: 1rem;
  }
  .panel {
    color: var(--on-surface-1);
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .panel.open {
    border-top: 1px solid var(--surface-3);
  }
  .panel-content {
    display: flex;
    padding: var(--spacing-4);
  }
</style>
