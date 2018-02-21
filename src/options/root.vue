<template lang="html">
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>TP Commit Message Options</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="options.selectedCardSelector"
                    label="Selected Card Selector"
                    required
                  />
                  <v-text-field
                    v-model="options.openedCardSelector"
                    label="Opened Card Selector"
                    required
                  />
                  <v-text-field
                    v-model="options.openedCardTypeSelector"
                    label="Opend Card Type Selector"
                    required
                  />
                  <v-text-field
                    v-model="options.openedCardIdSelector"
                    label="Opend Card Id Selector"
                    required
                  />
                  <v-text-field
                    v-model="options.openedCardNameSelector"
                    label="Opend Card Name Selector"
                    required
                  />
                  <v-subheader style="padding: 0;">Message Options</v-subheader>
                  <v-checkbox
                    label="Show Type"
                    v-model="options.showType"
                  />
                  <v-checkbox
                    label="Show Id"
                    v-model="options.showId"
                  />
                  <v-checkbox
                    label="Show Name"
                    v-model="options.showName"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-snackbar
      :timeout="4000"
      top="top"
      v-model="saved"
    >
      Options saved
      <v-btn flat color="pink" @click.native="saved = false">Ok</v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
  const defaultOptions = {
    selectedCardSelector: '[role="cell"] .tau-selected',
    openedCardSelector: '.tau-cover-view__content',
    openedCardTypeSelector: '.tau-entity-icon',
    openedCardIdSelector: '.entity-id__link',
    openedCardNameSelector: '.view-header__entity-title',
    showType: true,
    showId: true,
    showName: true
  }

  export default {
    data: () => ({
      saved: false,
      options: {}
    }),
    methods: {
      restore () {
        // Get stored date from browser and update vue-modal
        chrome.storage.sync.get(defaultOptions, items => {
          Object.keys(items).forEach(key => {
            this.$set(this.options, key, items[key])
          })
        })
      },
      save () {
        // Save date to browser and show snackbar on success
        const payload = Object.keys(this.options).reduce((acc, curr) => {
          return {
            ...acc,
            [curr]: this.options[curr]
          }
        }, {})

        chrome.storage.sync.set(payload, _ => {
          this.saved = true
        })
      }
    },
    created () {
      this.restore()
    }
  }
</script>
