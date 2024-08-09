<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  onMount(() => {
    if (browser) {
      const savedTheme = localStorage.getItem('theme') || 'light';
      theme.set(savedTheme);
    }
  });
  
  $: if (browser) {
    document.documentElement.setAttribute('data-theme', $theme);
  }
  </script>
  
  <div class="app" data-theme={$theme}>
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
 
  </div>
  
  <style>
    .app {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main {
      flex: 1;
    }
  </style>