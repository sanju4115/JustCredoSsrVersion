<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 class="mb-3">
        <p style="font-weight: bold">Select Boards</p>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap>
            <v-flex
              xs4
              v-for="(board,index) in boards"
              :key="index">
              <v-checkbox :label="board"
                          v-model="var_boardsList"
                          color="accent"
                          hide-details :value="board"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 sm12 class="justify-center">
        <p style="font-weight: bold">Select Classes</p>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap>
            <v-flex
              xs4
              v-for="(schoolClass,index) in classes" :key="index">
              <v-checkbox :label="schoolClass"
                          v-model="var_classesList"
                          color="accent"
                          hide-details :value="schoolClass"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "BoardsAndClasses",
  props: {
    boards: {
      type: Array,
      required: true
    },
    classes: {
      type: Array,
      required: true
    },
    boardsList: {
      type: Array,
      required: true
    },
    classesList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      var_boardsList: this.boardsList,
      var_classesList: this.classesList
    };
  },
  watch: {
    var_boardsList(val) {
      this.$emit("change-boardsList", val);
    },
    var_classesList(val) {
      this.$emit("change-classesList", val);
    }
  }
};
</script>

<style scoped>
</style>
