<script lang="ts">

    import {  _ } from "svelte-i18n";
    import { onDestroy } from "svelte";
    import { limit, onSnapshot, query, startAfter } from "firebase/firestore";

    import { db } from "@/services/firebase/db";
    import { company } from '@/stores';

    import Spinner from '@/components/misc/Spinner.svelte';

    import type { QueryConstraint, QueryDocumentSnapshot, Query } from "firebase/firestore";
    import type { Cargo } from "@/models";
    import type { Page } from "@/typings";

    export let contraints: QueryConstraint[] ;
    export let pageSize: number = 25;
    export let colspan: number;

    let pages: Page<Cargo>[] = [];

    let last_page: Page<Cargo>;
    let last_cargo_snap: QueryDocumentSnapshot<Cargo>;

    $: last_page = pages[pages.length - 1];
    $: last_cargo_snap = last_page?.snaps?.[last_page.snaps.length - 1];

    function createPage(query: Query<Cargo>, number: number) {
        pages[number] = {
            number,
            unsub: onSnapshot(query, snapshot => {
                pages[number].snaps = snapshot.docs;
                pages[number].items = snapshot.docs.map(doc => doc.data());
            })
        }
    }

    function handleLoadMore() {
        const params = [...contraints, limit(pageSize)];
        if(last_cargo_snap) params.push(startAfter(last_cargo_snap));
        createPage(query(db.companyCargoes($company), ...params), pages.length);
    }

    handleLoadMore();

    onDestroy(() => {
        pages.forEach(page => page?.unsub());
    });

</script>

<tbody>
    {#each pages as page (page.number)}
        {#if page.items}
            {#each page.items as cargo}
                <slot {cargo}/> 
            {/each}
            {#if !page.items.length && page.number === 0}
                <tr>
                    <td {colspan} class="text-center">{ $_('misc.noResults') }</td>  
                </tr>
            {/if}
        {:else}
            <tr>
                <td {colspan} class="text-center">
                    <Spinner/>
                </td>  
            </tr> 
        {/if}
    {/each}
    {#if last_page?.snaps?.length === pageSize}
        <tr>
            <td {colspan} class="text-center">
                <button class="btn btn-link" on:click={handleLoadMore}>{ $_('misc.loadMore') }</button>
            </td>  
        </tr> 
    {/if}
</tbody>