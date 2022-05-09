<script lang="ts">

    import {  _ } from 'svelte-i18n';
    import { onDestroy } from 'svelte';
    import { onSnapshot, query, where, limit, Query, startAfter, QueryDocumentSnapshot, orderBy } from 'firebase/firestore';

    import { company } from '@/stores';

    import { db } from "@/services/firebase/db";

    import Spinner from '@/components/misc/Spinner.svelte';

    import type { Unsubscribe } from 'firebase/auth';
    import type { Cargo } from "@/models";

    const PAGE_SIZE = 25;

    type Page = {
        number: number,
        cargoes: Cargo[],
        snaps: QueryDocumentSnapshot<Cargo>[],
        unsub: Unsubscribe
    }

    let pages: Page[] = [];

    let last_page: Page;
    let last_cargo_snap: QueryDocumentSnapshot<Cargo>;

    $: last_page = pages[pages.length - 1];
    $: last_cargo_snap = last_page?.snaps?.[last_page.snaps.length - 1];

    const in_public_statuses = where('status', 'in', $company.public_statuses);

    function createPage(query: Query<Cargo>, number: number) {
        const page: Page = { number, cargoes: undefined, unsub: undefined, snaps: undefined };
        page.unsub = onSnapshot(query, snapshot => {
            pages[number].snaps = snapshot.docs;
            pages[number].cargoes = snapshot.docs.map(doc => doc.data());
        });
        pages[number] = page;
    }

    function handleLoadMore() {
        const params = [
            in_public_statuses, 
            orderBy("route"),
            limit(PAGE_SIZE),
        ]
        if(pages.length) params.push(startAfter(last_cargo_snap));
        createPage(
            query(
                db.companyCargoes($company), 
                ...params
            ),
            pages.length
        );
    }

    handleLoadMore();

    onDestroy(() => {
        pages.forEach(page => page.unsub());
    });

</script>

<div class="wrapper flex-grow-1">
    <table class="table table-hover">
        <thead class="table-primary">
            <tr>
                <th scope="col">{ $_('cargoes.columns.route') }</th>
                <th scope="col">{ $_('cargoes.columns.state') }</th>
                <th scope="col">{ $_('cargoes.columns.numberOfDeliveries') }</th>
                <th scope="col">{ $_('cargoes.columns.weightInKg') }</th>
            </tr>
        </thead>
        <tbody>
            {#each pages as page (page.number)}
                {#if !page.cargoes}
                    <tr>
                        <td colspan="4" class="text-center">
                            <Spinner size={3}/>
                        </td>  
                    </tr> 
                {:else}
                    {#each page.cargoes as cargo}
                        <tr>
                            <td>{ cargo.route }</td>
                            <td>{ cargo.state.id }</td>
                            <td>{ cargo.numberOfDeliveries }</td>
                            <td>{ cargo.weightInKg.toLocaleString() } kg</td>
                        </tr>
                    {/each}
                {/if}
            {:else}
                <tr>
                    <td colspan="4" class="text-center">{ $_('misc.noResults') }</td>  
                </tr>
            {/each}
            {#if last_page?.snaps?.length === PAGE_SIZE}
                <tr>
                    <td colspan="4" class="text-center">
                        <button class="btn btn-link" on:click={handleLoadMore}>Load more</button>
                    </td>  
                </tr> 
            {/if}
        </tbody>
    </table>
</div>

<style lang="scss">
    .wrapper {
        overflow-y: auto;
    }
</style>