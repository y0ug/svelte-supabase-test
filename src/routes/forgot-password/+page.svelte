<script lang="ts">
  import type { PageData } from "./$types";
  import { toast } from "svoast";

  let { data }: { data: PageData } = $props();
  let supabase = data.supabase;
  const reset = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const email = form.get("email") as string;
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      toast.error("Error sending password reset email: " + error.message);
    } else {
      toast.success("Password reset email sent successfully");
    }
  };
</script>

<div
  class="flex flex-col gap-6 rounded-box bg-base-200 p-6 max-w-md text-center"
>
  <h1 class="text-2xl font-bold">Forgot password?</h1>

  <form method="POST" onsubmit={reset}>
    <span>
      Remember your password?
      <a href="/login" class="link link-secondary">Log in here</a>
    </span>

    <label class="form-control">
      <div class="label">
        <span class="label-text">Email</span>
      </div>

      <input type="email" name="email" class="input input-bordered" />
    </label>

    <button type="submit" class="btn btn-primary">Reset password</button>
  </form>
</div>
