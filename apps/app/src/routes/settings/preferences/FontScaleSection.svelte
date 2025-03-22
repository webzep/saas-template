<script lang="ts">
  import { page } from "$app/state"
  import type { User } from "@repo/models"
  import { applyFontScale } from "@/lib/themeHelper"
  import { trpc } from "@/lib/trpc/client"
  import { onDestroy } from "svelte"
  import { Card, Flex, Slider, snackbar } from "@repo/ui"

  type FontScale = User["preferences"]["font_scale"]

  type Props = {
    font_scale?: FontScale
  }

  let { font_scale }: Props = $props()

  let numericFontScale = $state(font_scale)

  const setFontScale = async (e: Event) => {
    const newFontScale = Number((e.target as HTMLInputElement).value)
    const { success, message } = await trpc(page).user.updatePreferences.mutate(
      { font_scale: newFontScale },
    )

    if (success) {
      snackbar.success({ text: "Preferences saved" })
    } else {
      snackbar.error({ text: message })
    }
  }

  $effect(() => {
    const cleanup = applyFontScale(numericFontScale || 1.6)
    onDestroy(cleanup)
  })
</script>

<Card>
  {#snippet header()}
    <h2>Font scale</h2>
  {/snippet}
  <Flex gap="sm">
    <Slider
      min={1.0}
      max={2.0}
      step={0.1}
      onchange={setFontScale}
      bind:value={numericFontScale}
      ticks={[
        { value: 1.0, label: "1.0" },
        { value: 1.2, label: "1.2" },
        { value: 1.4, label: "1.4" },
        { value: 1.6, label: "1.6" },
        { value: 1.8, label: "1.8" },
        { value: 2.0, label: "2.0" },
      ]}
    />
  </Flex>
</Card>
