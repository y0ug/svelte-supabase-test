<script lang="ts">
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";
  let { user, profile, supabase, form } = $props();

  const avatar_url = $derived(profile.avatar_url);

  // if (user) {
  //   if (user.user_metadata?.avatar_url) {
  //     avatar_url = user.user_metadata?.avatar_url;
  //   } else {
  //     avatar_url = $derived(profile.avatar_url);
  //   }
  // }

  // const logout = ({ formElement, formData, action, cancel, submitter }) => {
  //   // `formElement` is this `<form>` element
  //   // `formData` is its `FormData` object that's about to be submitted
  //   // `action` is the URL to which the form is posted
  //   // calling `cancel()` will prevent the submission
  //   // `submitter` is the `HTMLElement` that caused the form to be submitted
  //
  //   return async ({ result, update }) => {
  //     console.log(result);
  //     console.log(update);
  //
  //     invalidate("supabase:auth");
  //     // `result` is an `ActionResult` object
  //     // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
  //   };
  // };
</script>

<!-- Navbar -->
<nav class="navbar justify-between bg-base-300">
  <!-- Logo -->
  <a class="btn btn-ghost text-lg"> Company </a>

  <!-- Menu for desktop -->
  <ul class="hidden menu sm:menu-horizontal gap-2">
    {#if user}
      {#if avatar_url}
        <div class="avatar">
          <div class="w-8 rounded-full">
            <img
              src={avatar_url}
              alt="{profile.full_name}'s Profile Picture"
              class="w-8 h-8 rounded-full object-cover"
              onerror={(e: Event) => {
                // Fallback to initials if image fails to load
                const img = e.target as HTMLImageElement;
                img.onerror = null; // Prevent infinite loop if fallback fails
                img.src = ""; // Remove src to hide the broken image icon
              }}
            />
          </div>
        </div>
      {:else}
        <div class="avatar placeholder">
          <div
            class="bg-neutral text-neutral-content w-12 h-12 rounded-full flex items-center justify-center text-xl"
          >
            {#if profile.full_name}
              {profile.full_name.charAt(0).toUpperCase()}
            {/if}
          </div>
        </div>
      {/if}
      <a href="/account" class="btn btn-ghost">
        <span>{profile?.full_name}</span>
      </a>
      <form action="/auth/logout" method="POST" use:enhance>
        <button type="submit" class="btn btn-sm btn-ghost">Logout</button>
      </form>
    {:else}
      <a href="/login" class="btn btn-sm btn-primary">Login</a>
    {/if}
  </ul>
</nav>
