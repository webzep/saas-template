<script lang="ts">
  import Button from "./Button.svelte"
  import Icon from "./Icon.svelte"
  import { confirm } from "./confirm"
  import type { TableColumns } from "./types"

  type Props = {
    caption?: string
    columns?: TableColumns<any>
    data?: any[]
    displayKey: string
    onDeleteRow?: (rowKey: string) => void
    /** The key to use as the row key (should be unique to the row) */
    rowKey: string
    showActions?: boolean
  }

  let {
    data = [],
    columns = undefined,
    caption = undefined,
    displayKey = "name",
    onDeleteRow = undefined,
    rowKey = "id",
    showActions = false,
  }: Props = $props()

  let cols = $derived(
    columns
      ? columns
      : data[0]
        ? Object.keys(data[0]).map((key) => ({
            key,
            label: key,
            formatter: undefined,
          }))
        : [],
  )

  const handleDeleteRow = async (id: string) => {
    const rowDisplayName = data.find((row) => row[rowKey] === id)[displayKey]

    const confirmed = await confirm({
      title: "Delete Item",
      message: `Are you sure you want to delete ${rowDisplayName}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    })

    if (!confirmed) return
    onDeleteRow?.(id)
  }
</script>

<div class="table-container">
  <table class="data-table">
    {#if caption}
      <caption>{caption}</caption>
    {/if}
    <thead>
      <tr>
        {#each cols as col (col)}
          <th scope="col">{col.label}</th>
        {/each}
        {#if showActions}
          <th scope="col">Actions</th>
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each data as row, i (i)}
        <tr>
          {#each cols as col (col)}
            <td>{col.formatter ? col.formatter(row[col.key]) : row[col.key]}</td
            >
          {/each}
          {#if showActions}
            <td class="actions">
              <Button
                aria-label="Delete row"
                onclick={() => handleDeleteRow(row[rowKey])}
                variant="text"
              >
                <Icon bold name="trash" />
              </Button>
            </td>
          {/if}
        </tr>
      {/each}

      <!-- No data yet -->
      {#if data.length === 0}
        <tr>
          <td colspan={cols.length + (showActions ? 1 : 0)}>
            🧐 Nothing to see here yet
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

<style>
  .table-container {
    border-radius: var(--radius-box);
    border: 1px solid color-mix(in srgb, var(--on-surface-1) 20%, transparent);
    overflow-x: auto;
    width: 100%;
  }
  .data-table {
    border-collapse: collapse;
    width: 100%;
  }
  .data-table caption {
    background: var(--surface-1);
    caption-side: top;
    color: var(--on-surface-1);
    font-weight: bold;
    padding: var(--spacing-2);
    text-align: left;
  }
  .data-table th,
  .data-table td {
    border-bottom: 1px solid
      color-mix(in srgb, var(--on-surface-1) 20%, transparent);
    padding: var(--spacing-3);
    text-align: left;
    vertical-align: middle;
  }
  .data-table th {
    background: var(--primary);
    color: var(--on-primary);
  }
  .data-table tr:last-child td {
    border-bottom: none;
  }
  .data-table th:last-child,
  .data-table td:last-child {
    text-align: center;
  }

  /* .data-table td:last-child AND .actions */
  .data-table td.actions {
    text-align: end;
  }
</style>
