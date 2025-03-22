<script lang="ts">
  import Section from "@/components/Section.svelte"
  import { Grid, Link } from "@repo/ui"
  import { PriceCard, priceItems } from "@repo/pricing"

  let { appURL } = $props()
  const prices = Object.values(priceItems)

  const priceURL = (priceId: string) =>
    `${appURL}/settings/subscriptions?priceId=${priceId}`
</script>

<Section bg="surface-2" id="pricing" noAnimate title="Pricing" smallTitle>
  <Grid colMin="250px" colMax="1fr" className="justify-center">
    {#each prices as price}
      <PriceCard
        description={price.description}
        features={price.features}
        popular={price.isPopular}
        price={price.amount_formatted}
        title={price.product_name}
      >
        {#snippet cta()}
          <Link variant="primary" href={priceURL(price.price_id)}>Buy now</Link>
        {/snippet}
      </PriceCard>
    {/each}
  </Grid>
</Section>
