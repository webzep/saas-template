<script lang="ts">
  import Section from "@/components/Section.svelte"
  import { Link } from "@repo/ui"
</script>

<Section id="hero" noAnimate>
  <div class="hero-content">
    <div class="hero-inner">
      <h1 class="hero-title">
        Get <span class="text-secondary">hours</span> of your week back
      </h1>
      <p class="hero-subtitle">
        Automate your social media accounts with SkullTag and focus on what you do
        best.
      </p>
      <Link href="#pricing" mega variant="primary">🚀 See pricing</Link>
      <p class="hero-guarantee">
        <sup>*</sup>30-day money back guarantee
      </p>
    </div>
  </div>
</Section>

<style>
  .hero-content {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-8);
    margin-bottom: 3rem;
    max-width: 20rem;
  }
  @media (min-width: 640px) {
    .hero-content {
      max-width: 100%;
    }
  }
  @media (min-width: 1024px) {
    .hero-content {
      flex-direction: row;
    }
  }

  .hero-inner {
    max-width: 64rem;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-title {
    font-size: 3.75rem;
    font-weight: 900;
    line-height: 1.2;
    text-align: center;
    max-width: 56rem;
    margin-top: 1rem;
    margin-bottom: 2.5rem;
  }
  @media (min-width: 640px) {
    .hero-title {
      font-size: 6rem;
      margin-top: 4rem;
    }
  }

  .hero-subtitle {
    font-size: 1.125rem;
    text-align: center;
    max-width: 56rem;
    margin-bottom: 3rem;
  }
  @media (min-width: 1024px) {
    .hero-subtitle {
      font-size: 1.5rem;
    }
  }

  .hero-guarantee {
    font-size: 0.875rem;
    text-align: center;
    max-width: 56rem;
    margin: 0.5rem 0;
  }

  .text-secondary {
    color: var(--secondary);
  }
</style>
