<script lang="ts">
  import FontScaleSection from "@/routes/settings/preferences/FontScaleSection.svelte"
  import ThemeSection from "@/routes/settings/preferences/ThemeSection.svelte"

  let { data } = $props()

  const font_scale = data.preferences?.font_scale ?? 1.6
  const theme = data.preferences?.theme
</script>

<h1>Preferences</h1>

<ThemeSection {theme} />

<FontScaleSection {font_scale} />
