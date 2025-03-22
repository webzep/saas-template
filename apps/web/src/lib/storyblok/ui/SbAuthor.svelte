<script lang="ts">
  import type { AuthorStoryblok } from "@/types/storyblok"
  import { Icon } from "@repo/ui"

  type Props = {
    content: AuthorStoryblok
    publishAndReadTimeTagline?: string
  }

  let { content, publishAndReadTimeTagline }: Props = $props()

  let { avatar, name, occupation } = content
</script>

<div class="author-container">
  <div class="avatar">
    <div class="avatar-image mask mask-squircle">
      <img alt={`${name} profile picture`} src={avatar?.filename} />
    </div>
  </div>
  <div class="details">
    <span class="author-name">
      {name}
      <Icon name="verified" color="primary" size="md" />
    </span>
    {#if occupation}
      <span class="author-occupation">{occupation}</span>
    {/if}
    <span class="author-time">{publishAndReadTimeTagline}</span>
  </div>
</div>

<style>
  .author-container {
    display: flex;
    align-items: center;
  }

  .avatar-image {
    width: 64px;
    height: 64px;
    overflow: hidden;
  }

  .mask-squircle {
    mask-image: url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z'/%3e%3c/svg%3e");
  }

  .mask {
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center center;
  }

  .avatar-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .details {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
  }

  .author-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
    font-size: 1.25rem;
  }

  .author-occupation {
    font-size: 0.875rem;
    color: #666;
  }

  .author-time {
    font-size: 0.875rem;
    color: #333;
    margin-top: 0.25rem;
  }
</style>
