<template>
  <v-card>
    <v-card-title class="font-weight-light mb-2">
      Add Process
    </v-card-title>

    <v-card-text>
      <v-form>
        <v-col>
          <v-row>

            <v-menu
              ref="menuStart"
              class="z-15"
              v-model="menuStart"
              :close-on-content-click="false"
              :return-value.sync="startDate"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >

              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  class="mr-2"
                  label="Select start date"
                  readonly
                  height="56"
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  :rules="[ rules.required ]"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="startDate"
                color="blue-grey lighten-2"
                :max="new Date().toISOString().substr(0, 10)"
                no-title
              >
                <v-spacer></v-spacer>
                <v-btn text color="grey darken-3 text-capitalize" @click="menuStart = false">Cancel</v-btn>
                <v-btn text color="grey darken-3 text-capitalize" @click="$refs.menuStart.save(startDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>

            <v-menu
              ref="menuEnd"
              v-model="menuEnd"
              :close-on-content-click="false"
              :return-value.sync="deadlineDate"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >

              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="deadlineDate"
                  label="Select end date"
                  readonly
                  height="56"
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  :rules="[ rules.required, rules.endDate ]"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="deadlineDate"
                color="blue-grey lighten-2"
                :max="new Date().toISOString().substr(0, 10)"
                no-title
              >
                <v-spacer></v-spacer>
                <v-btn text color="grey darken-3 text-capitalize" @click="menuEnd = false">Cancel</v-btn>
                <v-btn text color="grey darken-3 text-capitalize" @click="$refs.menuEnd.save(deadlineDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>

          </v-row>

          <v-row>
            <v-select
              v-model="status"
              :items="statusesVariants"
              label="Status"
              outlined
              class="mr-2"
            >
            </v-select>

            <v-text-field
              v-model="duration"
              label="Duration"
              type="number"
              outlined
            >

            </v-text-field>
          </v-row>

          <v-row>
            <v-textarea
              v-model="description"
              outlined
              label="Description"
            >
            </v-textarea>
          </v-row>
        </v-col>

      </v-form>
    </v-card-text>

    <v-card-actions class="pa-6 pt-0">
      <v-btn
        outlined
        color="primary"
        @click="createProcess"
      >
        Confirm
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { URL_API } from "@/settings";
  import axios from 'axios';

  import {
    RULES,
  } from "@/resourses/helpers";

  import {
    PROCESS_STATUSES,
  } from "@/settings";

  export default {
    name: "AddProcessCard",

    props: {
      productId: String
    },

    data() {
      return {
        startDate: '',
        deadlineDate: '',

        menuStart: false,
        menuEnd: false,


        statusesVariants: PROCESS_STATUSES,
        status: PROCESS_STATUSES[0],

        duration: undefined,
        description: undefined,

        rules: {
          ...RULES,
          endDate: v => v > this.startDate || "Need to be more then start date",
        }
      }
    },

    computed: {
      project() {
        return this.$store.getters.getProject;
      },
    },

    methods: {
      createProcess() {
        axios({
          method: "post",
          url: `${URL_API}/api/products/${this.project.productId}/create_process`,
          data: {
            startDate: this.startDate,
            deadlineDate: this.deadlineDate,
            description: this.description,
            duration: this.duration,
            processStatus: this.status,
          }
        })
        .then( () => {
          this.$store.dispatch("PUSH_NOTIFICATION", {
            type: "success",
            message: "Process created"
          });
          this.$emit("done");
        })
        .catch( () => {
          this.$store.dispatch("PUSH_NOTIFICATION", {
            type: "error",
            message: "Process creation error"
          });
          this.$emit("error");
        })
      }
    }

  }
</script>