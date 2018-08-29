<template>
  <v-container grid-list-sm class="justify-center">
    <v-layout row wrap>
      <v-flex xs6 sm7 md8 pa-2>
        <v-layout row wrap>
          <v-flex>
            <Header :text="`Top `+category.name"></Header>
          </v-flex>
          <v-flex>
            <v-btn
              class="mb-3"
              flat
              color="light-blue darken-4"
              @click.native="changeFilter">
              Top Rating
            </v-btn>
            <v-btn
              class="mb-3"
              flat
              color="light-blue darken-4"
              @click.native="changeFilter">
              Nearest
            </v-btn>
            <v-btn
              class="mb-3"
              flat
              color="light-blue darken-4"
              @click.native="changeFilter">
              Top Bookmarks
            </v-btn>
          </v-flex>
        </v-layout>
        <v-container class="nestedScroll pa-0">
          <v-layout row wrap v-if="schools" mt-3>
            <v-flex style="cursor: pointer;"
                    pa-2
                    xs6 sm6 md4
                    v-for="school in schools"
                    :key="school.id"
                    @click="onClickSchool(school.id)">
              <School :school="school"></School>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <infinite-loading @infinite="infiniteHandler()" spinner="spiral" ref="infiniteLoading">
              <span slot="no-more">
                <v-alert class="indicatorColor" :value="true">
                      No more results !
                </v-alert>
              </span>
                <span slot="no-results">
                <v-alert class="indicatorColor" :value="true">
                      No  result !
                </v-alert>
              </span>
              </infinite-loading>
            </v-flex>
          </v-layout>
          <v-layout>
            <div style="height: 100px"></div>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6 sm5 md4 pl-3 pa-2>
        <EntityFilter
          @change-filter="changeFilter"></EntityFilter>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from "@/services/firebaseInit";
import School from "@/components/place/School";
import Header from "@/components/utils/Header";
import InfiniteLoading from "vue-infinite-loading";
import EntityFilter from "@/components/list/EntityFilter";
import SchoolUtil from "@/utils/SchoolUtil";

export default {
  name: "EntityList",
  components: { EntityFilter, Header, School, InfiniteLoading },
  data: function() {
    return {
      heading: false,
      loading: true,
      schools: [],
      schoolsForStoring: [],
      category: null,
      LIMIT: 10,
      nextQuery: null,
      placeType: null,
      filterMap: new Map()
    };
  },
  created() {
    this.category = this.$store.getters["categories/category"](
      this.$route.params.category
    );
    this.placeType = "placeType" + "." + this.category.key;
    this.nextQuery = db
      .collection("schools")
      .where("published", "==", true)
      .where(this.placeType, "==", true)
      .where(
        "location.geohash50",
        "==",
        this.$store.getters["location/location"].geohash50
      )
      .orderBy("rating", "desc")
      .limit(this.LIMIT);
  },
  methods: {
    onClickSchool(id) {
      this.$router.push("/place/" + id);
    },
    infiniteHandler($state) {
      this.nextQuery
        .get()
        .then(querySnapshot => {
          let count = 0;
          querySnapshot.forEach(doc => {
            const school = doc.data();
            if (school.coverPic === undefined || school.coverPic === null) {
              if (school.images !== undefined && school.images !== null) {
                school["coverPic"] = Object.values(school.images)[0];
              }
            }
            if (SchoolUtil.filterPass(school, this.filterMap)) {
              this.schools.push(school);
            }
            count++;
          });
          $state.loaded();
          if (count < this.LIMIT) {
            $state.complete();
          } else {
            const lastVisible =
              querySnapshot.docs[querySnapshot.docs.length - 1];
            this.nextQuery = db
              .collection("schools")
              .where("published", "==", true)
              .where(this.placeType, "==", true)
              .where(
                "location.geohash50",
                "==",
                this.$store.getters["location/location"].geohash50
              )
              .orderBy("rating", "desc")
              .startAfter(lastVisible)
              .limit(this.LIMIT);
          }
        })
        .catch(function(error) {
          console.log(
            "page/list home.vue error getting school documents: ",
            error
          );
        });
    },
    changeFilter(filter) {
      console.log(filter);
      this.filterMap = filter;
      this.nextQuery = db
        .collection("schools")
        .where("published", "==", true)
        .where(this.placeType, "==", true)
        .where(
          "location.geohash50",
          "==",
          this.$store.getters["location/location"].geohash50
        )
        .orderBy("rating", "desc")
        .limit(this.LIMIT);
      this.schools = [];
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit("$InfiniteLoading:reset");
      });
    }
  },
  computed: {}
};
</script>

<style scoped>
.nestedScroll {
  overflow: auto;
  height: 90vh;
  display: block;
}
</style>
