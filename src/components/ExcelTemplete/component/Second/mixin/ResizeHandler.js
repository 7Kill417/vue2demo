const body = document.getElementById("ExcelTemplete")

export default {
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    this.$nextTick( () => {
      this.$_resizeHandler()
    })
  },
  data () {
    return {
        heightNum: null,
        firstHeightNum: null,
        isFirst: true
    }
  },
  methods: {
    $_isMobile() {
      let heightNum = this.$refs.quoteInventoryTableHeight.offsetHeight;
      let secondSuccess = this.$refs.secondSuccessTableMyself.$el.offsetHeight;
      if (this.isFirst) {
        this.firstHeightNum = secondSuccess
        this.isFirst = false
      }
      if (this.firstHeightNum > heightNum) {
        return heightNum - 32
      }else{
        if (heightNum > secondSuccess) {
          return secondSuccess
        }else{
          return heightNum - 32
        }
      }
    },
    $_resizeHandler() {
      if (body) {
        const isMobile = this.$_isMobile()
        this.heightNum = isMobile
      }
    }
  }
}
