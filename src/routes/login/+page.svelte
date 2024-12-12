<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData, SubmitFunction } from "./$types.js";
  import { LoginType } from "$lib/types";
  import { toast } from "svoast";
  let { form, data } = $props<{ form: ActionData; data: PageData }>();
  let loading = $state(false);
  
  let loginType = $state(data.loginType);
  
  function toggleLoginType() {
    loginType = loginType === LoginType.MagicLink ? LoginType.EmailPassword : LoginType.MagicLink;
    const newType = loginType === LoginType.EmailPassword ? 'password' : 'magic';
    const url = new URL(window.location.href);
    url.searchParams.set('type', newType);
    window.history.pushState({}, '', url);
  }
  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      update();
      loading = false;
    };
  };

  if (form?.error !== undefined) {
    toast.error("Error sending password reset email: " + form.message);
  } else if (form?.message) {
    toast.success(form.message);
  }
</script>

<div class="flex items-center justify-center min-h-screen">
  <div class="card w-full max-w-md shadow-2xl bg-base-100">
    <div class="card-body">
      <h2 class="card-title justify-center">Login</h2>

      {#if form?.message !== undefined}
        <div class="alert alert-success shadow-lg mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4"
              />
            </svg>
            <span>{form.message}</span>
          </div>
        </div>
      {/if}

      {#if form?.error !== undefined}
        <div class="alert alert-error shadow-lg mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>{form.error}</span>
          </div>
        </div>
      {/if}

      <form method="POST" use:enhance={handleSubmit} class="space-y-4">
        <input type="hidden" name="loginType" value={loginType} />

        <!-- Email Field -->
        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            class="input input-bordered"
            placeholder="Enter your email"
            required
          />
        </div>

        {#if loginType == LoginType.EmailPassword}
          <!-- Password Field -->
          <div class="form-control">
            <label class="label" for="password">
              <span class="label-text">Password</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              class="input input-bordered"
              placeholder="Enter your password"
              required
            />
          </div>
        {/if}

        <!-- Submit Button -->
        <div class="form-control mt-6">
          <button
            type="submit"
            class={`btn btn-primary ${loading ? "loading" : ""} w-full`}
            disabled={loading}
          >
            {#if loginType === LoginType.EmailPassword}
              {loading ? "Loading..." : "Login"}
            {:else if loginType === LoginType.MagicLink}
              {loading ? "Sending Magic Link..." : "Send Magic Link"}
            {/if}
          </button>

          <button
            type="button"
            on:click={toggleLoginType}
            class="link link-primary mt-2 text-center block w-full"
          >
            {loginType === LoginType.MagicLink ? 'Login with password' : 'Login with magic link'}
          </button>
        </div>
      </form>

      <!-- Optional: Additional Links -->
      <div class="mt-4 text-center">
        <a href="/forgot-password" class="link link-primary">Forgot Password?</a
        >
      </div>
    </div>
  </div>
</div>
