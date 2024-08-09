<script lang="ts">
    import { page } from '$app/stores';
    
    let isMenuOpen = false;
    
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
    </script>
    
    <header class="bg-primary text-primary-content shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <a href="/" class="text-2xl font-bold">Mini Tools</a>
          
          <button class="lg:hidden" on:click={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          <nav class="hidden lg:block">
            <ul class="flex space-x-4">
              <li><a href="/" class="hover:underline" class:underline={$page.url.pathname === '/'}>Home</a></li>

            </ul>
          </nav>
        </div>
        
        {#if isMenuOpen}
          <nav class="mt-4 lg:hidden">
            <ul class="flex flex-col space-y-2">
              <li><a href="/" class="block py-2 hover:underline" class:underline={$page.url.pathname === '/'}>Home</a></li>
            </ul>
          </nav>
        {/if}
      </div>
    </header>