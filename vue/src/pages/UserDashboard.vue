<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <div class="container">
      <FilterGroup />
      <section>
        <h1>Stats</h1>
        <div class="ph_boxes stats">
          <!-- <div v-for="i in 3" :key='i'><span :class='i'></span></div> -->
          <div class="card stats-rating">
            <div class="card-top">
              <div class="stats-title">
                Your rating
              </div>
              <div class="rating">
                4.3
                <div class="stars">
                  <span class="icon-filled material-symbols-rounded">star</span>
                  <span class="icon-filled material-symbols-rounded">star</span>
                  <span class="icon-filled material-symbols-rounded">star</span>
                  <span class="icon-filled material-symbols-rounded">star</span>
                  <span class="icon-filled material-symbols-rounded">star</span>
                </div>
              </div>
            </div>
            <div class="card-bottom">
              Read reviews →
            </div>
          </div>
          <div class="card stats-deals-won">
            <div class="stats-title">
              Deals won
            </div>
            <ChartDealsWon />
          </div>
          <div class="card stats-deal-size">
            <div class="stats-title">
              <div>
                Average deal size
              </div>
            </div>
            <div class="stats-deal-size-number">
              1,292€
            </div>
          </div>
        </div>
      </section>
      <div class="cards_lg">
        <!-- <div v-for="i in 2" :key='i'><span :class='i'></span></div> -->
        <div class="card_lg green">
          <div class="ph_pills">
            <div class="ph_pill active">Open</div>
            <div class="ph_pill">Won</div>
            <div class="ph_pill">Lost</div>
          </div>
          <div class="card_lg-content">
            <div class="card_lg-content-left">
              <div>Open offers:</div>
              <div class="mt4 large">141</div>
            </div>
            <div class="card_lg-content-right">
              <svg width="181" height="197" viewBox="0 0 181 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M85.9845 31.66C85.9841 29.6286 87.6316 27.9727 89.6609 28.0656C106.12 28.8193 121.98 34.6408 135.044 44.7786C149.079 55.6694 159.09 70.922 163.498 88.1313C167.906 105.341 166.461 123.528 159.39 139.825C152.318 156.122 140.024 169.601 124.445 178.139C108.866 186.676 90.8884 189.784 73.3471 186.975C55.8058 184.165 39.6987 175.597 27.5656 162.621C15.4324 149.645 7.96342 132.999 6.33635 115.309C4.82179 98.8419 8.44934 82.3417 16.6712 68.063C17.6849 66.3026 19.9672 65.805 21.6791 66.8985L35.7057 75.8576C37.4177 76.9511 37.9075 79.2202 36.9287 81.0002C31.5561 90.7709 29.2091 101.952 30.2355 113.111C31.3744 125.494 36.6027 137.146 45.0959 146.229C53.5891 155.312 64.8641 161.31 77.143 163.277C89.4219 165.244 102.006 163.067 112.912 157.091C123.817 151.115 132.423 141.68 137.373 130.272C142.322 118.864 143.334 106.133 140.249 94.0864C137.163 82.0399 130.156 71.3631 120.331 63.7395C111.478 56.8696 100.791 52.8312 89.6643 52.1018C87.6373 51.9689 85.9883 50.335 85.9879 48.3036L85.9845 31.66Z" fill="#00FFC1" stroke="#00C6C6" stroke-width="2.70992" />
                <path opacity="0.6" d="M21.72 66.834C20.0091 65.7388 19.5032 63.4583 20.6758 61.7996C31.2605 46.8266 46.6738 35.9414 64.3245 30.9739C66.28 30.4236 68.2599 31.6631 68.7199 33.6417L72.4881 49.8532C72.9481 51.8318 71.712 53.7969 69.7678 54.3856C58.2072 57.8864 48.0845 65.0353 40.9189 74.7593C39.7138 76.3947 37.4485 76.9024 35.7376 75.8072L21.72 66.834Z" fill="#00FFC1" stroke="#00C6C6" stroke-width="2.70992" />
                <path opacity="0.4" d="M68.7941 33.6245C68.3362 31.6454 69.5682 29.661 71.5663 29.2945C75.0835 28.6494 78.64 28.2408 82.2118 28.0715C84.2409 27.9753 85.8909 29.6286 85.8937 31.66L85.9168 48.3036C85.9196 50.335 84.2734 51.9715 82.2466 52.1076C80.4837 52.226 78.7273 52.4278 76.9835 52.7123C74.9786 53.0394 73.0041 51.8189 72.5462 49.8398L68.7941 33.6245Z" fill="#00FFC1" stroke="#00C6C6" stroke-width="2.70992" />
                <path d="M142.868 193.204C146.115 193.204 148.835 190.433 148.835 187.152C148.835 183.871 146.115 181.117 142.868 181.117C139.638 181.117 136.884 183.871 136.884 187.152C136.884 190.433 139.638 193.204 142.868 193.204ZM142.868 191.98C140.352 191.98 138.227 189.77 138.227 187.152C138.227 184.551 140.352 182.341 142.868 182.341C145.384 182.341 147.492 184.551 147.492 187.152C147.492 189.77 145.384 191.98 142.868 191.98ZM155.595 184.007C154.184 184.007 153.062 184.704 152.399 185.86V184.211H151.124V195.924H152.399V191.351C153.062 192.507 154.184 193.204 155.595 193.204C157.907 193.204 159.641 191.3 159.641 188.597C159.641 185.911 157.907 184.007 155.595 184.007ZM155.357 192.065C153.623 192.065 152.399 190.62 152.399 188.597C152.399 186.574 153.623 185.146 155.357 185.146C157.074 185.146 158.298 186.574 158.298 188.597C158.298 190.62 157.074 192.065 155.357 192.065ZM165.807 192.065C164.073 192.065 162.866 190.807 162.679 189.09H169.87C169.87 186.013 168.357 184.007 165.705 184.007C163.342 184.007 161.37 185.962 161.37 188.58C161.37 191.283 163.478 193.204 165.824 193.204C167.048 193.204 168.595 192.677 169.36 191.844L168.578 191.011C168.034 191.606 166.844 192.065 165.807 192.065ZM165.756 185.146C167.507 185.146 168.442 186.37 168.612 187.951H162.696C162.934 186.251 164.192 185.146 165.756 185.146ZM176.138 184.007C174.897 184.007 173.758 184.687 173.248 185.622V184.211H171.973V193H173.248V187.407C173.248 186.183 174.489 185.146 175.968 185.146C177.26 185.146 178.161 186.149 178.161 187.577V193H179.436V187.407C179.436 185.418 178.076 184.007 176.138 184.007Z" fill="white" />
                <path d="M2.482 32.742V22.321H1.156V34H8.857V32.742H2.482ZM14.8017 34.204C17.2667 34.204 19.3407 32.096 19.3407 29.597C19.3407 27.098 17.2667 25.007 14.8017 25.007C12.3367 25.007 10.2457 27.098 10.2457 29.597C10.2457 32.096 12.3367 34.204 14.8017 34.204ZM14.8017 33.065C13.0507 33.065 11.5887 31.484 11.5887 29.597C11.5887 27.727 13.0507 26.146 14.8017 26.146C16.5357 26.146 17.9977 27.727 17.9977 29.597C17.9977 31.484 16.5357 33.065 14.8017 33.065ZM24.5573 34.204C26.3763 34.204 27.7703 33.167 27.7703 31.552C27.7703 29.886 26.3083 29.41 24.8973 28.968C23.2653 28.441 22.6193 28.203 22.6193 27.438C22.6193 26.588 23.4353 26.146 24.4213 26.146C25.2033 26.146 26.0703 26.418 26.9543 26.979L27.5663 25.993C26.6313 25.381 25.5093 25.007 24.4213 25.007C22.6703 25.007 21.3443 25.993 21.3443 27.591C21.3443 28.849 22.1603 29.478 24.2853 30.09C25.4753 30.43 26.4953 30.736 26.4953 31.688C26.4953 32.521 25.7133 33.065 24.5573 33.065C23.5883 33.065 22.5853 32.691 21.5823 31.96L20.9193 32.895C21.9733 33.745 23.3333 34.204 24.5573 34.204ZM33.7389 32.708C33.5519 32.912 33.2119 33.065 32.8209 33.065C32.3109 33.065 31.8689 32.606 31.8689 31.96V26.35H34.0279V25.211H31.8689V22.797H30.5939V25.211H29.2169V26.35H30.5939V31.96C30.5939 33.269 31.4779 34.204 32.7359 34.204C33.3309 34.204 33.9089 34 34.3679 33.643L33.7389 32.708Z" fill="white" />
                <path d="M55.624 15H56.933L60.197 5.055L63.444 15H64.753L68.748 3.321H67.252L64.022 12.773L60.928 3.321H59.449L56.355 12.773L53.125 3.321H51.629L55.624 15ZM73.8202 15.204C76.2852 15.204 78.3592 13.096 78.3592 10.597C78.3592 8.098 76.2852 6.007 73.8202 6.007C71.3552 6.007 69.2642 8.098 69.2642 10.597C69.2642 13.096 71.3552 15.204 73.8202 15.204ZM73.8202 14.065C72.0692 14.065 70.6072 12.484 70.6072 10.597C70.6072 8.727 72.0692 7.146 73.8202 7.146C75.5542 7.146 77.0162 8.727 77.0162 10.597C77.0162 12.484 75.5542 14.065 73.8202 14.065ZM84.6469 6.007C83.4059 6.007 82.2669 6.687 81.7569 7.622V6.211H80.4819V15H81.7569V9.407C81.7569 8.183 82.9979 7.146 84.4769 7.146C85.7689 7.146 86.6699 8.149 86.6699 9.577V15H87.9449V9.407C87.9449 7.418 86.5849 6.007 84.6469 6.007Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>
        <div class="card_lg blue">
          <div class="ph_pills">
            <div class="ph_pill active">Open</div>
            <div class="ph_pill">Won</div>
            <div class="ph_pill">Lost</div>
          </div>
          <div class="card_lg-content">
            <div class="card_lg-content-left">
              <div>Value of open offers:</div>
              <div class="mt4"><span class="large">210,543€</span> / mth</div>
            </div>
            <div class="card_lg-content-right">
              <svg width="181" height="197" viewBox="0 0 181 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M85.9845 31.66C85.9841 29.6286 87.6316 27.9727 89.6609 28.0656C106.12 28.8193 121.98 34.6408 135.044 44.7786C149.079 55.6694 159.09 70.922 163.498 88.1313C167.906 105.341 166.461 123.528 159.39 139.825C152.318 156.122 140.024 169.601 124.445 178.139C108.866 186.676 90.8884 189.784 73.3471 186.975C55.8058 184.165 39.6987 175.597 27.5656 162.621C15.4324 149.645 7.96342 132.999 6.33635 115.309C4.82179 98.8419 8.44934 82.3417 16.6712 68.063C17.6849 66.3026 19.9672 65.805 21.6791 66.8985L35.7057 75.8576C37.4177 76.9511 37.9075 79.2202 36.9287 81.0002C31.5561 90.7709 29.2091 101.952 30.2355 113.111C31.3744 125.494 36.6027 137.146 45.0959 146.229C53.5891 155.312 64.8641 161.31 77.143 163.277C89.4219 165.244 102.006 163.067 112.912 157.091C123.817 151.115 132.423 141.68 137.373 130.272C142.322 118.864 143.334 106.133 140.249 94.0864C137.163 82.0399 130.156 71.3631 120.331 63.7395C111.478 56.8696 100.791 52.8312 89.6643 52.1018C87.6373 51.9689 85.9883 50.335 85.9879 48.3036L85.9845 31.66Z" fill="#00F0FF" stroke="#019CCD" stroke-width="2.70992" />
                <path opacity="0.6" d="M21.72 66.834C20.0091 65.7388 19.5032 63.4583 20.6758 61.7996C31.2605 46.8266 46.6738 35.9414 64.3245 30.9739C66.28 30.4236 68.2599 31.6631 68.7199 33.6417L72.4881 49.8532C72.9481 51.8318 71.712 53.7969 69.7678 54.3856C58.2072 57.8864 48.0845 65.0353 40.9189 74.7593C39.7138 76.3947 37.4485 76.9024 35.7376 75.8072L21.72 66.834Z" fill="#00F0FF" stroke="#019CCD" stroke-width="2.70992" />
                <path opacity="0.4" d="M68.7941 33.6245C68.3362 31.6454 69.5682 29.661 71.5663 29.2945C75.0835 28.6494 78.64 28.2408 82.2118 28.0715C84.2409 27.9753 85.8909 29.6286 85.8937 31.66L85.9168 48.3036C85.9196 50.335 84.2734 51.9715 82.2466 52.1076C80.4837 52.226 78.7273 52.4278 76.9835 52.7123C74.9786 53.0394 73.0041 51.8189 72.5462 49.8398L68.7941 33.6245Z" fill="#00F0FF" stroke="#019CCD" stroke-width="2.70992" />
                <path d="M142.868 193.204C146.115 193.204 148.835 190.433 148.835 187.152C148.835 183.871 146.115 181.117 142.868 181.117C139.638 181.117 136.884 183.871 136.884 187.152C136.884 190.433 139.638 193.204 142.868 193.204ZM142.868 191.98C140.352 191.98 138.227 189.77 138.227 187.152C138.227 184.551 140.352 182.341 142.868 182.341C145.384 182.341 147.492 184.551 147.492 187.152C147.492 189.77 145.384 191.98 142.868 191.98ZM155.595 184.007C154.184 184.007 153.062 184.704 152.399 185.86V184.211H151.124V195.924H152.399V191.351C153.062 192.507 154.184 193.204 155.595 193.204C157.907 193.204 159.641 191.3 159.641 188.597C159.641 185.911 157.907 184.007 155.595 184.007ZM155.357 192.065C153.623 192.065 152.399 190.62 152.399 188.597C152.399 186.574 153.623 185.146 155.357 185.146C157.074 185.146 158.298 186.574 158.298 188.597C158.298 190.62 157.074 192.065 155.357 192.065ZM165.807 192.065C164.073 192.065 162.866 190.807 162.679 189.09H169.87C169.87 186.013 168.357 184.007 165.705 184.007C163.342 184.007 161.37 185.962 161.37 188.58C161.37 191.283 163.478 193.204 165.824 193.204C167.048 193.204 168.595 192.677 169.36 191.844L168.578 191.011C168.034 191.606 166.844 192.065 165.807 192.065ZM165.756 185.146C167.507 185.146 168.442 186.37 168.612 187.951H162.696C162.934 186.251 164.192 185.146 165.756 185.146ZM176.138 184.007C174.897 184.007 173.758 184.687 173.248 185.622V184.211H171.973V193H173.248V187.407C173.248 186.183 174.489 185.146 175.968 185.146C177.26 185.146 178.161 186.149 178.161 187.577V193H179.436V187.407C179.436 185.418 178.076 184.007 176.138 184.007Z" fill="white" />
                <path d="M2.482 32.742V22.321H1.156V34H8.857V32.742H2.482ZM14.8017 34.204C17.2667 34.204 19.3407 32.096 19.3407 29.597C19.3407 27.098 17.2667 25.007 14.8017 25.007C12.3367 25.007 10.2457 27.098 10.2457 29.597C10.2457 32.096 12.3367 34.204 14.8017 34.204ZM14.8017 33.065C13.0507 33.065 11.5887 31.484 11.5887 29.597C11.5887 27.727 13.0507 26.146 14.8017 26.146C16.5357 26.146 17.9977 27.727 17.9977 29.597C17.9977 31.484 16.5357 33.065 14.8017 33.065ZM24.5573 34.204C26.3763 34.204 27.7703 33.167 27.7703 31.552C27.7703 29.886 26.3083 29.41 24.8973 28.968C23.2653 28.441 22.6193 28.203 22.6193 27.438C22.6193 26.588 23.4353 26.146 24.4213 26.146C25.2033 26.146 26.0703 26.418 26.9543 26.979L27.5663 25.993C26.6313 25.381 25.5093 25.007 24.4213 25.007C22.6703 25.007 21.3443 25.993 21.3443 27.591C21.3443 28.849 22.1603 29.478 24.2853 30.09C25.4753 30.43 26.4953 30.736 26.4953 31.688C26.4953 32.521 25.7133 33.065 24.5573 33.065C23.5883 33.065 22.5853 32.691 21.5823 31.96L20.9193 32.895C21.9733 33.745 23.3333 34.204 24.5573 34.204ZM33.7389 32.708C33.5519 32.912 33.2119 33.065 32.8209 33.065C32.3109 33.065 31.8689 32.606 31.8689 31.96V26.35H34.0279V25.211H31.8689V22.797H30.5939V25.211H29.2169V26.35H30.5939V31.96C30.5939 33.269 31.4779 34.204 32.7359 34.204C33.3309 34.204 33.9089 34 34.3679 33.643L33.7389 32.708Z" fill="white" />
                <path d="M55.624 15H56.933L60.197 5.055L63.444 15H64.753L68.748 3.321H67.252L64.022 12.773L60.928 3.321H59.449L56.355 12.773L53.125 3.321H51.629L55.624 15ZM73.8202 15.204C76.2852 15.204 78.3592 13.096 78.3592 10.597C78.3592 8.098 76.2852 6.007 73.8202 6.007C71.3552 6.007 69.2642 8.098 69.2642 10.597C69.2642 13.096 71.3552 15.204 73.8202 15.204ZM73.8202 14.065C72.0692 14.065 70.6072 12.484 70.6072 10.597C70.6072 8.727 72.0692 7.146 73.8202 7.146C75.5542 7.146 77.0162 8.727 77.0162 10.597C77.0162 12.484 75.5542 14.065 73.8202 14.065ZM84.6469 6.007C83.4059 6.007 82.2669 6.687 81.7569 7.622V6.211H80.4819V15H81.7569V9.407C81.7569 8.183 82.9979 7.146 84.4769 7.146C85.7689 7.146 86.6699 8.149 86.6699 9.577V15H87.9449V9.407C87.9449 7.418 86.5849 6.007 84.6469 6.007Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="mt8 table-titlebar">
        <h1 class="table-titlebar-title">Opportunities</h1>
        <button @click="openFilters"><span class="material-symbols-outlined">tune</span>Filter</button>
      </div>
      <div class="table">
        <div class="table-header">
          <div class="table-header-check">
            <label class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="selectAll" id="mortgage" />
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="table-header-content">
            <div class="table-header-content-sm">Match</div>
            <div class="table-header-content-med">User ID</div>
            <div class="table-header-content-lg">Services</div>
            <div class="table-header-content-sm">Value</div>
            <div class="table-header-content-sm last"></div>
          </div>
        </div>
        <div class="table-rows">
          <div v-for="(lead, index) in leads" :key="index" class="table-row">
            <div class="table-row-check">
              <label class=" checkbox-label nolabel">
                <input v-show="false" class="checkbox" v-model="lead.selected" type="checkbox" id="mortgage" />
                <span class="checkmark"></span>
              </label>

            </div>
            <div @click="openLead(lead._id)" class="table-row-content">
              <div class="table-row-content-sm">
                <div class="donut">
                  <Doughnut class='chart' id="my-chart-id" :options="chartOptions" :data="chartData" />
                  {{ lead.match }}%
                </div>
              </div>
              <div class="table-row-content-med">
                {{ lead.userId }}
              </div>
              <div class="access_icons table-row-content-lg">
                <span :class="lead.access.mortgage.status ? 'active' : ''" class="material-symbols-outlined">house</span>
                <span :class="lead.access.insurance.status ? 'active' : ''" class="material-symbols-outlined">verified_user</span>
                <span :class="lead.access.banking.status ? 'active' : ''" class="material-symbols-outlined">credit_card</span>
                <span :class="lead.access.broadband.status ? 'active' : ''" class="material-symbols-outlined">language</span>
                <span :class="lead.access.mobile.status ? 'active' : ''" class="material-symbols-outlined">smartphone</span>
                <span :class="lead.access.utilities.status ? 'active' : ''" class="material-symbols-outlined">lightbulb</span>
                <span :class="lead.access.auto.status ? 'active' : ''" class="material-symbols-outlined">directions_car</span>
              </div>
              <div class="table-row-content-sm">
                {{ lead.value }} €
              </div>
              <div class="table-row-content-sm last">
                <span class="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <div class="pagination-back active" @click="pg_back">
          <span class="material-symbols-outlined">chevron_left</span>
        </div>
        <div v-for="page in pg.pageCount" :key="page" @click="gotoPage(page)" :class="page === pg.currentPage ? 'active' : ''">{{ page }}</div>

        <div class="pagination-forward active" @click="pg_forward">
          <span class="material-symbols-outlined">chevron_right</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import FilterGroup from '../components/ui/FilterGroup.vue';
