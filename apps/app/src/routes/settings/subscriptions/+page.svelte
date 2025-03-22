<script lang="ts">
  import { browser } from "$app/environment"
  import { page } from "$app/state"
  import { trpc } from "@/lib/trpc/client"
  import { priceItems } from "@repo/pricing"
  import { onDestroy, onMount } from "svelte"
  import type { PageProps } from "./$types"
  import PlansModal from "./PlansModal.svelte"
  import SubscriptionStatus from "./SubscriptionStatus.svelte"

  const { data }: PageProps = $props()
  let userSubscription = $state(data.userSubscription)
  let loading = $state(false)
  let showPlansModal = $state(false)

  // This is to refresh the subscription data when the page is focused
  const handleFocusChange = async () => {
    if (browser && document?.visibilityState === "visible") {
      try {
        const subscription = await trpc(page).user.getSubscription.query()
        if (subscription.success) {
          userSubscription = subscription.data
          showPlansModal = false
        }
      } catch (error) {
        console.error("Invalidation failed", error)
        window.location.reload()
      }
    }
  }

  onMount(() => {
    if (browser) {
      window.document?.addEventListener("visibilitychange", handleFocusChange)
      window.addEventListener("focus", handleFocusChange)
    }
  })

  onDestroy(() => {
    if (browser) {
      window.document?.removeEventListener(
        "visibilitychange",
        handleFocusChange,
      )
      window.removeEventListener("focus", handleFocusChange)
    }
  })

  const handleManageSubscription = async () => {
    loading = true
    try {
      // Check if subscription is canceled but not yet expired
      if (userSubscription?.status === "canceled") {
        // Show plans modal instead of going to portal
        showPlansModal = true
        loading = false
        return
      }

      // For active subscriptions, proceed to portal as usual
      const { data } = await trpc(
        page,
      ).subscriptions.createPortalSession.mutate({
        returnUrl: `${window.location.origin}/settings/subscriptions`,
      })
      if (data?.url) window.location.href = data.url
    } catch (error) {
      console.error(error)
    } finally {
      loading = false
    }
  }

  const handleSubscribe = async (priceId: string) => {
    loading = true
    try {
      const { data } = await trpc(
        page,
      ).subscriptions.createCheckoutSession.mutate({
        priceId,
        successUrl: `${window.location.origin}/settings/subscriptions/success`,
        cancelUrl: `${window.location.origin}/settings/subscriptions`,
      })

      if (data?.url) window.location.href = data.url
    } catch (error) {
      console.error(error)
    } finally {
      loading = false
    }
  }

  const paidPlans = Object.values(priceItems)
    .filter((plan) => plan.amount > 0)
    .sort((a, b) => a.amount - b.amount)
</script>

<div>
  <h1>Subscription</h1>

  <SubscriptionStatus
    {userSubscription}
    {loading}
    onManageSubscription={handleManageSubscription}
    onViewPlans={() => (showPlansModal = true)}
  />
</div>

<PlansModal
  open={showPlansModal}
  onClose={() => (showPlansModal = false)}
  plans={paidPlans}
  {loading}
  onSubscribe={handleSubscribe}
/>
