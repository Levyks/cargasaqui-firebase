<script lang="ts">

  import { app } from '@/services/firebase';
  import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
  import { onDestroy } from 'svelte';
  
  const db = getFirestore(app);

  type State = {
    abbreviation: string;
    name: string;
    code: string;
  }

  let states: State[];

  const unsub = onSnapshot(collection(db, "states"), snapshot => {
    states = snapshot.docs.map(doc => doc.data() as State);
  });

  onDestroy(unsub);
  
</script>
  
{#if states}
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">Abbreviation</th>
        <th scope="col">Name</th>
        <th scope="col">Code</th>
      </tr>
    </thead>
    <tbody>
      {#each states as state}
        <tr>
          <td>{state.abbreviation}</td>
          <td>{state.name}</td>
          <td>{state.code}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
{/if} 