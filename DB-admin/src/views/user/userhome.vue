<template>
	<el-row style="margin: auto;display: flex;margin-top: 50px;flex-direction: row;flex-wrap: wrap;">
	  <el-row v-for="(item, i) in list"  :key="i" align="bottom" style="display: flex;margin-left: 10px;" >
	  
	    <el-card :body-style="{ padding: '0px' }" style="width: 400px;padding: 20px;">
			<div style="display: flex;justify-content: space-between;">
				<!-- 用户信息 -->
				<div style="display: flex;flex-direction: row;">
						  <img :src="item.user[0].img" class="" style="width: 50px;height: 50px;">
				    <div style="display: flex;flex-direction: column;margin: 10px;">
								  <div>{{ item.user[0].userName }}</div>
								  <div style="color: #bcbcbc;margin: 10px;">{{ item.created_at }}</div>
						  </div>
				</div>
				<!-- 下拉 -->
				<!-- <el-dropdown>
				      <span class="el-dropdown-link">
				        <i class="el-icon-arrow-down el-icon--right"></i>
				      </span>
				      <el-dropdown-menu slot="dropdown">
				        <el-dropdown-item>删除</el-dropdown-item>
				        <el-dropdown-item>推广</el-dropdown-item>
				      </el-dropdown-menu>
				</el-dropdown> -->
			</div>
			<!-- 话题文字 -->
			<div style="color: #13CE66;font-weight:600;" v-if="{{item.topic[0].topic}}">#{{ item.topic[0].topic }}</div>
			<!-- 内容 -->
			<div style="display: flex;margin-top: 5px;flex-wrap: wrap;">
				<div style="flex-wrap: wrap;">{{ item.content }}</div>
				<div v-for="(t,j) in item.action" :key="j" style="display: flex;flex-wrap: wrap;" v-if="t.type == 1" >
					<div style="flex-wrap: wrap;">@ {{ t.bName }} </div>
				</div>
			</div>
			<!-- 图片 -->
		  <div v-for="(img,j) in item.img"  :key="j" style="margin-top: 5px;">
		  	<img :src="img.src" class="image" >
		  </div>
		  
		  <div style="display: flex;flex-direction: row;justify-content: space-between;margin: 14px;">
			  <!-- 点赞人数 -->
			  <div style="display: flex;flex-direction: row;margin-top: 5px;">
			  			  <div style="">点赞人数：</div>
			  			   <div style="color: #ff0000;">{{ item.parise_number }}</div>
			  </div>
			  <!-- 评论条数 -->
			  <div style="display: flex;flex-direction: row;margin-top: 5px;">
			  			  <div style="">评论条数：</div>
			  			   <div style="color: #ff0000;">{{ item.comment_number }}</div>
			  </div>
		  </div>
		  <!-- 评论 -->
			 <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto;margin-left: -25px;">
			     <div v-for="(pl,e) in item.action" :key="e" v-if="pl.type == 3">
					<div style="display: flex;flex-direction: row;" v-if="item.user[0].openId!=pl.b && pl.a != pl.b">
						 <div style="color: #13CE66;">{{pl.aName}}</div>
						 <div style="color: #b0b0b0;margin-left: 4px;">回复</div>
						 <div style="color: #13CE66;margin-left: 4px;">{{pl.bName}}:</div>
						 <div style="color: #b0b0b0;margin-left: 4px;">{{pl.txt}}</div>
					</div>
					<div style="display: flex;flex-direction: row;" v-if="item.user[0].openId==pl.b || pl.a == pl.b">
						 <div style="color: #13CE66;">{{pl.aName}}</div>
						
						 <div style="color: #13CE66;margin-left:4px;">:</div>
						 <div style="color: #b0b0b0;margin-left: 4px;">{{pl.txt}}</div>
					</div> 
				 </div>
				 
			   </ul>
			<!-- 评论2 -->
			<ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto;margin-left: -25px;">
			    <div v-for="(pl,e) in item.action" :key="e" v-if="pl.type == 3">
					<div style="display: flex;flex-direction: row;" v-if="item.user[0].openId==pl.b || pl.a == pl.b">
						 <div style="color: #13CE66;">{{pl.aName}}</div>
						 <div style="color: #13CE66;margin-left:4px;">:</div>
						 <div style="color: #b0b0b0;margin-left: 4px;">{{pl.txt}}</div>
					</div> 
					<!-- 评论条数 -->
						<div style="display: flex;flex-direction: row;background-color: #b4b4b4;padding: 5px;margin-top: 5px;" @click="go">
							<div style="color: #0000FF;">共有{{ item.comment_number }}条回复</div>
							<div style="color: #0000FF;margin-left: 10px;">></div>
						</div>
				</div>
						 
			</ul>
	      <div style="padding: 14px;">
			 
	       
	        <div class="bottom clearfix">
				 
	          <el-button type="danger" round class="button" @click="banhuati(item.id)" style="letter-spacing: 5px;">删除</el-button>
	        </div>
	      </div>
	    </el-card>
	  </el-row>
	</el-row>
	<div style="display: flex;margin-left: auto;margin-right: auto;" v-if="{{page <= listpage}}" @click="gengduo(page)">——————加载更多——————</div>
	<div style="display: flex;margin-left: auto;margin-right: auto;" v-else>——————已加载全部——————</div>
</template>

<script>
	import { getlist , banhuati , gethuati , getdata, gettopics} from '@/api/user'
	export default {
		
	  data() {
	    return {
	      list:[],
		 listpage:0,//总页数
		 page:1,//当前页数
		  tape:0,
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
		banhuati(a){
			console.log(a)
			this.postdata.id = a
			banhuati(this.postdata).then(res => {
			
					
			})
			this.reload()
			this.$message({
			          message: '删除成功',
			          type: 'success'
			        })
		},
		huati() {
			var that = this
			getdata(this.listQuery).then(res => {
				/* 获取总页数 */
				that.lastpage = res.data.last_page
				console.log("huati");
			  console.log(res.data.data)
			  var datas = res.data.data
			  this.$set(this.list,0,datas)
			})
			console.log("list");
			console.log(that.list);
		},
		gengduo(a){
			var that = this
			if(that.page <= that.lastpage){
				console.log("页数");
				console.log(a)
				that.page = a
				gettopics(that.page).then(res => {
				console.log(res);
					that.list = list + res.data.data
					
				})
			}
			else{
				this.$message({
				          message: '已加载全部',
				          type: 'success'
				        })
			}
			
		},
		go(){
			this.$router.push('/pinglun')
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
