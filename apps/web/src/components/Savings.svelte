<script lang="ts">
  import Hourglass from "@/assets/hourglass.png"
  import Ninja from "@/assets/ninja.png"
  import Timetraveller from "@/assets/timetraveller.png"
  import Section from "@/components/Section.svelte"
  import { CardWithImage, Grid } from "@repo/ui"

  type Issue = {
    time: string
    line2: string
    description: string
    image: string
  }

  const issues: Issue[] = [
    {
      time: "16 hours",
      line2: "of manual posting",
      description:
        "Stop spending endless hours manually posting to each platform. Our scheduler automates your workflow, freeing you to create more engaging content.",
      image: Ninja,
    },
    {
      time: "12 hours",
      line2: "of scheduling confusion",
      description:
        "Streamline your content planning and posting with our all-in-one platform that syncs your updates across multiple networks effortlessly.",
      image: Hourglass,
    },
    {
      time: "14 hours",
      line2: "of engagement insights",
      description:
        "Gain real-time analytics without the hassle. Our dashboard delivers clear insights so you can optimize your social media performance with ease.",
      image: Timetraveller,
    },
  ]
</script>

<Section id="problem" noAnimate maxWidth="90rem">
  <h2 class="savings-title">
    <span>We've saved entrepreneurs</span>
    <span class="savings-highlight">
      $1,431,880+
      <svg
        class="savings-svg"
        width="347"
        height="95"
        viewBox="0 0 347 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M244.215 2C162.594 2.87851 -15.6406 13.4598 3.41548 67.3207C20.5414 105.348 264.578 97.1786 324.79 68.5643C385.002 39.95 302.309 10.1755 187.047 20.7176"
          stroke="currentColor"
          stroke-width="4"
        />
      </svg>
    </span>
  </h2>
  <Grid rowMin="0" colMin="250px">
    {#each issues as issue, index (index)}
      <CardWithImage alt={"Save " + issue.time} imageSrc={issue.image}>
        {#snippet title()}
          <h3 class="title-main">
            <div>
              Save <span class="text-primary font-black">{issue.time}</span>
            </div>
          </h3>
          <h3 class="title-sub">{issue.line2}</h3>
        {/snippet}
        {#snippet description()}
          <p class="text-left text-lg">{issue.description}</p>
        {/snippet}
      </CardWithImage>
    {/each}
  </Grid>
</Section>

<style>
  .savings-title {
    font-size: 2.25rem; /* approximates text-4xl */
    font-weight: bold;
    margin-top: 2rem; /* approximates mt-8 */
    margin-bottom: 4rem; /* approximates mb-16 */
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  .savings-highlight {
    position: relative;
    font-size: 3rem; /* approximates text-5xl */
    margin-top: 1rem; /* approximates mt-4 */
    display: flex;
    justify-content: center;
  }
  @media (min-width: 640px) {
    .savings-highlight {
      font-size: 4rem; /* approximates sm:text-7xl */
    }
  }

  .savings-svg {
    position: absolute;
    color: var(--primary);
    height: 2.5rem; /* approximates h-10 */
    top: 0.25rem; /* approximates top-1 */
    width: 33.33%; /* approximates w-1/3 */
    overflow: visible;
    transform-origin: center;
    transform: scaleX(3) scaleY(3);
  }
  @media (min-width: 640px) {
    .savings-svg {
      transform: scaleX(4) scaleY(3);
    }
  }

  .title-main {
    font-size: 2.25rem; /* approximates text-4xl */
  }
  .title-sub {
    font-size: 1.25rem; /* approximates text-xl */
  }
  .text-primary {
    color: var(--primary);
  }
  .font-black {
    font-weight: 900;
  }
</style>
