<script lang="ts">
  import RecentBlogs from "@/lib/storyblok/ui/SbRecentBlogs.svelte"
  import { StoryblokComponent, useStoryblokBridge } from "@storyblok/svelte"
  import { onMount } from "svelte"
  import type { PageProps } from "./$types"

  let { data }: PageProps = $props()

  onMount(() => {
    useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory))
  })
</script>

<div class="container">
  {#if data.story}
    <StoryblokComponent blok={data.story.content} />
  {/if}
  {#if data.otherStories?.length > 0}
    <RecentBlogs blogs={data.otherStories} />
  {/if}
</div>

<style>
  .container {
    min-width: min(90%, 50rem);
    padding: 0 var(--spacing-4) var(--spacing-6);
  }
</style>
