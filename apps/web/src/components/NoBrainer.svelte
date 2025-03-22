<script lang="ts">
  import Meta from "@/assets/logos/meta.png"
  import Section from "@/components/Section.svelte"
  import { Table } from "@repo/ui"

  const siteName = "SkullTag"

  const comparisonItems = [
    {
      feature: "Schedule posts in minutes",
      ours: true,
      theirs: false,
    },
    {
      feature: "Boost engagement with optimized timing",
      ours: true,
      theirs: false,
    },
    {
      feature: "Seamless integration with top social platforms",
      ours: true,
      theirs: false,
    },
    {
      feature: "Real-time analytics and reporting",
      ours: true,
      theirs: false,
    },
  ]

  const tableColumns = [
    { key: "feature", label: "Feature" },
    { key: "ours", label: siteName },
    { key: "theirs", label: "Other Tools" },
  ]

  const tableData = comparisonItems.map((item) => ({
    feature: item.feature,
    ours: item.ours ? "✅" : "❌",
    theirs: item.theirs ? "✅" : "❌",
  }))
</script>

<Section id="no-brainer" noAnimate title="Social media managers love it">
  <div class="content-grid">
    <div class="table-container">
      <Table
        columns={tableColumns}
        data={tableData}
        displayKey="label"
        rowKey="key"
      />
    </div>
    <div class="right-content">
      <img
        alt="Social Dashboard"
        class="dashboard-img"
        src={Meta}
        width="310"
        height="310"
      />
      <div class="dashboard-title">
        <h3>Real-Time Social Insights</h3>
      </div>
      <div class="stats-grid">
        <div class="stat">
          <div class="stat-circle">
            <span>100%</span>
          </div>
          <span class="stat-label">Engagement</span>
        </div>
        <div class="stat">
          <div class="stat-circle">
            <span>100%</span>
          </div>
          <span class="stat-label">Reach</span>
        </div>
        <div class="stat">
          <div class="stat-circle">
            <span>100%</span>
          </div>
          <span class="stat-label">Scheduling</span>
        </div>
        <div class="stat">
          <div class="stat-circle">
            <span>100%</span>
          </div>
          <span class="stat-label">Analytics</span>
        </div>
      </div>
    </div>
  </div>
</Section>

<style>
  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;
  }
  @media (min-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .table-container {
    text-align: left;
  }

  .right-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .dashboard-img {
    max-width: 10rem;
    margin-bottom: 1rem;
  }

  .dashboard-img {
    filter: blur(4px);
    margin-top: 2rem;
    max-width: none;
    opacity: 0.15;
    padding: 1rem;
    position: absolute;
  }

  .dashboard-title h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .stats-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;
    position: relative;
  }

  .stat {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .stat-circle {
    align-items: center;
    background-color: rgba(34, 197, 94, 0.1);
    border-radius: 50%;
    border: 4px solid #22c55e;
    display: flex;
    height: 6rem;
    justify-content: center;
    padding: 0.5rem;
    width: 6rem;
  }

  .stat-circle span {
    color: #22c55e;
    font-family: monospace;
    font-size: 2rem;
    font-weight: 500;
  }

  .stat-label {
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 0.5rem;
    white-space: nowrap;
  }
</style>
