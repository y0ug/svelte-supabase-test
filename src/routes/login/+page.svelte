<script lang="ts">
  let { form } = $props();
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
  <h2 class="text-2xl mb-4">Login</h2>
  {#if form?.error}
    <div class="mb-4 text-red-500">{form.error}</div>
  {/if}
  <form method="POST">
    <div class="mb-4">
      <label class="block mb-1" for="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        class="w-full px-3 py-2 border rounded"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1" for="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        class="w-full px-3 py-2 border rounded"
        required
      />
    </div>
    <button type="submit" class="w-full bg-green-500 text-white py-2 rounded">
      Login
    </button>
  </form>
</div>
