<script lang="ts">
  import type { IconName } from "./IconName"

	/**
	 import Icon from "@repo/ui/Icon.svelte"
	 <Icon name="user" color="primary" size="md" />
	 */

  export type Props = {
    bold?: boolean
    light?: boolean
    color?:
      | "primary"
      | "secondary"
      | "neutral"
      | "success"
      | "danger"
      | "warning"
      | "info"
      | (string & {})
    name: IconName | (string & {})
    size?: "xs" | "sm" | "md" | "lg" | "xl" | (string & {})
  }

  let {
    bold = false,
    color = "neutral",
    light = false,
    name,
    size = "sm",
  }: Props = $props()

  const sizeMap = { xs: 1.2, sm: 1.6, md: 2, lg: 2.4, xl: 3.2 }

  const iconClass = "ph-" + name
  const iconWeight = bold ? "ph-bold" : light ? "ph-light" : "ph-fill"

  // If the color starts with '#' or 'rgb' or 'hsl', treat it as a literal;
  // otherwise, try to use a CSS variable with fallback.
  const iconColor =
    color.charAt(0) === "#" ||
    color.startsWith("rgb") ||
    color.startsWith("hsl")
      ? color
      : `var(--${color}, ${color})`

  const iconSize = `${sizeMap[size as keyof typeof sizeMap] || size}rem`

  const styles = []
  if (iconSize) styles.push(`font-size: ${iconSize};`)
  if (iconColor) styles.push(`color: ${iconColor};`)
  const styleString = styles.join(" ")

  const classes = [iconWeight, iconClass].join(" ")
</script>

<i class={classes} style={styleString} aria-hidden="true"></i>
