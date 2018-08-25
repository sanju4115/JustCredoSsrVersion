<template>
  <div
    class="alpha-testimonial mt-3"
    :class="[dark ? 'alpha-testimonial--dark' : '']">
    <div class="alpha-testimonial__content">
      <v-icon
        x-large
        class="blue--text"
        :dark="dark"
      >format_quote</v-icon>
      <v-card class="transparent elevation-0">
        <v-card-title class="justify-center">
          <div align="center">
            <h2 class="alpha-testimonial__cussection" v-text="quote"></h2>
          </div>
        </v-card-title>
      </v-card>
    </div>
    <footer>
      <div
        class="alpha-testimonial__footer-bar"
        :class="[dark ? 'white' : 'blue']"></div>
      <div class="headline" v-text="author"></div>
      <div class="title" v-text="title" ></div>
    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      author: String,
      dark: Boolean,
      quote: String,
      title: String
    }
  }
</script>

<style lang="stylus">
  .alpha-testimonial
    &__content
      align-items: flex-start
      display: flex
      justify-content: space-between

    &__cussection
      margin-top: 0
      letter-spacing: 0.2vh
      font-weight: 300
      font-size: 3vh

    &__footer-bar
      height: 4px
      margin: 20px 0 20px auto
      width: 100px

    .icon
      justify-content: flex-end
      flex: 0 1 10%
      margin-top: -8px
      transform: rotate(180deg)

    p
      flex: 1 1 85%
      line-height: 2

    footer
      flex: 1 0 auto
      text-align: right

      .title
        font-weight: 300

    &--dark
      color: #fff

</style>
