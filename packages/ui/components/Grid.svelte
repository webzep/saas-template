<script lang="ts">
  import type { Snippet } from "svelte"

  type Props = {
    children?: Snippet
    className?: string
    colMax?: string
    colMin?: string
    gap?: string
    padding?: number
    rowMax?: string
    rowMin?: string
    colCount?: number
  }

  const {
    children,
    className = "",
    colMax,
    colMin,
    gap,
    padding,
    rowMax,
    rowMin,
    colCount,
  }: Props = $props()

  let divRef: HTMLDivElement | null = null

  // Using the global spacing scale from our CSS variables.
  const computedGap = gap ? `var(--spacing-${gap})` : "var(--spacing-4)"
  const computedPadding = padding ? `var(--spacing-${padding})` : "0"

  const gridAutoRows = `minmax(${rowMin || "300px"}, ${rowMax || "auto"})`
  const gridTemplateColumns = `repeat(${colCount || "auto-fit"}, minmax(${colMin || "220px"}, ${colMax || "1fr"}))`
</script>

<div
  bind:this={divRef}
  class="grid-container {className}"
  style="grid-auto-rows: {gridAutoRows}; grid-template-columns: {gridTemplateColumns}; gap: {computedGap}; padding: {computedPadding};"
>
  {@render children?.()}
</div>

<style>
  .grid-container {
    display: grid;
    width: 100%;
    justify-content: center;
  }
</style>
