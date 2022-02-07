<template>
    <div ref="secondTableHeight" class="Second">
        <!-- <p style="font-size: 14px;">总计导入 <span style="color: #00be71;">
          {{dataInfo.errorCount ? dataInfo.errorCount+dataInfo.successCount:dataInfo.successCount}}
        </span> 条记录</p>
        <p style="font-size: 14px;">成功导入 <span style="color: #00be71;">{{dataInfo.successCount}}</span>条记录</p>
        <p style="font-size: 14px;">异常导入 <span style="color: red">{{dataInfo.errorCount}}</span> 条记录
          <el-button type="text" style="font-size: 14px" @click="exportErrorPurchaseBills">导出</el-button>
        </p> -->
        <!-- <errorTable ref="secondErrorTableMyself"></errorTable> -->
        <p style="text-align: center;">导入成功！</p>
    </div>
</template>

<script>
// import errorTable from './component/errorTable'
import ResizeMixin from'./mixin/ResizeHandler'
import axios from 'axios'

export default {
    name: 'Second',
    data () {
        return {
            activeName: 'second',
            dataInfo:{
                errorCount:'',//错误条数
                successCount:'',//成功条数
                errorItems:'',
                errorList:[]
            },
            tableIndex:'',
        }
    },
    mounted (){
        if(this.$route.path === '/purchasingList'){
            this.tableIndex = 1 ;
          this.dataInfo = this.$store.state.ExcelTemplete.dataInfo;
        } else if (this.$route.path === '/foodManage') {
          this.dataInfo = this.$store.state.ExcelTemplete.dataInfo;
          this.dataInfo.errorCount = this.$store.state.ExcelTemplete.dataInfo.errors
          this.dataInfo.successCount = this.$store.state.ExcelTemplete.dataInfo.success
        } else{
          this.dataInfo = this.$store.state.ExcelTemplete.dataInfo;
          this.tableIndex = 2 ;
        }
    },
    methods:{
        exportErrorPurchaseBills() {
            console.log(this.dataInfo)
            this.dataInfo.errorList = this.dataInfo.errorList || []
          if ( this.dataInfo.errorList.length > 0) {
            let uri = JSON.stringify(this.dataInfo.errorList)
            let formData = new FormData();
            formData.append("dataStr", uri)
            axios.post(`${this.$basicUrl}/cookbook/exportErrorCookbook`, formData, { responseType: 'blob' }).then((response) => {
              const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.ms-excel'
              }))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', '异常导出清单')
              document.body.appendChild(link)
              link.click()
            })
          } else if(this.dataInfo.errorItems.length > 0){
                if(this.$route.path === '/quoteInventory'){//报价清单导出
                    let goodsNos = [];
                    let goodsNames = [];
                    let propertys = [];
                    let unitNames = [];
                    let categoryNames = [];
                    let errors = [];
                    this.dataInfo.errorItems.forEach(item => {
                        goodsNos.push(item.goodsNo);
                        goodsNames.push(item.goodsName);
                        unitNames.push(item.unitName);
                        categoryNames.push(item.customerFirstCategoryName);
                        propertys.push(item.property);
                        errors.push(item.error_text);
                    });
                    
                   // let sorts1,goodsNos1,prices1,taxRates1,priceTaxs1,goodsNames1,originNames1,standardNames1,gradeNames1,packingNames1,unitNames1,categoryNames1,remarks1,errors1 = ""
                    // let url = "";
                    //  for(let i=0;i<goodsNos.length;i++){
                    //     url += "goodsNos="+goodsNos[i]+"&"
                    // }
                    //  for(let i=0;i<goodsNames.length;i++){
                    //     url += "goodsNames="+goodsNames[i]+"&"
                    // }
                    //  for(let i=0;i<propertys.length;i++){
                    //     url += "propertys="+propertys[i]+"&"
                    // }
                    //  for(let i=0;i<unitNames.length;i++){
                    //     url += "unitNames="+unitNames[i]+"&"
                    // }
                    //  for(let i=0;i<categoryNames.length;i++){
                    //     url += "categoryNames="+categoryNames[i]+"&"
                    // }
                    //  for(let i=0;i<errors.length;i++){
                    //     url += "errors="+errors[i]+"&"
                    // }
                    
                    //postSubmit(this.$basicUrl +"/quotationList/exportErrorQuotation?",url)

                } else{//商品导出
                    let goodsNos = [];
                    let goodsNames = [];
                    let propertys = [];
                    let unitNames = [];
                    let categoryNames = [];
                    let errors = [];
                    this.dataInfo.errorItems.forEach(item => {
                        goodsNos.push(item.goodsNo);
                        goodsNames.push(item.goodsName);
                        unitNames.push(item.unitName);
                        categoryNames.push(item.categoryName);
                        propertys.push(item.property);
                        errors.push(item.error_text);
                    });
                    //  let url = "";
                    //  for(let i=0;i<goodsNos.length;i++){
                    //     url += "goodsNos="+goodsNos[i]+"&"
                    // }
                    //  for(let i=0;i<goodsNames.length;i++){
                    //     url += "goodsNames="+goodsNames[i]+"&"
                    // }
                    //  for(let i=0;i<propertys.length;i++){
                    //     url += "propertys="+propertys[i]+"&"
                    // }
                    //  for(let i=0;i<unitNames.length;i++){
                    //     url += "unitNames="+unitNames[i]+"&"
                    // }
                    //  for(let i=0;i<categoryNames.length;i++){
                    //     url += "categoryNames="+categoryNames[i]+"&"
                    // }
                    //  for(let i=0;i<errors.length;i++){
                    //     url += "errors="+errors[i]+"&"
                    // }
                    //postSubmit(this.$basicUrl +"/buyerGoods/exportErrorGoodsList?",url)
                }

            }

        },
        handleClick() {
        }
    },
    components:{
        // errorTable
    },
    mixins: [ResizeMixin]
}
</script>

<style scoped>
    .Second{
       width: 200px;
       margin: 0 auto;
    }

</style>