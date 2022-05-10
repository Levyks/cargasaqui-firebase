<script lang="ts">

    import {  _ } from 'svelte-i18n';
    import { where, orderBy, QueryConstraint } from 'firebase/firestore';

    import { company } from '@/stores';

    import CargoesTableBody from './CargoesTableBody.svelte';
    import InternalCargoesTableRow from './InternalCargoesTableRow.svelte';

    let contraints: QueryConstraint[] = [
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
                <th scope="col">{ $_('cargoes.columns.payment') }</th>
                <th scope="col">{ $_('cargoes.columns.advancePayment') }</th>
                <th scope="col">{ $_('cargoes.columns.driverName') }</th>
                <th scope="col">{ $_('cargoes.columns.driverPhone') }</th>
                <th scope="col">{ $_('cargoes.columns.note') }</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <CargoesTableBody {contraints} colspan={10} let:cargo>
            <InternalCargoesTableRow {cargo} />
        </CargoesTableBody>
    </table>
</div>

<style lang="scss">
    .wrapper {
        overflow-y: auto;
    }
</style>