<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/state"
  import Uploader from "@/components/Uploader.svelte"
  import {
    Button,
    Card,
    Checkbox,
    Collapsible,
    CompanyTextLogo,
    Drawer,
    Dropdown,
    Flex,
    Icon,
    Input,
    Loader,
    Modal,
    SideMenu,
    Slider,
    snackbar,
    Switch,
    Table,
    tooltip,
    type NavGroup,
    type SnackType,
  } from "@repo/ui"

  // Drawer
  let drawerOpen = $state(false)

  // SideMenu
  const navGroups: NavGroup[] = [
    {
      label: "",
      items: [
        { label: "Preferences", path: "/settings/preferences", icon: "gear" },
      ],
    },
  ]

  // Snackbar
  const handleShowSnack = () => {
    const types: SnackType[] = ["success", "info", "warning", "error"]
    // Random funny messages that vary in length
    const msgs = [
      "Action completed successfully!",
      "This is a very long message that should wrap to the next line and be truncated with an ellipsis.",
      "This is a very short message.",
      "This is a message that is just long enough to wrap to the next line.",
    ]

    const randomMessage = msgs[Math.floor(Math.random() * msgs.length)]
    const randomType = types[Math.floor(Math.random() * types.length)]

    snackbar.push({ type: randomType, text: randomMessage })
  }

  // Uploader
  function handleUploadSuccess({ url }: { url: string }) {
    console.log("Upload successful, file URL:", url)
  }
  function handleUploadError({ error }: { error: string }) {
    console.error("Upload error:", error)
  }
  // Modal
  let modalOpen = $state(false)
  const handleCloseModal = () => {
    modalOpen = false
  }
</script>

<Flex column gap="md">
  <Card>
    {#snippet header()}
      <h2>Uploader</h2>
    {/snippet}

    <Uploader />
  </Card>

  <Card>
    {#snippet header()}
      <h2>Modal</h2>
    {/snippet}

    <Button onclick={() => (modalOpen = true)}>Open Modal</Button>

    <Modal open={modalOpen} onClose={handleCloseModal}>
      {#snippet header()}
        <h2>Modal Header</h2>
      {/snippet}
      <p>Modal content</p>
      {#snippet footer()}
        <Button variant="secondary" onclick={handleCloseModal}>Close</Button>
      {/snippet}
    </Modal>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Snackbar</h2>
    {/snippet}

    <Button onclick={handleShowSnack}>Show Message</Button>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Input</h2>
    {/snippet}

    <Input label="Sooo" placeholder="Tell me what you're thinking about..." />
  </Card>

  <Card>
    {#snippet header()}
      <h2>Drawer</h2>
    {/snippet}

    <Button onclick={() => (drawerOpen = true)}>Open Drawer</Button>
    <Drawer open={drawerOpen} onClose={() => (drawerOpen = false)}>
      <div style="padding: 1rem; height: 100%">
        <SideMenu
          activeUrl={page.url}
          {navGroups}
          onItemClick={(path) => goto(path)}
        >
          {#snippet header()}
            <CompanyTextLogo />
          {/snippet}
        </SideMenu>
      </div>
    </Drawer>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Table</h2>
    {/snippet}

    <Table
      rowKey="name"
      displayKey="name"
      columns={[
        { key: "name", label: "Name" },
        { key: "age", label: "Age" },
        { key: "city", label: "City" },
      ]}
      data={[
        { name: "Big bird", age: 12, city: "Sesame Street" },
        { name: "Cookie Monster", age: 45, city: "Bin world" },
        { name: "Elmo", age: 3, city: "Sesame Street" },
      ]}
      showActions
    ></Table>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Switch</h2>
    {/snippet}

    <Flex column gap="sm">
      <Switch label="Switch 1" />
    </Flex>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Tooltip</h2>
    {/snippet}

    <Flex column gap="sm">
      <h4 title="This is a tooltip" use:tooltip>Hover me</h4>
    </Flex>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Slider</h2>
    {/snippet}

    <Flex column gap="sm">
      <Slider
        color="primary"
        label="Primary"
        max={100}
        min={0}
        step={1}
        value={50}
        ticks={[
          { label: "0", value: 0 },
          { label: "50", value: 50 },
          { label: "100", value: 100 },
        ]}
      />
      <Slider label="Secondary" max={100} min={0} step={1} value={25} />
    </Flex>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Loader</h2>
    {/snippet}

    <Flex column gap="sm">
      <Loader />
    </Flex>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Checkbox</h2>
    {/snippet}

    <Flex column gap="sm">
      <Checkbox label="Checkbox 1" />
      <Checkbox label="Checkbox 2" />
    </Flex>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Collapsible</h2>
    {/snippet}

    <Collapsible title="Collapsible 1">
      <p style="padding: 1rem">Collapsible content</p>
    </Collapsible>
    <Collapsible title="Collapsible 2">
      <p style="padding: 1rem">Collapsible content</p>
    </Collapsible>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Icon</h2>
    {/snippet}
    <Flex gap="md">
      <!-- defaults to fill -->
      <Icon size="lg" name="acorn" />
      <Icon bold size="lg" name="acorn" />
      <Icon light size="lg" name="acorn" />
      <Icon size="lg" name="airplane" />
      <Icon size="sm" name="skull" color="primary" />
      <Icon size="xl" name="skull" color="limegreen" bold />
    </Flex>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Dropdown</h2>
    {/snippet}

    <Flex wide>
      <Dropdown
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2 yeah boi thats it, op 2" },
          { value: "3", label: "Option 3" },
        ]}
        selectedValue="1"
      />
    </Flex>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Button Variants</h2>
    {/snippet}

    <Flex column gap="sm">
      <Button>
        {#snippet iconLeft()}
          <Icon name="acorn" />
        {/snippet}
        Primary</Button
      >
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
      <Button variant="primary" outlined>Primary outlined</Button>
      <Button variant="secondary" outlined>Secondary outlined</Button>
      <Button variant="ghost" outlined>Ghost outlined</Button>
      <Button variant="text" outlined>Text outlined</Button>
      <Button variant="success" outlined>Success outlined</Button>
      <Button variant="danger" outlined>Danger outlined</Button>
      <Button variant="warning" outlined>Warning outlined</Button>
      <Button variant="info" outlined>Info outlined</Button>
    </Flex>
  </Card>

  <Card>
    {#snippet header()}
      <h2>Card</h2>
    {/snippet}

    {#snippet footer()}
      <small>Footer info or actions</small>
    {/snippet}

    <p>
      This is the main card content. It can include any HTML, text, or
      components.
    </p>
  </Card>

  <Card image="https://dummyimage.com/600x100/fca9fc/fff" variant="elevated">
    {#snippet header()}
      <h2>Card (with image)</h2>
    {/snippet}
    <p>Content with an image at the top and an elevated style.</p>
  </Card>
</Flex>
