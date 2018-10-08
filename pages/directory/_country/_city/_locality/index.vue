<template>
    <v-container fluid pa-0>
        <v-container light class="secondary text-xs-center mt-0" fluid>
        <v-card class="transparent elevation-0">
            <v-card-title class="justify-center colorPrimaryText--text">
            <div align="center" class="mt-2">
                <h2 class="section-title">Showing Top <span>Educational Places</span> Below</h2>
                <p class="section-intro">
                    Based On Rating, Popularity And Search Location
                </p>
            </div>
            </v-card-title>
        </v-card>
        </v-container>
        <v-container pa-0>
            <div>
            <v-breadcrumbs large>
                <v-icon slot="divider">forward</v-icon>
                <v-breadcrumbs-item
                    v-for="item in breadcrumbs"
                    :key="item.text"
                    :disabled="item.disabled"
                    :exact=true
                    :to="item.to">
                    {{ item.text }}
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </div>
        </v-container>
        <v-container 
            v-for="CategoryEPDTO in CategoryEPDTOs" 
            pa-0 mb-3 pl-3
            :key="CategoryEPDTO.category.key">
            <TopCategoryWise :category=CategoryEPDTO></TopCategoryWise>
        </v-container>
    </v-container>
</template>

<script>
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";
import TopCategoryWise from "@/components/TopCategoryWise";
import images from "@/constants/images";
export default {
    name: "home",
    components: { TopCategoryWise },
    async asyncData ( {params} ) {
        let { data } = await axios.get(
        config.baseUrl + ApiEndpoints.GET_EP_BASED_ON_SUBLOCALITY_LEVEL_1,{
            params: {
            subLocality1Id: params.locality,
            }
        }
        );
        return { 
            CategoryEPDTOs: data.data,
            breadcrumbs: data.breadcrumbs
         }
    },
    data: () => ({
    }),
    created() {
    },
    computed: {
    },
    methods: {
        onCategoryClick(category) {
        console.log("category clicked");
        this.$router.push("/list/" + category.key);
        }
    },
    mounted() {
        
    }
};
</script>
