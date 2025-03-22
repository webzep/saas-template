<script lang="ts">
  import RecentBlogs from "@/lib/storyblok/ui/SbRecentBlogs.svelte"
  import type { PageProps } from "./$types"

  let { data }: PageProps = $props()
  let appName = "SkullTag"
</script>

<div class="container">
  {#if data.otherStories?.length > 0}
    <RecentBlogs blogs={data.otherStories} title={`${appName} blog`} />
  {/if}
</div>

<style>
  .container {
    min-width: min(90%, 50rem);
    padding: 0 var(--spacing-4) var(--spacing-6);
  }
</style>
