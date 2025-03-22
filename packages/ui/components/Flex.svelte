<script lang="ts">
  import type { Snippet } from "svelte"

  export type SpacingPreset =
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"

  /**
   * Mapping from spacing preset to the corresponding global CSS variable.
   * Make sure these variables are defined in your global :root.
   */
  const spacingTokens: Record<SpacingPreset, string> = {
    xs: "--spacing-1",
    sm: "--spacing-2",
    md: "--spacing-3",
    lg: "--spacing-4",
    xl: "--spacing-5",
    "2xl": "--spacing-6",
    "3xl": "--spacing-7",
    "4xl": "--spacing-8",
    "5xl": "--spacing-9",
  }

  const justifyMap: Record<string, string> = {
    center: "center",
    start: "flex-start",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  }

  const alignMap: Record<string, string> = {
    center: "center",
    start: "flex-start",
    end: "flex-end",
    stretch: "stretch",
    baseline: "baseline",
  }

  type Props = {
    children?: Snippet
    /** Align items */
    align?: "center" | "start" | "end" | "stretch" | "baseline"
    /** Column */
    column?: boolean
    /** Classes */
    classes?: string
    /** Flex direction */
    flex?: string
    /** The gap between children – accepts a spacing preset or any valid CSS value */
    gap?: SpacingPreset | string
    /** Justify content */
    justify?: "center" | "start" | "end" | "between" | "around" | "evenly"
    /** Minimum width for the flex container */
    minWidth?: string
    /** Maximum width for the flex container */
    maxWidth?: string
    /** Margin for the flex container */
    margin?: string
    /** Padding for the flex container – accepts a spacing preset or any valid CSS value */
    padding?: SpacingPreset | string
    /** If true, the container will shrink to fit its children */
    shrink?: boolean
    /** If true, the container will take up the full width of its parent */
    wide?: boolean
  }

  // Destructure the props from $props() using Svelte 5's API.
  const {
    align = undefined,
    children = undefined,
    classes = undefined,
    column = false,
    flex = undefined,
    gap = undefined,
    justify = undefined,
    margin = undefined,
    maxWidth = undefined,
    minWidth = undefined,
    padding = undefined,
    shrink = false,
    wide = false,
    ...rest
  }: Props = $props()

  // Convert gap and padding if they are preset keys.
  let gapValue = $derived(
    gap && spacingTokens[gap as SpacingPreset]
      ? `var(${spacingTokens[gap as SpacingPreset]})`
      : gap,
  )

  let paddingValue = $derived(
    padding && spacingTokens[padding as SpacingPreset]
      ? `var(${spacingTokens[padding as SpacingPreset]})`
      : padding,
  )

  // Compose an inline style string from the props.
  let style = $derived(`
	${align ? `align-items: ${alignMap[align]};` : ""}
	${column ? `flex-direction: column;` : ""}
	${flex ? `flex: ${flex};` : ""}
	${justify ? `justify-content: ${justifyMap[justify]};` : ""}
    ${gapValue ? `gap: ${gapValue};` : ""}
    ${margin ? `margin: ${margin};` : ""}
    ${maxWidth ? `max-width: ${maxWidth};` : ""}
    ${minWidth ? `min-width: ${minWidth};` : ""}
    ${paddingValue ? `padding: ${paddingValue};` : ""}
    ${shrink ? `flex-shrink: 1;` : ""}
    ${wide ? `width: 100%;` : ""}
  `)

  let classString = $derived([classes, "flex"].filter(Boolean).join(" "))
</script>

<div class={classString} {style} {...rest}>
  {@render children?.()}
</div>

<style>
  .flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
