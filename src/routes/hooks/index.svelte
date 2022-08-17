<script context="module">
  // export async function load({url, params, props, fetch, session, stuff, status, error}) {
  //   console.log("hooks/index load", { params, props, fetch, session, stuff, status, error });
  //   return {};
  // }
</script>

<script lang="ts">
  export let hooks: any[];

  // console.log("hooks/index render", { hooks })
</script>

<h2>Hooks</h2>
{#each hooks as hook}
  <div>
    {hook.active}
    {hook.config?.url}
    <form method="post" action="?_method=PUT">
      <button>Update</button>
    </form>
    <!-- <form method="post" action="./hooks/{hook.id}?_method=DELETE"> -->
    <form method="post" action="?_method=DELETE">
      <input type="hidden" name="id" value={hook.id} /><button
        type="submit"
        formaction="?_method=DELETE">Delete</button
      >
    </form>
  </div>
{/each}

<form method="post">
  <label for="url">URL</label>
  <input type="text" id="url" name="url" />
  <label for="secret">Secret</label>
  <input type="text" id="secret" name="secret" />
  <button type="submit">Create</button>
</form>
