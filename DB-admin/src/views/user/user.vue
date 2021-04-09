<template>
  <el-table
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="150">
	  
    </el-table-column>
	<el-table-column
	  label="头像"
	  width="80">
	  <template  slot-scope="scope">
	  		 <img :src= " scope.row.img" 
			 style="width: 50px;height: 50px;"/>
	  </template>
	</el-table-column>
    <el-table-column
      prop="userName"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop=""
      label="手机"
      width="300">
    </el-table-column>
    <el-table-column
      prop=""
      label="邮箱"
      width="300">
    </el-table-column>
    <el-table-column
      prop=""
      label="注册IP"
      width="150">
    </el-table-column>
    <el-table-column
      prop="regTime"
      label="注册时间"
      width="150">
    </el-table-column>
	<el-table-column
	  prop="loginTime"
	  label="登录时间"
	  width="150">
	</el-table-column>
	<el-table-column
	  prop=""
	  label="状态"
	  width="150">
	</el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="lahei(scope.row.openId)" type="text" size="small">拉黑</el-button>
        <el-button type="text" size="small" @click="delete1(scope.row.openId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getlist , deleteUser , ban} from '@/api/user'
export default {
	
  components: {
    
  },
  data() {
    return {
      listQuery: {
        status: '-1',
        title: ''
      },
     list:[],
	 postdata:{
		 openid:""
	 }
		 }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
		var that = this
      getlist(this.listQuery).then(res => {
        console.log(res)
		that.list = res.data
      })
    },
	delete1(a){
	console.log(a)
	this.postdata.openid = a
	deleteUser(this.postdata).then(res => {
	
			
	})
	this.$message({
	          message: '删除成功',
	          type: 'success'
	        })
	},
	lahei(a){
	console.log(a)
	this.postdata.openid = a
	ban(this.postdata).then(res => {
	
			
	})
	this.$message({
	          message: '拉黑成功',
	          type: 'success'
	        })
	},
  }
}
</script>

