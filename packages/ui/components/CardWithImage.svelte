<script lang="ts">
  import type { Snippet } from "svelte"

  type Props = {
    alt?: string
    badgeText?: string
    buttonText?: string
    description: Snippet
    imageSrc: string
    onButtonClick?: () => void
    tags?: string[]
    title: Snippet
  }

  const {
    alt,
    buttonText,
    description,
    imageSrc,
    onButtonClick,
    title,
  }: Props = $props()
</script>

<div
  class="card card-bordered border-3 border-base-content border-opacity-15 rounded-box shadow-sm card-compact"
>
  <figure>
    <img alt={alt ?? String(title)} src={imageSrc} sizes="370px" />
  </figure>
  <div class="card-body">
    {@render title?.()}
    {@render description?.()}
    {#if buttonText && onButtonClick}
      <div class="card-actions justify-end">
        <button class="btn btn-primary" onclick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .card {
    background-color: var(--surface-1);
    border-radius: var(--radius-box);
    border: 3px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  figure {
    margin: 0;
  }
  figure img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .card-body {
    padding: 1rem;
  }
  .card-actions {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--radius-field);
    cursor: pointer;
  }
  .btn-primary {
    background-color: var(--primary);
    color: var(--on-primary);
  }
</style>
