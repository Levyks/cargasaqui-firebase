<script lang="ts">

    import { onSnapshot, doc } from "firebase/firestore";

    import { db } from "@/services/firebase/db";
    import { statuses } from "@/stores";

    import LoadingTableCell from "@/components/misc/LoadingTableCell.svelte";

    import type { Unsubscribe } from "firebase/firestore";
    import type { Cargo, CargoPrivate } from "@/models";

    export let cargo: Cargo;
    $: handleCargoChange(cargo);

    cargo.status.id

    let cargoPrivate: CargoPrivate;

    let unsub: Unsubscribe;

    function handleCargoChange(cargo: Cargo) {
        if(unsub) {
            unsub();
            unsub = null;
        }
        const cargoPrivateDoc = doc(db.cargoPrivate(cargo), 'extra');
        unsub = onSnapshot(cargoPrivateDoc, snapshot => {
            cargoPrivate = snapshot.data();
        });
    }

</script>

<tr class="{$statuses?.[cargo.status.id]?.rowClass}">
    <td>{ cargo.route }</td>
    <td>{ cargo.state.id }</td>
    <td>{ cargo.numberOfDeliveries }</td>
    <td>{ cargo.weightInKg.toLocaleString() } kg</td>
    <LoadingTableCell loading={!cargoPrivate}>
        { cargoPrivate.payment }
    </LoadingTableCell>
    <LoadingTableCell loading={!cargoPrivate}>
        { cargoPrivate.advancePayment }
    </LoadingTableCell>
    <LoadingTableCell loading={!cargoPrivate}>
        { cargoPrivate.driverName }
    </LoadingTableCell>
    <LoadingTableCell loading={!cargoPrivate}>
        { cargoPrivate.driverPhone }
    </LoadingTableCell>
    <LoadingTableCell loading={!cargoPrivate}>
        { cargoPrivate.note }
    </LoadingTableCell>
    <td>
        <button class="btn btn-link">
            <span class="material-symbols-outlined icon">edit</span>
        </button>
    </td>
</tr>