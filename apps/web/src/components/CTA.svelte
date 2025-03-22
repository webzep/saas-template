<script lang="ts">
  import Section from "@/components/Section.svelte"
  import { Flex, Link } from "@repo/ui"
</script>

<Section
  id="cta"
  noAnimate
  bg="surface-2"
  title="Ready to streamline your social media?"
>
  <div class="cta-content">
    <p class="cta-copy">
      Join the SkullTag community today and automate your posts across all your
      favorite platforms.
    </p>
    <Flex justify="center">
      <Link href="#pricing" mega variant="primary">Get started now</Link>
    </Flex>
  </div>
</Section>

<style>
  .cta-content {
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: var(--spacing-6);
  }
  .cta-copy {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
</style>
