<script lang="ts">
  let { user, profile, supabase } = $props();
</script>

<!-- Navbar -->
<nav class="navbar justify-between bg-base-300">
  <!-- Logo -->
  <a class="btn btn-ghost text-lg"> Company </a>

  <!-- Menu for desktop -->
  <ul class="hidden menu sm:menu-horizontal gap-2">
    {#if user}
      {#if profile.avatar_url}
        <div class="avatar">
          <div class="w-8 rounded-full">
            <img
              src={profile.avatar_url}
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
      <form action="/auth/logout" method="POST">
        <button type="submit" class="btn btn-sm btn-ghost">Logout</button>
      </form>
    {:else}
      <a href="/login" class="btn btn-sm btn-primary">Login</a>
    {/if}
  </ul>
</nav>
