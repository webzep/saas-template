<script lang="ts">
  import Section from "@/components/Section.svelte"
  import { Collapsible } from "@repo/ui"

  type FAQItem = {
    question: string
    answer: string
  }

  const faqItems: FAQItem[] = [
    {
      question: "What is included in the product?",
      answer:
        "Each product comes with a full-featured template designed to streamline your project development and social media automation.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "We don't offer a free trial, but our one-time purchase gives you unlimited access to all features so you can automate your social strategy forever.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards, Apple Pay, and Google Pay. Simply click 'Buy Now' to view your payment options.",
    },
    {
      question: "Are refunds available?",
      answer:
        "Due to the nature of our products, refunds aren't available. Once you purchase a template, enjoy lifetime access and redownload anytime from your account.",
    },
    {
      question: "How do I redownload a product I've purchased?",
      answer:
        "After purchase, you'll receive a download link via email. If you need to redownload later, log into your account using the email associated with your purchase.",
    },
    {
      question: "What license is applied to the templates?",
      answer:
        "Our templates are licensed under the ShipNow.dev License Agreement. You can use them for personal or business projects, but reselling or redistributing is not permitted. See the LICENSE file for full details.",
    },
  ]
</script>

<Section id="faq" noAnimate maxWidth="60rem" title="Frequently Asked Questions">
  <div class="faq-wrapper">
    <div class="faq-items">
      {#each faqItems as item}
        <div class="faq-item">
          <Collapsible title={item.question}>
            <p>{item.answer}</p>
          </Collapsible>
        </div>
      {/each}
    </div>
  </div>
</Section>

<style>
  .faq-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .faq-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .faq-item {
    width: 100%;
  }
</style>