import ChartDealsWon from '../components/ui/ChartDealsWon.vue';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip)


export default {
  components: {
    ModalWindow,
    FilterGroup,
    ChartDealsWon,
    Doughnut
  },
  watch: {
    selectAll(val) {
      for (let lead of this.leads) {
        lead.selected = val
      }
    },
    leads: {
      deep: true,
      handler() {
        // this.pg.pageCount = Math.ceil(this.leads.length / this.pg.limit)
        // console.log(this.leads.length)
        // console.log(this.pg.limit)
        // console.log('this.pageCount')
        // console.log(this.pg.pageCount)
        let checked = false
        let unchecked = false
        for (let lead of this.leads) {
          checked = lead.selected ? true : checked
          unchecked = !lead.selected ? true : unchecked
        }
        if (checked && !unchecked) { this.selectAll = true }
        if (unchecked && !checked) { this.selectAll = false }
        if (unchecked && checked) { console.log('partial') }

        // if (checked) { selectAll = true }
        // console.log('it was clicked')
      }
    },
    'pg.currentPage': {
      deep: true,
      async handler(page) {
        // let page = this.pg.currentPage
        let limit = this.pg.limit
        let skip = (page - 1) * limit
        let response = await this.$api.getLeads({ limit: limit, skip: skip })
        this.leads = response.leads
        // this.pg.pageCount = Math.ceil(response.count / limit)
      }
    },
  },
  data() {
    return {
      modalComponent: null,
      screen: 'UserTable',
      selectAll: false,
      leads: [],
      count: 0,
      chartData: {
        datasets: [
          {
            data: [77, 23]
          },
        ]
      },
      pg: {
        currentPage: 1,
        limit: 10,
        pageCount: 0
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: ['#00C6C6', '#fafafa'],
        borderWidth: 0,
        borderJoinStyle: 'round',
        borderAlign: 'inner',
        // offset: 60,
        cutout: '85%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    // pageCount() {
    //   let number = Math.ceil(this.leads.length / this.pg.limit);
    //   return number
    // }
  },
  methods: {
    pg_back() {
      let p = this.pg.currentPage
      this.pg.currentPage = p > 1 ? p - 1 : p
    },
    pg_forward() {
      // this.pg.currentPage++
      console.log(this.pg.pageCount)
      console.log(this.pg.currentPage)
      let p = this.pg.currentPage
      this.pg.currentPage = p < this.pg.pageCount ? p + 1 : p
    },
    openFilters() {
      console.log('openFilters')
      this.$store.dispatch('openMenu')
    },
    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },
    changePage(page) {
      this.screen = page
    },
    gotoPage(page) {
      this.pg.currentPage = page
    },
    openLead(id) {
      // console.log(`openLead: ${id}`)
      let leads = []
      leads.push(id)
      this.$store.dispatch('setSelectedLeads', [id])
      this.$router.push({ path: `/offer` })
    }
  },
  async mounted() {
    console.log(this.$api)
    let response = await this.$api.getLeads({ limit: this.pg.limit, skip: 0 })
    this.leads = response.leads
    this.pg.pageCount = Math.ceil(response.count / this.pg.limit)
    console.log('this.pg.pageCount')
    console.log(this.pg.pageCount)
    console.log(response.count)
    console.log(this.pg.limit)
  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/styles.sass"

.pagination
  display: flex
  gap: 6px
  div
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
    min-width: 30px
    min-height: 30px
    border-radius: 6px
    background: #eee
    color: #aaa
    &.active
      background: $primary
      color: white

.donut
  width: 40px
  height: 40px  
  display: flex
  justify-content: center
  align-items: center
  font-size: 11px
  color: #999
  .chart
    width: 40px
    height: 40px  
    position: absolute 
h1
  color: #666
.main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start
  background-color: #f1f1f1
  min-height: 100vh
  padding: 120px 20px 60px 20px
  top: 80px
section
  display: flex
  flex-direction: column
  gap:0px
.container
  width:100%
  max-width:900px
  display: flex
  flex-direction: column
  gap: 20px

  .ph_pills
    height: 20px
    display: flex
    flex-direction: row
    // justify-content: center
    align-items: center
    gap: 6px
    .ph_pill
      flex: 0
      justify-content: center
      align-items: center
      padding: 2px 8px
      background-color: rgba(255,255,255,.3)
      color: rgba(0,0,0,.3)
      width: auto
      height: auto
      border-radius: 20px
      &.active
        background-color: rgba(255,255,255,1)
        color: #546E7A

  .table-titlebar
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center

    button
      background-color: #00C6C6
      border-radius: 25px
      color: white
      border: 0

  // .ph_boxes
  //     display: flex
  //     flex-direction: row
  //     gap: 16px
  //     div
  //       flex:1
  //       background-color: white
  //       // width: 100px
  //       height: 100px
  //       border-radius: 10px
  .stats
    display: flex
    flex-direction: row
    gap: 20px
    .card
      flex:1
      display: flex
      flex-direction: column
      justify-content: space-between
      background-color: white
      padding: 16px
      // width: 100px
      min-height: 120px
      border-radius: 10px

      &-top
        display: flex
        flex-direction: column
        gap: 4px

      &-bottom
        color: #aaa
      

      .rating
        display: flex
        align-items: center
        font-size: 20px
        color: #666
        gap: 6px
        .stars
          display: flex
          align-items: center
          color: #00C6C6
          span
            width:20px
            heith:20px
    &-title
      font-size: 1.2em
      color:#aaa
    
    &-deals-won,
    &-deal-size
      padding: 0
      justify-content: flex-start !important
      gap: 16px
      &-number
        font-size: 1.8em 
        color: #666       
        
  .cards_lg
    display: flex
    flex-direction: row
    flex-wrap: wrap
    gap: 16px
  .card_lg
    display: flex
    flex-direction: column
    flex:1
    gap: 16px
    min-height: 200px   
    border-radius: 10px
    padding: 20px
    padding: 20px
    color: white
    
    &.green
      background-color: #00C6C6
    &.blue
      background-color: #019CCD
    &-content
      flex: 1
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      font-size: 1.2em
      .large
        font-size: 1.8em
  .ph_header
    display: flex
    background-color: #ccc
    height: 40px
    width: 100%
    border-radius: 10px

  .ph_table
    display: flex
    background-color: #eee
    height: 400px
    width: 100%
    border-radius: 10px

.ph_boxes
  display: flex
  flex-direction: row
  gap: 6px
  .ph_box
    background-color: #eee
    width: 100px
    height: 30px
    border-radius: 20px    
.checkbox-group
  flex-direction: row
  flex-wrap: wrap
  width:400px
  label
    width:160px
pre
  color: black

.table
  display: flex
  flex-direction: column
  gap: 20px
  color: #666
  &-rows
    background-color: white
    border-radius:10px
  &-row 
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px
    cursor: pointer
    &:hover
      background: #fafafa
      transition: all .2s
  &-header
    background-color: #546E7A
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 10px
    border-radius: 10px
    color: rgba(255,255,255,0.7)

  &-header,
  &-row  
    &-check
      width: 20px
      display: flex
    &-content
      flex: 1
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0 10px 0 50px 
      &-xs
        width: 20px
      &-sm
        width: 100px
      &-med
        width: 150px
      &-lg
        flex: 1
  .last
    display: flex
    justify-content: flex-end
    color: #00BB8E
  .access_icons
    display: flex
    gap: 6px
    span
      font-size:1.5em
      opacity: .1
      color: #00C6C6
    span.active
      opacity: 1  
  // .stars 
//   font-variation-settings: {
//   'FILL' 1,
//   'wght' 400,
//   'GRAD' 0,
//   'opsz' 48
//   }
  // .checkmark
  //   background-color: #00C6C6


@media only screen and (max-width: 767px)
  .table-row-content,
  .table-header-content
    &-xs
      width: 20px
    &-sm
      width: 60px
    &-med
      width: 80px
    &-lg
      flex: 1
    .last
      display: flex
      justify-content: flex-end
      color: #00BB8E
    .access_icons
      display: flex
      gap: 2px
      span
        font-size:1.5em
        opacity: .1
        color: #00C6C6
      span.active
        opacity: 1  
</style>

<style lang="scss">
.material-symbols-rounded {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>