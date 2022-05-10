<script lang="ts">

    import {  _ } from 'svelte-i18n';
    import { where, orderBy, QueryConstraint } from 'firebase/firestore';

    import { company } from '@/stores';

    import CargoesTableBody from './CargoesTableBody.svelte';

    let contraints: QueryConstraint[] = [
        where('status', 'in', $company.public_statuses),
        orderBy("route"),
    ]

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
        <CargoesTableBody {contraints} colspan={4} let:cargo>
            <tr>
                <td>{ cargo.route }</td>
                <td>{ cargo.state.id }</td>
                <td>{ cargo.numberOfDeliveries }</td>
                <td>{ cargo.weightInKg.toLocaleString() } kg</td>
            </tr>
        </CargoesTableBody>
    </table>
</div>

<style lang="scss">
    .wrapper {
        overflow-y: auto;
    }
</style>