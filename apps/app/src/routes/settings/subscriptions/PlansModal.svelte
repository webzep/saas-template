<script lang="ts">
  import { PriceCard, type PriceItem } from "@repo/pricing"
  import { Button, Grid, Modal } from "@repo/ui"

  type Props = {
    open: boolean
    onClose: () => void
    plans: PriceItem[]
    loading: boolean
    onSubscribe: (priceId: string) => void
  }

  const { open, onClose, plans, loading, onSubscribe }: Props = $props()
</script>

<Modal {open} {onClose} size="lg">
  {#snippet header()}
    <h2>Choose a Plan</h2>
  {/snippet}

  <Grid colMin="280px" colMax="1fr" className="justify-center" padding={4}>
    {#each plans as plan}
      <PriceCard
        description={plan.description}
        {loading}
        features={plan.features}
        popular={plan.isPopular}
        price={plan.amount_formatted}
        title={plan.product_name}
        variant="compact"
      >
        {#snippet cta()}
          <Button
            outlined={!plan.isPopular}
            variant="primary"
            onclick={() => onSubscribe(plan.price_id)}>Buy now</Button
          >
        {/snippet}
      </PriceCard>
    {/each}
  </Grid>
</Modal>
