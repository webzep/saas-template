<script lang="ts">
  import Section from "@/components/Section.svelte"
  import { Grid, Icon, type IconName } from "@repo/ui"

  const items: {
    description: string
    icon: IconName
    title: string
    color: string
  }[] = [
    {
      description: `Boost your social commerce by automating promotional posts and product updates across channels.`,
      icon: "shopping-cart",
      title: "Social Commerce",
      color: "#FF8A80",
    },
    {
      description: `Showcase your brand with a dynamic profile that updates automatically to keep your audience engaged.`,
      icon: "user-circle",
      title: "Brand Showcase",
      color: "#4DB6AC",
    },
    {
      description: `Plan and schedule content seamlessly to drive engagement and elevate your online presence.`,
      icon: "newspaper",
      title: "Content Publishing",
      color: "#64B5F6",
    },
    {
      description: `Design dedicated campaign pages that capture leads and convert visitors into loyal customers.`,
      icon: "layout",
      title: "Campaign Landing Pages",
      color: "#FFB74D",
    },
    {
      description: `Streamline your social campaigns with intuitive scheduling and workflow automation tools.`,
      icon: "clipboard-text",
      title: "Campaign Management",
      color: "#81C784",
    },
    {
      description: `Engage your audience in real time with automated live event promotions and interactive sessions.`,
      icon: "video-camera",
      title: "Live Engagement",
      color: "#BA68C8",
    },
  ]
</script>

<Section maxWidth="60rem" id="use-cases" noAnimate>
  <h2>Versatile Social Solutions</h2>
  <Grid colMin="350px" rowMin="250px">
    {#each items as item, index}
      <div
        class={`card border-[3px] border-base-300 shadow-sm rounded-box justify-center text-left ${index % 2 === 0 ? "bg-base-100" : "bg-base-200"}`}
      >
        <div class="card-body">
          <div class="mb-2">
            <Icon color={item.color} name={item.icon} size="lg" />
          </div>
          <h3 class="card-title font-black text-2xl">{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </div>
    {/each}
  </Grid>
</Section>
