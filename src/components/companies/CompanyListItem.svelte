<script lang="ts">

  import { _ } from "svelte-i18n";
  import { Link } from "svelte-routing";

  import { company as companyStore } from "@/stores";
  import { routes } from "@/services/router";
  import type { Company } from "@/models";

  import CompanyLogo from "./CompanyLogo.svelte";

  export let company: Company;

  function handleClick() {
    companyStore.set(company);
  }

</script>

<li class="list-group-item">
  <Link to={routes.company.getPath(company)} on:click={handleClick} class="d-flex align-items-center h-100">
    <div class="logo-wrapper">
      <CompanyLogo {company}/>
    </div>
    <h5 class="ms-2 m-0">{company.name}</h5>
  </Link>
</li>

<style lang="scss">

  li {
    height: 4rem;
  }

  .logo-wrapper {
    max-width: 12rem;
  }

</style>