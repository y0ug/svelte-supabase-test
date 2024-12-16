<script lang="ts">
  import type { SupabaseClient, User } from "@supabase/supabase-js";

  let { size = 10, avatarUrl = $bindable(), supabase, user, upload } = $props();

  let uploading = $state(false);
  let files: FileList;

  // const downloadImage = async (path: string) => {
  //   try {
  //     const { data, error } = await supabase.storage
  //       .from("avatars")
  //       .download(path);
  //
  //     if (error) {
  //       throw error;
  //     }
  //
  //     console.log(data);
  //     const url = $state(URL.createObjectURL(data));
  //     avatarUrl = url;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.log("Error downloading image: ", error.message);
  //     }
  //   }
  // };

  const uploadAvatar = async () => {
    try {
      uploading = true;

      if (!files || files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      avatarUrl = data.publicUrl;

      setTimeout(() => {
        upload(avatarUrl);
      }, 100);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      uploading = false;
    }
  };
</script>

<div class="flex flex-col items-center space-y-4">
  <input type="hidden" name="avatarUrl" value={avatarUrl} />

  <div class="relative">
    {#if avatarUrl}
      <img
        src={avatarUrl}
        alt="User Avatar"
        class="rounded-full border-4 border-primary object-cover"
        style="height: {size}em; width: {size}em;"
      />
    {:else}
      <div
        class="flex items-center justify-center bg-gray-200 rounded-full border-4 border-primary"
        style="height: {size}em; width: {size}em;"
      >
        <span class="text-gray-500 text-xl">No Image</span>
      </div>
    {/if}
    {#if uploading}
      <div
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
      >
        <span class="text-white font-semibold">Uploading...</span>
      </div>
    {/if}
  </div>

  <div class="flex flex-col items-center">
    <label
      for="avatar-upload"
      class="btn btn-primary flex items-center space-x-2 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 16l4-4m0 0l4 4m-4-4v12"
        />
      </svg>
      <span>{uploading ? "Uploading..." : "Change Avatar"}</span>
    </label>
    <input
      id="avatar-upload"
      type="file"
      accept="image/*"
      class="hidden"
      bind:files
      onchange={uploadAvatar}
      disabled={uploading}
    />
    {#if avatarUrl}
      <button
        onclick={() => {
          avatarUrl = "";
        }}
        class="btn btn-secondary mt-2"
        disabled={uploading}
      >
        Remove Avatar
      </button>
    {/if}
  </div>
</div>
