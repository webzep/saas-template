<script lang="ts">
  import { page } from "$app/state"
  import type { File } from "@repo/schemas"
  import { trpc } from "@/lib/trpc/client"
  import { Card, Flex, Table, snackbar, type TableColumns } from "@repo/ui"

  let reels = $state<File[]>([])

  let tableData = $derived(reels)

  const intl = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })

  let tableColumns: TableColumns<File> = [
    { key: "file_name", label: "File name" },
    { key: "id", label: "ID" },
    {
      key: "size",
      label: "Size",
      formatter: (size: number) => `${(size / 1024 / 1024).toFixed(2)}MB`,
    },
    {
      key: "created_at",
      label: "Created At",
      formatter: (date: string) => intl.format(new Date(date)),
    },
    {
      key: "updated_at",
      label: "Updated At",
      formatter: (date: string) => intl.format(new Date(date)),
    },
    { key: "owner_id", label: "Owner ID" },
  ]

  const tableRowKey = "id"
  const tableDisplayKey = "reel_file_name"

  const loadData = async () => {
    reels = (await trpc(page).reels.getUploaded.query()).data ?? []
  }

  $effect(() => {
    loadData()
  })

  const handleDeleteRow = async (id: string) => {
    const reel = reels.find((reel) => reel[tableRowKey] === id)
    if (!reel) return

    const result = await trpc(page).reels.deleteOne.mutate({
      id: reel.id,
    })
    if (!result.success) {
      console.error(result.message)
      snackbar.error({ text: result.message })
      return
    }

    if (result.data) {
      reels = reels.filter((reel) => reel.id !== result.data?.id)
      snackbar.success({ text: "Reel deleted successfully" })
    }
  }
</script>

<main>
  <h1>Overview page</h1>

  <Card>
    {#snippet header()}
      <h2>Files</h2>
    {/snippet}
    <Flex column gap="lg" wide>
      <p>Upload a new file via the components page to see it here.</p>

      <Table
        columns={tableColumns}
        data={tableData}
        displayKey={tableDisplayKey}
        onDeleteRow={handleDeleteRow}
        rowKey={tableRowKey}
        showActions
      />
    </Flex>
  </Card>
</main>
