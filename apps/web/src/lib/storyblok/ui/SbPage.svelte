<script lang="ts">
  import type { PageStoryblok } from "@/types/storyblok"
  import { StoryblokComponent, storyblokEditable } from "@storyblok/svelte"

  type Props = {
    blok: PageStoryblok
  }

  let { blok }: Props = $props()
</script>

{#key blok}
  <div use:storyblokEditable={blok}>
    {#if blok.body}
      {#each blok.body as item}
        <StoryblokComponent blok={item} />
      {/each}
    {/if}
  </div>
{/key}
