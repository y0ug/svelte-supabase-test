<script lang="ts">
  import "../app.css";
  import { invalidate } from "$app/navigation";
  import { onMount, type Snippet } from "svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import type { LayoutData } from "./$types";
  import { Toasts } from "svoast";
  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let { supabase, session, profile } = data;
  let user = session?.user;

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
      if (event == "PASSWORD_RECOVERY") {
        console.log("Password recovery ");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<svelte:head>
  <title>User Management</title>
</svelte:head>

<Navbar {user} {profile} />
<Toasts />
<div class="container">{@render children()}</div>
