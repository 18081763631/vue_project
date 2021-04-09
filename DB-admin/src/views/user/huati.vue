<template>
	
	<el-row style="margin: auto;display: flex;margin-top: 20px;flex-direction:column;flex-wrap: wrap;">
		<div style="display: flex;
		margin-left: auto;
		margin-right: auto;color: #13CE66;font-size: 20px;">#今日热门话题</div>
		<div style="display: flex;margin-top: 50px;flex-direction:row;flex-wrap: wrap;">
			<el-row v-for="(item, i) in list"  :key="i" align="bottom" style="display: flex;" >
			
			  <el-card :body-style="{ padding: '0px' }" style="width: 370px;margin: 20px;padding: 20px;">  
					<div style="color: #13CE66;font-weight:600;">#{{ item.topic }}</div>
			    <div style="padding: 14px;">
						 
			     
			      <div class="bottom clearfix">
							 
			        <el-button type="danger" round class="button" @click="banTopic(item._id)" style="letter-spacing: 5px;">删除</el-button>
			      </div>
			    </div>
			  </el-card>
			</el-row>
		</div>
	  
	</el-row>
</template>

<script>
	import { getlist , banhuati , gethuati , getdata,banTopic} from '@/api/user'
	export default {
		
	  data() {
	    return {
	      list:[],
		  list2:[],
		  postdata:{
		  		 id:""
		  }
	    }
	  },
	  created() {
		this.huati()
	  },
	  inject:['reload'],
	  methods: {
		banTopic(a){
			console.log(a)
			this.postdata.id = a
			banTopic(this.postdata).then(res => {
			
					
			})
			this.reload()
			this.$message({
			          message: '删除成功',
			          type: 'success'
			        })
		},
		huati() {
			var that = this
			gethuati(this.listQuery).then(res => {
			  console.log(res.data)
				 that.list = res.data	
			})
		}
	}
	}
	
	

</script>

<style>
	 .time {
	    font-size: 13px;
	    color: #999;
	  }
	  
	  .bottom {
	    margin-top: 13px;
	    line-height: 12px;
	  }
	
	  .button {
	    padding: 0;
	    float: right;
	  }
	
	  .image {
	    width: 100%;
	    display: block;
	  }
	
	  .clearfix:before,
	  .clearfix:after {
	      display: table;
	      content: "";
	  }
	  
	  .clearfix:after {
	      clear: both
	  }
</style>
