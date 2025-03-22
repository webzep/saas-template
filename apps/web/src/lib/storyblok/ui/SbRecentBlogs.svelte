<script lang="ts">
  import type { BlogStoryblok } from "@/types/storyblok"
  import { Link } from "@repo/ui"
  import type { ISbStoryData } from "@storyblok/svelte"

  type Props = {
    blogs?: ISbStoryData<BlogStoryblok>[]
    title?: string
    hideViewMoreButton?: boolean
    currentStoryUUID?: string
  }

  let {
    blogs = [],
    title = "Related Posts",
    hideViewMoreButton,
  }: Props = $props()
</script>

{#if blogs.length > 0}
  {#if !hideViewMoreButton}
    <h2 class="related-posts-heading">{title}</h2>
  {/if}
  <div class="blogs-container">
    {#each blogs as blog (blog.slug)}
      <a class="blog-card" href={`/blog/${blog.slug}`}>
        <figure>
          <img
            class="blog-image"
            alt={blog.content.description}
            src={blog.content.banner?.filename}
          />
        </figure>
        <div class="card-body">
          <span class="publish-tagline">
            {new Date(
              blog.first_published_at ?? blog.created_at,
            ).toDateString()}
          </span>
          <h2 class="card-title">
            {blog.content.headingOverride || blog.name}
          </h2>
          <p class="card-description">
            {blog.content.description}
          </p>
        </div>
      </a>
    {/each}
  </div>
  {#if !hideViewMoreButton}
    <div class="view-more-container">
      <Link href="/blog" variant="secondary">View more posts</Link>
    </div>
  {/if}
{/if}

<style>
  .related-posts-heading {
    font-size: 1.875rem;
    font-weight: bold;
    text-align: left;
    margin: 4rem 1rem;
    max-width: 48rem;
    margin-left: auto;
    margin-right: auto;
  }
  .blogs-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    max-width: 80rem;
    margin: 0 auto;
    padding: 1rem;
    padding-bottom: 1rem;
  }
  .blog-card {
    border-radius: var(--radius-box);
    flex: 1;
    min-width: 18rem;
    max-width: 20rem;
    background: var(--surface-1);
    border: 3px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    transition:
      transform 0.2s,
      border-color 0.2s;
    text-decoration: none;
    color: inherit;
  }
  .blog-card:hover {
    border-color: var(--primary);
    transform: scale(1.005);
  }
  figure {
    margin: 0;
  }
  .blog-image {
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    height: 12rem;
    object-fit: cover;
    width: 100%;
  }
  .card-body {
    background: var(--surface-1);
    padding: 1rem;
    text-align: left;
  }
  .publish-tagline {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.75);
  }
  .card-title {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    display: -webkit-box;
    font-size: 1.5rem;
    font-weight: bold;
    line-clamp: 4;
    margin: 0.5rem 0;
    overflow: hidden;
  }
  .card-description {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    display: -webkit-box;
    font-size: 1rem;
    line-clamp: 5;
    opacity: 0.75;
    overflow: hidden;
  }
  .view-more-container {
    margin: 1rem auto;
    display: flex;
    justify-content: center;
  }
</style>
