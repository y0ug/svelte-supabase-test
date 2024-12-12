<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  let email: string = '';
  let password: string = '';
  let error: string | null = null;

  const register = async () => {
    const { user, session, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (supabaseError) {
      error = supabaseError.message;
    } else {
      goto('/profile');
    }
  };
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
  <h2 class="text-2xl mb-4">Register</h2>
  {#if error}
    <div class="mb-4 text-red-500">{error}</div>
  {/if}
  <form on:submit|preventDefault={register}>
    <div class="mb-4">
      <label class="block mb-1">Email</label>
      <input
        type="email"
        bind:value={email}
        class="w-full px-3 py-2 border rounded"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1">Password</label>
      <input
        type="password"
        bind:value={password}
        class="w-full px-3 py-2 border rounded"
        required
      />
    </div>
    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">
      Register
    </button>
  </form>
</div>
