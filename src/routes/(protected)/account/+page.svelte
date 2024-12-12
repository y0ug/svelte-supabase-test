<!-- src/routes/account/+page.svelte -->
<script lang="ts">
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import Avatar from "./Avatar.svelte";

  let { data, form } = $props();

  let { session, supabase, profile } = data;
  let user = session.user;
  let profileForm: HTMLFormElement;
  let loading = $state(false);
  let fullName: string = profile?.full_name ?? "";
  let username: string = profile?.username ?? "";
  let website: string = profile?.website ?? "";
  let avatarUrl: string = profile?.avatar_url ?? "";

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    };
  };

  const handleSignOut: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  };
</script>

<div class="max-w-xl mx-auto p-6 bg-base-200 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-6">Account Settings</h2>

  <form
    class="space-y-4"
    method="post"
    action="?/update"
    use:enhance={handleSubmit}
    bind:this={profileForm}
  >
    <!-- Email Field -->
    <div class="form-control">
      <label class="label" for="email">
        <span class="label-text">Email</span>
      </label>
      <input
        id="email"
        type="text"
        class="input input-bordered"
        value={session.user.email}
        disabled
      />
    </div>

    <!-- Full Name Field -->
    <div class="form-control">
      <label class="label" for="fullName">
        <span class="label-text">Full Name</span>
      </label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        class="input input-bordered"
        bind:value={fullName}
        placeholder="Enter your full name"
      />
    </div>

    <!-- Username Field -->
    <div class="form-control">
      <label class="label" for="username">
        <span class="label-text">Username</span>
      </label>
      <input
        id="username"
        name="username"
        type="text"
        class="input input-bordered"
        bind:value={username}
        placeholder="Choose a username"
      />
    </div>

    <!-- Website Field -->
    <div class="form-control">
      <label class="label" for="website">
        <span class="label-text">Website</span>
      </label>
      <input
        id="website"
        name="website"
        type="url"
        class="input input-bordered"
        bind:value={website}
        placeholder="Your website URL"
      />
    </div>

    <!-- Add to body -->
    <Avatar
      {supabase}
      {user}
      bind:url={avatarUrl}
      size={10}
      upload={(url) => {
        // profileForm.requestSubmit();
      }}
    />
    <!-- Submit Button -->
    <div class="form-control mt-6">
      <button
        type="submit"
        class={`btn btn-primary ${loading ? "loading" : ""}`}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </div>
  </form>

  <!-- Sign Out Form -->
  <form
    class="mt-8"
    method="post"
    action="?/signout"
    use:enhance={handleSignOut}
  >
    <button type="submit" class="btn btn-error w-full" disabled={loading}>
      {loading ? "Signing Out..." : "Sign Out"}
    </button>
  </form>
</div>
