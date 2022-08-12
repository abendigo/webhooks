<script context="module">
  // export async function load({url, params, props, fetch, session, stuff, status, error}) {
  //   console.log("hooks/index load", { params, props, fetch, session, stuff, status, error });
  //   return {};
  // }
</script>

<script lang="ts">
  export let hooks: any[];

  console.log("hooks/index render", { hooks })
</script>

<h2>Hooks</h2>
{#each hooks as hook}
  <div>
    {hook.active}
    {hook.config?.url}
  </div>
{/each}


<form method="post" action="">

</form>
