<!-- FileUploader.svelte -->
<script lang="ts">
  import { page } from "$app/state"
  import { trpc } from "@/lib/trpc/client"
  import { Button, Flex, Icon, Modal, snackbar } from "@repo/ui"

  // Reactive state using $state (Svelte 5)
  let selectedFile = $state<File | null>(null)
  let uploading = $state(false)
  let error = $state("")
  let uploadedUrl = $state("")
  let progressPercentage = $state(0)
  let showModal = $state(false)
  let filePreviewUrl = $state("")

  // State for drop zone active styling
  let dropActive = $state(false)

  // Reference to the hidden file input element
  let fileInputRef: HTMLInputElement | null = null

  // Open the modal when the main "Upload File" button is clicked.
  function openModal() {
    showModal = true
  }

  // When a file is selected (via drop or file selector), handle it.
  function handleFile(file: File) {
    selectedFile = file
    error = ""
    uploadedUrl = ""
    progressPercentage = 0
    // Create a temporary URL for preview.
    filePreviewUrl = URL.createObjectURL(file)
  }

  // File input change handler
  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      handleFile(input.files[0])
    }
  }

  // Drag & drop handlers for the drop zone
  function handleDragOver(event: DragEvent) {
    event.preventDefault()
    dropActive = true
  }
  function handleDragLeave(event: DragEvent) {
    dropActive = false
  }
  function handleDrop(event: DragEvent) {
    event.preventDefault()
    dropActive = false
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      handleFile(event.dataTransfer.files[0])
      event.dataTransfer.clearData()
    }
  }
  // Clicking (or pressing Enter/Space) on the drop zone opens the file selector.
  function openFileSelector() {
    fileInputRef?.click()
  }
  function handleDropZoneKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openFileSelector()
    }
  }

  // Upload using XMLHttpRequest so we can track progress.
  async function handleUpload() {
    if (!selectedFile) return
    uploading = true
    error = ""
    try {
      const { success, data, message } = await trpc(
        page,
      ).upload.getSignedUploadUrl.query({
        content_type: selectedFile.type,
        file_name: selectedFile.name,
        size: selectedFile.size,
      })

      if (!success || !data?.uploadUrl) {
        snackbar.error({ text: message })
        throw new Error(message)
      }

      const { uploadUrl, id } = data

      await new Promise((resolve, reject) => {
        if (!selectedFile) return reject(new Error("No file selected"))
        const xhr = new XMLHttpRequest()
        xhr.open("PUT", uploadUrl)
        xhr.setRequestHeader("Content-Type", selectedFile.type)
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            progressPercentage = (event.loaded / event.total) * 100
          }
        }
        xhr.onerror = () => {
          reject()
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve(null)
          else reject(new Error(`Upload failed with status ${xhr.status}`))
        }
        xhr.send(selectedFile)
      })

      snackbar.success({ text: `${selectedFile.name} uploaded successfully` })

      await trpc(page).upload.updateUpload.mutate({
        target: id,
        data: { status: "UPLOADED" },
      })

      // Close the modal.
      showModal = false
      // Revoke the temporary preview URL.
      URL.revokeObjectURL(filePreviewUrl)
    } catch (e) {
      error = e instanceof Error ? e.message : String(e)
      snackbar.error({ text: error })
    } finally {
      uploading = false
    }
  }

  // Cancel preview: clear selection and close the modal.
  function handleCancel() {
    selectedFile = null
    filePreviewUrl = ""
    showModal = false
    error = ""
  }
</script>

<!-- Main UI: "Upload File" button -->
<div class="uploader">
  <Button variant="primary" onclick={openModal}>Upload File</Button>
  {#if error}
    <p class="error">{error}</p>
  {/if}
  {#if uploadedUrl}
    <p class="success">
      Uploaded successfully: <a href={uploadedUrl} target="_blank"
        >{uploadedUrl}</a
      >
    </p>
  {/if}
</div>

<!-- Hidden file input for fallback; not visible -->
<input
  bind:this={fileInputRef}
  class="hidden-file-input"
  onchange={handleFileChange}
  type="file"
/>

<!-- Modal with drop zone and preview -->
<Modal open={showModal} onClose={handleCancel}>
  {#snippet header()}
    <h2>Select a File</h2>
  {/snippet}

  <!-- Accessible drop zone -->
  <div
    aria-label="File drop zone. Click or press Enter/Space to select a file, or drag and drop a file."
    class:active={dropActive}
    class="drop-zone"
    onclick={openFileSelector}
    ondragleave={handleDragLeave}
    ondragover={handleDragOver}
    ondrop={handleDrop}
    onkeydown={handleDropZoneKeyDown}
    role="button"
    tabindex="0"
  >
    {#if selectedFile}
      {#if selectedFile.type.startsWith("image/")}
        <img src={filePreviewUrl} alt="Preview" class="preview-image" />
      {:else if selectedFile.type.startsWith("video/")}
        <video
          src={filePreviewUrl}
          controls
          class="preview-video"
          onclick={(e) => e.stopPropagation()}
        >
          <track kind="captions" srclang="en" label="English" />
        </video>
      {:else}
        <p>Preview not available for this file type.</p>
      {/if}
    {:else}
      <Flex align="center" column gap="md" justify="center" wide>
        <Icon bold color="secondary" name="upload" size="xl" />
        <p class="drop-zone-text">
          Drag and drop a file here, or click to select one.
        </p>
      </Flex>
    {/if}
  </div>

  {#snippet footer()}
    <Flex justify="between" gap="md">
      <Button variant="ghost" onclick={handleCancel}>Cancel</Button>
      <Button
        variant="primary"
        onclick={handleUpload}
        disabled={!selectedFile || uploading}
      >
        {uploading ? `Uploading… ${progressPercentage.toFixed(0)}%` : "Upload"}
      </Button>
    </Flex>
  {/snippet}
</Modal>

<style>
  .uploader {
    display: flex;
    justify-content: center;
    margin: var(--spacing-4) auto;
  }
  .error {
    color: var(--danger);
    text-align: center;
  }
  .success {
    color: var(--success);
    text-align: center;
  }
  .hidden-file-input {
    display: none;
  }
  .drop-zone {
    align-items: center;
    border-radius: var(--radius-box);
    border: 4px dashed var(--border-1);
    cursor: pointer;
    display: flex;
    justify-content: center;
    min-height: 200px;
    padding: var(--spacing-4);
    text-align: center;
    transition:
      background-color 0.3s,
      border-color 0.3s;
  }
  .drop-zone.active {
    background-color: var(--surface-2);
    border-color: var(--primary);
  }
  .drop-zone p {
    margin: 0;
  }
  .drop-zone-text {
    color: color-mix(in srgb, var(--on-surface-1) 60%, transparent);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.5;
  }
  .preview-image,
  .preview-video {
    border-radius: var(--radius-box);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    margin-bottom: var(--spacing-2);
    max-width: 100%;
  }
</style>
