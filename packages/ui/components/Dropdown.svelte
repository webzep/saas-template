<script lang="ts">
  import { tick } from "svelte"
  import Icon from "./Icon.svelte"

  type Option = {
    value: string
    label: string
  }
  type Props = {
    options?: Option[]
    selectedValue?: string | null
    placeholder?: string
  }
  let {
    options = [],
    selectedValue = null,
    placeholder = "Select an option",
  }: Props = $props()

  let open = $state(false)
  let openUp = $state(false)
  let alignRight = $state(false)
  let container: HTMLDivElement
  let listEl: HTMLUListElement | undefined = $state(undefined)

  let selectedOption = $derived(
    options.find((opt) => opt.value === selectedValue),
  )
  let displayLabel = $derived(
    selectedOption ? selectedOption.label : placeholder,
  )

  // Keyboard navigation: highlighted index among options.
  let highlightedIndex = $state(0)

  function toggleDropdown() {
    open = !open
    if (open) {
      highlightedIndex = 0
    }
  }
  function selectOption(opt: Option) {
    selectedValue = opt.value
    open = false
  }
  function handleFocusOut(e: FocusEvent) {
    if (!container.contains(e.relatedTarget as Node)) {
      open = false
    }
  }
  async function handleKeyDown(e: KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        open = true
        highlightedIndex = 0
      }
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      highlightedIndex = (highlightedIndex + 1) % options.length
      await tick()
      scrollHighlightedIntoView()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      highlightedIndex =
        (highlightedIndex - 1 + options.length) % options.length
      await tick()
      scrollHighlightedIntoView()
    } else if (e.key === "Tab") {
      // Intercept Tab and Shift+Tab to update highlighted index.
      e.preventDefault()
      if (e.shiftKey) {
        highlightedIndex =
          (highlightedIndex - 1 + options.length) % options.length
      } else {
        highlightedIndex = (highlightedIndex + 1) % options.length
      }
      await tick()
      scrollHighlightedIntoView()
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (options[highlightedIndex]) {
        selectOption(options[highlightedIndex])
      }
    } else if (e.key === "Escape") {
      open = false
    }
  }
  async function scrollHighlightedIntoView() {
    if (listEl && listEl.children[highlightedIndex]) {
      ;(listEl.children[highlightedIndex] as HTMLElement).scrollIntoView({
        block: "nearest",
      })
    }
  }

  $effect(() => {
    if (open) {
      tick().then(() => {
        const rect = container.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        const spaceAbove = rect.top
        const listHeight = listEl?.offsetHeight || 0
        const listWidth = listEl?.offsetWidth || 0
        openUp = listHeight > spaceBelow && spaceAbove > spaceBelow
        const spaceRight = window.innerWidth - rect.left
        alignRight = listWidth > spaceRight
      })
    }
  })
</script>

<div
  bind:this={container}
  class:align-right={alignRight}
  class:open-up={openUp}
  class="dropdown"
  onfocusout={handleFocusOut}
  onkeydown={handleKeyDown}
  role="listbox"
  tabindex="-1"
>
  <button
    aria-expanded={open}
    aria-haspopup="listbox"
    class="dropdown-toggle"
    onclick={toggleDropdown}
    type="button"
  >
    <span>
      {displayLabel}
    </span>
    <span class="arrow">
      <Icon name="caret-down" bold />
    </span>
  </button>
  {#if open}
    <ul class="dropdown-list" bind:this={listEl}>
      {#each options as opt, i (opt.value)}
        <li>
          <button
            class="dropdown-item {i === highlightedIndex ? 'highlighted' : ''}"
            onclick={() => selectOption(opt)}
            type="button"
          >
            {opt.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .dropdown {
    cursor: pointer;
    display: block;
    outline: none;
    position: relative;
  }
  .dropdown-toggle {
    align-items: center;
    background: var(--surface-3);
    border-radius: var(--radius-field);
    border: 1px solid var(--border-2);
    color: var(--on-surface-1);
    cursor: pointer;
    display: flex;
    font: inherit;
    padding: var(--spacing-2) 2rem var(--spacing-2) var(--spacing-4);
    text-align: left;
    width: 100%;
  }
  .dropdown-toggle:focus {
    outline: none;
  }
  .dropdown-toggle:hover {
    border-color: color-mix(in srgb, var(--border-3) 70%, transparent);
    /* box-shadow: 0 0 10px 1px color-mix(in srgb, var(--border-2) 20%, transparent) */
  }
  .dropdown-toggle:active {
    background: color-mix(in srgb, var(--surface-3) 20%, transparent);
  }
  .arrow {
    position: absolute;
    right: 0.3rem;
    top: 50%;
    transform: translateY(-50%) scale(0.5);
  }
  .dropdown-list {
    background: var(--surface-3);
    border-radius: var(--radius-field);
    border: 1px solid var(--surface-3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: var(--on-surface-1);
    left: 0;
    margin-top: var(--spacing-1);
    max-height: 200px;
    min-width: 100%;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    z-index: 1000;
  }
  .dropdown.open-up .dropdown-list {
    bottom: 100%;
    margin-bottom: var(--spacing-1);
    margin-top: 0;
    top: auto;
  }
  .dropdown.align-right .dropdown-list {
    left: auto;
    right: 0;
  }
  .dropdown-item {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    padding: var(--spacing-2) var(--spacing-4);
    text-align: left;
    white-space: nowrap;
    width: 100%;
  }
  .dropdown-item:hover,
  .dropdown-item:focus {
    /* background: color-mix(in srgb, var(--secondary) 20%, transparent); */
    outline: none;
  }
  .dropdown-item.highlighted {
    background: var(--surface-1);
  }
  .dropdown-toggle:focus-visible {
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
  }
</style>
