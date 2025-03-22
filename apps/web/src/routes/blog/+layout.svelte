<script lang="ts">
  import type { Snippet } from "svelte"
  import type { LayoutProps } from "./$types"

  type Props = LayoutProps & {
    children?: Snippet
  }

  let { children }: Props = $props()
</script>

{@render children?.()}
```

<style>
  :global(body) {
    background-color: var(--surface-2);
  }
</style>
