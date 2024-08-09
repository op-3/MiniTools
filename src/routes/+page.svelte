<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  let searchTerm = '';
  let selectedCategory = 'All';
  $: categories = ['All', ...new Set(data.tools.map(tool => tool.category))];
  
  function handleSearch(event: Event) {
    searchTerm = (event.target as HTMLInputElement).value;
  }
  
  function handleCategoryClick(category: string) {
    selectedCategory = category;
  }
  
  $: filteredTools = data.tools.filter(tool => 
    (selectedCategory === 'All' || tool.category === selectedCategory) &&
    (tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     tool.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
</script>
  
<svelte:head>
  <title>Mini Tools - Useful Tools for Developers and Designers</title>
</svelte:head>
  
<h1 class="text-4xl font-bold text-center mb-8">Welcome to Mini Tools</h1>
  
<div class="flex flex-col md:flex-row justify-between items-center mb-8">
  <div class="form-control w-full md:w-1/3 mb-4 md:mb-0">
    <input 
      type="text" 
      placeholder="Search for a tool..." 
      class="input input-bordered w-full" 
      on:input={handleSearch}
    />
  </div>
  <div class="btn-group">
    {#each categories as category}
      <button 
        class="btn btn-sm {selectedCategory === category ? 'btn-active' : ''}" 
        on:click={() => handleCategoryClick(category)}
      >
        {category}
      </button>
    {/each}
  </div>
</div>
  
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each filteredTools as tool (tool.id)}
    <div 
      class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300" 
      in:fade={{ duration: 300 }}
    >
      <div class="card-body">
        <h2 class="card-title">
          <span class="material-icons mr-2">{tool.icon}</span>
          {tool.name}
        </h2>
        <p>{tool.description}</p>
        <div class="card-actions justify-end mt-4">
          <a href="/tools/{tool.id}" class="btn btn-primary">Use Tool</a>
        </div>
      </div>
    </div>
  {/each}
</div>
  
{#if filteredTools.length === 0}
  <p class="text-center text-xl mt-8">No tools matching your search were found.</p>
{/if}
