<script lang="ts">
  import { themes, theme, setTheme } from '$lib/stores/theme';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  let isOpen = false;
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  
  function selectTheme(newTheme: string) {
    setTheme(newTheme);
    isOpen = false;
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isOpen = false;
    }
  }
  </script>
  
  <svelte:window on:keydown={handleKeydown} />
  
  <div class="dropdown dropdown-end">
    <button 
      class="btn btn-ghost btn-circle"
      on:click={toggleDropdown}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    </button>
    {#if isOpen}
      <div 
        class="mt-2 dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52"
        transition:fly={{ y: -5, duration: 200, easing: cubicOut }}
      >
        <ul class="menu menu-compact">
          {#each themes as themeOption}
            <li>
              <button
                class="flex items-center justify-between p-2 hover:bg-base-300 rounded-lg transition-colors duration-200 {$theme === themeOption.value ? 'bg-primary text-primary-content' : ''}"
                on:click={() => selectTheme(themeOption.value)}
              >
                <span>{themeOption.name}</span>
                <span class="text-xl">{themeOption.icon}</span>
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>