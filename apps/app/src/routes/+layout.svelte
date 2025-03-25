<script lang="ts">
  import "@repo/design/app.css"
  import { applyFontScale, applyTheme } from "@/lib/themeHelper"
  import "@phosphor-icons/web/bold"
  import "@phosphor-icons/web/fill"
  import "@phosphor-icons/web/light"
  import { Snackbar } from "@repo/ui"
  import type { Snippet } from "svelte"
  import { onDestroy } from "svelte"
  import type { LayoutProps } from "./$types"

  type Props = LayoutProps & {
    children?: Snippet
  }

  let { children, data }: Props = $props()

  $effect(() => {
    applyFontScale(data?.user?.preferences?.font_scale ?? 1.6)
    const cleanup = applyTheme(data?.user?.preferences?.theme ?? "system")
    onDestroy(cleanup)
  })
</script>

{@render children?.()}

<Snackbar limit={3} position="top-right" />
