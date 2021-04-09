<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总访问量</div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num"/>
		  <div class="" style="margin-top: 5px;color: #d3d3d3;">较昨日：+688</div>
        </div>
		
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" @click="router()">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">帖子</div>
          <count-to :start-val="0" :end-val="tiezhi" :duration="3000" class="card-panel-num"/>
		  <div class="" style="margin-top: 5px;color: #d3d3d3;">较昨日：+688</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户量</div>
          <count-to :start-val="0" :end-val="ren" :duration="3200" class="card-panel-num"/>
		  <div class="" style="margin-top: 5px;color: #d3d3d3;">较昨日：+688</div>
        </div>
      </div>
    </el-col>
	<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	  <div class="card-panel" @click="handleSetLineChartData('messages')">
	    <div class="card-panel-icon-wrapper icon-message">
	      <svg-icon icon-class="message" class-name="card-panel-icon" />
	    </div>
	    <div class="card-panel-description">
	      <div class="card-panel-text">热度话题</div>
	      <count-to :start-val="0" :end-val="huati" :duration="3000" class="card-panel-num"/>
	    </div>
	  </div>
	</el-col>
	<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	  <div class="card-panel" @click="handleSetLineChartData('messages')">
	    <div class="card-panel-icon-wrapper icon-message">
	      <svg-icon icon-class="message" class-name="card-panel-icon" />
	    </div>
	    <div class="card-panel-description">
	      <div class="card-panel-text">用户反馈</div>
	      <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num"/>
	    </div>
	  </div>
	</el-col>
	<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	  <div class="card-panel" @click="handleSetLineChartData('messages')">
	    <div class="card-panel-icon-wrapper icon-message">
	      <svg-icon icon-class="message" class-name="card-panel-icon" />
	    </div>
	    <div class="card-panel-description">
	      <div class="card-panel-text">待审话题</div>
	      <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num"/>
	    </div>
	  </div>
	</el-col>
	<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	  <div class="card-panel" @click="handleSetLineChartData('messages')">
	    <div class="card-panel-icon-wrapper icon-message">
	      <svg-icon icon-class="message" class-name="card-panel-icon" />
	    </div>
	    <div class="card-panel-description">
	      <div class="card-panel-text">数据分析</div>
	      <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num"/>
	    </div>
	  </div>
	</el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getlist , getdata,gethuati} from '@/api/user'
export default {
  components: {
    CountTo
  },
  data() {
    return {
     ren:"",
	 tiezhi:"",
	 huati:""
  		 }
  },
  created() {
    this.fetchList()
	this.fetchList2()
  },
  methods: {
    handleSetLineChartData(type) {
     
	 
    },
	fetchList() {
		var that = this
	  getlist(this.listQuery).then(res => {
	    
		that.ren = res.data.length
	  })
	},
	fetchList2() {
		var that = this
	  getdata(this.listQuery).then(res => {
		that.tiezhi = res.data.length
	  })
	  gethuati(this.listQuery).then(res => {
	    console.log(res.data)
	  		that.huati = res.data.length
	  })
	  
	}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
