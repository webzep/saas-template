<script lang="ts">
  import type { Snippet } from "svelte"
  import { Icon, Loader } from "@repo/ui"

  type Props = {
    cta: Snippet
    description: string
    features: string[]
    popular: boolean
    price: string
    title: string
    interval?: "month" | "year" | "one-time"
    variant?: "default" | "compact"
    loading?: boolean
  }

  const {
    cta,
    description,
    features,
    popular,
    price,
    title,
    interval = "month",
    variant = "default",
    loading = false,
  }: Props = $props()
</script>

<div
  class="pricing-card {popular ? 'popular' : ''} {variant} {loading
    ? 'loading'
    : ''}"
>
  <div class="card-content">
    {#if loading}
      <div class="loader-overlay">
        <Loader size="lg" />
      </div>
    {/if}
    {#if popular}
      <div class="badge">
        <Icon size="xs" name="star" />
        Most Popular
      </div>
    {/if}
    <h2 class="card-title">{title}</h2>
    <div class="price-container">
      <span class="price">{price}</span>
      <span class="price-period">/{interval}</span>
    </div>
    <p class="card-description">{description}</p>
    <hr />
    {#each features as feature}
      <div class="feature-item">
        <Icon bold color="success" name="check" />
        <span>{feature}</span>
      </div>
    {/each}
    <span class="cta">
      {@render cta()}
    </span>
  </div>
</div>

<style>
  .pricing-card {
    background-color: var(--surface-1);
    color: var(--on-surface-1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: var(--radius-box);
    padding: var(--spacing-4);
  }

  .pricing-card.popular {
    border: 3px solid var(--primary);
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
    padding: var(--spacing-8);
    height: 100%;
    position: relative;
  }

  .badge {
    background-color: var(--primary);
    border-radius: 0 0 var(--radius-box) var(--radius-box);
    color: var(--on-primary);
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    font-size: 0.875rem;
    font-weight: bold;
    left: 50%;
    padding: var(--spacing-2) var(--spacing-4);
    position: absolute;
    top: 0;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }

  .card-title {
    color: var(--primary);
    font-size: 1.5rem;
    margin: var(--spacing-4) 0;
  }

  .price-container {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    font-size: 2rem;
    font-weight: bold;
    gap: var(--spacing-2);
  }
  .price {
    font-size: 2rem;
    line-height: 1;
  }
  .price-period {
    font-size: 1rem;
    font-weight: normal;
    opacity: 0.75;
    line-height: 1.2;
  }

  .card-description {
    font-size: 1rem;
    opacity: 0.65;
  }
  hr {
    border: none;
    border-top: 1px solid var(--border-1);
    margin: var(--spacing-4) 0;
  }

  .feature-item {
    align-items: center;
    display: flex;
    gap: var(--spacing-2);
  }

  .cta {
    display: block;
    margin-top: auto;
    padding-top: var(--spacing-8);
  }

  .pricing-card.compact .card-content {
    padding: var(--spacing-4);
    gap: var(--spacing-2);
  }

  .pricing-card.compact .card-title {
    font-size: 1.25rem;
    margin: var(--spacing-2) 0;
  }

  .pricing-card.compact .price-container {
    font-size: 1.5rem;
  }

  .pricing-card.compact .price {
    font-size: 1.5rem;
  }

  .pricing-card.compact .card-description {
    font-size: 0.875rem;
  }

  .pricing-card.compact .feature-item {
    font-size: 0.875rem;
  }

  .pricing-card.compact .cta {
    padding-top: var(--spacing-4);
  }

  .pricing-card.loading {
    position: relative;
    pointer-events: none;
    opacity: 0.7;
  }

  .loader-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(var(--surface-1-rgb), 0.5);
    backdrop-filter: blur(1px);
    z-index: 1;
    border-radius: inherit;
  }
</style>
