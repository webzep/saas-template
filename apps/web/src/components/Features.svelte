<script lang="ts">
  import Scheduling from "@/assets/scheduling.png"
  import Integration from "@/assets/integration.png"
  import Automation from "@/assets/automation.png"
  import Analytics from "@/assets/analytics.png"
  import Section from "@/components/Section.svelte"

  const features = [
    {
      badge: "Scheduling",
      description:
        "Plan and schedule your social media posts across multiple platforms seamlessly.",
      image: Scheduling,
      listItems: [
        "Drag-and-drop calendar",
        "Bulk scheduling",
        "Real-time updates",
      ],
      title: "Automate Your Posts",
    },
    {
      badge: "Integration",
      description:
        "Connect all your favorite social channels in one unified dashboard.",
      image: Integration,
      listItems: [
        "Supports Facebook, Twitter, LinkedIn",
        "Centralized management",
        "Effortless cross-posting",
      ],
      title: "Multi-Platform Connectivity",
    },
    {
      badge: "Analytics",
      description:
        "Gain actionable insights to optimize your social media strategy.",
      image: Analytics,
      listItems: [
        "Real-time analytics",
        "Customizable reports",
        "Growth tracking",
      ],
      title: "Data-Driven Decisions",
    },
    {
      badge: "Automation",
      description:
        "Streamline your workflow with smart automation for content and engagement.",
      image: Automation,
      listItems: [
        "Automated content curation",
        "Engagement triggers",
        "Scheduled interactions",
      ],
      title: "Work Smarter, Not Harder",
    },
  ]
</script>

<Section
  maxWidth="60rem"
  id="use-cases"
  noAnimate
  title="Versatile Social Solutions"
>
  <p class="features-intro">
    Our templates are packed with powerful features designed to help you
    succeed. Here are some of the key highlights:
  </p>
  <div class="features-list">
    {#each features as feature, index (index)}
      <div class="feature-row {index % 2 === 0 ? 'reverse' : ''}">
        <div class="feature-image-container">
          <img src={feature.image} alt={feature.title} class="feature-image" />
        </div>
        <div class="feature-content">
          <span class="feature-badge">{feature.badge}</span>
          <h3 class="feature-title">{feature.title}</h3>
          <p class="feature-description">{feature.description}</p>
          {#each feature.listItems as item, i (i)}
            <div class="feature-list-item">
              <span class="checkmark">✅</span>
              <span>{item}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Section>

<style>
  .features-intro {
    text-align: center;
    margin-bottom: 4rem;
    font-size: 1rem;
  }
  .features-list {
    display: flex;
    flex-direction: column;
    gap: 6rem;
  }
  .feature-row {
    display: flex;
    flex-direction: column-reverse;
    gap: 2rem;
    justify-content: center;
    text-align: left;
  }
  @media (min-width: 640px) {
    .feature-row {
      flex-direction: row;
      gap: 4rem;
    }
    .feature-row.reverse {
      flex-direction: row-reverse;
    }
  }
  .feature-image-container {
    aspect-ratio: 16 / 9;
    display: flex;
    max-height: 14rem;
    max-width: 24rem;
    overflow: hidden;
    width: 100%;
  }
  @media (min-width: 640px) {
    .feature-image-container {
      width: 50%;
    }
  }
  .feature-image {
    border-radius: 1rem;
    display: block;
    filter: saturate(1.5);
    margin: auto;
    object-fit: contain;
    max-width: 100%;
  }
  @media (min-width: 640px) {
    .feature-image {
      min-width: 100%;
    }
  }
  .feature-content {
    width: 100%;
    max-width: 24rem;
  }
  @media (min-width: 640px) {
    .feature-content {
      width: 50%;
    }
  }
  .feature-badge {
    display: inline-block;
    background-color: #fba91a;
    color: #fff;
    padding: 0.2rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 99rem;
    font-size: 0.875rem;
    font-weight: bold;
  }
  .feature-title {
    font-size: 2.25rem;
    font-weight: bold;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  .feature-description {
    font-size: 0.875rem;
  }
  .feature-list-item {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    align-items: center;
    font-size: 0.875rem;
  }
</style>
