<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData, SubmitFunction } from "./$types.js";
  import { LoginType } from "$lib/types";
  import { toast } from "svoast";
  import { derived } from "svelte/store";
  let { form, data } = $props<{ form: ActionData; data: PageData }>();
  let loading = $state(false);

  let loginType = $state(data.loginType);

  function toggleLoginType() {
    loginType =
      loginType === LoginType.MagicLink
        ? LoginType.EmailPassword
        : LoginType.MagicLink;
    const newType =
      loginType === LoginType.EmailPassword ? "password" : "magic";
    const url = new URL(window.location.href);
    url.searchParams.set("type", newType);
    window.history.pushState({}, "", url);
  }
  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      update();
      toast.success("success fully login");
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

      <form method="POST" use:enhance action="?/login" class="space-y-4">
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

          {#if loginType === LoginType.MagicLink}
            <a
              data-sveltekit-replacestate
              href="?type=password"
              class="btn btn-primary mt-2 text-center"
            >
              Login with password
            </a>
          {:else}
            <a
              data-sveltekit-replacestate
              href="?type=magic"
              class="btn btn-secondary mt-2 text-center"
            >
              Login with magic link
            </a>
          {/if}
        </div>
      </form>

      <!-- Optional: Additional Links -->
      <div class="mt-4 text-center">
        <form method="POST" action="?/oauth">
          <input type="hidden" name="provider" value="google" />
          <button type="submit" class="btn btn-secondary mt-2 text-center">
            Login with <i class="fa-brands fa-google"></i>
          </button>
        </form>
        <form method="POST" action="?/oauth">
          <input type="hidden" name="provider" value="github" />
          <button type="submit" class="btn btn-secondary mt-2 text-center">
            Login with <i class="fa-brands fa-github"></i>
          </button>
        </form>
        <a href="/forgot-password" class="btn btn-secondary mt-2 text-center"
          >Forgot Password?</a
        >
      </div>
    </div>
  </div>
</div>
