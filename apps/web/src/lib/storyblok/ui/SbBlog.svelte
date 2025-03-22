<script lang="ts">
  import { createPublishAndReadTimeTagline } from "@/lib/storyblok/helpers/makeBlogDetails"
  import type { ContentWithStoryMeta } from "@/lib/storyblok/helpers/makeFetchData"
  import SbAuthor from "@/lib/storyblok/ui/SbAuthor.svelte"
  import SbRichText from "@/lib/storyblok/ui/SbRichText.svelte"
  import type { AuthorStoryblok, BlogStoryblok } from "@/types/storyblok"
  import { storyblokEditable } from "@storyblok/svelte"

  type Props = {
    blok: ContentWithStoryMeta<BlogStoryblok>
  }

  let { blok }: Props = $props()

  const author: AuthorStoryblok = blok.author?.[0]?.content

  const publishAndReadTimeTagline = createPublishAndReadTimeTagline(
    blok.story.published_at,
    blok.content,
  )
</script>

<div class="space"></div>
<div class="container" use:storyblokEditable={blok}>
  <img
    alt={blok.banner?.alt}
    class="hero-img"
    src={blok.banner?.filename}
    width="200px"
    height="200px"
  />
  <section>
    <h1>{blok.title}</h1>
    <p>{blok.description}</p>
  </section>
  <hr />
  {#if author}
    <section>
      <SbAuthor content={author} {publishAndReadTimeTagline} />
    </section>
    <hr />
  {/if}
  <SbRichText content={blok.content} />
</div>

<style>
  .hero-img {
    object-fit: cover;
    width: 100%;
    height: unset;
  }

  h1 {
    font-weight: 800;
  }

  p {
    font-size: 1.25rem;
    line-height: 1.5;
    color: color-mix(in srgb, var(--on-surface-1) 80%, transparent);
  }

  section {
    padding: 0 1rem;
  }

  .space {
    height: 3rem;
  }

  .container {
    border-radius: var(--radius-box);
    max-width: 50rem;
    background-color: var(--surface-1);
    overflow: hidden;
  }
</style>
