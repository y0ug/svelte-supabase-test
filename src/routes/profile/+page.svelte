<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let user = data.user.data.user;
  const logout = async () => {
    await data.supabase.auth.signOut();
    goto("/login");
  };
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
  <h2 class="text-2xl mb-4">Profile</h2>
  <p><strong>Email:</strong> {user.email}</p>
  <p><strong>ID:</strong> {user.id}</p>
  <button onclick={logout} class="mt-4 bg-red-500 text-white py-2 px-4 rounded">
    Logout
  </button>
  <a href="/update-password" class="mt-4 inline-block text-blue-500">
    Update Password
  </a>
</div>
