<template>
  <div class="flex flex-col gap-7.5 px-7.5 py-5">
    <div>
      <p class="mb-1.5 font-semibold">Household ID:</p>
      <p>45062</p>
    </div>

    <div>
      <p class="mb-1.5 font-semibold">Location:</p>
      <p>Copenhagen, Denmark</p>
    </div>

    <div>
      <p class="mb-1.5 font-semibold">Documents:</p>
      <div class="flex items-center gap-2">
        <FileIcon />
        <p class="font-xsm">Copenhagen, Denmark</p>
      </div>
    </div>

    <div>
      <p class="mb-1.5 font-semibold">Average monthly spending:</p>
      <div class="flex gap-10">
        <HouseholdStatistics />

        <div>
          <div class="flex items-center justify-between">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FileIcon from '@/components/basic/icons/FileIcon.vue';
import HouseholdStatistics from '@/components/parts/offers/offer-sidebar/HouseholdStatistics.vue';
</script>
